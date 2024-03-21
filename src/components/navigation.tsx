import "react-native-gesture-handler"

import React, { useContext, useEffect, useState } from "react"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Login from "../screens/login"
import Registration from "../screens/registration"
import Dashboard from "../screens/dashboard"
import { AuthContext } from "./authProvider"
//import Settings from "./Routes/Settings"
import FlashMessage from "react-native-flash-message"
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  StatusBar,
  ActivityIndicator
} from "react-native"
import IntroCarousel from "../screens/IntroCarousel"
import SignupScreen from "../screens/SignupScreen"
import DashboardTabNavigator from "../Navigators/DashboardTabNavigator"
import AlpacaService from "../../api/lib/AlpacaService"
import OutOfService from "../screens/OutOfService"
import PendingVerificationScreen from "../screens/PendingVerificationScreen"
import InformationRequestScreen from "../screens/InformationRequestScreen"
import UserService from "../../api/lib/UserService"
import publicIP from 'react-native-public-ip';
import * as SecureStore from 'expo-secure-store'
import * as Sentry from 'sentry-expo';
import OnfidoScreen from "../screens/OnfidoScreen"
import AlpacaBalanceService from "../../api/lib/AlpacaBalanceService"
import ContactUsScreen from "../screens/ContactUsScreen"
import PostHog, { PostHogProvider, usePostHog } from 'posthog-react-native'
import VerificationScreen from "../screens/verification"
import ReferralCodeScreen from "../screens/ReferralCodeScreen"
import ReferralService from "../../api/lib/ReferralService"

const Stack = createStackNavigator<RootStackParamList>()
export type RootStackParamList = {
  Home: undefined
  Login: {
    refresh?: boolean
    aal?: "aal2"
  }
  Registration: undefined
  Settings: undefined
  Intro: undefined
  Onboarding: undefined
  Dashboard : undefined
  Pending : undefined
  InformationRequest : undefined
}

const options = {}

const linking = {
  // This is only used for e2e testing.
  prefixes: ["http://127.0.0.1:4457/"],
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FEFEFE',
  },
};
export default ({onReady, reference} : any) => {
  // import { AuthContext } from './AuthProvider'
  const { isAuthenticated, session, setSession } = useContext(AuthContext)
  // if (session) session.identity.traits.onboarding = 'sent'
  const [userEmail, setUserEmail] = useState(session?.identity.traits.email)
  const [accountId, setAccountId] = useState(null)
  const [idFetch, setIdFetch] = useState(false)
  const [accountObject, setAccountObject] = useState(null)
  const [ip, setip] = useState<string>()
  const [subscribed,setSubscribed]=useState(null)
  const[portfolioid,setPortfolioid]=useState(null)

  useEffect(() => {
    if (Platform.OS !== 'web') {
      publicIP()
        .then(ip => {    
          Sentry.Native.setUser({
            id: session?.identity?.id,
            email: session?.identity?.traits.email,
            ip_address: ip
          });
          setip(ip);
        })
        .catch(error => console.error('Error getting public IP:', error));
    }
  }, [session]);

  useEffect(()=>{
    console.log("SESSION",session)
    if (session) {
      AlpacaService
        .getAccountId(session?.identity.traits.email)
        //.getAccountId("affan.syed.usc@gmail.com")
        .then(cb => {
          console.log("CB",cb)
          setAccountId(cb.id); 
          setSubscribed(cb.is_subscribed)
          setPortfolioid(cb.portfolio_details?.portfolio_id)
          console.log("Account Id fetched, should navigate to dashboard")
          AlpacaBalanceService.getAccount(cb.id).then(cb => {setAccountObject(cb);setIdFetch(true)}).catch((cb) => {setIdFetch(true); console.log(cb)})
        })
        .catch(cb => {
          setIdFetch(true)
          console.log("No account Id.")
        })
        
    }else if(!isAuthenticated){
      console.log("in else")
      setAccountId(null)
      setUserEmail(null)
      setIdFetch(false)
    }
  },[session])
  const referralService = new ReferralService(session?.identity.traits.email,session?.identity.traits.phone)
  useEffect(() => {
    console.log(JSON.stringify({
      idFetch,
      accountId,
      traits : session?.identity.traits
    },null,2))
  },[session, accountId])
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <NavigationContainer linking={linking} theme={MyTheme} ref={reference} onReady={onReady} >
        {/* <PostHogProvider 
        apiKey="phc_IN2Go1CZlfpsnCXnQsQxZcbjH8IQQnQHljUnhTLJKl5" 
        autocapture
        > */}
          {Platform.OS === 'android' && <StatusBar translucent={true} backgroundColor={'transparent'}/>}
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            // initialRouteName={'Intro'}
          >
            {session ?
            

            (
              (!idFetch) ? 
              <Stack.Screen name="Loading" options={options}>
               {(props)=> <View style={{flex:1, alignItems:'center',justifyContent:'center'}} onLayout={()=>{console.log("Fetching Id/Showing Activity Indicator")}}>
                      <ActivityIndicator size={'large'} color={'#004DBC'}/>
                    </View>}
              </Stack.Screen>
              :
              
              (  session.identity.traits.onboarding === "complete" ?
            
            ( accountId ?
              <>
              <Stack.Screen name="Dashboard" options={options}>
                {(props)=> <DashboardTabNavigator {...props} accountId={accountId} isSubscribed={subscribed} portfolioid={portfolioid}/>}
              </Stack.Screen>
              <Stack.Screen name="ContactUs" options={options}>
                {(props) => <ContactUsScreen {...props}/>}
              </Stack.Screen>
              </>
              :<>

            <Stack.Screen name="Out Of Service" options={options}>
                {(props)=> <OutOfService {...props} accountId={accountId}/>}
              </Stack.Screen>
              </>
            )
              
              
              :

              (
                ((session.identity.traits.onboarding === 'sent') || (session.identity.traits.onboarding === 'submitted'))  ?
                <>
                { accountObject && accountObject.status === 'ONBOARDING' ?
                <>
                <Stack.Screen name="Onfido Screen" options={options}>
                  {props => <OnfidoScreen {...props}/>}
                </Stack.Screen>
                <Stack.Screen name="Pending" options={options}>
                {(props) => <PendingVerificationScreen {...props} backButtonFunction={()=>setSession(null)}/>}
                </Stack.Screen>
                </>
                :
                <>
                  <Stack.Screen name="Pending" options={options}>
                  {(props) => <PendingVerificationScreen {...props} backButtonFunction={()=>setSession(null)}/>}
                  </Stack.Screen>
                  <Stack.Screen name="ContactUs" options={options}>
                  {(props) => <ContactUsScreen {...props}/>}
                </Stack.Screen>
                  </>
                
                }
                  

                </>
                :
              <>
              {( session.identity.traits.onboarding === 'failed' ? 
              <Stack.Screen name="InformationRequest" component={InformationRequestScreen} />
              :
              <>
              
              <Stack.Screen name="Referral" options={options}>
                {props => <ReferralCodeScreen {...props} IP = {ip} referralService={referralService}/>}
              </Stack.Screen>
              <Stack.Screen name="Onboarding" options={options}>
                {props => <SignupScreen {...props} IP = {ip}/>}
              </Stack.Screen>
              <Stack.Screen name="Onfido Screen" component={OnfidoScreen} options={options}/>
              <Stack.Screen name="ContactUs" options={options}>
                {(props) => <ContactUsScreen {...props}/>}
              </Stack.Screen>
              </>
              )}
              </>
              )
              
              
              ))
            
            :
            <>
             {/* <Stack.Screen name="Onboarding" component={SignupScreen} options={options}/> */}
             
             {/* <Stack.Screen name="Onfido Screen" options={options}>
                  {props => <OnfidoScreen {...props}/>}
                </Stack.Screen> */}
            
            
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="ContactUs" options={options}>
                {(props) => <ContactUsScreen {...props}/>}
              </Stack.Screen>
             
            <Stack.Screen name="Intro" component={IntroCarousel} options={options}/>
            <Stack.Screen name="Registration" component={Registration} />
            
            </>
            }
            {

            }
            
          </Stack.Navigator>
          {/* </PostHogProvider> */}
        </NavigationContainer>
      </TouchableWithoutFeedback>
      <View data-testid={"flash-message"}>
        <FlashMessage position="top" floating />
      </View>
    </KeyboardAvoidingView>
  )
}
