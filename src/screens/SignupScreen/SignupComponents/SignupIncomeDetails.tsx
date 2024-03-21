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
import { AppConstants, humanReadableDate } from '../../../../assets/AppConstants';
import { Entypo, Feather } from '@expo/vector-icons'; 
import {useRef, useState} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import CustomTextInput from './SignupMiscComponents/CustomTextInput';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import CustomSelector from './SignupMiscComponents/CustomSelector';
import CustomNumericTextInput from './SignupMiscComponents/CustomNumericTextInput';
import { usePostHog } from 'posthog-react-native';
const SignupSchema = Yup.object().shape({
    annualHouseholdIncome : Yup.string().required().matches(/[0-9]/),
    investibleAssets : Yup.string().matches(/[0-9]/).required()

  });
  const fund_source_map = {
    "Salary" : 'employment_income',
    'Business / self employed' : "business_income",
    "Spouse / parents" : "family",
    'Inheritance' :  'inheritance',
    'Stock / investments' : 'investments',
    "Savings" : "savings"
} 

export default function SignupIncomeDetails({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser : any}){
    const annualIncomeRef = useRef<any>()
    const investibleAssetsRef = useRef<any>()
    const [selectedFundSource, setSelectedFundSource] = useState(userData.sourceOfFunds)
    const [selectedStatus, setSelectedStatus] = useState<any>(userData.employmentStatus || "Employed")
    const posthog = usePostHog()
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
                    annualHouseholdIncome : userData.annualHouseholdIncome,
                    investibleAssets : userData.investibleAssets
                
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    if (selectedFundSource === ''){
                        return
                    }
                    console.log(values)
                    Keyboard.dismiss()
                    setUserData({...userData, ...values, sourceOfFunds : selectedFundSource})
                    posthog?.capture('Onboarding : Next button pressed on Income details screen', {
                        funding_source : fund_source_map[selectedFundSource],
                        annual_income_max : values.annualHouseholdIncome,
                        liquid_net_worth_max : values.investibleAssets,
                        employment_status: selectedStatus === 'Freelancer' ? 'EMPLOYED' : selectedStatus.toUpperCase(),
                    })
                    updateUser({
                        funding_source : fund_source_map[selectedFundSource],
                        annual_income_max : values.annualHouseholdIncome,
                        liquid_net_worth_max : values.investibleAssets,
                        employment_status: selectedStatus === 'Freelancer' ? 'EMPLOYED' : selectedStatus.toUpperCase(),
                        meta : {
                            profile_start_ts : humanReadableDate(userData.profile_start_ts),
                            profile_completeness : 0.5,
                            signup_page_location : -8
                        }
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
                Annual household income
                </Text>
                <CustomNumericTextInput
                reference={annualIncomeRef}
                touched={touched.annualHouseholdIncome}
                errors={errors.annualHouseholdIncome}
                value = {values.annualHouseholdIncome}
                handleChange={handleChange('annualHouseholdIncome')}
                handleBlur={handleBlur('annualHouseholdIncome')}
                placeholder={"120,000"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
               Investible assets
                </Text>
                <CustomNumericTextInput
                reference={investibleAssetsRef}
                touched={touched.investibleAssets}
                errors={errors.investibleAssets}
                value = {values.investibleAssets}
                handleChange={handleChange('investibleAssets')}
                handleBlur={handleBlur('investibleAssets')}
                placeholder={"e.g., Rs. 800,000"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Source of funds
                </Text>
                <CustomSelector selectedValue={selectedFundSource} setValue = {setSelectedFundSource} itemList={['Salary', 'Business / self employed','Spouse / parents','Inheritance','Stock / investments', "Savings"]}/>
                
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
                
                
                <HorizontalNavigatior showBackButton nextFunction={handleSubmit} backFunction={goToPrev}/>
            </>)}
            </Formik>
            
            </View>
            <View style={{height:100}}/>
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}