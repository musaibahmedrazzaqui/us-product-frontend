import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { LogBox, Platform } from 'react-native';
import Login from './src/screens/login';
import Dashboard from './src/screens/dashboard';
import ProjectProvider from './src/components/projectProvider';
import AuthProvider from './src/components/authProvider';
import Navigation from './src/components/navigation';
import { PlayfairDisplay_700Bold, useFonts} from '@expo-google-fonts/playfair-display'
import {decode, encode} from 'base-64'
import { useEffect, useRef, useState } from 'react';
import { View,ActivityIndicator } from 'react-native';
import * as Sentry from 'sentry-expo';
import UpdateAppModal from './src/components/UpdateAppModal';

// const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation();
// Sentry.init({
//   dsn: 'https://84d9a69baa4043c8a4aa23e6273c0b80@o4504705561329664.ingest.sentry.io/4504708164419584',
//   enableInExpoDevelopment: true,
//   debug: false,// If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
//   enableNative:true,
//   integrations: [
//     new Sentry.Native.ReactNativeTracing({
//       //Pass instrumentation to be used as `routingInstrumentation`
//       routingInstrumentation,
//      // ...
//     }),
//   ],
//   tracesSampleRate: 0.001, 
// });

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}
import { 
  Overpass_100Thin,
  Overpass_100Thin_Italic,
  Overpass_200ExtraLight,
  Overpass_200ExtraLight_Italic,
  Overpass_300Light,
  Overpass_300Light_Italic,
  Overpass_400Regular,
  Overpass_400Regular_Italic,
  Overpass_600SemiBold,
  Overpass_600SemiBold_Italic,
  Overpass_700Bold,
  Overpass_700Bold_Italic,
  Overpass_800ExtraBold,
  Overpass_800ExtraBold_Italic,
  Overpass_900Black,
  Overpass_900Black_Italic
} from '@expo-google-fonts/overpass'

import {
  Exo_100Thin,
  Exo_200ExtraLight,
  Exo_300Light,
  Exo_400Regular,
  Exo_500Medium,
  Exo_600SemiBold,
  Exo_700Bold,
  Exo_800ExtraBold,
  Exo_900Black,
  Exo_100Thin_Italic,
  Exo_200ExtraLight_Italic,
  Exo_300Light_Italic,
  Exo_400Regular_Italic,
  Exo_500Medium_Italic,
  Exo_600SemiBold_Italic,
  Exo_700Bold_Italic,
  Exo_800ExtraBold_Italic,
  Exo_900Black_Italic,
} from '@expo-google-fonts/exo';


//Polyfills for react-native

//https://github.com/facebook/react-native/issues/2392
import 'react-native-url-polyfill/auto';
import axios from 'axios';
// import SpInAppUpdates, {
//   NeedsUpdateResponse,
//   IAUUpdateKind,
//   StartUpdateOptions,
// } from 'sp-react-native-in-app-updates';

// const inAppUpdates = new SpInAppUpdates(
//   false // isDebug
// );
const APP_VERSION = '15'

const Stack = createNativeStackNavigator()

function App() {
  const navigationRef = useRef()
  let [fontsLoaded] = useFonts({
  Overpass_100Thin,
  Overpass_100Thin_Italic,
  Overpass_200ExtraLight,
  Overpass_200ExtraLight_Italic,
  Overpass_300Light,
  Overpass_300Light_Italic,
  Overpass_400Regular,
  Overpass_400Regular_Italic,
  Overpass_600SemiBold,
  Overpass_600SemiBold_Italic,
  Overpass_700Bold,
  Overpass_700Bold_Italic,
  Overpass_800ExtraBold,
  Overpass_800ExtraBold_Italic,
  Overpass_900Black,
  Overpass_900Black_Italic,
  PlayfairDisplay_700Bold,
  Exo_100Thin,
  Exo_200ExtraLight,
  Exo_300Light,
  Exo_400Regular,
  Exo_500Medium,
  Exo_600SemiBold,
  Exo_700Bold,
  Exo_800ExtraBold,
  Exo_900Black,
  Exo_100Thin_Italic,
  Exo_200ExtraLight_Italic,
  Exo_300Light_Italic,
  Exo_400Regular_Italic,
  Exo_500Medium_Italic,
  Exo_600SemiBold_Italic,
  Exo_700Bold_Italic,
  Exo_800ExtraBold_Italic,
  Exo_900Black_Italic,
  'ArialNova': require('./assets/Fonts/ArialNova.ttf'),
  'ArialNova-Bold': require('./assets/Fonts/ArialNova-Bold.ttf'),
  'ArialNova-Light' : require('./assets/Fonts/ArialNova-Light.ttf')
  });
  const [allowedVersions, setAllowedVersions] = useState(null)
  useEffect(() => {
    // inAppUpdates.checkNeedsUpdate().then((result) => {
    //   if (result.shouldUpdate) {
    //     let updateOptions: StartUpdateOptions = {};
    //     if (Platform.OS === 'android') {
    //       // android only, on iOS the user will be promped to go to your app store page
    //       updateOptions = {
    //         updateType: IAUUpdateKind.FLEXIBLE,
    //       };
    //     } else if (Platform.OS === 'ios') {
    //       // iOS specific configuration
    //       updateOptions = {
    //         title: 'Update available',
    //         message: 'There is a new version of the app available on the App Store, do you want to update it?',
    //         buttonUpgradeText: 'Update',
    //         buttonCancelText: 'Cancel',
    //       };
    //     }
    //     inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
    //   }
    // });
    // if(Platform.os)
    // axios.get('https://support.elphinstone.us/v1/contact-us/fetchVersions').then(cb => setAllowedVersions(cb.data))
    if (Platform.OS != 'web') {
      axios.get('https://support.elphinstone.us/v1/contact-us/fetchVersions')
        .then(response => setAllowedVersions(response.data))
        .catch(error => console.error('Error fetching versions:', error));
    }
  },[])
  if (!fontsLoaded) {
    return (<View style={{flex:1, alignItems:'center',justifyContent:'center'}} onLayout={()=>{console.log("Fetching Id/Showing Activity Indicator")}}>
    <ActivityIndicator size={'large'} color={'#004DBC'}/>
  </View>)
  }
   
  return (
    <ProjectProvider>
  <AuthProvider>
    {allowedVersions && (
      Platform.OS === 'ios'
        ? !allowedVersions.allowed_versions_apple.includes(APP_VERSION)
        : !allowedVersions.allowed_versions_android.includes(APP_VERSION)
    ) ? (
      <>
      
       <UpdateAppModal show={true} />
      </>
    ) : (
      <>
      
        {/* <TermsConditionsModal show={true} /> */}
        <Navigation
          reference={navigationRef}
          // onReady={() => {
          //   // Register the navigation container with the instrumentation
          //   routingInstrumentation.registerNavigationContainer(navigationRef);
          // }}
        />
      </>
    )}
  </AuthProvider>
</ProjectProvider>

  );
}

export default App;