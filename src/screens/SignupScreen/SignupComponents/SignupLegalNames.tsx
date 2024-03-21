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
import { AppConstants, humanReadableDate } from '../../../../assets/AppConstants';
import { Entypo, Feather } from '@expo/vector-icons'; 
import {useRef, useState} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import CustomTextInput from './SignupMiscComponents/CustomTextInput';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import UserService from '../../../../api/lib/UserService';
import { usePostHog } from 'posthog-react-native';
const SignupSchema = Yup.object().shape({
    legalFirstName: Yup.string().min(1).required('Required'),
    legalMiddleName: Yup.string(),
    legalLastName : Yup.string().min(1).required('Required')

  });


export default function SignupLegalNames({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser : any}){
    const firstInputRef = useRef<any>()
    const middleInputRef = useRef<any>()
    const lastInputRef = useRef<any>()
    const posthog = usePostHog()
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

                <Text style={{
                    width:'100%',
                    fontFamily:'PlayfairDisplay_700Bold',
                    fontSize:32,
                    color:AppConstants.loginHeaderBlue

                }}>
                    Elphinstone US{'\n'}Onboarding
                </Text>
                
                <Formik
                initialValues={{  legalFirstName : userData.legalFirstName, legalMiddleName : userData.legalMiddleName, legalLastName: userData.legalLastName}}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    Keyboard.dismiss()
                    setUserData({...userData, ...values})
                    posthog?.capture('Onboarding : Next button pressed on names screen', {
                        given_name: (values.legalFirstName.trim() + " " + values.legalMiddleName.trim()).trim(),
                        family_name: values.legalLastName,
                    })
                    updateUser({
                        given_name: (values.legalFirstName.trim() + " " + values.legalMiddleName.trim()).trim(),
                        family_name: values.legalLastName,
                        meta : {
                            profile_start_ts : humanReadableDate(userData.profile_start_ts),
                            profile_completeness : 0.1,
                            signup_page_location : -2
                        }
                    }, goToNext)
                   
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
                What is your first legal name?
                </Text>
                <CustomTextInput
                reference={firstInputRef}
                touched={touched.legalFirstName}
                errors={errors.legalFirstName}
                value = {values.legalFirstName}
                handleChange={handleChange('legalFirstName')}
                handleBlur={handleBlur('legalFirstName')}
                placeholder={"e.g., Ahmad"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
               What is your middle legal name? (optional)
                </Text>
                <CustomTextInput
                reference={middleInputRef}
                touched={touched.legalMiddleName}
                errors={errors.legalMiddleName}
                value = {values.legalMiddleName}
                handleChange={handleChange('legalMiddleName')}
                handleBlur={handleBlur('legalMiddleName')}
                placeholder={"e.g., Raza"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                What is your last legal name?
                </Text>
                <CustomTextInput
                reference={lastInputRef}
                touched={touched.legalLastName}
                errors={errors.legalLastName}
                value = {values.legalLastName}
                handleChange={handleChange('legalLastName')}
                handleBlur={handleBlur('legalLastName')}
                placeholder={"e.g., Khan"}
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