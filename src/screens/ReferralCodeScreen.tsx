// Import necessary modules from React Native
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { AppConstants } from '../../assets/AppConstants';
import HorizontalNavigatior from '../miscComponents/HorizontalNavigator';
import ReferralService from '../../api/lib/ReferralService';
import ReferralResponseModal from '../components/ReferrralResponseModal';

const ReferralCodeScreen = ({ navigation, referralService }) => {
  const [referralCode, setReferralCode] = useState('');
  const [mainMsg, setMainMsg] = useState('');
  const [noteText, setNoteText] = useState('');
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralModalMessage, setReferralModalMessage] = useState('');
  const [referralModalSubtext, setReferralModalSubtext] = useState('');
  const [check,setcheck]=useState(true)
  useEffect(() => {
    ReferralService.getRewards()
      .then((reward) => {
        setMainMsg(reward.data.enterMsg);
        setNoteText(reward.data.enterNoteText);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleReferralCodeSubmit = () => {
    
    referralService
      .validateReferral(referralCode)
      .then((res) => {
        // Assuming res.message and res.subtext are the properties you want to display
        setReferralModalMessage("Referral Code Verified!");
        setReferralModalSubtext("Your referral Code is Verified! You can continue to onboarding now by pressing OK");
        setcheck(true)
        setShowReferralModal(true);
      })
      .catch((error) => {
        console.log(error);
        setReferralModalMessage("Referral Code Not Verified!");
        setReferralModalSubtext("Your referral Code isn't valid! Please enter a valid referral code or press skip to continue onboarding");
        setcheck(false)
        setShowReferralModal(true);
        // Handle error if needed
      });
  };
  const goToNext = () =>{
    navigation.navigate('Onboarding')
  }
  const closeModal = () => {
    setShowReferralModal(false);
    
    // Add any additional logic after closing the modal
  };
  const continueAction = () => {
    setShowReferralModal(false);
    goToNext()
    // Add any additional logic after closing the modal
  };
  const goToPrev = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={{ zIndex: -1, marginLeft: 10 }}>
        <Image source={require('../../assets/nyse.png')} style={{}} />
        <View style={{ backgroundColor: 'rgba(0, 23, 139,0.8)', position: 'absolute', height: '100%', width: '100%' }}>
          <TouchableOpacity style={styles.skipButton} onPress={goToNext}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Do you have a Referral Code?</Text>
        <Text style={styles.subtext}>{mainMsg}</Text>
        <Text style={styles.noteText}>Note: {noteText}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your referral code"
          value={referralCode}
          onChangeText={(text) => setReferralCode(text)}
        />
      </View>
      <HorizontalNavigatior showBackButton nextFunction={handleReferralCodeSubmit} backFunction={goToPrev} />
      <ReferralResponseModal
        message={referralModalMessage}
        subtext={referralModalSubtext}
        show={showReferralModal}
        continueAction={continueAction}
        closeModal={closeModal}
        check={check}
      />
    </ScrollView>
  );
};


// Define styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontFamily:'ArialNova',
    fontWeight: 'bold',
    color:'white',
    marginBottom: 35,
    marginTop:-100,
  },
  subtext:{
    fontSize: 14,
    fontFamily:'ArialNova',
    
    padding:16,
    color:'black'
    
  },
  noteText:{
    fontSize: 12,
    fontFamily:'ArialNova',
    marginBottom:10,
    marginTop:-10,
    padding:10,
    color:'#8C949D'
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: '#8C949D',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    marginTop:10,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: AppConstants.loginHeaderBlue,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
    padding:12,
    fontFamily:'ArialNova',
    fontWeight:'bold',
  },
});

// Export the component to use in your application
export default ReferralCodeScreen;
