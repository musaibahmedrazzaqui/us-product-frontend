import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    Image,
    ScrollView,
    Linking
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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { usePostHog } from 'posthog-react-native';
const SignupSchema = Yup.object().shape({
    birthPlace: Yup.string().min(1).required('Required'),
  });



export default function SignupAgreementsDisclosures({goToNext, goToPrev, userData, setUserData, disableButton} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, disableButton : any}){

    const posthog = usePostHog()
    const [customerAgreementAck, setCustomerAgreementAck] = useState(userData.customerAgreementAck)
    const [digitalSignatureAck, setDigitalSignatureAck] = useState(userData.digitalSignatureAck)

    const onSubmit = () =>{
        if ((customerAgreementAck === null) || (digitalSignatureAck === null)){
            return
        }
        posthog?.capture('Onboarding : Next button pressed on agreements screen')
        setUserData({...userData, customerAgreementAck, digitalSignatureAck})
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
                Agreements & Disclosures
                </Text>

                <View style={{flexDirection:'row',paddingTop:20}}>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    // lineHeight:32,
                    
                }}
                >
                Elphinstone, Inc. Customer Agreement {'\t'}            
                <TouchableWithoutFeedback onPress={()=>Linking.openURL("http://elphinstone.us/wp-content/uploads/2023/12/Elphinstone-Inc.-Client-Account-Agreement-20230214.pdf")}>  
                <Feather name='external-link' size={18} color="#9097AC"/>
                </TouchableWithoutFeedback>
                </Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:20}}>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    
                }}
                >
                Alpaca Securities, LLC Customer Agreement {' '}
                
                </Text>
                <TouchableWithoutFeedback onPress={() => Linking.openURL("https://files.alpaca.markets/disclosures/library/AcctAppMarginAndCustAgmt.pdf")}>         
                <Feather name='external-link' size={18} color="#9097AC"/>
                </TouchableWithoutFeedback>
                </View>

                <Text
                style={{
                    fontFamily:'ArialNova-Bold',
                    fontSize:16,
                    lineHeight:32,
                    paddingTop:20,
                    
                }}
                >
                Customer Agreement Acknowledgments             
                </Text>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:32,
                    paddingTop:20,
                    
                }}
                >
I have read, understood, and agree to be bound by Elphinstone, Inc. and Alpaca Securities, LLC account terms, and all other terms, disclosures and disclaimers applicable to me, as referenced in the Alpaca Customer Agreement. I also acknowledge that the Alpaca Customer Agreement contains a pre-dispute arbitration clause in Section 43.            
                </Text>


                <View style={{marginTop: 30, flexDirection: 'row', alignItems:'center', width:'100%', paddingHorizontal:10}}>
                <TouchableOpacity activeOpacity={1} 
                style={{
                    height:32, 
                    width: 32, 
                    borderRadius:16, 
                    backgroundColor: customerAgreementAck === true ? '#19C18F' : 'transparent',
                    borderWidth:1,
                    borderColor: customerAgreementAck === true ? '#19C18F' : '#ddd',
                    alignItems:'center',
                    justifyContent:'center',
                    marginRight:20
                    }} onPress = {()=>setCustomerAgreementAck(true)}>
                <AntDesign name='check' color={customerAgreementAck === true ? 'white' : 'transparent'}/>
                </TouchableOpacity>

                <Text>
                Agree
                </Text>
                </View>


                <Text
                style={{
                    fontFamily:'ArialNova-Bold',
                    fontSize:16,
                    lineHeight:32,
                    paddingTop:20,
                    
                }}
                >
                Digital Signature Acknowledgment           
                </Text>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:32,
                    paddingTop:20,
                    
                }}
                >
                 I understand I am signing this agreement electronically, and that my electronic signature will have the same effect as physically signing and returning the Application Agreement.           
                </Text>

                <View style={{marginTop: 30, flexDirection: 'row', alignItems:'center', width:'100%', paddingHorizontal:10}}>
                <TouchableOpacity activeOpacity={1} 
                style={{
                    height:32, 
                    width: 32, 
                    borderRadius:16, 
                    backgroundColor: digitalSignatureAck === true ? '#19C18F' : 'transparent',
                    borderWidth:1,
                    borderColor: digitalSignatureAck === true ? '#19C18F' : '#ddd',
                    alignItems:'center',
                    justifyContent:'center',
                    marginRight:20
                    }} onPress = {()=>setDigitalSignatureAck(true)}>
                <AntDesign name='check' color={digitalSignatureAck === true ? 'white' : 'transparent'}/>
                </TouchableOpacity>

                <Text>
                Agree
                </Text>
                </View>

               
               <HorizontalNavigatior showBackButton nextFunction={onSubmit} backFunction={goToPrev} disableNextButton={disableButton}/>
               </View>
               </ScrollView>
        </KeyboardAvoidingView>
    )
}