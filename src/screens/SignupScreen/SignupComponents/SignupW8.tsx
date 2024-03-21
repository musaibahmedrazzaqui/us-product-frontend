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
import { usePostHog } from 'posthog-react-native';
const SignupSchema = Yup.object().shape({
    birthPlace: Yup.string().min(1).required('Required'),
  });


export default function SignupW8({goToNext, goToPrev, userData, setUserData} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any}){
    
    const posthog = usePostHog()
    const onSubmit = () =>{
        posthog?.capture('Onboarding : Next button pressed on W8 screen')
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
                Form W-8BEN certification
                </Text>
                
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Under penalties of perjury, I declare that I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete. I further certify under penalties of perjury that:
                </Text>

                <View style={{flexDirection:'row', width:'100%', paddingTop:20,}}>

                <Text style={{width:'10%', fontSize:16,paddingTop:10}}>
                {'\u2022'}
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:32,
                    
                    width:'90%',
                }}
                >Under penalties of perjury, I declare that I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete. I further certify under penalties of perjury that:
                </Text>

                
                </View>

                <View style={{flexDirection:'row', width:'100%', paddingTop:20,}}>

                <Text style={{width:'10%', fontSize:16,paddingTop:10}}>
                {'\u2022'}
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:32,
                    
                    width:'90%',
                }}
                >The person named on line 1 of this form is not a U.S. person;
                </Text>

                
                </View>

                <View style={{flexDirection:'row', width:'100%', paddingTop:20,}}>

                <Text style={{width:'10%', fontSize:16,paddingTop:10}}>
                {'\u2022'}
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:32,
                    
                    width:'90%',
                }}
                >
                This form relates to: {'\n'}    
                <Text style={{fontFamily:'ArialNova-Bold'}}>(a)</Text> income not effectively connected with the conduct of a trade or business in the United States; {'\n'} 
                <Text style={{fontFamily:'ArialNova-Bold'}}>(b)</Text> income effectively connected with the conduct of a trade or business in the United States but is not subject to tax under an applicable income tax treaty;{'\n'} 
                <Text style={{fontFamily:'ArialNova-Bold'}}>(c)</Text> the partner’s share of a partnership’s effectively connected taxable income; or{'\n'} 
                <Text style={{fontFamily:'ArialNova-Bold'}}>(d)</Text> the partner’s amount realized from the transfer of a partnership interest subject to withholding under section 1446(f);{'\n'} 
                </Text>                
                </View>

                <View style={{flexDirection:'row', width:'100%', paddingTop:20,}}>

                <Text style={{width:'10%', fontSize:16,paddingTop:10}}>
                {'\u2022'}
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:32,
                    width:'90%',
                }}
                >The person named on line 1 of this form is a resident of the treaty country listed on line 9 of the form (if any) within the meaning of the income tax treaty between the United States and that country; and
                </Text>

                
                </View>


                <View style={{flexDirection:'row', width:'100%', paddingTop:20,}}>

                <Text style={{width:'10%', fontSize:16,paddingTop:10}}>
                {'\u2022'}
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:32,
                    width:'90%',
                }}
                >
                For broker transactions or barter exchanges, the beneficial owner is an exempt foreign person as defined in the instructions.
                </Text>

                
                </View>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Furthermore, I authorize this form to be provided to any withholding agent that has control, receipt, or custody of the income of which I am the beneficial owner or any withholding agent that can disburse or make payments of the income of which I am the beneficial owner. I agree that I will submit a new form within 30 days if any certification made on this form becomes incorrect.
                </Text>

               
               <HorizontalNavigatior showBackButton nextFunction={onSubmit} backFunction={goToPrev}/>
               </View>
               </ScrollView>
        </KeyboardAvoidingView>
    )
}