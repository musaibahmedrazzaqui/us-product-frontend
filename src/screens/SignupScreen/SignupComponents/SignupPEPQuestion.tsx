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
import { AppConstants } from '../../../../assets/AppConstants';
import { Entypo, Feather } from '@expo/vector-icons'; 
import {useRef, useState} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import CustomSelector from './SignupMiscComponents/CustomSelector';
import CountrySelector from './SignupMiscComponents/CountrySelector';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import RiskToleranceSelector from './SignupMiscComponents/RiskToleranceSelector';
import { BooleanSelector } from '../../../miscComponents/BooleanSelector';
import { usePostHog } from 'posthog-react-native';
const SignupSchema = Yup.object().shape({
    birthPlace: Yup.string().min(1).required('Required'),
  });



export default function SignupPEPQuestion({goToNext, goToPrev, userData, setUserData} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any}){
    const [selectedRiskTolerance, setSelectedRiskTolerance] = useState(userData.riskTolerance)
    const [isPEP, setPEP] = useState(userData.isPEP)
    const posthog = usePostHog()
    const onSubmit = () =>{
        if (isPEP === null){
            return
        }
        posthog?.capture('Onboarding : Next button pressed on isPEP screen',{
            isPEP : isPEP
        })
        setUserData({...userData, isPEP : isPEP})
        goToNext()    
    }
    return(
        <KeyboardAvoidingView behavior='height' style={{
            width:Dimensions.get('window').width,
            height:'100%',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            paddingHorizontal:20
            }}>
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
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Are you, or any direct relatives (parents, children, spouse), a political exposed person?
                </Text>
               <BooleanSelector value={isPEP} setValue={setPEP}/>
               <Text style={{fontFamily:'ArialNova', color:'#8C949D', fontSize:11, marginTop:30}}>
               A politically exposed person is one who is a head of state, head of government, senior government official, senior political party official, senior judicial official, senior military official, senior executive of a state-owned company, senior executive of an international organisation.
               </Text>

               
               <HorizontalNavigatior showBackButton nextFunction={onSubmit} backFunction={goToPrev}/>
        </KeyboardAvoidingView>
    )
}