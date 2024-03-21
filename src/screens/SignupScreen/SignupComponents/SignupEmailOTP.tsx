import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Image,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import { AppConstants } from '../../../../assets/AppConstants';
import { Entypo, Feather } from '@expo/vector-icons'; 
import {useEffect, useRef, useState} from 'react'
import LottieView from 'lottie-react-native';
  const digitInputStyle = {
  height: 64,
  borderWidth: 1,
  borderColor: '#DDDDDD',
  borderRadius: 6,
  fontSize:32,
  width:'14.285%', 
  textAlign:'center',
  padding:10
}

export default function SignupEmailOTP({goToNext, goToPrev, onSubmit} : {goToNext? : ()=>void, goToPrev? : ()=>void, onSubmit : any}){
    const [OTP, setOTP] = useState<string>('')
    const OTPInputRef = useRef<any>()
    const [isFieldDisabled, setFieldDisabled] = useState(false)
    const [OTPResponse, setOTPResponse] = useState<string>('')
    function handleSubmit(value : string) {
        setOTP(value)
        if (value.length < 6){ 
            setOTPResponse('')
            return
        }
        setFieldDisabled(true)
        onSubmit(value)
        Keyboard.dismiss()
    }

    const onFieldPress = () =>{
        !isFieldDisabled && OTPInputRef.current.focus()
    }
    const tickAnimationPath = '../../../../assets/success_anim.json'
    const crossAnimationPath = '../../../../assets/failed_anim.json'

    return(
        <KeyboardAvoidingView behavior='height' style={{
            width:Dimensions.get('window').width,
            height:'100%',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            paddingHorizontal:20
            }}>
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
                    Elphinstone{'\n'}Onboarding
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Let’s verify your email address
                </Text>

                <View style={{
                    width: '100%', 
                    flexDirection:'row',
                    marginTop:40, 
                    borderRadius: 6,
                    justifyContent:'space-between'
                }}>
                
                
                <Text
                style={{...digitInputStyle, borderColor:OTPResponse ==='failed' ? 'red' : '#19C18F'}}
                onPress={onFieldPress}
                >
                {OTP[0]}
                </Text>

                <Text
                style={{...digitInputStyle, borderColor: OTPResponse ==='failed' ? 'red' : (OTP.length > 0 ? '#19C18F' : '#ddd')}}
                onPress={onFieldPress}
                >
                {OTP[1]}
                </Text>

                <Text
                style={{...digitInputStyle, borderColor: OTPResponse ==='failed' ? 'red' : (OTP.length > 1 ? '#19C18F' : '#ddd')}}
                onPress={onFieldPress}
                >{OTP[2]}</Text>

                <Text
                style={{...digitInputStyle, borderColor: OTPResponse ==='failed' ? 'red' : (OTP.length > 2 ? '#19C18F' : '#ddd')}}
                onPress={onFieldPress}>
                    {OTP[3]}
                </Text>
                
                <Text
                style={{...digitInputStyle, borderColor: OTPResponse ==='failed' ? 'red' : (OTP.length > 3 ? '#19C18F' : '#ddd')}}
                onPress={onFieldPress}>
                    {OTP[4]}
                </Text>
                
                <Text
                style={{...digitInputStyle, borderColor: OTPResponse ==='failed' ? 'red' : (OTP.length > 4 ? '#19C18F' : '#ddd')}}
                onPress={onFieldPress}>
                    {OTP[5]}
                </Text>
                
                </View>
                
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:12,
                    lineHeight:18,
                    color:'#1E293B',
                    marginTop:10
                }}
                >
                Please enter the 6-digit verification code we just 
                sent to your email.
                </Text>
                {
                    OTPResponse === 'success' &&
                <LottieView
                autoPlay
                style={{
                paddingTop:20,
                width: 100,
                height: 100,
                }}
                loop={false}
                onAnimationFinish={()=>{
                    goToNext()
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require(tickAnimationPath)}
                />
                }
                {
                    OTPResponse === 'failed' &&
                <LottieView
                autoPlay
                style={{
                paddingTop:20,
                width: 100,
                height: 100,
                }}
                loop={false}
                // Find more Lottie files at https://lottiefiles.com/featured
                onAnimationFinish={()=>{
                    setFieldDisabled(false)
                }}
                source={require(crossAnimationPath)}
                />
                }
            
            <TextInput
            ref={OTPInputRef}
            style={{color:'transparent'}}
            onChangeText={handleSubmit}
            value={OTP}
            onBlur={()=>{}}
            autoCapitalize="none"
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            maxLength={6}
            caretHidden={true}
            
            >

            </TextInput>
        </KeyboardAvoidingView>
    )
}