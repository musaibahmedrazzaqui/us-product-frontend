import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    Image
} from 'react-native'
import { AppConstants, humanReadableDate } from '../../../../assets/AppConstants';
import { Entypo, Feather } from '@expo/vector-icons'; 
import {useRef, useState} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import CustomSelector from './SignupMiscComponents/CustomSelector';
import CountrySelector from './SignupMiscComponents/CountrySelector';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import { getISO3FromCountry } from '../../../../assets/countryListISO3';
import { usePostHog } from 'posthog-react-native';
const SignupSchema = Yup.object().shape({
    birthPlace: Yup.string().min(1).required('Required'),
  });


export default function SignupTaxResidence({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser : any}){
    const emailInputRef = useRef<any>()
    const [selectedCountry, setSelectedCountry] = useState(userData.taxResidence)
    const posthog = usePostHog()
    const onSubmit = () =>{
        if (selectedCountry != ""){
            setUserData({...userData, taxResidence : selectedCountry})
            posthog?.capture('Onboarding : Next button pressed on tax residence screen', {
                country_of_tax_residence: getISO3FromCountry(selectedCountry),
            })
            updateUser({
                country_of_tax_residence: getISO3FromCountry(selectedCountry),
                meta : {
                    profile_start_ts : humanReadableDate(userData.profile_start_ts),
                    profile_completeness : 0.15,
                    signup_page_location : -3
                }
            },goToNext)
            
        }
    }
    return(
        <KeyboardAvoidingView behavior='height' style={{
            width:Dimensions.get('window').width,
            height:'100%',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            paddingHorizontal:20
            }}>
                

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
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Country of Tax Residence
                </Text>
               <CountrySelector selectedValue={selectedCountry} setValue={setSelectedCountry}/>
               <HorizontalNavigatior showBackButton nextFunction={onSubmit} backFunction={goToPrev}/>
        </KeyboardAvoidingView>
    )
}