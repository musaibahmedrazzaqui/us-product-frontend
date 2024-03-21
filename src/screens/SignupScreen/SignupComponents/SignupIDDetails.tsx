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
import {useEffect, useRef, useState} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import CustomTextInput from './SignupMiscComponents/CustomTextInput';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import CustomDatePicker from './SignupMiscComponents/CustomDatePicker';
import { usePostHog } from 'posthog-react-native';
const SignupSchema = Yup.object().shape({
    idNumber: Yup.string().min(1).required('Required'),
  });


export default function SignupIDDetails({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser : any}){
    const numberInputRef = useRef<any>()
    const [date, setDate] = useState(userData.idExpirationData)
    const posthog = usePostHog()
    return(
        <KeyboardAvoidingView behavior='height' style={{
            width:Dimensions.get('window').width,
            height:'100%',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            paddingHorizontal:20
            }}>
                <ScrollView style={{width:'100%'}}>
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
                initialValues={{  idNumber : userData.idNumber}}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    Keyboard.dismiss()
                    setUserData({...userData, ...values, idExpirationData: date})
                    posthog?.capture('Onboarding : Next button pressed on ID details screen',{
                        ...values, idExpirationData: date
                    })
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
                {userData.idType === 'USA_SSN' ? "Social Security Number" : "CNIC Number"} 
                </Text>
                <CustomTextInput
                reference={numberInputRef}
                touched={touched.idNumber}
                errors={errors.idNumber}
                value = {values.idNumber}
                handleChange={handleChange('idNumber')}
                handleBlur={handleBlur('idNumber')}
                placeholder={"e.g., 388-19-1625"}
                keyboardType={"numeric"}
                />

                

                
            
                {userData.idType === 'PAK_NIC' &&  <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                CNIC expiry date 
                </Text>}

                {userData.idType === 'PAK_NIC' && <CustomDatePicker selectedValue={date} setValue={setDate}/>}
                
                
                
                
                <HorizontalNavigatior showBackButton nextFunction={handleSubmit} backFunction={goToPrev}/>
            </>)}
            </Formik>
            
            </View>
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}