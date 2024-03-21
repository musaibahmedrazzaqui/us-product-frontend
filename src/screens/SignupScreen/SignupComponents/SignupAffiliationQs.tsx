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


export default function SignupAffiliationQs({goToNext, goToPrev, userData, setUserData} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any}){
    const [isUSBrokerAffiliated, setUSBrokerAffiliated] = useState(userData.isUSBrokerAffiliated)
    const [isExecutiveOrShareholderPC, setExecutiveOrShareholderPC] = useState(userData.isExecutiveOrShareholderPC)
    const [isSeniorPoliticalFigure, setSeniorPoliticalFigure] = useState(userData.isSeniorPoliticalFigure)
    const [isRelatedToPoliticalFigure, setIsRelatedToPoliticalFigure] = useState(userData.isRelatedToPoliticalFigure)
    const [noneApply, setNoneApply] = useState(false)
    const posthog = usePostHog()
    const onSubmit = () =>{
        posthog?.capture('Onboarding : Next button pressed on Affiliation Questions screen',{
            isUSBrokerAffiliated : isUSBrokerAffiliated,
                isExecutiveOrShareholderPC : isExecutiveOrShareholderPC,
                isSeniorPoliticalFigure : isSeniorPoliticalFigure,
                isRelatedToPoliticalFigure : isRelatedToPoliticalFigure
        })
            setUserData({
                ...userData,
                isUSBrokerAffiliated : isUSBrokerAffiliated,
                isExecutiveOrShareholderPC : isExecutiveOrShareholderPC,
                isSeniorPoliticalFigure : isSeniorPoliticalFigure,
                isRelatedToPoliticalFigure : isRelatedToPoliticalFigure
            })
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
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Do any of the following apply to you or a member of your immediate family?
                </Text>

                <Text
                style={{
                    // fontFamily:'ArialNova',z
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20,
                    fontStyle:'italic',
                    // fontWeight:'200'
                }}
                >
                Immediate family means: parent, sibling, child, spouse, grandparent, grandchild.
                </Text>

                <View style={{marginTop: 20, flexDirection: 'row', width:'100%', paddingHorizontal:10}}>
                <TouchableOpacity activeOpacity={1} 
                style={{
                    height:32, 
                    width: 32, 
                    borderRadius:16, 
                    backgroundColor: isUSBrokerAffiliated === true ? '#19C18F' : 'transparent',
                    borderWidth:1,
                    borderColor: isUSBrokerAffiliated === true ? '#19C18F' : '#ddd',
                    alignItems:'center',
                    justifyContent:'center',
                    marginRight:20
                    }} onPress = {()=>setUSBrokerAffiliated(!isUSBrokerAffiliated)}>
                <AntDesign name='check' color={isUSBrokerAffiliated === true ? 'white' : 'transparent'}/>
                </TouchableOpacity>

                <Text>
                Affiliated or work with a US registered {'\n'}broker-dealer or FINRA.
                </Text>
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', width:'100%', paddingHorizontal:10}}>
                <TouchableOpacity activeOpacity={1} 
                style={{
                    height:32, 
                    width: 32, 
                    borderRadius:16, 
                    backgroundColor: isExecutiveOrShareholderPC === true ? '#19C18F' : 'transparent',
                    borderWidth:1,
                    borderColor: isExecutiveOrShareholderPC === true ? '#19C18F' : '#ddd',
                    alignItems:'center',
                    justifyContent:'center',
                    marginRight:20
                    }} onPress = {()=>setExecutiveOrShareholderPC(!isExecutiveOrShareholderPC)}>
                <AntDesign name='check' color={isExecutiveOrShareholderPC === true ? 'white' : 'transparent'}/>
                </TouchableOpacity>

                <Text>
                Senior executive at or a 10% or greater {'\n'}shareholder of a publicly traded company.
                </Text>
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', width:'100%', paddingHorizontal:10}}>
                <TouchableOpacity activeOpacity={1} 
                style={{
                    height:32, 
                    width: 32, 
                    borderRadius:16, 
                    backgroundColor: isSeniorPoliticalFigure === true ? '#19C18F' : 'transparent',
                    borderWidth:1,
                    borderColor: isSeniorPoliticalFigure === true ? '#19C18F' : '#ddd',
                    alignItems:'center',
                    justifyContent:'center',
                    marginRight:20
                    }} onPress = {()=>setSeniorPoliticalFigure(!isSeniorPoliticalFigure)}>
                <AntDesign name='check' color={isSeniorPoliticalFigure === true ? 'white' : 'transparent'}/>
                </TouchableOpacity>

                <Text>
                I am a senior political figure.
                </Text>
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', width:'100%', paddingHorizontal:10}}>
                <TouchableOpacity activeOpacity={1} 
                style={{
                    height:32, 
                    width: 32, 
                    borderRadius:16, 
                    backgroundColor: isRelatedToPoliticalFigure === true ? '#19C18F' : 'transparent',
                    borderWidth:1,
                    borderColor: isRelatedToPoliticalFigure === true ? '#19C18F' : '#ddd',
                    alignItems:'center',
                    justifyContent:'center',
                    marginRight:20
                    }} onPress = {()=>setIsRelatedToPoliticalFigure(!isRelatedToPoliticalFigure)}>
                <AntDesign name='check' color={isRelatedToPoliticalFigure === true ? 'white' : 'transparent'}/>
                </TouchableOpacity>

                <Text>
                I am a family member or relative of {'\n'} a senior political figure.
                </Text>
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', width:'100%', paddingHorizontal:10}}>
                <TouchableOpacity activeOpacity={1} 
                style={{
                    height:32, 
                    width: 32, 
                    borderRadius:16, 
                    backgroundColor: !(isRelatedToPoliticalFigure || isSeniorPoliticalFigure || isExecutiveOrShareholderPC || isUSBrokerAffiliated) === true ? '#19C18F' : 'transparent',
                    borderWidth:1,
                    borderColor: !(isRelatedToPoliticalFigure || isSeniorPoliticalFigure || isExecutiveOrShareholderPC || isUSBrokerAffiliated) === true ? '#19C18F' : '#ddd',
                    alignItems:'center',
                    justifyContent:'center',
                    marginRight:20
                    }} onPress = {()=>  {
                        setIsRelatedToPoliticalFigure(false)
                        setSeniorPoliticalFigure(false)
                        setExecutiveOrShareholderPC(false)
                        setUSBrokerAffiliated(false)

                    }}>
                <AntDesign name='check' color={!(isRelatedToPoliticalFigure || isSeniorPoliticalFigure || isExecutiveOrShareholderPC || isUSBrokerAffiliated) === true ? 'white' : 'transparent'}/>
                </TouchableOpacity>

                <Text>
                None of the above apply to me or my family.
                </Text>
                </View>

               
               <HorizontalNavigatior showBackButton nextFunction={onSubmit} backFunction={goToPrev}/>
               </View>
               </ScrollView>
        </KeyboardAvoidingView>
    )
}