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
import CountrySelector from './SignupMiscComponents/CountrySelector';
import CustomSelector from './SignupMiscComponents/CustomSelector';
import { usePostHog } from 'posthog-react-native';


export default function SignupOptionalDetails({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser: any}){

    const employmentStatusInputRef = useRef<any>()
    const employerNameInputRef = useRef<any>()
    const employerAddressInputRef = useRef<any>()
    const jobTitleInputRef = useRef<any>()
    const bankNameInputRef = useRef<any>()
    const bankAccountNumberInputRef = useRef<any>()
    const routingNumberInputRef = useRef<any>()
    const trustedContactNameInputRef = useRef<any>()
    const trustedContactLastNameInputRef = useRef<any>()
    const trustedContactEmailInputRef = useRef<any>()
    const trustedContactNumberInputRef = useRef<any>()
    const posthog = usePostHog()


    const [accountType, setAccountType] = useState(userData.accountType || "")
    const [selectedStatus, setSelectedStatus] = useState<any>(userData.employmentStatus || "Employed")
    const [pakistaniBank, setPakistaniBank] = useState("")
    const SignupSchema = Yup.object().shape({
        employerName : Yup.string(),
        employerAddress :  Yup.string(),
        jobTitle :  Yup.string(),
        trustedContactName: Yup.string(),
        trustedContactLastName: Yup.string(),
        trustedContactEmail : Yup.string(),
        trustedContactNumber : Yup.string(),
        bankName : Yup.string(),
        bankAccountNumber : Yup.string(),
        routingNumber : Yup.string()    
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

                <View style={{flexDirection:'row'}}>
                <Text style={{
                    // width:'100%',
                    fontFamily:'PlayfairDisplay_700Bold',
                    fontSize:32,
                    color:AppConstants.loginHeaderBlue,

                }}>
                    Elphinstone US{'\n'}Onboarding
                </Text>
                <TouchableOpacity style={{flex:1, alignItems:'flex-end', justifyContent:'center'}} onPress={ () => {
                    posthog?.capture('Onboarding : Next button pressed on optional details screen (Skipped)')
                    updateUser({
                        
                        meta : {
                            profile_start_ts : userData.profile_start_ts,
                            profile_completeness : 0.6,
                            signup_page_location : -8
                        }
                    },goToNext)
                }}>
                    <Text style={{color:'#004DBC', fontSize:16, paddingRight:10}}>
                        Skip
                    </Text>
                </TouchableOpacity>
                </View>

                <Text style={{fontFamily:'ArialNova', color:'#A4B3C4', paddingVertical:10, fontSize:16}}>
                    You can skip this optional information
                </Text>
                
                <Formik
                initialValues={{ 
                    employerName : userData.employerName,
                    employerAddress : userData.employerAddress,
                    jobTitle : userData.jobTitle,
                    bankName : userData.bankName,
                    bankAccountNumber : userData.bankAccountNumber,
                    routingNumber : userData.routingNumber,
                    trustedContactName: userData.trustedContactName,
                    trustedContactLastName: userData.trustedContactLastName,
                    trustedContactEmail : userData.trustedContactEmail,
                    trustedContactNumber : userData.trustedContactNumber,
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    
                    setUserData({...userData, ...values, employmentStatus: selectedStatus === 'Freelancer' ? 'EMPLOYED' : selectedStatus.toUpperCase()})
                    posthog?.capture('Onboarding : Next button pressed on optional details screen', {
                        employer_name : values.employerName,
                        employer_address : values.employerAddress,
                        employment_position : values.jobTitle,
                        bank_details : {
                            bank_type : accountType,
                            bank_name : values.bankName,
                            bank_account_number : values.bankAccountNumber,
                            routing_number : ['Wise account','Payoneer account','USD bank account in USA'].includes(accountType) ? values.routingNumber : "",
                            swift_code : !['Wise account','Payoneer account','USD bank account in USA'].includes(accountType) ? values.routingNumber : "",
                        },
                        trusted_contact: {
                            given_name: values.trustedContactName,
                            family_name: values.trustedContactLastName,
                            email_address: values.trustedContactEmail,
                            phone_number: values.trustedContactNumber
                        },
                    })
                    updateUser({
                        employer_name : values.employerName,
                        employer_address : values.employerAddress,
                        employment_position : values.jobTitle,
                        bank_details : {
                            bank_type : accountType,
                            bank_name : values.bankName,
                            bank_account_number : values.bankAccountNumber,
                            routing_number : ['Wise account','Payoneer account','USD bank account in USA'].includes(accountType) ? values.routingNumber : "",
                            swift_code : !['Wise account','Payoneer account','USD bank account in USA'].includes(accountType) ? values.routingNumber : "",
                        },
                        trusted_contact: (values.trustedContactName != "" && values.trustedContactLastName != "") ?  {
                            given_name: values.trustedContactName,
                            family_name: values.trustedContactLastName,
                            email_address: values.trustedContactEmail,
                            phone_number: values.trustedContactNumber
                        } : undefined,
                        meta : {
                            profile_start_ts : humanReadableDate(userData.profile_start_ts),
                            profile_completeness : 0.6,
                            signup_page_location : -9
                        }

                    },goToNext)
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                
                <Text style={{fontFamily:'ArialNova-Bold', color:'#004DBC', paddingTop:30, fontSize:18}}>
                Employment Information
                </Text>

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


                <Text style={{fontFamily:'ArialNova-Bold', color:'#004DBC', paddingTop:30, fontSize:18}}>
                    Bank Information
                </Text>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Account Type
                </Text>
                <CustomSelector
                selectedValue={accountType}
                setValue={(value : string) => {
                    setAccountType(value);
                    if (value === 'Wise account'){
                        values.bankName = 'WISE'
                    }
                    else if(value === 'Payoneer account'){
                        values.bankName = 'PAYONEER'
                    }
                    else{
                        values.bankName = ''
                    }
                    values.bankAccountNumber = ''
                    values.routingNumber = ''

                }}
                itemList={['Wise account','Payoneer account','USD bank account in USA','USD bank account in Pakistan','Non US bank account']}
                />

                {
                    !['Wise account','Payoneer account'].includes(accountType) &&
                    <>
                        <Text
                        style={{
                            fontFamily:'ArialNova',
                            fontSize:18,
                            // lineHeight:32,
                            paddingTop:20
                        }}
                        >
                        Bank Name
                        </Text>
                        { accountType === 'USD bank account in Pakistan' ?
                
                        <CustomSelector
                        selectedValue={pakistaniBank}
                        setValue= {(value : string) => {
                            values.bankName = value
                            values.routingNumber = PAKISTAN_BANKS[value]
                            setPakistaniBank(value)
                        }}
                        itemList = {Object.keys(PAKISTAN_BANKS)}
                        />

                        :
                            <CustomTextInput
                        reference={bankNameInputRef}
                        touched={touched.bankName}
                        errors={errors.bankName}
                        value = {values.bankName}
                        handleChange={handleChange('bankName')}
                        handleBlur={handleBlur('bankName')}
                        placeholder={"e.g., Chase"}
                        />
                        }
                    </>
                }
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
              {['Wise account','Payoneer account','USD bank account in USA'].includes(accountType) ? 'Bank account number' : 'IBAN / Account number'}
                </Text>
                <CustomTextInput
                reference={bankAccountNumberInputRef}
                touched={touched.bankAccountNumber}
                errors={errors.bankAccountNumber}
                value = {values.bankAccountNumber}
                handleChange={handleChange('bankAccountNumber')}
                handleBlur={handleBlur('bankAccountNumber')}
                placeholder={"e.g., 100457845621458"}
                />

{
                accountType != 'USD bank account in Pakistan' &&
                <>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
               {['Wise account','Payoneer account','USD bank account in USA'].includes(accountType) ? 'Routing number' : 'SWIFT Code'}
                </Text>
                <CustomTextInput
                reference={routingNumberInputRef}
                touched={touched.routingNumber}
                errors={errors.routingNumber}
                value = {values.routingNumber}
                handleChange={handleChange('routingNumber')}
                handleBlur={handleBlur('routingNumber')}
                placeholder={"e.g., 5344"}
                />
                </>
                }

                <Text style={{fontFamily:'ArialNova-Bold', color:'#004DBC', paddingTop:30, fontSize:18}}>
                Trusted Contact Information
                </Text>
                <Text style={{fontFamily:'ArialNova', fontSize:16, lineHeight:32, color:'black', paddingTop:14,}}>

                    A trusted contact is a person you authorize your financial firm to contact in limited circumstances, such as if there is a concern about activity in your account and they have been unable to get in touch with you. 

 {'\n\n'}A trusted contact may be a family member, attorney, accountant or another third-party who you believe would respect your privacy and know how to handle the responsibility. The trusted person should be 18 years old or older.
                    </Text>

                    <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                First Name
                </Text>
                <CustomTextInput
                reference={trustedContactNameInputRef}
                touched={touched.trustedContactName}
                errors={errors.trustedContactName}
                value = {values.trustedContactName}
                handleChange={handleChange('trustedContactName')}
                handleBlur={handleBlur('trustedContactName')}
                placeholder={"e.g., Arsalan"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
              Last name
                </Text>
                <CustomTextInput
                reference={trustedContactLastNameInputRef}
                touched={touched.trustedContactLastName}
                errors={errors.trustedContactLastName}
                value = {values.trustedContactLastName}
                handleChange={handleChange('trustedContactLastName')}
                handleBlur={handleBlur('trustedContactLastName')}
                placeholder={"e.g., Mirza"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                Email address
                </Text>
                <CustomTextInput
                reference={trustedContactEmailInputRef}
                touched={touched.trustedContactEmail}
                errors={errors.trustedContactEmail}
                value = {values.trustedContactEmail}
                handleChange={handleChange('trustedContactEmail')}
                handleBlur={handleBlur('trustedContactEmail')}
                placeholder={"email address"}
                
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                What is their mobile number?
                </Text>
                <CustomTextInput
                reference={trustedContactNumberInputRef}
                touched={touched.trustedContactNumber}
                errors={errors.trustedContactNumber}
                value = {values.trustedContactNumber}
                handleChange={handleChange('trustedContactNumber')}
                handleBlur={handleBlur('trustedContactNumber')}
                placeholder={"phone number"}
                keyboardType="phone-pad"
                />
                
                <HorizontalNavigatior showBackButton nextFunction={handleSubmit} backFunction={goToPrev}/>
            </>)}
            </Formik>
            
            </View>
            <View style={{height:100}} />
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}


const PAKISTAN_BANKS = {
    "Al Baraka Bank (Pakistan) Limited": "AIINPKKA",
    "Allied Bank Limited": "ABPAPKKA",
    "Askari Bank": "ASCMPKKA",
    "Bank Alfalah Limited": "ALFHPKKA",
    "Bank Al-Habib Limited": "BAHLPKKA",
    "BankIslami Pakistan Limited": "BKIPPKKA",
    "Bank of Punjab": "BPUNPKKA",
    "Bank of Khyber": "KHYBPKKA",
    "Deutsche Bank A.G": "DEUTPKKA",
    "Dubai Islamic Bank Pakistan Limited": "DUIBPKKA",
    "Faysal Bank Limited": "FAYSPKKA",
    "First Women Bank Limited": "FWOMPKKA",
    "Habib Bank Limited": "HABBPKKA",
    "Habib Metropolitan Bank Limited": "MPBLPKKA",
    "Industrial and Commercial Bank of China": "ICBPPKKA",
    "Industrial Development Bank of Pakistan": "IDBPPKKA",
    "JS Bank Limited": "JSBLPKKA",
    "MCB Bank Limited": "MCBMPKKA",
    "MCB Islamic Bank Limited": "MUCBPKK1",
    "Meezan Bank Limited": "MEZNPKKA",
    "National Bank of Pakistan": "NBPAPKKA",
    "Summit Bank Pakistan": "SUMBPKKA",
    "Standard Chartered Bank (Pakistan) Limited": "SCBLPKKX",
    "Sindh Bank": "SINDPKKA",
    "The Bank of Tokyo-Mitsubishi UFJ": "BOTKPKKA",
    "United Bank Limited": "UNILPKKA",
    "Zarai Taraqiati Bank Limited": "ZTBLPKKA"
  }