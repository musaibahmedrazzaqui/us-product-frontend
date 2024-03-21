import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    Image
} from 'react-native'
import { AppConstants } from '../../../assets/AppConstants'
import { Entypo, Feather } from '@expo/vector-icons'; 
import {useRef, useState} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AntDesign } from '@expo/vector-icons'
const SignupSchema = Yup.object().shape({
    nextOfKinPhoneNumber: Yup.string().min(10).max(10).matches(/^[0-9]+$/).required(),
  });


export default function SignupNextOfKinPhoneNumber({goToNext, goToPrev} : {goToNext : ()=>void, goToPrev : ()=>void}){
    const emailInputRef = useRef<any>()
    return(
        <KeyboardAvoidingView behavior='height' style={{
            width:Dimensions.get('window').width,
            height:'100%',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            paddingHorizontal:30
            }}>
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
                    SmartRupee Onboarding
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Next of Kin mobile number
                </Text>
                <Formik
                initialValues={{ nextOfKinPhoneNumber: '3244534808' }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values)
                    Keyboard.dismiss()
                    goToNext()
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                {  
                <View style={{
                    width: '100%', 
                    flexDirection:'row',
                    marginTop:40, 
                    borderWidth:1,
                    borderColor: touched.nextOfKinPhoneNumber ? (errors.nextOfKinPhoneNumber ? 'red' : '#19C18F' ) : '#DDDDDD',
                    borderRadius: 6,
                }}>
                <View style={{
                    height: 64,
                    width:'25%',
                    alignItems:'center',
                    justifyContent : 'center',
                    flexDirection:'row',
                    marginHorizontal:5
                }}>
                    <Image style={{}} source={require('../../../assets/images/PK.png')}/>
                    <Text style={{fontFamily:'ArialNova', fontSize:16}}>
                         {'\t'}{'+92'}
                    </Text>
                </View>
                <TextInput 
                ref={emailInputRef}
                style={{...GlobalStyles.textInputStyle, width:'55%', borderWidth:0, paddingHorizontal:0}}
                placeholder=""
                onChangeText={handleChange('nextOfKinPhoneNumber')}
                onBlur={handleBlur('nextOfKinPhoneNumber')}
                value={ `${values.nextOfKinPhoneNumber}`}
                autoCapitalize="none"
                keyboardType='phone-pad'
                />
                <View style={{
                    height: 64,
                    width:'20%',
                    alignItems:'center',
                    justifyContent : 'center'
                }}>
                    {(touched.nextOfKinPhoneNumber) ? 
                    (errors.nextOfKinPhoneNumber ? 
                        <AntDesign name='close' size={24} color={'red'}/> :
                        <AntDesign name='check' size={24} color={'#19C18F'}/> 
                    ) :
                   <></>
                }
                </View>
                </View>
                }
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
                onPress = {() => {handleSubmit(); }}
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                    Next
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
            </View>
            </>)}
            </Formik>
        </KeyboardAvoidingView>
    )
}