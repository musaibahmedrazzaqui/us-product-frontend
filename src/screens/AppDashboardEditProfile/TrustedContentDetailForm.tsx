import React,{useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    Image,
    TextInput
} from 'react-native';
import CustomTextInput from '../SignupScreen/SignupComponents/SignupMiscComponents/CustomTextInput';
import {AntDesign} from '@expo/vector-icons'
import { GlobalStyles } from '../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CountrySelector from '../SignupScreen/SignupComponents/SignupMiscComponents/CountrySelector';
import CountryFlag from 'react-native-country-flag';
import HorizontalNavigatior from './HorizontalNavigator';
import CustomSelector from '../SignupScreen/SignupComponents/SignupMiscComponents/CustomSelector';
import UserService from '../../../api/lib/UserService';
const FormSchema = Yup.object().shape({
    trustedContactName: Yup.string().required(),
    trustedContactLastName: Yup.string().required(),
    trustedContactEmail : Yup.string().required(),
    trustedContactNumber : Yup.string().required(),

  });

export default function TrustedContactDetailForm({userData, session, launchResponseModal} : any){
    const trustedContactNameInputRef = useRef<any>()
    const trustedContactLastNameInputRef = useRef<any>()
    const trustedContactEmailInputRef = useRef<any>()
    const trustedContactNumberInputRef = useRef<any>()
    return(
    <View style={{paddingHorizontal:20, width:'100%'}}>
        <Formik
                initialValues={{  
                    trustedContactName: userData?.trusted_contact?.given_name,
                    trustedContactLastName: userData?.trusted_contact?.family_name,
                    trustedContactEmail : userData?.trusted_contact?.email_address,
                    trustedContactNumber : userData?.trusted_contact?.phone_number,
                }}
                validationSchema={FormSchema}
                onSubmit={values => {
                    console.log(values)
                    Keyboard.dismiss()
                    // setUserData({...userData, ...values})
                    UserService.updateUser(session.identity.id, {
                            trusted_contact : {
                                given_name : values.trustedContactName,
                                family_name : values.trustedContactLastName,
                                email_address : values.trustedContactEmail,
                                phone_number : values.trustedContactNumber

                            
                        }
                    }).then( cb => {
                        launchResponseModal({message: 'Your profile has been updated.', subMessage:'', isSuccess: true})
                    }).catch( cb => {
                        console.log(cb.response)
                        launchResponseModal({message: "Some error occurred", subMessage:'Email us if this error persists', isSuccess: false})
                    }
                    )
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                    <Text style={{fontFamily:'ArialNova', fontSize:11, lineHeight:18, color:'#8C949D'}}>
                    <Text style={{fontFamily:'ArialNova-Bold'}}>Note:{'\n'}</Text> 

                    A trusted contact is a person you authorize your financial firm to contact in limited circumstances, such as if there is a concern about activity in your account and they have been unable to get in touch with you. 

 {'\n\n'}A trusted contact may be a family member, attorney, accountant or another third-party who you believe would respect your privacy and know how to handle the responsibility. The trusted person should be 18 years old or older.
                    </Text>
                    
               <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                First name
                </Text>
                    <CustomTextInput
                    reference={trustedContactNameInputRef}
                    touched={touched.trustedContactName}
                    errors = {errors.trustedContactName}
                    value={values.trustedContactName}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('trustedContactName')}
                    handleBlur = {handleBlur('trustedContactName')}
                    keyboardType="default"
                    placeholder={"e.g., Arsalan"}
                    editable={true}
                    // textContentType={"email"}
                    />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Last name
                </Text>
                    <CustomTextInput
                    reference={trustedContactLastNameInputRef}
                    touched={touched.trustedContactLastName}
                    errors = {errors.trustedContactLastName}
                    value={values.trustedContactLastName}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('trustedContactLastName')}
                    handleBlur = {handleBlur('trustedContactLastName')}
                    keyboardType="default"
                    placeholder={"e.g., Mirza"}
                    editable={true}
                    // textContentType={"email"}
                    />               

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Email address
                </Text>
                    <CustomTextInput
                    reference={trustedContactEmailInputRef}
                    touched={touched.trustedContactEmail}
                    errors = {errors.trustedContactEmail}
                    value={values.trustedContactEmail}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('trustedContactEmail')}
                    handleBlur = {handleBlur('trustedContactEmail')}
                    keyboardType="default"
                    placeholder={"e.g., arsalan.mirza@gmail.com"}
                    editable={true}
                    // textContentType={"email"}
                    />               

<Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Phone number
                </Text>
                    <CustomTextInput
                    reference={trustedContactNumberInputRef}
                    touched={touched.trustedContactNumber}
                    errors = {errors.trustedContactNumber}
                    value={values.trustedContactNumber}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('trustedContactNumber')}
                    handleBlur = {handleBlur('trustedContactNumber')}
                    keyboardType="default"
                    placeholder={"e.g., +12122122112"}
                    editable={true}
                    // textContentType={"email"}
                    />               

                    <HorizontalNavigatior nextFunction={handleSubmit} backFunction={()=>{}} showBackButton={false}/>
                    </>
                )}
                
        </Formik>
    </View>
    )
}