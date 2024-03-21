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
    Alert
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
import CustomDocumentSelector from './SignupMiscComponents/CustomDocumentSelector';
import CustomPictureSelector from './SignupMiscComponents/CustomPictureSelector';

import { usePostHog } from 'posthog-react-native';
const SignupSchema = Yup.object().shape({
    birthPlace: Yup.string().min(1).required('Required'),
  });


export default function SignupDocumentUpload({goToNext, goToPrev, userData, setUserData} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any}){
    const posthog = usePostHog()
    const [photoIDFront, setPhotoIDFront] = useState(userData.photoIDFront)
    const [photoIDBack, setPhotoIDBack] = useState(userData.photoIDBack)

    const [bankStatement, setBankStatment] = useState(userData.bankStatement)

    const onSubmit = () =>{
        if (photoIDFront && photoIDBack && bankStatement){
            posthog?.capture('Onboarding : Next button pressed on documents screen')
            setUserData({
                ...userData,
                photoIDFront : photoIDFront,
                photoIDBack : photoIDBack,
                bankStatement: bankStatement
            })
            goToNext()    
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
                Almost done, just upload the following
                </Text>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingVertical:20,
                    // fontStyle:'italic',
                    // fontWeight:'200'
                }}
                >
                {'\u25CF'} Copy of your {userData.idType === 'PAK_NIC' ? 'CNIC' : "Photo ID"}
                </Text>

                <CustomPictureSelector
                placeholder={'Upload a picture of your ' + (userData.idType === 'PAK_NIC' ? 'CNIC' : "Photo ID" )+ " (front side)"}
                selectedValue={photoIDFront}
                setValue={setPhotoIDFront}
                mimetype={"image/jpeg"}
                />
                <View style={{height:10}}/>
                <CustomPictureSelector
                placeholder={'Upload a picture of your ' + (userData.idType === 'PAK_NIC' ? 'CNIC' : "Photo ID" )+ " (back side)"}
                selectedValue={photoIDBack}
                setValue={setPhotoIDBack}
                mimetype={"image/jpeg"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingVertical:20,
                    // fontStyle:'italic',
                    // fontWeight:'200'
                }}
                >
                {'\u25CF'} Bank statement <Text style={{fontStyle:'italic', fontSize:12}}>(must contain your name & address) </Text>
                </Text>

                <CustomDocumentSelector
                placeholder='Upload a PDF copy of your bank statement'
                selectedValue={bankStatement}
                setValue={setBankStatment}
                mimetype={"application/pdf"}
                />
                
               <HorizontalNavigatior showBackButton nextFunction={onSubmit} backFunction={goToPrev}/>
               </View>
               </ScrollView>
        </KeyboardAvoidingView>
    )
}