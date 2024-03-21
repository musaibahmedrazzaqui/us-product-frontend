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
import { ISO3, getCountryFromISO3 } from '../../../assets/countryListISO3';
import UserService from '../../../api/lib/UserService';
import { AppConstants } from '../../../assets/AppConstants';
const FormSchema = Yup.object().shape({
    // email : Yup.string().email().required(),
    // phone: Yup.string().min(10).max(10).matches(/^[0-9]+$/),
    homeAddress1 : Yup.string().min(1).required('Required'),
    homeAddress2 : Yup.string(),
    city : Yup.string().min(1).required('Required'),
    zipCode : Yup.string(),
    state : Yup.string().min(1).required('Required'),
  });



export default function PersonalDetailForm({userData, session, launchResponseModal} : any){
    const emailInputRef = useRef<any>()
    const phoneInputRef = useRef<any>()
    const homeAddress1InputRef = useRef<any>()
    const homeAddress2InputRef = useRef<any>()
    const cityInputRef = useRef<any>()
    const zipInputRef = useRef<any>()
    const stateInputRef = useRef<any>()

    const [selectedTaxResidence, setSelectedTaxResidence] = useState(getCountryFromISO3(userData.country_of_tax_residence))
    const [selectedCitizenship, setSelectedCitizenship] = useState(getCountryFromISO3(userData.country_of_citizenship))
    return(
    <View style={{paddingHorizontal:20, width:'100%'}}>
        <Formik
                initialValues={{  
                    email: session?.identity?.traits?.email,
                    phone : session?.identity?.traits?.phone,
                    homeAddress1 : userData.street_address_1,
                    homeAddress2 : userData.street_address_2,
                    city : userData.city,
                    zipCode: userData.postal_code,
                    state : userData.state
                }}
                validationSchema={FormSchema}
                onSubmit={values => {
                    Keyboard.dismiss()
                    // setUserData({...userData, ...values})
                    UserService.updateUser(session.identity.id, {
                        street_address_1 : values.homeAddress1,
                        street_address_2 : values.homeAddress2,
                        city : values.city,
                        postal_code : values.zipCode,
                        state: values.state,
                        province : values.state
                    }).then( cb => {
                        launchResponseModal({message: 'Your profile has been updated.', subMessage:'', isSuccess: true})
                    }).catch( cb => {
                        console.log(cb.message)
                        launchResponseModal(AppConstants.GenericErrorResponse)
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
                Email address
                </Text>
                    <CustomTextInput
                    reference={emailInputRef}
                    touched={touched.email}
                    errors = {errors.email}
                    value={values.email}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('email')}
                    handleBlur = {handleBlur('email')}
                    keyboardType="email-address"
                    placeholder={"email address"}
                    editable={false}
                    textContentType={"email"}
                    />
                    <>
                    
<Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Mobile number
                </Text>
                    

                <View style={{
                    width: '100%', 
                    flexDirection:'row',
                    marginTop:20, 
                    borderWidth:1,
                    borderColor: touched.phone ? (errors.phone ? 'red' : '#19C18F' ) : '#DDDDDD',
                    borderRadius: 6,
                }}>
                <View style={{
                    height: 64,
                    // width:'25%',
                    alignItems:'center',
                    justifyContent : 'space-around',
                    flexDirection:'row',
                    paddingHorizontal:20,
                    // backgroundColor:'#888'
                }}>
                    <CountryFlag isoCode={'PK'} size={18} />
                    
                </View>
                <TextInput 
                ref={phoneInputRef}
                style={{...GlobalStyles.textInputStyle, width:'55%', borderWidth:0, paddingHorizontal:0}}
                placeholder=""
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                autoCapitalize="none"
                keyboardType='phone-pad'
                editable={false}
                />
                <View style={{
                    height: 64,
                    width:'20%',
                    alignItems:'center',
                    justifyContent : 'center'
                }}>
                    {(touched.phone) ? 
                    (errors.phone ? 
                        <AntDesign name='close' size={24} color={'red'}/> :
                        <AntDesign name='check' size={24} color={'#19C18F'}/> 
                    ) :
                   <></>
                }
                </View>
                </View></>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Country of Tax Residence
                </Text>
               <CountrySelector selectedValue={selectedTaxResidence} setValue={setSelectedTaxResidence} disableChange={true}/>

               <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Country of citizenship
                </Text>
               <CountrySelector selectedValue={selectedCitizenship} setValue={setSelectedCitizenship} disableChange={true}/>
               <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Home address line 1
                </Text>
                    <CustomTextInput
                    reference={homeAddress1InputRef}
                    touched={touched.homeAddress1}
                    errors = {errors.homeAddress1}
                    value={values.homeAddress1}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('homeAddress1')}
                    handleBlur = {handleBlur('homeAddress1')}
                    keyboardType="email-address"
                    placeholder={"e.g., House No. 365, Street 16,"}
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
                Home address line 2
                </Text>
                    <CustomTextInput
                    reference={homeAddress2InputRef}
                    touched={touched.homeAddress2}
                    errors = {errors.homeAddress2}
                    value={values.homeAddress2}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('homeAddress2')}
                    handleBlur = {handleBlur('homeAddress2')}
                    keyboardType="email-address"
                    placeholder={"e.g., F-8/3"}
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
                City
                </Text>
                    <CustomTextInput
                    reference={cityInputRef}
                    touched={touched.city}
                    errors = {errors.city}
                    value={values.city}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('city')}
                    handleBlur = {handleBlur('city')}
                    keyboardType="email-address"
                    placeholder={"e.g., Islamabad"}
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
                Zip/postal code (optional)
                </Text>
                    <CustomTextInput
                    reference={zipInputRef}
                    touched={touched.zipCode}
                    errors = {errors.zipCode}
                    value={values.zipCode}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('zipCode')}
                    handleBlur = {handleBlur('zipCode')}
                    keyboardType="email-address"
                    placeholder={"e.g., 41120"}
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
                Province / State
                </Text>
                    <CustomTextInput
                    reference={stateInputRef}
                    touched={touched.state}
                    errors = {errors.state}
                    value={values.state}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('state')}
                    handleBlur = {handleBlur('state')}
                    keyboardType="email-address"
                    placeholder={"e.g., Federal Capital"}
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