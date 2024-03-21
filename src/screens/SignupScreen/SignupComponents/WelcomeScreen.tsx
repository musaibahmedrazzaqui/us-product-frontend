import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { AppConstants, humanReadableDate } from '../../../../assets/AppConstants';
import { Entypo, Feather } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import UserService from '../../../../api/lib/UserService';
import { AuthContext } from '../../../components/authProvider';
import { useContext, useState } from 'react';
import { usePostHog } from 'posthog-react-native';
export default function SignupWelcomeScreen({goToNext, userFetched, userData,IP } : {goToNext : ()=>void, userFetched : boolean, userData : any, IP :string}){
    const { session } = useContext(AuthContext)
    const createMe = async () => {
        await UserService.createUser({
            _id : session?.identity.id,
            email : session?.identity.traits.email,
            phone : session?.identity.traits.phone,
            ip_address : IP,
            preference : 'conventional',
            risk_tolerance_level : "The Moderate",
            meta : {
                profile_start_ts : humanReadableDate(Date.now())
            }
            // funding_source : 'employment_income'
        })
    }
    const posthog = usePostHog()
    const [disableMe, setDisableMe] = useState(false)
    return(
        <KeyboardAvoidingView behavior='height' style={{
            width:Dimensions.get('window').width,
            height:'100%',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            paddingHorizontal:30
            }}>
                <ScrollView style={{width:'100%'}} horizontal={false}>
                  <View onStartShouldSetResponder={() => true}>
                    
                <Text style={{
                    width:'100%',
                    fontFamily:'PlayfairDisplay_700Bold',
                    fontSize:32,
                    color:AppConstants.loginHeaderBlue

                }}>
                    Welcome to {'\n'}
                    Elphinstone US
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Congratulations on taking the first step towards taking control of your financial future! You've made the right decision to use Elphinstone’s US Investments product to help you achieve your financial freedom. We’ll just set you up
                by asking some important questions.
                {'\n'}
                So let’s do it ...
                </Text>

                <TouchableOpacity style={{
                    width:'100%',
                    marginTop:50,
                    height: 54,
                    backgroundColor:AppConstants.loginHeaderBlue,
                    marginVertical:10,
                    borderRadius: 6,
                    padding:10,
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    opacity : (userFetched && !disableMe) ? 1 : 0.5
                }} 
                activeOpacity={0.8}
                onPress = {() => {
                    setDisableMe(true)
                    posthog?.capture('Onboarding started')
                    createMe().catch(() => {})
                    .finally(() => {setDisableMe(false); goToNext()})

                }}
                disabled = {!userFetched && disableMe}
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                    Let's get started
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
            </View>  
                </ScrollView>
        </KeyboardAvoidingView>
    )
}