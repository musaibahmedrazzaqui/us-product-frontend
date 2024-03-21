
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
    KeyboardAvoidingView
} from 'react-native';
import React,{ useRef, useState } from 'react';
import User from '../api/lib/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, Feather } from '@expo/vector-icons'; 
import AuthScreenWrapper from '../ScreenWrappers/AuthScreenWrapper'
import { GlobalStyles } from '../GlobalStyles';
import PasswordValidationView from './RegisterScreen/PasswordValidationView';
import { NavigationProp } from '@react-navigation/native';

export default function RegisterScreen({navigation} : {navigation : NavigationProp<Screen>}) {
    const emailInputRef = useRef<any>()
    const passInputRef = useRef<any>()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [passModalOpen, setPassModal] = useState(false)
    const [passwordTouched,setPasswordTouched] = useState(false)
    const setJWT = async (jwt : string | undefined) => {
        if (jwt)
            await AsyncStorage.setItem('jwt',jwt)
    }
    
    return (
        <AuthScreenWrapper navigation={navigation} showBackButton={true}>
            <KeyboardAvoidingView behavior='height'>
            <ScrollView bounces={false}>
                <Text style ={{fontFamily: 'Overpass_700Bold', fontSize:30, marginTop:40}}>
                    Register
                </Text>
                <Text style ={{fontFamily: 'Overpass_300Light', fontSize:16, color:'#8692A6', marginBottom:40}}>
                create your free SmartRupee account now
                </Text>

                <TextInput 
                ref={emailInputRef}
                style={GlobalStyles.textInputStyle}
                placeholder="email address"
                onChangeText={value => setEmail(value)}
                autoCapitalize="none"
                keyboardType='email-address'
                textContentType="emailAddress"
                />
                <TextInput 
                ref={passInputRef}
                style={GlobalStyles.textInputStyle}
                placeholder="password"
                onChangeText={value => setPass(value)}
                autoCapitalize="none"
                secureTextEntry={true}
                textContentType="password"
                onFocus={()=>setPasswordTouched(true)}
                />
                <PasswordValidationView password={pass} showView={passwordTouched}/>
                <TouchableOpacity style={GlobalStyles.loginButton} activeOpacity={0.8} onPress={()=>navigation.navigate('Onboarding')}>
                    <Text style={{color:'white', fontFamily:'ArialNova'}}>
                        Sign up
                    </Text>
                    <Feather name="arrow-right" size={24} color="white" />
                </TouchableOpacity>
                </ScrollView>
                </KeyboardAvoidingView>
        </AuthScreenWrapper>
    )
}