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
import { usePostHog } from 'posthog-react-native';



export default function SignupAffiliationDetails({goToNext, goToPrev, userData, setUserData} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any}){

    const SignupSchema = Yup.object().shape({
        brokerRegulatorName : userData.isUSBrokerAffiliated ? Yup.string().required() : Yup.string(),
        brokerRegulatorAddress : userData.isUSBrokerAffiliated ? Yup.string().required() : Yup.string(),
        brokerRegulatorEmail : userData.isUSBrokerAffiliated ? Yup.string().required() : Yup.string(),
        publicCompanyName : userData.isExecutiveOrShareholderPC ? Yup.string().required() : Yup.string(),
        publicCompanyAddress : userData.isExecutiveOrShareholderPC ? Yup.string().required() : Yup.string(),
        publicCompanyCity : userData.isExecutiveOrShareholderPC ? Yup.string().required() : Yup.string(),
        publicCompanyState : userData.isExecutiveOrShareholderPC ? Yup.string().required() : Yup.string(),
        publicCompanyEmail :userData.isExecutiveOrShareholderPC ? Yup.string().required() : Yup.string(),
        publicCompanyExchange: userData.isExecutiveOrShareholderPC ? Yup.string().required() : Yup.string(),
        publicCompanyTicker: userData.isExecutiveOrShareholderPC ? Yup.string().required() : Yup.string(),
    
      });

    const brokerRegulatorNameInputRef = useRef<any>()
    const brokerRegulatorAddressInputRef = useRef<any>()
    const brokerRegulatorEmailInputRef = useRef<any>()
    const publicCompanyNameInputRef = useRef<any>()
    const publicCompanyAddressInputRef = useRef<any>()
    const publicCompanyCityInputRef = useRef<any>()
    const publicCompanyStateInputRef = useRef<any>()
    const publicCompanyEmailInputRef = useRef<any>()
    const publicCompanyExchangeInputRef = useRef<any>()
    const publicCompanyTickerInputRef = useRef<any>()
    const posthog = usePostHog()
    const [publicCompanyCountry, setPublicCompanyCountry] = useState<any>("")

    return(
        <KeyboardAvoidingView behavior='height' style={{
            width:Dimensions.get('window').width,
            height:'100%',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            paddingHorizontal:20,
            }}>
                <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
                    <View onStartShouldSetResponder={()=>true} style={{width:'100%',}}>
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
                
                <Formik
                initialValues={{  
                    brokerRegulatorName : userData.brokerRegulatorName,
                    brokerRegulatorAddress : userData.brokerRegulatorAddress,
                    brokerRegulatorEmail : userData.brokerRegulatorEmail,
                    publicCompanyName : userData.publicCompanyName,
                    publicCompanyAddress : userData.publicCompanyAddress,
                    publicCompanyCity : userData.publicCompanyCity,
                    publicCompanyState : userData.publicCompanyState,
                    publicCompanyCountry : userData.publicCompanyCountry,
                    publicCompanyEmail : userData.publicCompanyEmail,
                    publicCompanyExchange: userData.publicCompanyExchange,
                    publicCompanyTicker: userData.publicCompanyTicker
                }}
                validationSchema={SignupSchema}
                
                onSubmit={values => {
                    posthog?.capture('Onboarding : Next button pressed on Affiliation Details screen',{
                        ...values, publicCompanyCountry : publicCompanyCountry
                    })
                    Keyboard.dismiss()
                    setUserData({...userData, ...values, publicCompanyCountry : publicCompanyCountry})
                    goToNext()
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                
                {userData.isUSBrokerAffiliated && <>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Name of US registered broker-dealer/regulatory body
                </Text>
                <CustomTextInput
                reference={brokerRegulatorNameInputRef}
                touched={touched.brokerRegulatorName}
                errors={errors.brokerRegulatorName}
                value = {values.brokerRegulatorName}
                handleChange={handleChange('brokerRegulatorName')}
                handleBlur={handleBlur('brokerRegulatorName')}
                placeholder={"e.g., Prisma Investment Brokers LLC"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
              Address of company
                </Text>
                <CustomTextInput
                reference={brokerRegulatorAddressInputRef}
                touched={touched.brokerRegulatorAddress}
                errors={errors.brokerRegulatorAddress}
                value = {values.brokerRegulatorAddress}
                handleChange={handleChange('brokerRegulatorAddress')}
                handleBlur={handleBlur('brokerRegulatorAddress')}
                placeholder={"e.g., 403, Suite 558, Chrysler Building, Bronx, NY"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
               E-mail address of compliance person
                </Text>
                <CustomTextInput
                reference={brokerRegulatorEmailInputRef}
                touched={touched.brokerRegulatorEmail}
                errors={errors.brokerRegulatorEmail}
                value = {values.brokerRegulatorEmail}
                handleChange={handleChange('brokerRegulatorEmail')}
                handleBlur={handleBlur('brokerRegulatorEmail')}
                placeholder={"email"}
                />
                </>
                }
                { (userData.isExecutiveOrShareholderPC && userData.isUSBrokerAffiliated) && <View style={{width:'80%', justifyContent:'space-around', alignItems:'center',alignSelf:'center', flexDirection:'row', marginVertical:30}}>
                    <View style={{height:1, width : '25%', backgroundColor:'#D1D5DB'}}/>
                    <Image source={require('../../../../assets/images/tree.png')} style={{height:36,width:36}}/>
                    <View style={{height:1, width : '25%', backgroundColor:'#D1D5DB'}}/>
                </View>}


                {userData.isExecutiveOrShareholderPC && <>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Name of public company
                </Text>
                <CustomTextInput
                reference={publicCompanyNameInputRef}
                touched={touched.publicCompanyName}
                errors={errors.publicCompanyName}
                value = {values.publicCompanyName}
                handleChange={handleChange('publicCompanyName')}
                handleBlur={handleBlur('publicCompanyName')}
                placeholder={"e.g., lorem ipsum"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
              Address of company
                </Text>
                <CustomTextInput
                reference={publicCompanyAddressInputRef}
                touched={touched.publicCompanyAddress}
                errors={errors.publicCompanyAddress}
                value = {values.publicCompanyAddress}
                handleChange={handleChange('publicCompanyAddress')}
                handleBlur={handleBlur('publicCompanyAddress')}
                placeholder={"e.g., 403, Suite 558, Chrysler Building, Bronx, NY"}
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
                reference={publicCompanyCityInputRef}
                touched={touched.publicCompanyCity}
                errors={errors.publicCompanyCity}
                value = {values.publicCompanyCity}
                handleChange={handleChange('publicCompanyCity')}
                handleBlur={handleBlur('publicCompanyCity')}
                placeholder={"New York"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
              State
                </Text>
                <CustomTextInput
                reference={publicCompanyStateInputRef}
                touched={touched.publicCompanyState}
                errors={errors.publicCompanyState}
                value = {values.publicCompanyState}
                handleChange={handleChange('publicCompanyState')}
                handleBlur={handleBlur('publicCompanyState')}
                placeholder={"New York"}
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
                <CountrySelector selectedValue={publicCompanyCountry} setValue={setPublicCompanyCountry}/>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
               E-mail address of compliance person
                </Text>
                <CustomTextInput
                reference={publicCompanyEmailInputRef}
                touched={touched.publicCompanyEmail}
                errors={errors.publicCompanyEmail}
                value = {values.publicCompanyEmail}
                handleChange={handleChange('publicCompanyEmail')}
                handleBlur={handleBlur('publicCompanyEmail')}
                placeholder={"email"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
               Exchange on which company is listed
                </Text>

                <CustomTextInput
                reference={publicCompanyExchangeInputRef}
                touched={touched.publicCompanyExchange}
                errors={errors.publicCompanyExchange}
                value = {values.publicCompanyExchange}
                handleChange={handleChange('publicCompanyExchange')}
                handleBlur={handleBlur('publicCompanyExchange')}
                placeholder={"e.g., New York Stock Exchange"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
               Ticker symbol
                </Text>

                <CustomTextInput
                reference={publicCompanyTickerInputRef}
                touched={touched.publicCompanyTicker}
                errors={errors.publicCompanyTicker}
                value = {values.publicCompanyTicker}
                handleChange={handleChange('publicCompanyTicker')}
                handleBlur={handleBlur('publicCompanyTicker')}
                placeholder={"e.g., ELPH"}
                />
                </>
                }




                <HorizontalNavigatior showBackButton nextFunction={handleSubmit} backFunction={goToPrev}/>
            </>)}
            </Formik>
            
            </View>
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}