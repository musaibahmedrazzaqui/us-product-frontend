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
import CountrySelector from './SignupMiscComponents/CountrySelector';
import CustomSelector from './SignupMiscComponents/CustomSelector';


export default function SignupEmploymentDetails({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser: any}){

    const employmentStatusInputRef = useRef<any>()
    const employerNameInputRef = useRef<any>()
    const employerAddressInputRef = useRef<any>()
    const jobTitleInputRef = useRef<any>()

    const [selectedStatus, setSelectedStatus] = useState<any>(userData.employmentStatus || "Employed")
    const SignupSchema = Yup.object().shape({
        employerName : selectedStatus.toLowerCase() === 'employed' ?  Yup.string().required() : Yup.string(),
        employerAddress : selectedStatus.toLowerCase() === 'employed' ?  Yup.string().required() : Yup.string(),
        jobTitle : selectedStatus.toLowerCase() === 'employed' ?  Yup.string().required() : Yup.string()
    
      });
    
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
                    employerName : userData.employerName,
                    employerAddress : userData.employerAddress,
                    jobTitle : userData.jobTitle
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    Keyboard.dismiss()
                    if (selectedStatus === 'Freelancer'){
                        values.employerAddress = userData.homeAddress1
                        values.employerName = 'Self Employed'
                        values.jobTitle = 'Freelancer'
                    }
                    
                    setUserData({...userData, ...values, employmentStatus: selectedStatus === 'Freelancer' ? 'EMPLOYED' : selectedStatus.toUpperCase()})
                    updateUser({
                        employment_status: selectedStatus === 'Freelancer' ? 'EMPLOYED' : selectedStatus.toUpperCase(),
                        employer_name : values.employerName,
                        employer_address : values.employerAddress,
                        employment_position : values.jobTitle

                    },goToNext)
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
                Employment status
                </Text>
                <CustomSelector selectedValue={selectedStatus} setValue={setSelectedStatus} itemList={["Employed", "Unemployed","Retired","Student",'Freelancer']}/>
                {selectedStatus.toLowerCase() ==='employed' && <>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
              Employer name 
                </Text>
                <CustomTextInput
                reference={employerNameInputRef}
                touched={touched.employerName}
                errors={errors.employerName}
                value = {values.employerName}
                handleChange={handleChange('employerName')}
                handleBlur={handleBlur('employerName')}
                placeholder={"e.g., Nanotech Solutions Pvt. Ltd."}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Employer address 
                </Text>
                <CustomTextInput
                reference={employerAddressInputRef}
                touched={touched.employerAddress}
                errors={errors.employerAddress}
                value = {values.employerAddress}
                handleChange={handleChange('employerAddress')}
                handleBlur={handleBlur('employerAddress')}
                placeholder={"e.g., Suite 404, Fortune Tower, Shahra-e-Faisal, Kar"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Occupation/Job title 
                </Text>
                <CustomTextInput
                reference={jobTitleInputRef}
                touched={touched.jobTitle}
                errors={errors.jobTitle}
                value = {values.jobTitle}
                handleChange={handleChange('jobTitle')}
                handleBlur={handleBlur('jobTitle')}
                placeholder={"Operations Manager"}
                />
                </>
                }
                
                
                <HorizontalNavigatior showBackButton nextFunction={handleSubmit} backFunction={goToPrev}/>
            </>)}
            </Formik>
            
            </View>
            <View style={{height:100}} />
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}