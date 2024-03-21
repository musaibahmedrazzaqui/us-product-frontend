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
import CountrySelector from './SignupMiscComponents/CountrySelector';
import { getISO3FromCountry } from '../../../../assets/countryListISO3';
import { usePostHog } from 'posthog-react-native';
const SignupSchema = Yup.object().shape({
    homeAddress1 : Yup.string().min(1).required('Required'),
    homeAddress2 : Yup.string(),
    city : Yup.string().min(1).required('Required'),
    zipCode : Yup.string(),
    state : Yup.string().min(1).required('Required'),

  });


export default function SignupAddress({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser : any}){
    const homeAddress1InputRef = useRef<any>()
    const homeAddress2InputRef = useRef<any>()
    const cityInputRef = useRef<any>()
    const zipInputRef = useRef<any>()
    const stateInputRef = useRef<any>()
    const [selectedCountry, setSelectedCountry] = useState(userData.taxResidence)
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
                initialValues={{  
                    homeAddress1 : userData.homeAddress1,
                    homeAddress2 : userData.homeAddress2,
                    city : userData.city,
                    zipCode : userData.zipCode,
                    state : userData.state,
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // if (selectedCountry === ''){
                    //     return
                    // }
                    Keyboard.dismiss()
                    setUserData({...userData, ...values, addressCountry : userData.taxResidence})
                    posthog?.capture('Onboarding : Next button pressed on address screen', {
                        street_address_1: values.homeAddress1,
                        street_address_2: values.homeAddress2,
                        city: values.city,
                        state: values.state,
                        postal_code: values.zipCode,
                        province: values.state,
                        country: getISO3FromCountry(userData.taxResidence),
                    })
                    updateUser({
                        street_address_1: values.homeAddress1,
                        street_address_2: values.homeAddress2,
                        city: values.city,
                        state: values.state,
                        postal_code: values.zipCode,
                        province: values.state,
                        country: getISO3FromCountry(userData.taxResidence),
                        meta : {
                            profile_start_ts : humanReadableDate(userData.profile_start_ts),
                            profile_completeness : 0.4,
                            signup_page_location : -7
                        }
                    }, goToNext)
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:12,
                    // lineHeight:32,
                    paddingTop:20,
                    color:'red'
                }}
                >
                Note: Depending on your details you may be asked later on to upload a copy of your bank statement. Make sure the address you enter matches the address on the statement.
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Home address line 1
                </Text>
                <CustomTextInput
                reference={homeAddress1InputRef}
                touched={touched.homeAddress1}
                errors={errors.homeAddress1}
                value = {values.homeAddress1}
                handleChange={handleChange('homeAddress1')}
                handleBlur={handleBlur('homeAddress1')}
                placeholder={"e.g., House No. 365, Street 16,"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
               Home address line 2
                </Text>
                <CustomTextInput
                reference={homeAddress2InputRef}
                touched={touched.homeAddress2}
                errors={errors.homeAddress2}
                value = {values.homeAddress2}
                handleChange={handleChange('homeAddress2')}
                handleBlur={handleBlur('homeAddress2')}
                placeholder={"e.g., F-8/3"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                City
                </Text>
                <CustomTextInput
                reference={cityInputRef}
                touched={touched.city}
                errors={errors.city}
                value = {values.city}
                handleChange={handleChange('city')}
                handleBlur={handleBlur('city')}
                placeholder={"e.g., Islamabad"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Zip/postal code (optional)
                </Text>
                <CustomTextInput
                reference={zipInputRef}
                touched={touched.zipCode}
                errors={errors.zipCode}
                value = {values.zipCode}
                handleChange={handleChange('zipCode')}
                handleBlur={handleBlur('zipCode')}
                placeholder={"e.g., 41120"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Province / State
                </Text>
                <CustomTextInput
                reference={stateInputRef}
                touched={touched.state}
                errors={errors.state}
                value = {values.state}
                handleChange={handleChange('state')}
                handleBlur={handleBlur('state')}
                placeholder={"e.g., Federal Capital"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Country
                </Text>
                <CountrySelector selectedValue={userData.taxResidence} setValue={setSelectedCountry} disableChange={true}/>
                
                
                <HorizontalNavigatior showBackButton nextFunction={handleSubmit} backFunction={goToPrev}/>
            </>)}
            </Formik>
            
            </View>
            {/* <View style={{height:100}}/> */}
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}