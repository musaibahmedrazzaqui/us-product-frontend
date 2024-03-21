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
    bankName : Yup.string().required().min(1),
    bankAccountNumber : Yup.string().required().min(1),
    routingNumber : Yup.string().required().min(1)

  });

export default function BankDetailForm({userData, session, launchResponseModal} : any){
    const bankNameInputRef = useRef<any>()
    const bankAccountNumberInputRef = useRef<any>()
    const routingNumberInputRef = useRef<any>()
    return(
    <View style={{paddingHorizontal:20, width:'100%'}}>
        <Formik
                initialValues={{  
                    bankName : userData?.bank_details?.bank_name,
                    bankAccountNumber : userData?.bank_details?.bank_account_number,
                    routingNumber : userData?.bank_details?.routing_number
                }}
                validationSchema={FormSchema}
                onSubmit={values => {
                    console.log(values)
                    Keyboard.dismiss()
                    UserService.updateUser(session.identity.id, {
                        bank_detail : {
                            bank_name : values.bankName,
                            bank_account_number: values.bankAccountNumber,
                            routing_number : values.routingNumber
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

                    
               <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Bank name
                </Text>
                    <CustomTextInput
                    reference={bankNameInputRef}
                    touched={touched.bankName}
                    errors = {errors.bankName}
                    value={values.bankName}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('bankName')}
                    handleBlur = {handleBlur('bankName')}
                    keyboardType="default"
                    placeholder={"e.g., Bank Al Falah"}
                    editable={false}
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
                Bank account number
                </Text>
                    <CustomTextInput
                    reference={bankAccountNumberInputRef}
                    touched={touched.bankAccountNumber}
                    errors = {errors.bankAccountNumber}
                    value={values.bankAccountNumber}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('bankAccountNumber')}
                    handleBlur = {handleBlur('bankAccountNumber')}
                    keyboardType="default"
                    placeholder={"e.g., 100457845621458"}
                    editable={false}
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
                Routing number
                </Text>
                    <CustomTextInput
                    reference={routingNumberInputRef}
                    touched={touched.routingNumber}
                    errors = {errors.routingNumber}
                    value={values.routingNumber}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('routingNumber')}
                    handleBlur = {handleBlur('routingNumber')}
                    keyboardType="default"
                    placeholder={"e.g., 5344"}
                    editable={false}
                    // textContentType={"email"}
                    />               

  

                    <HorizontalNavigatior nextFunction={handleSubmit} backFunction={()=>{}} showBackButton={false}/>
                    </>
                )}
                
        </Formik>
    </View>
    )
}