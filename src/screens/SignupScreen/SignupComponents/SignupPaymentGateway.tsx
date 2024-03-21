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
import CustomSelector from './SignupMiscComponents/CustomSelector';
import CountrySelector from './SignupMiscComponents/CountrySelector';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import RiskToleranceSelector from './SignupMiscComponents/RiskToleranceSelector';
import { BooleanSelector } from '../../../miscComponents/BooleanSelector';
const SignupSchema = Yup.object().shape({
    birthPlace: Yup.string().min(1).required('Required'),
  });



export default function SignupPaymentGateway({goToNext, goToPrev, userData, setUserData} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any}){


    const [customerAgreementAck, setCustomerAgreementAck] = useState(userData.customerAgreementAck)
    const [digitalSignatureAck, setDigitalSignatureAck] = useState(userData.digitalSignatureAck)

    const onSubmit = () =>{
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
                    SmartInvest{'\n'}Onboarding
                </Text>


                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:40
                }}
                >
                Payment gatway integration
                </Text>

                <Image source={require('../../../../assets/images/payoneer_black.png')} style={{height:48, width:247.4, alignSelf:'center', marginTop:40}}/>
                <View style={{width:'80%', justifyContent:'space-around', alignItems:'center',alignSelf:'center', flexDirection:'row', marginVertical:30}}>
                <View style={{height:1, width : '25%', backgroundColor:'#D1D5DB'}}/>
                    <Image source={require('../../../../assets/images/tree.png')} style={{height:36,width:36}}/>
                    <View style={{height:1, width : '25%', backgroundColor:'#D1D5DB'}}/>
                </View>
                <Image source={require('../../../../assets/images/WiseLogo.png')} style={{height:48, width:212, alignSelf:'center'}}/>

               <HorizontalNavigatior showBackButton nextFunction={onSubmit} backFunction={goToPrev}/>

        </KeyboardAvoidingView>
    )
}