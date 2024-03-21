import React, { useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { AppConstants, humanReadableDate } from '../../../../assets/AppConstants';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ReferralCodeSchema = Yup.object().shape({
  referralCode: Yup.string().required('Required'),
});

const SignupReferralCode = ({ goToNext, goToPrev, userData, setUserData, updateUser }) => {
  const [referralCode, setReferralCode] = useState('');

  return (
    <KeyboardAvoidingView behavior='height' style={{
      width: Dimensions.get('window').width,
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingHorizontal:20
    }}>
  
      <View style={{ position: 'absolute', zIndex: -1, marginLeft: 10, marginTop:-120}}>
        <Image source={require('../../../../assets/nyse.png')} style={{}} />
        <View style={{ backgroundColor: 'rgba(0, 23, 139,0.8)', position: 'absolute', height: '100%', width: '100%', marginLeft: -10 }}>
        </View>
      </View>
  
      <View style={styles.container}>
        <Text style={styles.title}>Do you have a Referral Code?</Text>
        <Text style={styles.subtext}>
          A referral code allows you to get extra reward in deposits from Elphinstone on deposit of $500! If you haven't received a referral code, just click next!
        </Text>
  
        <Formik
          initialValues={{ referralCode }}
          validationSchema={ReferralCodeSchema}
          onSubmit={(values) => {
            console.log('Referral code submitted:', values.referralCode);
            updateUser({
              referralCode: values.referralCode,
              meta: {
                profile_start_ts: humanReadableDate(userData.profile_start_ts),
                profile_completeness: 0.1,
                signup_page_location: -2,
              },
            }, goToNext);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter your referral code"
                value={values.referralCode}
                onChangeText={handleChange('referralCode')}
                onBlur={handleBlur('referralCode')}
              />
              <Text style={styles.errorText}>{touched.referralCode && errors.referralCode}</Text>
  
              <HorizontalNavigatior showBackButton nextFunction={handleSubmit} backFunction={goToPrev} />
            </>
          )}
        </Formik>
      </View>
  
    </KeyboardAvoidingView>
  );
  
//   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 320,
  },
  title: {
    fontSize: 24,
    fontFamily: 'ArialNova',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 35,
    marginTop: -100,
  },
  subtext: {
    fontSize: 14,
    fontFamily: 'ArialNova',
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 16,
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: '#8C949D',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 10,
    paddingHorizontal: 80,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignupReferralCode;
