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
import { AppConstants } from '../../../assets/AppConstants';
const FormSchema = Yup.object().shape({
    annualHouseholdIncome : Yup.string().matches(/^[0-9]*$/).min(1),
    investibleAssets : Yup.string().matches(/^[0-9]*$/).min(1)
    

  });

  const fund_source_map_back = {
    'employment_income' : "Salary",
    "business_income" : 'Business / self employed',
    "family" : "Spouse / parents",
    'inheritance' : 'Inheritance' ,
    'investments' : 'Stock / investments',
    "savings" : "Savings"
} 
const fund_source_map = {
    "Salary" : 'employment_income',
    'Business / self employed' : "business_income",
    "Spouse / parents" : "family",
    'Inheritance' :  'inheritance',
    'Stock / investments' : 'investments',
    "Savings" : "savings"
} 


export default function FinancialDetailForm({userData, session, launchResponseModal} : any){
    const annualIncomeRef = useRef<any>()
    const investibleAssetsRef = useRef<any>()
    const [selectedFundSource, setSelectedFundSource] = useState(fund_source_map_back[userData.funding_source])
    return(
    <View style={{paddingHorizontal:20, width:'100%'}}>
        <Formik
                initialValues={{  
                    annualHouseholdIncome : userData.annual_income_max,
                    investibleAssets : userData.liquid_net_worth_max
                }}
                validationSchema={FormSchema}
                onSubmit={values => {
                    Keyboard.dismiss()
                    // setUserData({...userData, ...values})
                    UserService.updateUser(session.identity.id, {
                        annual_income_max : values.annualHouseholdIncome,
                        liquid_net_worth_max : values.investibleAssets,
                        funding_source : fund_source_map[selectedFundSource]
                    }).then( cb => {
                        launchResponseModal({message: 'Your profile has been updated.', subMessage:'', isSuccess: true})
                    }).catch( cb => {
                        console.log(cb.response)
                        launchResponseModal(AppConstants.GenericErrorResponse)
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
                Annual household income
                </Text>
                    <CustomTextInput
                    reference={annualIncomeRef}
                    touched={touched.annualHouseholdIncome}
                    errors = {errors.annualHouseholdIncome}
                    value={values.annualHouseholdIncome}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('annualHouseholdIncome')}
                    handleBlur = {handleBlur('annualHouseholdIncome')}
                    keyboardType="numeric"
                    placeholder={"e.g., Rs. 2,400,000"}
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
                Investible assets
                </Text>
                    <CustomTextInput
                    reference={investibleAssetsRef}
                    touched={touched.investibleAssets}
                    errors = {errors.investibleAssets}
                    value={values.investibleAssets}
                    // onFocus={()=> setShowPassView(true)}
                    handleChange = {handleChange('investibleAssets')}
                    handleBlur = {handleBlur('investibleAssets')}
                    keyboardType="numeric"
                    placeholder={"e.g., Rs. 800,000"}
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
                Source of funds
                </Text>
                    <CustomSelector selectedValue={selectedFundSource} setValue={setSelectedFundSource} itemList={['Salary', 'Business / self employed','Spouse / parents','Inheritance','Stock / investments', "Savings"]}/>

               

                    <HorizontalNavigatior nextFunction={handleSubmit} backFunction={()=>{}} showBackButton={false} />
                    </>
                )}
                
        </Formik>
    </View>
    )
}