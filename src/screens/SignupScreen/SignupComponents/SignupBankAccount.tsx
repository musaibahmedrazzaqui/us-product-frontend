import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    ScrollView,
    StyleSheet,
    Image,
    Animated,ScrollViewComponent
} from 'react-native'
import { AppConstants } from '../../../assets/AppConstants'
import { Entypo, Feather } from '@expo/vector-icons'; 
import React,{useRef, useState, useEffect} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import { BooleanSelector } from '../../../miscComponents/BooleanSelector';
import { ListOfCountries } from './SignupMiscComponents/ListOfCountries';
import { Tooltip, TooltipProps } from '@rneui/themed';
import { useKeyboard } from '../../../miscComponents/useKeyboard';
import CustomTextInput from './SignupMiscComponents/CustomTextInput';
import CustomSelector from './SignupMiscComponents/CustomSelector';

const ListOfBanks = ["Al Baraka Bank (Pakistan)", "Allied Bank", "Askari Bank", "Bank Alfalah ", "Bank Al-Habib", "BankIslami Pakistan", "Citibank NA", "Deutsche Bank AG", "The Bank of Tokyo-Mitsubishi UFJ", "Dubai Islamic Bank Pakistan", "Faysal Bank", "First Women Bank", "Finca Microfinace Bank", "Habib Bank", "Standard Chartered Bank Pakistan", "Habib Metropolitan Bank", "Industrial and Commercial Bank of China", "Industrial Development Bank of Pakistan", "JS Bank", "MCB Bank", "MCB Islamic Bank", "Meezan Bank", "National Bank of Pakistan", "SME Bank", "Samba Bank", "Silk Bank", "Sindh Bank", "Soneri Bank", "Summit Bank", "The Bank of Khyber", "The Bank of Punjab", "The Punjab Provincial Cooperative Bank", "United Bank", "Zarai Taraqiati Bank"]

export default function SignupBankAccount({goToNext, goToPrev} : {goToNext : ()=>void, goToPrev : ()=> void}){
    const SSNInputRef = useRef<any>()
    const OtherTaxIDRef = useRef<any>()
    const NoTaxIDReasonRef = useRef<any>()
    const AttorneyNameRef = useRef<any>()
    const AttorneyAddressRef = useRef<any>()
    const bankBranchRef = useRef<any>()
    const branchCityRef = useRef<any>()
    const IBANRef = useRef<any>()

    const scrollViewRef = useRef<any>()
    const scrollPositionY = useRef<any>()
    const [doesHaveAttorney,setDoesHaveAttorney] = useState<boolean | null>(null)
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedBank, setSelectedBank] = useState<string>('');
    const keyboardHeight = useKeyboard()
    const showViewAnimator = useRef(new Animated.Value(0)).current

    const SignupSchema = Yup.object().shape({
        bankBranch:  Yup.string().min(1).required(),
        branchCity: Yup.string().min(1).required(),
        IBAN: Yup.string().min(1).required()
    
      });

    const initAnimation = (to : number) => {
        Animated.timing(showViewAnimator,{
            toValue: to ? 240 : 0,
            duration: 250,
            useNativeDriver : false
          }).start()
    }
    useEffect(()=>{
        initAnimation(keyboardHeight)
        
        
        setTimeout(()=>keyboardHeight && scrollViewRef.current.scrollTo({
            y:scrollPositionY.current + (keyboardHeight/2)
        }),250)
    },[keyboardHeight])
    return(
        <View>
                <ScrollView 
                ref={scrollViewRef}
                style={{width:Dimensions.get('window').width, paddingHorizontal:20}}
                bounces={false}
                onMomentumScrollEnd = {e => {scrollPositionY.current = e.nativeEvent.contentOffset.y}}
                onScrollEndDrag = {e => {scrollPositionY.current = e.nativeEvent.contentOffset.y}}
                >
                <View onStartShouldSetResponder={() => true}>
                <View style={{
                    marginBottom:20
                }}>
                    <Image source={require('../../../assets/images/tree.png')} style={{height:36,width:36}}/>
                </View>
                <Text style={{
                    width:'100%',
                    fontFamily:'PlayfairDisplay_700Bold',
                    fontSize:32,
                    color:AppConstants.loginHeaderBlue

                }}>
                    SmartRupee{'\n'}Onboarding
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Enter your bank account information below
                </Text>
                <Formik
                initialValues={{ 
                    bankBranch : '',
                    branchCity:'',
                    IBAN: ''
                
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values)
                    Keyboard.dismiss()
                    goToNext()
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    marginTop:50
                }}>
                    {'\u25CF'} Bank name {'\n'}
                </Text>

                <CustomSelector
                setValue = {setSelectedBank}
                selectedValue = {selectedBank}
                itemList= {ListOfBanks}
                />

            
                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    paddingTop:20
                }}>
                    {'\u25CF'} Bank branch {'\n'}
                    {/* <Text style={{fontSize:12}}> {'     '}(required if any of the answer above is Yes)</Text> {'\n'} */}
                </Text>
                
                <CustomTextInput
                reference = {bankBranchRef}
                touched = {touched.bankBranch}
                errors = {errors.bankBranch}
                value = {values.bankBranch}
                handleBlur={handleBlur('bankBranch')}
                handleChange= {handleChange('bankBranch')}
                placeholder={'e.g., Shahra-e-Faisal Branch'}
                />

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    paddingTop:20
                }}>
                    {'\u25CF'} Branch city {'\n'}
                </Text>

                <CustomTextInput
                reference={branchCityRef}
                touched = {touched.branchCity}
                errors = {errors.branchCity}
                value = {values.branchCity}
                handleBlur = {handleBlur('branchCity')}
                handleChange = {handleChange('branchCity')}
                placeholder= "e.g., Karachi"
                
                />

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    paddingTop:20
                }}>
                    {'\u25CF'} IBAN {'\n'}
                </Text>

                <CustomTextInput
                reference={IBANRef}
                touched = {touched.IBAN}
                errors = {errors.IBAN}
                value = {values.IBAN}
                handleBlur = {handleBlur('IBAN')}
                handleChange = {handleChange('IBAN')}
                placeholder='e.g. PKKA FAYS 0646 5099 7500 0577'
                />
                

                
                <View
                style={{
                    alignItems:'flex-end',
                    justifyContent:'space-between',
                    width:'100%', 
                    marginTop:20, 
                    flex:1,
                    flexDirection:'row',
                    paddingBottom:20,
                }}>
                <TouchableOpacity style={{
                    width:'17.5%',
                    marginTop:10,
                    height: 54,
                    marginVertical:10,
                    borderRadius: 6,
                    padding:10,
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'center',
                    borderWidth: 1,
                    borderColor:'#DDD'
                }} 
                onPress={goToPrev}
                >
                    <Feather name="arrow-left" size={24} color="#8692A6" />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width:'80%',
                    marginTop:10,
                    height: 54,
                    backgroundColor:AppConstants.loginHeaderBlue,
                    marginVertical:10,
                    borderRadius: 6,
                    padding:10,
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    elevation:5,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }} 
                activeOpacity={0.8}
                onPress = {() => {goToNext()}}
                disabled= {false}
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                    Next
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
            </View>
            <Animated.View style={{width:100, height:showViewAnimator}}/>
            </>)}
            </Formik>
            </View>
            </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    bullets : {

    }
})