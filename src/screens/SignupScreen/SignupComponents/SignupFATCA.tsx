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
import CustomSelector from './SignupMiscComponents/CustomSelector';
import { BooleanSelector } from '../../../miscComponents/BooleanSelector';
import CustomDatePicker from './SignupMiscComponents/CustomDatePicker';
import { getISO3FromCountry } from '../../../../assets/countryListISO3';
import { usePostHog } from 'posthog-react-native';



export default function SignupFATCA({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser : any}){

    


    const [PEP,setPEP] = useState<string>(userData.isUserPEP)
    const [isPEPDomesticOrForeign,setPEPDomesticOrForeign] = useState<string>(userData.isPEPDomesticOrForeign)
    const [pepCategory, setPEPCategory] = useState<string>(userData.pepCategory)
    const [relatedPEPRelation, setRelatedPEPRelation] = useState(userData.relatedPEPRelation)


    const greenCardNumberInputRef = useRef<any>()
    const [isUSCitizen, setUSCitizen] = useState(userData.isUSCitizen)
    const [isUSPR, setUSPR] = useState(userData.isUSPR)
    const [isUSResident, setUSResident] = useState(userData.isUSResident)
    const [visaType, setVisaType] = useState(userData.visaType)
    const [visaExpirationDate, setVisaExpirationDate] = useState(userData.visaExpirationDate)

    const SignupSchema = Yup.object().shape({
        greenCardNumber : isUSPR === true ? Yup.string().required() : Yup.string()
    
      });
    
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
                    greenCardNumber : userData.greenCardNumber
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    if (isUSCitizen === null){
                        return
                    }
                    if ((isUSCitizen === false) && (isUSPR === null)){
                        return
                    }
                    if ((isUSCitizen === false) && (isUSPR === false) &&  (isUSResident === null)){
                        return
                    }

                    if ((isUSCitizen === false) && (isUSPR === false) &&  (isUSResident === true) && (visaType === '') ){
                        return
                    }
                    if ((isUSCitizen === false) && (isUSPR === false) &&  (isUSResident === true) && (visaExpirationDate === '') ){
                        return
                    }
                    Keyboard.dismiss()
                    setUserData({...userData, ...values, isUSCitizen:isUSCitizen, isUSPR : isUSPR, isUSResident : isUSResident, visaType : visaType, visaExpirationDate : visaExpirationDate,
                    idType : (isUSCitizen || isUSPR || (userData.taxResidence === 'United Status'))  ? 'USA_SSN' : 'PAK_NIC', citizenship : userData.isUSCitizen ? "United States" : userData.citizenship
                    })
                    posthog?.capture('Onboarding : Next button pressed on FATCA screen', {
                        country_of_citizenship : getISO3FromCountry(userData.isUSCitizen ? "United States" : userData.citizenship),
                        tax_id_type : (isUSCitizen || isUSPR || (userData.taxResidence === 'United Status'))  ? 'USA_SSN' : 'PAK_NIC'
                    })
                    updateUser({
                        country_of_citizenship : getISO3FromCountry(userData.isUSCitizen ? "United States" : userData.citizenship),
                        tax_id_type : (isUSCitizen || isUSPR || (userData.taxResidence === 'United Status'))  ? 'USA_SSN' : 'PAK_NIC'
                    },goToNext)
    
                    goToNext()
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
                Are you a US citizen? {'\n'}
                </Text>
                <BooleanSelector value={isUSCitizen} setValue={setUSCitizen}/>

                {(isUSCitizen === false) && <>

                
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Are you a permanent US resident? {'\n'}
                </Text>
                <BooleanSelector
                value={isUSPR}
                setValue={setUSPR}
                />
                {
                isUSPR &&
                <>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Green card number
                </Text>
                <CustomTextInput
                reference={greenCardNumberInputRef}
                touched={touched.greenCardNumber}
                errors={errors.greenCardNumber}
                value = {values.greenCardNumber}
                handleChange={handleChange('greenCardNumber')}
                handleBlur={handleBlur('greenCardNumber')}
                placeholder={"e.g., 124578845"}
                />
                </>
                }


                {
                isUSPR === false &&
                <>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Do you currently reside in the US on a visa? {'\n'}
                </Text>
                <BooleanSelector
                value={isUSResident}
                setValue = {setUSResident}
                />
                {
                    isUSResident && 
                    <>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                What is the type of your visa? {'\n'}
                </Text>
                <CustomSelector
                selectedValue={visaType}
                setValue = {setVisaType}
                itemList={
                    ['H1B', 'F1', 'J1', 'L1', 'G4', 'O1', 'TN1', 'E1', 'E2', 'E3']
                }
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Visa expiration date {'\n'}
                </Text>

                <CustomDatePicker
                selectedValue={visaExpirationDate}
                setValue={setVisaExpirationDate}
                />
                    
                    </>
                }
                </>
                }
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