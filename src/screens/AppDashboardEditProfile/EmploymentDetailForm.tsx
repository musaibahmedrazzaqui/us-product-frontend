import React,{useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    Image,
    TextInput
} from 'react-native';
import CustomTextInput from '../SignupScreen/SignupComponents/SignupMiscComponents/CustomTextInput';
import {AntDesign} from '@expo/vector-icons'
import { GlobalStyles } from '../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CountrySelector from '../SignupScreen/SignupComponents/SignupMiscComponents/CountrySelector';
import CountryFlag from 'react-native-country-flag';
import HorizontalNavigatior from './HorizontalNavigator';
import CustomSelector from '../SignupScreen/SignupComponents/SignupMiscComponents/CustomSelector';
import UserService from '../../../api/lib/UserService';
const FormSchema = Yup.object().shape({
    employmentStatus : Yup.string().required().min(1),
    employerName : Yup.string().required().min(1),
    employerAddress : Yup.string().required().min(1),
    jobTitle : Yup.string().required().min(1),

  });

export default function EmploymentDetailForm({userData, session, launchResponseModal} : any){
    const employmentStatusInputRef = useRef<any>()
    const employerNameInputRef = useRef<any>()
    const employerAddressInputRef = useRef<any>()
    const jobTitleInputRef = useRef<any>()
    const [selectedStatus, setSelectedStatus] = useState(userData.employment_status)
    return(
    <View style={{paddingHorizontal:20, width:'100%'}}>
        <Formik
                initialValues={{
                    employerName : userData.employer_name,
                    employerAddress : userData.employer_address,
                    jobTitle : userData.employment_position
                }}
                validationSchema={FormSchema}
                onSubmit={values => {
                    console.log(values)
                    Keyboard.dismiss()
                    // setUserData({...userData, ...values})
                    UserService.updateUser(session.identity.id, {
                        employment_status : (selectedStatus).toUpperCase(),
                        employer_name: values.employerName,
                        employer_address : values.employerAddress,
                        employment_position : values.jobTitle
                    }).then( cb => {
                        launchResponseModal({message: 'Your profile has been updated.', subMessage:'', isSuccess: true})
                    }).catch( cb => {
                        console.log(cb.response)
                        launchResponseModal({message: "Some error occurred", subMessage:'Email us if this error persists', isSuccess: false})
                    }
                    )
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                    
               <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Employment status
                </Text>
                <CustomSelector selectedValue={selectedStatus} setValue={setSelectedStatus} itemList={["Employed", "Unemployed","Retired","Student"]}/>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Employer name
                </Text>
                    <CustomTextInput
                    reference={employerNameInputRef}
                    touched={touched.employerName}
                    errors = {errors.employerName}
                    value={values.employerName}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('employerName')}
                    handleBlur = {handleBlur('employerName')}
                    keyboardType="default"
                    placeholder={"e.g., Nanotech Solutions Pvt. Ltd."}
                    editable={true}
                    // textContentType={"email"}
                    />               

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Employer address
                </Text>
                    <CustomTextInput
                    reference={employerAddressInputRef}
                    touched={touched.employerAddress}
                    errors = {errors.employerAddress}
                    value={values.employerAddress}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('employerAddress')}
                    handleBlur = {handleBlur('employerAddress')}
                    keyboardType="default"
                    placeholder={"e.g., Suite 404, Fortune Tower, Shahra-e-Faisal, Kar"}
                    editable={true}
                    // textContentType={"email"}
                    />               

<Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Occupation/Job title
                </Text>
                    <CustomTextInput
                    reference={jobTitleInputRef}
                    touched={touched.jobTitle}
                    errors = {errors.jobTitle}
                    value={values.jobTitle}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('jobTitle')}
                    handleBlur = {handleBlur('jobTitle')}
                    keyboardType="default"
                    placeholder={"Operations Manager"}
                    editable={true}
                    // textContentType={"email"}
                    />               

                    <HorizontalNavigatior nextFunction={handleSubmit} backFunction={()=>{}} showBackButton={false}/>
                    </>
                )}
                
        </Formik>
    </View>
    )
}