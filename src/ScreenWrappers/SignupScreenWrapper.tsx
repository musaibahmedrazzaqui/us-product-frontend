
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Button,
    KeyboardAvoidingView,
    Animated
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


export default function SignupScreenWrapper({children, navigation, showBackButton, backButtonFunction, showLogoutButton, percentageValue} : {children : React.ReactNode, navigation : any, showBackButton: boolean, backButtonFunction? : any, showLogoutButton? : any, percentageValue : number}) {
    const AnimatorRef = useRef(new Animated.Value(0)).current
    
    const animatorFunction = (toValue : number) => {
        Animated.timing(AnimatorRef,{
            toValue,
            useNativeDriver:false,
            duration: 500,
        }).start()
    }

    useEffect(() => {
        animatorFunction(percentageValue)
    },[percentageValue])

    const animValue = AnimatorRef.interpolate({
        inputRange : [0,1],
        outputRange : ['0%', '100%']
    })

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
            <View
            style = {{ width:'100%', padding:20, flexDirection:'row'}}
            >
                <Image source={require('../../assets/images/tree.png')} style={{height:36,width:36}}/>
                <View style={{marginLeft:30, flex:1}}>
                    <Text style={{fontFamily:'ArialNova', color:'#A4B3C4'}}>
                        Your profile is <Text style={{fontFamily:'ArialNova-Bold'}}>{Math.ceil(percentageValue * 100)}% complete</Text>
                    </Text>
                    <View style={{width:'100%', height:4, marginTop:6, borderRadius:2, backgroundColor:'#004DBC44'}}>
                        <Animated.View style={{backgroundColor:'#004DBC', height:'100%', width:animValue}}>

                        </Animated.View>
                    </View>
                </View>
            </View>

            <KeyboardAvoidingView style={{...AuthScreenWrapperStyle.body, height:AuthScreenWrapperStyle.body.height - 60, paddingTop:0}} behavior="padding">
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