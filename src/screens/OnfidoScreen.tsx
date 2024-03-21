import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native'
import {
    Onfido,
    OnfidoCaptureType,
    OnfidoCountryCode,
    OnfidoDocumentType,
  } from '@onfido/react-native-sdk';
import AlpacaService from '../../api/lib/AlpacaService';
import { useContext } from 'react';
import { AuthContext } from '../components/authProvider';
import AuthScreenWrapper from '../ScreenWrappers/AuthScreenWrapper';
import { ScrollView } from 'react-native-gesture-handler';
import { AppConstants } from '../../assets/AppConstants';
import { Feather } from '@expo/vector-icons'
import { useState, useRef, useEffect } from 'react';
import SignupLastScreen from './SignupScreen/SignupComponents/SignupLastScreen';
import ResponseModal from '../components/ResponseModal';
import { usePostHog } from 'posthog-react-native';

const OnfidoScreen = ({navigation, route} : any) => { 
    const location = useRef(new Animated.Value(0)).current
    const [locationState, setLocationState] = useState(0)
    const [showResponseModal, setResponseModal] = useState(false)
    const [responseModalConfig, setResponseModalConfig] = useState({
        isSuccess : null,
        message : "",
        subMessage : ""
    })
    let account_details = route.params?.account_details
    const { isAuthenticated, session, setSession } = useContext(AuthContext)
    const [disableButton, setDisableButton] = useState(false)
    function launchResponseModal({message, subMessage, isSuccess} : any) {
        setResponseModalConfig({
            message,
            subMessage,
            isSuccess
        })
        setResponseModal(true)
    }

    const OnfidoFlow = async () => {
        setDisableButton(true)
        const alpacaId = account_details ? account_details.id : (await AlpacaService.getAccountId(session?.identity.traits.email)).id
        console.log(alpacaId)
        const onfidoToken = await AlpacaService.getOnfidoToken(alpacaId)
        console.log(onfidoToken)
        let onfidoResponse
        
        // try {
            
        //     onfidoResponse = await Onfido.start({
        //         sdkToken : onfidoToken.token,
        //         flowSteps : {
        //             welcome : true,
        //             captureFace : {
        //                 type : OnfidoCaptureType.PHOTO
        //             },
        //             captureDocument : {
        //                 docType : OnfidoDocumentType.NATIONAL_IDENTITY_CARD,
        //                 countryCode : OnfidoCountryCode.PAK
    
        //             }
        //         }
        //     })
        // }catch(e : any){
        //     console.log("SDK_ERROR",JSON.stringify(e,null,2))
        //     if (e.message === 'User canceled flow.'){
        //         await AlpacaService.patchOnfidoToken(alpacaId, {
        //             outcome : 'USER_EXITED',
        //             token : onfidoToken.token
        //         })
        //     }else{
        //         await AlpacaService.patchOnfidoToken(alpacaId, {
        //             outcome : 'SDK_ERROR',
        //             token : onfidoToken.token
        //         })
        //         launchResponseModal({
        //             message:'Some error occurred.',
        //             subMessage:'Email us if this error persists.',
        //             isSuccess:false
        //         })
        //     }
            
        //     setDisableButton(false)
        //     return
        // }
        // try {
        //     await AlpacaService.patchOnfidoToken(alpacaId,{
        //         outcome : "USER_COMPLETED",
        //         token : onfidoToken.token
        //     })
        //     setLocationState(-1)
            
        // }catch(e){
        //     console.log("ERROR IN PATCH",JSON.stringify(e,null,2))
        //     launchResponseModal(AppConstants.GenericErrorResponse)
        //     setDisableButton(false)
        // }
        
        
    }
    function goToNextScreen(locationState: number) {
        Animated.timing(location, {
            toValue: locationState,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        goToNextScreen(locationState)
    }, [locationState])

    const posthog = usePostHog()
    return(
        <AuthScreenWrapper navigation={navigation} showLogoutButton = {true} backButtonFunction={() => {setSession(null); posthog?.reset()}}>
            <ResponseModal show={showResponseModal} closeModal={()=>setResponseModal(false)} {...responseModalConfig} />
            <View style={{
                width: Dimensions.get('window').width,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                height: '100%',
                overflow: 'hidden',
            }}>
            <Animated.View style={{flexDirection:'row', width:'100%',justifyContent:'flex-start', alignItems:'flex-start', flex:1, transform: [{
                        translateX: Animated.multiply(Dimensions.get('window').width, location)
                    }],}}>
            <View style={{width:'100%'}}>
            <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator = {false}>
                <View onStartShouldSetResponder={()=>true} style={{paddingHorizontal:20}}>
                <View style={{
                    marginBottom:20
                }}>
                    <Image source={require('../../assets/images/tree.png')} style={{height:36,width:36}}/>
                </View>

                <Text style={{
                    width:'100%',
                    fontFamily:'PlayfairDisplay_700Bold',
                    fontSize:32,
                    color:AppConstants.loginHeaderBlue,
                    marginBottom:20

                }}>
                    SmartInvest{'\n'}Onboarding
                </Text>
            <Text style={{ fontFamily:'ArialNova', lineHeight:32, fontSize:18}}>
            To complete your application, we require you to undergo a verification process that includes taking a clear picture of your government-issued photo ID and a live photo of yourself.  Make sure you have your Photo ID on hand. To begin the verification process, press the 'Start Verification' button whenever you're ready.
            </Text>
            <TouchableOpacity style={{
                    width:'100%',
                    marginTop:30,
                    height: 54,
                    backgroundColor:AppConstants.loginHeaderBlue,
                    marginVertical:10,
                    borderRadius: 6,
                    padding:10,
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between'
                }} 
                activeOpacity={0.8}
                onPress = {OnfidoFlow}
                disabled={disableButton}
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                    Start Verification
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
        </View>
        </ScrollView>
        </View>


        <SignupLastScreen goToNext={() => setSession(null)} goToPrev= { () => setSession(null)}/>
        </Animated.View>
        </View>
      </AuthScreenWrapper>
    )
}

export default OnfidoScreen