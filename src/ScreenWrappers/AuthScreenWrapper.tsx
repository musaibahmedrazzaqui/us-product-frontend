
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Button,
    KeyboardAvoidingView
} from 'react-native';
import Constants from 'expo-constants';
import { AuthScreenWrapperStyle } from './AuthScreenWrapper/AuthScreenWrapperStyle';
import React,{ useEffect, useRef, useState } from 'react';
import { HideKeyboard } from '../miscComponents/HideKeyboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LegalToolTip from './AuthScreenWrapper/LegalToolTip';
import { Entypo, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { AppConstants } from '../../assets/AppConstants';
import { NavigationProp } from '@react-navigation/native';


export default function AuthScreenWrapper({children, navigation, showBackButton, backButtonFunction, showLogoutButton} : {children : React.ReactNode, navigation : any, showBackButton: boolean, backButtonFunction? : any, showLogoutButton? : any}) {
    useEffect(() => {
        console.log("Authscreenwrapper")
    });
    
    return (
        <HideKeyboard>
        <View style={AuthScreenWrapperStyle.viewMain}>
            <StatusBar barStyle = 'dark-content'/>
            <View style = {{...AuthScreenWrapperStyle.header, flexDirection:'column',justifyContent:'center'}}>
                {showBackButton && <TouchableOpacity style={{
                    width:'100%',
                    paddingHorizontal:20
                }}>
                    <Ionicons 
                    name="arrow-back-outline" 
                    size={32} 
                    color="#9097AC" 
                    onPress={backButtonFunction ?  backButtonFunction : ()=>  navigation.goBack() }
                    />
                </TouchableOpacity>}

                {showLogoutButton && <TouchableOpacity style={{
                    width:'100%',
                    paddingHorizontal:20,
                    alignItems:'flex-end',
                    // backgroundColor:'#eee'
                }}>
                    <MaterialIcons
                    name="logout" 
                    size={24} 
                    color="#9097AC" 
                    onPress={backButtonFunction ?  backButtonFunction : ()=>  navigation.goBack() }
                    />
                </TouchableOpacity>}
            </View>

            <KeyboardAvoidingView style={AuthScreenWrapperStyle.body} behavior="padding">
            {children}
            </KeyboardAvoidingView>
            <View style={{...AuthScreenWrapperStyle.footer}}>
                <Text style={{color:AppConstants.loginHeaderBlue, fontFamily:'ArialNova'}}>
                {'\u00A9'} 2023 Elphinstone,  Inc.
                </Text>
                <LegalToolTip contactUsRoute = {() => navigation.navigate('ContactUs')}>
                <Entypo name="lock" size={24} color ="#A4B3C4"/>
                </LegalToolTip>
            </View>
        </View>
        
        </HideKeyboard>
    )
}