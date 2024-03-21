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
const SignupSchema = Yup.object().shape({
    bankName : Yup.string().required().min(1),
    bankAccountNumber : Yup.string().required().min(1),
    routingNumber : Yup.string().required().min(1)

  });


export default function SignupBankDetails({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser : any}){

    const [accountType, setAccountType] = useState(userData.accountType || "")
    const bankNameInputRef = useRef<any>()
    const bankAccountNumberInputRef = useRef<any>()
    const routingNumberInputRef = useRef<any>()
    const [pakistaniBank, setPakistaniBank] = useState("")
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
                initialValues={{  
                    bankName : userData.bankName,
                    bankAccountNumber : userData.bankAccountNumber,
                    routingNumber : userData.routingNumber
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    Keyboard.dismiss()
                    setUserData({...userData, ...values})
                    updateUser({
                        bank_details : {
                            bank_type : accountType,
                            bank_name : values.bankName,
                            bank_account_number : values.bankAccountNumber,
                            routing_number : ['Wise account','Payoneer account','USD bank account in USA'].includes(accountType) ? values.routingNumber : "",
                            swift_code : !['Wise account','Payoneer account','USD bank account in USA'].includes(accountType) ? values.routingNumber : "",

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
                <><Text
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
                
                </>}

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
                
                <HorizontalNavigatior showBackButton nextFunction={handleSubmit} backFunction={goToPrev}/>
            </>)}
            </Formik>
            
            </View>
            <View style={{height:100}}/>
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