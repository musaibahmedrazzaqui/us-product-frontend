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
import { ScrollView } from 'react-native-gesture-handler';
import { usePostHog } from 'posthog-react-native';
const SignupSchema = Yup.object().shape({
    birthPlace: Yup.string().min(1).required('Required'),
  });



export default function SignupNONUSDeclaration({goToNext, goToPrev, userData, setUserData} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any}){

    const [nonUSDeclaration, setNonUS] = useState(userData.nonUSDeclaration)
    const posthog = usePostHog()
    const onSubmit = () =>{
        if (nonUSDeclaration === null){
            return
        }
        posthog?.capture('Onboarding : Next button pressed on Non US Declaration screen')
        setUserData({...userData, nonUSDeclaration})
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
                <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
                <View onStartShouldSetResponder={()=>true}>
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
                Declaration of non-US status
                </Text>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                I certify that I am not a US citizen, US resident alien or other US person for US tax purposes, and I am submitting the applicable Form W-8 BEN with this form to certify my foreign status and, if applicable, claim tax treaty benefits.
                </Text>
                <View style={{marginTop: 30, flexDirection: 'row', alignItems:'center', width:'100%', paddingHorizontal:10}}>
                <TouchableOpacity activeOpacity={1} 
                style={{
                    height:32, 
                    width: 32, 
                    borderRadius:16, 
                    backgroundColor: nonUSDeclaration === true ? '#19C18F' : 'transparent',
                    borderWidth:1,
                    borderColor: nonUSDeclaration === true ? '#19C18F' : '#ddd',
                    alignItems:'center',
                    justifyContent:'center',
                    marginRight:20
                    }} onPress = {()=>setNonUS(true)}>
                <AntDesign name='check' color={nonUSDeclaration === true ? 'white' : 'transparent'}/>
                </TouchableOpacity>

                <Text>
                Agree
                </Text>
                </View>

               
               <HorizontalNavigatior showBackButton nextFunction={()=>{nonUSDeclaration && onSubmit()}} backFunction={goToPrev}/>
               </View>
               </ScrollView>
        </KeyboardAvoidingView>
    )
}