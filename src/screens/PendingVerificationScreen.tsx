
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Button,
    Animated,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    Linking
} from 'react-native';
import React,{ useRef, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, Feather } from '@expo/vector-icons'; 
import AuthScreenWrapper from '../ScreenWrappers/AuthScreenWrapper'
import { GlobalStyles } from '../GlobalStyles';
import PasswordValidationView from './RegisterScreen/PasswordValidationView';
import { AppConstants } from '../../assets/AppConstants';
import SignupWelcomeScreen from './SignupScreen/SignupComponents/WelcomeScreen';
import { NavigationProp } from '@react-navigation/native';
import SignupLegalNames from './SignupScreen/SignupComponents/SignupLegalNames';
import SignupTaxResidence from './SignupScreen/SignupComponents/SignupTaxResidence';
import SignupCitizenship from './SignupScreen/SignupComponents/SignupCitizenship';
import SignupDOB from './SignupScreen/SignupComponents/SignupDOB';
import SignupBirthCountry from './SignupScreen/SignupComponents/SignupBirthCountry';
import SignupIDType from './SignupScreen/SignupComponents/SignupIDType';
import SignupIDDetails from './SignupScreen/SignupComponents/SignupIDDetails';
import SignupAddress from './SignupScreen/SignupComponents/SignupAddress';
import SignupIncomeDetails from './SignupScreen/SignupComponents/SignupIncomeDetails';
import SignupEmploymentDetails from './SignupScreen/SignupComponents/SignupEmploymentDetails';
import SignupBankDetails from './SignupScreen/SignupComponents/SignupBankDetails';
import SignupFundPreference from './SignupScreen/SignupComponents/SignupFundPreference';
import SignupAffiliationQs from './SignupScreen/SignupComponents/SignupAffiliationQs';
import SignupPEPQuestion from './SignupScreen/SignupComponents/SignupPEPQuestion';
import SignupAffiliationDetails from './SignupScreen/SignupComponents/SignupAffiliationDetails';
import SignupPEPFollowUps from './SignupScreen/SignupComponents/SignupPEPFollowups';
import SignupFATCA from './SignupScreen/SignupComponents/SignupFATCA';
import SignupNONUSDeclaration from './SignupScreen/SignupComponents/SignupNONUSDeclaration';
import SignupW8 from './SignupScreen/SignupComponents/SignupW8';
import SignupTrustedContact from './SignupScreen/SignupComponents/SignupTrustedContact';
import SignupDocumentUpload from './SignupScreen/SignupComponents/SignupDocumentUpload';
import SignupAgreementsDisclosures from './SignupScreen/SignupComponents/SignupAgreementsDisclosures';
import SignupPaymentGateway from './SignupScreen/SignupComponents/SignupPaymentGateway';
import SignupLastScreen from './SignupScreen/SignupComponents/SignupLastScreen';

export default function PendingVerificationScreen({navigation, backButtonFunction} : {navigation : NavigationProp<Screen>, backButtonFunction : any}) {
    const showBackButton = true
    return (
        <AuthScreenWrapper navigation={navigation} showLogoutButton = {showBackButton} backButtonFunction={backButtonFunction}>
            <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
            <View style={{
                width:Dimensions.get('window').width,
                alignItems:'flex-start',
                justifyContent:'flex-start',
                height:'100%',
                overflow:'hidden',
                paddingHorizontal:20
            }}
            onStartShouldSetResponder={()=>true}
            >

                <View style={{
                    marginBottom:20
                }}>
                    <Image source={require('../../assets/images/tree.png')} style={{height:36,width:36}}/>
                </View>
            <Text style={{
                    width:'100%',
                    fontFamily:'PlayfairDisplay_700Bold',
                    fontSize:32,
                    color:AppConstants.loginHeaderBlue

                }}>
                    Account {'\n'}Approval
                </Text>

                <Text
                style={{
                    marginTop:20,
                    fontFamily:'ArialNova',
                    lineHeight: 32,
                    fontSize:18
                }}
                >
                    Dear valued client, your account is under process for approval before we can make it transaction-ready and live.
                    {'\n\n'}However, in the meantime, you can visit our website and read through our blog to learn more about Elphinstone’s product offering.
                    {'\n\n'}For further questions or assistance, email us at help@elphinstone.us
                </Text>

                <View
                style={{
                    alignItems:'flex-end',
                    justifyContent:'space-between',
                    width:'100%', 
                    marginTop:20, 
                    flex:1,
                    flexDirection:'row',
                    paddingBottom:20,
                }}>
                
                <TouchableOpacity style={{
                    width:'100%',
                    marginTop:10,
                    height: 54,
                    backgroundColor:AppConstants.loginHeaderBlue,
                    marginVertical:10,
                    borderRadius: 6,
                    padding:10,
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    elevation:5,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }} 
                activeOpacity={0.8}
                onPress = {()=> Linking.openURL('https://elphinstone.us')}
                // disabled= {true}
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                visit www.elphinstone.us
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
            </View>
           </View>
           </ScrollView>
        </AuthScreenWrapper>
    )
}