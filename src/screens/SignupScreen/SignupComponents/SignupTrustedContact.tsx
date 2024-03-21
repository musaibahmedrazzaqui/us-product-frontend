import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    Image,
    ScrollView
} from 'react-native'
import { AppConstants } from '../../../../assets/AppConstants';
import { Entypo, Feather } from '@expo/vector-icons'; 
import {useRef, useState} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import CustomTextInput from './SignupMiscComponents/CustomTextInput';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import CountrySelector from './SignupMiscComponents/CountrySelector';
const SignupSchema = Yup.object().shape({
    trustedContactName: Yup.string().required(),
    trustedContactLastName: Yup.string().required(),
    trustedContactEmail : Yup.string().required(),
    trustedContactNumber : Yup.string().required(),

  });

import { useEffect } from 'react';
export default function SignupTrustedContact({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser : any}){
    const trustedContactNameInputRef = useRef<any>()
    const trustedContactLastNameInputRef = useRef<any>()
    const trustedContactEmailInputRef = useRef<any>()
    const trustedContactNumberInputRef = useRef<any>()

    return(
        <KeyboardAvoidingView behavior='height' style={{
            width:Dimensions.get('window').width,
            height:'100%',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            paddingHorizontal:20
            }}>
                <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
                    <View onStartShouldSetResponder={()=>true} style={{width:'100%'}}>
                <View style={{
                    marginBottom:20
                }}>
                    <Image source={require('../../../../assets/images/tree.png')} style={{height:36,width:36}}/>
                </View>

                <Text style={{
                    width:'100%',
                    fontFamily:'PlayfairDisplay_700Bold',
                    fontSize:32,
                    color:AppConstants.loginHeaderBlue

                }}>
                    Elphinstone US{'\n'}Onboarding
                </Text>

                <Text
                style={{
                    fontFamily:'ArialNova-Bold',
                    fontSize:24,
                    lineHeight:32,
                    paddingTop:40
                }}
                >
                Trusted contact information
                </Text>
                

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                A trusted contact is a person you authorize your financial firm to contact in limited circumstances, such as if there is a concern about activity in your account and they have been unable to get in touch with you. {'\n\n'}
                A trusted contact may be a family member, attorney, accountant or another third-party who you believe would respect your privacy and know how to handle the responsibility. The trusted person should be 18 years old or older.
                </Text>


                <Formik
                initialValues={{  
                    trustedContactName: userData.trustedContactName,
                    trustedContactLastName: userData.trustedContactLastName,
                    trustedContactEmail : userData.trustedContactEmail,
                    trustedContactNumber : userData.trustedContactNumber,
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    Keyboard.dismiss()
                    setUserData({...userData, ...values, idType : (userData.isUSCitizen || userData.isUSPR || (userData.taxResidence === 'United Status'))  ? 'USA_SSN' : 'PAK_NIC', citizenship : userData.isUSCitizen ? "United States" : userData.citizenship})
                    updateUser({
                        trusted_contact: {
                            given_name: values.trustedContactName,
                            family_name: values.trustedContactLastName,
                            email_address: values.trustedContactEmail,
                            phone_number: values.trustedContactNumber
                        },
                    },goToNext)
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                First Name
                </Text>
                <CustomTextInput
                reference={trustedContactNameInputRef}
                touched={touched.trustedContactName}
                errors={errors.trustedContactName}
                value = {values.trustedContactName}
                handleChange={handleChange('trustedContactName')}
                handleBlur={handleBlur('trustedContactName')}
                placeholder={"e.g., Arsalan"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
              Last name
                </Text>
                <CustomTextInput
                reference={trustedContactLastNameInputRef}
                touched={touched.trustedContactLastName}
                errors={errors.trustedContactLastName}
                value = {values.trustedContactLastName}
                handleChange={handleChange('trustedContactLastName')}
                handleBlur={handleBlur('trustedContactLastName')}
                placeholder={"e.g., Mirza"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Email address
                </Text>
                <CustomTextInput
                reference={trustedContactEmailInputRef}
                touched={touched.trustedContactEmail}
                errors={errors.trustedContactEmail}
                value = {values.trustedContactEmail}
                handleChange={handleChange('trustedContactEmail')}
                handleBlur={handleBlur('trustedContactEmail')}
                placeholder={"email address"}
                
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                What is their mobile number?
                </Text>
                <CustomTextInput
                reference={trustedContactNumberInputRef}
                touched={touched.trustedContactNumber}
                errors={errors.trustedContactNumber}
                value = {values.trustedContactNumber}
                handleChange={handleChange('trustedContactNumber')}
                handleBlur={handleBlur('trustedContactNumber')}
                placeholder={"phone number"}
                keyboardType="phone-pad"
                />
                
                
                <HorizontalNavigatior showBackButton nextFunction={handleSubmit} backFunction={goToPrev}/>
            </>)}
            </Formik>
            
            </View>
            <View style={{height:100}}/>
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}