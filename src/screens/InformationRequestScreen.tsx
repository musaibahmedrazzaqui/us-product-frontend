
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
    Linking,
    Alert
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

export default function InformationRequestScreen({navigation} : {navigation : NavigationProp<Screen>}) {
    const showBackButton = true
    return (
        <AuthScreenWrapper navigation={navigation} showBackButton = {false} showLogoutButton={true} backButtonFunction={()=>console.log('Continue')}>
            <ScrollView bounces={true}>
            <View style={{
                width:Dimensions.get('window').width,
                alignItems:'flex-start',
                justifyContent:'flex-start',
                height:'100%',
                overflow:'hidden',
                paddingHorizontal:20
            }} 
            onStartShouldSetResponder={() => true}
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
                    Information{'\n'}Request
                </Text>

                <Text
                style={{
                    marginTop:20,
                    fontFamily:'ArialNova',
                    lineHeight: 32,
                    fontSize:18
                }}
                >
                    We have identified that some of the information which is required to make your Elphinstone account operational, is either incorrect or incomplete.
                    {'\n\n'}Our team will contact you and we will run you through that and would like you to rectify those errors to proceed.
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
                
                {/* <TouchableOpacity style={{
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
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                continue to onboarding
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity> */}
            </View>
           </View>
           </ScrollView>
        </AuthScreenWrapper>
    )
}