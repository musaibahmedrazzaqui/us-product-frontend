import React, {useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    Platform,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import Constants from 'expo-constants'
import AuthScreenWrapper from '../ScreenWrappers/AuthScreenWrapper';
import {Ionicons, AntDesign} from '@expo/vector-icons'
import { AuthScreenWrapperStyle } from '../ScreenWrappers/AuthScreenWrapper/AuthScreenWrapperStyle';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from './SignupScreen/SignupComponents/SignupMiscComponents/CustomTextInput';
import { TextInput } from 'react-native-gesture-handler';
import { GlobalStyles } from "../GlobalStyles";
import HorizontalNavigatior from './AppDashboardEditProfile/HorizontalNavigator';
import axios from 'axios';
import { useState } from 'react';
import ResponseModal from '../components/ResponseModal';
import { AppConstants } from '../../assets/AppConstants';

const contactUsSchema = Yup.object().shape({
    name : Yup.string().required(),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required(),
    message : Yup.string()
});
export default function ContactUsScreen({sellValue, userBalances, refreshFunction, navigation, route} : any){
    const [showResponseModal, setResponseModal] = useState(false)
    const [responseModalConfig, setResponseModalConfig] = useState({
        isSuccess : null,
        message : "",
        subMessage : ""
    })
    function launchResponseModal({message, subMessage, isSuccess} : any) {
        setResponseModalConfig({
            message,
            subMessage,
            isSuccess
        })
        setResponseModal(true)
    }
    return (
        <>
        <View style={{ justifyContent: 'center',backgroundColor:'transparent',paddingHorizontal:0, width:'100%'}}>
        <ResponseModal show={showResponseModal} closeModal={()=>setResponseModal(false)} {...responseModalConfig} onClose={()=>{navigation.goBack()}}/>
        <StatusBar barStyle = 'dark-content'/>
        <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
            <View onStartShouldSetResponder={() => true}>
            <View style = {AuthScreenWrapperStyle.header}>
                { <TouchableOpacity style={{
                    // width:'100%',
                    paddingHorizontal:20
                }}>
                    <Ionicons 
                    name="arrow-back-outline" 
                    size={32} 
                    color="#9097AC" 
                    onPress={ ()=>  navigation.goBack() }
                    />
                </TouchableOpacity>}
            </View>

                <Text style={{fontFamily : "Overpass_600SemiBold", fontSize: 24, paddingHorizontal:30}}>
                    Contact us
                </Text>


                <Text style={{fontFamily : "Overpass_400Regular", fontSize: 16, color:"#888", paddingHorizontal:30, paddingVertical:10}}>
                    get in touch and we'll revert back soon
                </Text>
                <View style={{paddingHorizontal:30}}>
                <Formik
                        initialValues={{ email: route.params?.email, name: route.params?.name, phone: (route.params?.phone), message : "" }}
                        validationSchema={contactUsSchema}
                        onSubmit={values => {
                            axios.post('http://support.elphinstone.us/v1/contact-us',{
                                ...values,
                                phoneNumber: values.phone
                            }).then((cb) => launchResponseModal({
                                message:'Your message has been sent!',
                                subMessage:"We'll respond to you shortly.",
                                isSuccess:true
                            })).catch(err => launchResponseModal(AppConstants.GenericErrorResponse))
                        }}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <>
                            <Text
                                style={{
                                    fontFamily: 'ArialNova',
                                    fontSize: 18,
                                    lineHeight: 32,
                                    paddingTop: 20
                                }}
                            >
                                Your name
                            </Text>
                            <CustomTextInput
                                touched={touched.name}
                                errors={errors.name}
                                value={values.name}
                                onFocus={() => { }}
                                handleChange={handleChange('name')}
                                handleBlur={handleBlur('name')}
                                keyboardType="default"
                                placeholder={"name"}
                                editable={true}
                                // textContentType={"email"}
                            />

                            <Text
                                style={{
                                    fontFamily: 'ArialNova',
                                    fontSize: 18,
                                    lineHeight: 32,
                                    paddingTop: 20
                                }}
                            >
                                Email address
                            </Text>
                            <CustomTextInput
                                touched={touched.email}
                                errors={errors.email}
                                value={values.email}
                                onFocus={() => { }}
                                handleChange={handleChange('email')}
                                handleBlur={handleBlur('email')}
                                keyboardType="email-address"
                                placeholder={"email"}
                                editable={true}
                                textContentType={"email"}
                            />

                            <Text
                                    style={{
                                        fontFamily: 'ArialNova',
                                        fontSize: 18,
                                        lineHeight: 32,
                                        paddingTop: 20
                                    }}
                                >
                            Mobile number
                            </Text>

                            <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    marginTop: 20,
                                    borderWidth: 1,
                                    borderColor: touched.phone ? (errors.phone ? 'red' : '#19C18F') : '#DDDDDD',
                                    borderRadius: 6,
                                }}>
                                    
                                    <TextInput
                                        style={{ ...GlobalStyles.textInputStyle, width: '80%', borderWidth: 0}}
                                        placeholder=""
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                        value={values.phone}
                                        autoCapitalize="none"
                                        keyboardType='phone-pad'
                                    />
                                    <View style={{
                                        height: 64,
                                        width: '20%',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {(touched.phone) ?
                                            (errors.phone ?
                                                <AntDesign name='close' size={24} color={'red'} /> :
                                                <AntDesign name='check' size={24} color={'#19C18F'} />
                                            ) :
                                            <></>
                                        }
                                    </View>
                                </View>

                                <Text
                                style={{
                                    fontFamily: 'ArialNova',
                                    fontSize: 18,
                                    lineHeight: 32,
                                    paddingTop: 20
                                }}
                            >
                                Your message
                            </Text>
                            <TextInput
                                style={{ ...GlobalStyles.textInputStyle, width: '100%', borderWidth: 1, padding: 10, height:192 }}
                                placeholder=""
                                onChangeText={handleChange('message')}
                                onBlur={handleBlur('message')}
                                value={values.message}
                                autoCapitalize="none"
                                keyboardType='default'
                                multiline={true}
                                textAlignVertical="top"
                            />

                            <HorizontalNavigatior mainButtonText='Submit' nextFunction={handleSubmit}/>
                            
                                
                                </>
                            )}
                    
                </Formik>
                </View>
                </View>
        </ScrollView>
        

        </View>
        <View style={{ zIndex:-1, position:'absolute',width:'100%'}}>
          {/* <Image source={require('../../assets/nyse.png')} style={{}}/> */}
          {/* <View/> */}
          <View style = {{backgroundColor:'#F7F8FC', position:'absolute',height:Dimensions.get('window').height *0.5,width:'100%',borderBottomStartRadius:8, borderBottomEndRadius: 8}}/>
        </View>
        
        </>
      );
}
