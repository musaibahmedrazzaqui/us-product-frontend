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


  const ControlledTooltip: React.FC<TooltipProps | any> = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Tooltip
        visible={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        {...props}
        popover={<ToolTipComponent setSelectedStatus={(value : string)=>{props.setSelectedStatus(value); setOpen(false)}}/>}
      />
    );
  };

  function ToolTipComponent({setSelectedStatus} : {setSelectedStatus : any}) {
    // const MaritalStatuses = ['Islam', 'Hinduism', 'Christianity','Sikhism','Buddhism','Other']

    const ItemComponent = ({item} : {item : string}) =>{
        return (
            <TouchableOpacity onPress={()=>setSelectedStatus(item)} style={{height:60, justifyContent:'center', borderBottomColor: '#DFE0EB', borderBottomWidth:1,padding:10}}>
                <Text style={{fontFamily:'ArialNova', color:'#8692A6'}}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <ScrollView style={{width:'100%',height:'100%'}} showsVerticalScrollIndicator={false}>
            {ListOfCountries.map((item,index) => <ItemComponent item = {item} key={index}/>)}
        </ScrollView>
    )
}

export default function SignupFACTAFollowUps({goToNext, goToPrev} : {goToNext : ()=>void, goToPrev : ()=> void}){
    const SSNInputRef = useRef<any>()
    const OtherTaxIDRef = useRef<any>()
    const NoTaxIDReasonRef = useRef<any>()
    const AttorneyNameRef = useRef<any>()
    const AttorneyAddressRef = useRef<any>()
    const scrollViewRef = useRef<any>()
    const scrollPositionY = useRef<any>()
    const [isUSCitizen,setUSCitizen] = useState<boolean | null>(null)
    const [isUSPR,setUSPR] = useState<boolean | null>(null)
    const [isUSTR,setUSTR] = useState<boolean | null>(null)
    const [isUSBorn,setUSBorn] = useState<boolean | null>(null)
    const [isOtherResident,setIsOtherResident] = useState<boolean | null>(null)
    const [doesHaveAttorney,setDoesHaveAttorney] = useState<boolean | null>(null)
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const keyboardHeight = useKeyboard()
    const showViewAnimator = useRef(new Animated.Value(0)).current

    const SignupSchema = Yup.object().shape({
        SSN: (isUSCitizen || isUSPR || isUSTR || isUSBorn) ? Yup.string().min(9).max(9).matches(/^[0-9]+$/).required() : Yup.string(),
        OtherTaxID: Yup.string(),
        noTaxIDReason : Yup.string()
    
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
                FATCA follow-up questions
                </Text>
                <Formik
                initialValues={{ 
                    SSN: '012345678',
                    OtherTaxID: '' ,
                    noTaxIDReason: '',
                    attorneyName : '',
                    attorneyAddress : ''
                
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
                    paddingTop:20
                }}>
                    {'\u25CF'} US citizen {'\n'}
                </Text>
                <BooleanSelector value={isUSCitizen} setValue={setUSCitizen}/>

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    paddingTop:20
                }}>
                    {'\u25CF'} US permanent resident {'\n'}
                </Text>
                <BooleanSelector value={isUSPR} setValue={setUSPR}/>

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    paddingTop:20
                }}>
                    {'\u25CF'} US tax resident {'\n'}
                </Text>
                <BooleanSelector value={isUSTR} setValue={setUSTR}/>

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    paddingTop:20
                }}>
                    {'\u25CF'} Were you born in the United States? {'\n'}
                </Text>
                <BooleanSelector value={isUSBorn} setValue={setUSBorn}/>
            
                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    paddingTop:20
                }}>
                    {'\u25CF'} What is your Social Security Number? {'\n'}
                    <Text style={{fontSize:12}}> {'     '}(required if any of the answer above is Yes)</Text> {'\n'}
                </Text>
                
                <CustomTextInput
                reference = {SSNInputRef}
                touched = {touched.SSN}
                errors = {errors.SSN}
                value = {values.SSN}
                handleBlur={handleBlur('SSN')}
                handleChange= {handleChange('SSN')}
                keyboardType='numeric'
                placeholder={'e.g., 388-19-1625'}
                />

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    paddingTop:20
                }}>
                    {'\u25CF'} Are you resident of any country other than Pakistan and the United States {'\n'}
                </Text>
                <BooleanSelector value={isOtherResident} setValue={setIsOtherResident}/>
                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    marginTop:50
                }}>
                    {" "} If yes, enter the following: {'\n'}
                </Text>

                <CustomSelector
                setValue = {setSelectedCountry}
                selectedValue = {selectedCountry}
                itemList= {ListOfCountries}
                />

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    paddingTop:20
                }}>
                    {'\u25CF'} Tax ID (optional) {'\n'}
                </Text>

                <CustomTextInput
                reference={OtherTaxIDRef}
                touched = {touched.OtherTaxID}
                errors = {errors.OtherTaxID}
                value = {values.OtherTaxID}
                handleBlur = {handleBlur('OtherTaxID')}
                handleChange = {handleChange('OtherTaxID')}
                placeholder= "e.g., 927762033"
                
                />

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    paddingTop:20
                }}>
                    {'\u25CF'} Reason you do not have a Tax ID (optional) {'\n'}
                </Text>

                <CustomTextInput
                reference={NoTaxIDReasonRef}
                touched = {touched.noTaxIDReason}
                errors = {errors.noTaxIDReason}
                value = {values.noTaxIDReason}
                handleBlur = {handleBlur('noTaxIDReason')}
                handleChange = {handleChange('noTaxIDReason')}
                placeholder='Specify the reason for not having a Tax ID'
                />
                

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    marginTop:40
                }}>
                    {'\u25CF'} Have you given power of attorney to any individual residing overseas? {'\n'}
                </Text>
                <BooleanSelector
                value={doesHaveAttorney}
                setValue={setDoesHaveAttorney}
                />

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:18,
                    marginTop:50
                }}>
                    {" "} If yes, what is their name and address: {'\n'}
                </Text>

                <CustomTextInput
                reference={AttorneyNameRef}
                touched = {touched.attorneyName}
                errors = {errors.attorneyName}
                value = {values.attorneyName}
                handleBlur = {handleBlur('attorneyName')}
                handleChange = {handleChange('attorneyName')}
                placeholder= "Name"
                
                />

                <CustomTextInput
                reference={AttorneyAddressRef}
                touched = {touched.attorneyAddress}
                errors = {errors.attorneyAddress}
                value = {values.attorneyAddress}
                handleBlur = {handleBlur('attorneyAddress')}
                handleChange = {handleChange('attorneyAddress')}
                placeholder= "Address"
                
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