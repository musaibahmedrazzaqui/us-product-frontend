import React,{useState, useEffect, useRef, useContext} from 'react';
import { Text, View, Modal, Image, StatusBar, Platform, Button, Touchable, TouchableOpacity } from 'react-native';
import { NavigationContainer , DefaultTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './DashboardTabNavigator/CustomTabBar';
import Constants from 'expo-constants'
import {EvilIcons} from '@expo/vector-icons'
import AppDashboardHome from '../screens/AppDashboardHome';
import AppDashboardAddFunds from '../screens/AppDashboardAddFunds';
import AppDashboardInvest from '../screens/AppDashboardInvest';
import AppDashboardWithdraw from '../screens/AppDashboardWithdraw';
import AppDashboardMarkets from '../screens/AppDashboardMarkets';
import AppDashboardNewsScreen from '../screens/AppDashboardNewsScreen';
import {AntDesign, Feather} from '@expo/vector-icons'
import AppDashboardMyPortfolio from '../screens/AppDashboardMyPortfolio';
import AppDashboardMyPortfolioEquities from '../screens/AppDashboardMyPortfolioEquities';
import AppDashboardIndividualStock from '../screens/AppDashboardIndividualStock';
import AppDashboardUserProfile from '../screens/AppDashboardUserProfile';
import AppDashboardAccountStatements from '../screens/AppDashboardAccountStatements';
import AppDashboardEditProfile from '../screens/AppDashboardEditProfile';
import AppDashboardSell from '../screens/AppDashboardSell';
import AlpacaService from '../../api/lib/AlpacaService';
import { StockDictionary } from '../Interfaces/StockDictionaryInterface';
import { UserPostion } from '../Interfaces/UserPositionInterface';
import AppDashboardMyTransactions from '../screens/AppDashboardTransactions';
import { AuthContext } from "../components/authProvider";
import AlpacaBalanceService from '../../api/lib/AlpacaBalanceService';
import AlpacaBrokerAPIService from '../../api/lib/AlpacaBrokerAPIService';
import MiscService from '../../api/lib/MiscService';
import UserService from '../../api/lib/UserService';
import AlpacaDocumentService from '../../api/lib/AlpacaDocumentsService';
import { usePostHog } from 'posthog-react-native';
import AppDashboardWithdrawSelect from '../screens/AppDashboardWithdrawals';
import ServiceDownModal from '../components/ServiceDownModal';
import TermsConditionsModal from '../components/TermsAndConditionsModal';
import ReferralBonusModal from '../components/ReferralBonusModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ReferralService from '../../api/lib/ReferralService';

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};

const HeaderComponent = ({ navigation, route, options, logout } : any) => {
  return(
    <View style={{paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,  }}>
      <View style={{height:100, width:'100%', overflow:'hidden',position:'absolute'}}>
          <Image source={require('../../assets/nyse.png')} style={{ position:'absolute'}}/>
          <View style = {{backgroundColor:'rgba(0, 23, 139,0.8)', position:'absolute',height:'100%',width:'100%'}}>

          </View>
      </View>
        
        <View style={{paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : Constants.statusBarHeight,position:'absolute' ,flexDirection:'row', paddingHorizontal:20, width:'100%',alignItems:'center', justifyContent:'space-between', height:100}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
        {
          ['News','Stock','My Profile','Account Statements','Edit Profile', 'Sell', 'Withdrawal'].includes(route.name)  && <TouchableOpacity style={{marginRight:20}} onPress={() => navigation.goBack()}>
            <AntDesign name='arrowleft' color={"white"} size={24}/>
          </TouchableOpacity>
        }
        <Text style={{fontFamily:'Overpass_700Bold', color:'white', fontSize:18}}>{route.name === 'Stock' ? route.params.stockTicker : route.name}</Text>
        </View>
        <TouchableOpacity onPress={(route.name === 'My Profile')  ? ()=>navigation.navigate('Edit Profile') : ()=>navigation.navigate('My Profile')} disabled={route.name === 'Edit Profile'}>
        {route.name === 'My Profile' ?  
        
          <Feather name="edit-2" size={24} color="white"/>
        :   

        <EvilIcons name="user" size={40} color="white" />
        
        }
        </TouchableOpacity>
        </View>
      </View>
  )
}

export default function DashboardTabNavigator({navigation, accountId,isSubscribed,portfolioid} : any) {

  const { setSession, syncSession } = useContext(AuthContext)
  const { isAuthenticated, session, sessionToken } = useContext(AuthContext)
  const { name: { first = String(session !== undefined ? session!.identity.id : "")  } = {} } = {name : {first : ""} }
 
  const [sellValue, setSellValue] = useState(0)
  const [stockDictionary, setStockDictionary] = useState<StockDictionary[]>([])
  const [userPositions, setUserPositions] = useState<UserPostion[]>([])
  const [portfolioValue, setPortfolioValue] = useState<number>()
  const [userBalances, setUserBalances] = useState<any>({})
  const [showServiceDownModal, setShowServiceDownModal] = React.useState(false);

  const alpacaService = new AlpacaService(accountId)
  const alpacaBalanceService = new AlpacaBalanceService(accountId)
  const alpacaBrokerAPIService = new AlpacaBrokerAPIService(accountId)
  const alpacaDocumentService = new AlpacaDocumentService(accountId)
  const [miscValues, setMiscValues] = useState({USDPKR : 270})
  const [userObject, setUserObject] = useState<any>()
  const posthog = usePostHog()
  const [termsAccept,setTermsAccept]=useState(false)
  const [reward,setReward]=useState()

  
  useEffect(() => {
    
    AsyncStorage.getItem('announcementAccepted').then((value) => {
      console.log(value,value)
      if (!value) {
       
        // If terms have not been accepted, show the modal
        setTermsAccept(true);
      }
    });
    MiscService.getUSDPKR().then(cb => setMiscValues({...miscValues,USDPKR: ((parseFloat(cb?.data[0]?.buying) + parseFloat(cb?.data[0]?.selling))/2)})).catch((err)=>console.log("USDPKR",err))
  },[])


  const getProfile = () => {
    UserService.getUser(session?.identity.id).then(cb=>setUserObject(cb))
  }
  const getReward=()=>{
    //axios.get('https://3026-2400-adc1-13e-a200-f190-3ec7-5790-a0f6.ngrok-free.app//v1/get-reward').then(res=>setReward(res.data))
    ReferralService.getRewards()
    .then((reward) => {
     
      setReward(reward.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(()=>{
    console.log("is subscribed",isSubscribed)
    alpacaService.getAllStocks().then(cb=> setStockDictionary(cb)).catch((e)=>{setShowServiceDownModal(true)})
  },[])
  
  useEffect(() => {
    posthog.identify(session?.identity?.id,{
      email : session?.identity?.traits.email,
    })
    getPositions()
    getUserBalances()
  },[])


  useEffect(() => {
    getProfile()
    getReward()
  },[])

  function getUserBalances() {    
    alpacaBalanceService.getAll()
        .then(cb => {
      //   console.log("getUserBalances",cb)
            setUserBalances(cb);

            // Check if the status is not equal to 200 and show the modal
            if (cb.statusCode != 200) {
              setShowServiceDownModal(true);
            }

            
        })
        .catch(err => {
            console.log('err', err);

            // Handle error and show the modal
            setShowServiceDownModal(true);
        });
}


  function getPositions(){
    alpacaService.getAllPositions().then(data=>
      {
        
        setUserPositions(data)
        setPortfolioValue(data.reduce((total : number, cb : UserPostion)=>{return parseFloat(cb.market_value) + total}, 0))
      } 
      ).catch(err=>{console.log("ERROR",err)
        setShowServiceDownModal(true)})
  }
 
    
  const logout = async () => {
    setSession(null)
  }
  const handleTermsAccept = () => {
    // Set termsAccepted in AsyncStorage
    AsyncStorage.setItem('announcementAccepted', 'true').then(() => {
      // Close the modal
      setTermsAccept(false);
    });
  };
  return (
      <View style={{flex:1}}>
        <StatusBar barStyle='light-content'/>
        { showServiceDownModal==true ? (<><ServiceDownModal/></>) :(
        termsAccept===true ? (<><ReferralBonusModal show={true} closeModal={handleTermsAccept}  /></>):(

        <Tab.Navigator 
        screenOptions={{headerShown: true, header: (props) => <HeaderComponent {...props} logout = {logout}/>, headerTransparent:true, tabBarHideOnKeyboard:true, unmountOnBlur:true}} 
        backBehavior="history"
        tabBar={props => <CustomTabBar {...props}/>} sceneContainerStyle={{backgroundColor:'transparent'}}
      >
          
          
  
          <Tab.Screen name="Home"  >
            {props => <AppDashboardHome {...props} sellValue = {sellValue} stockDictionary={stockDictionary} userBalances={userBalances} refreshFunction = {()=>{getUserBalances(), getProfile()}} alpacaService={alpacaService} alpacaBalanceService={alpacaBalanceService}/>}
            </Tab.Screen>
            <Tab.Screen name="Add Funds"  >
            {props => <AppDashboardAddFunds {...props} sellValue = {sellValue} stockDictionary={stockDictionary} userBalances={userBalances} refreshFunction = {getUserBalances} alpacaService={alpacaService}/>}
            </Tab.Screen>
  
            <Tab.Screen name="Invest"  >
            {props => <AppDashboardInvest {...props} stockDictionary={stockDictionary} userProfile={userObject} userBalances={userBalances} refreshFunction = {()=>{getUserBalances(), getProfile()}} alpacaService={alpacaService} session={session}/>}
            </Tab.Screen>
  
          <Tab.Screen name="Withdraw" >
            {props => <AppDashboardWithdraw {...props} userBalances={userBalances} refreshFunction = {getUserBalances} alpacaService={alpacaService}/>}
            </Tab.Screen>
          <Tab.Screen name="Markets">
          {props => <AppDashboardMarkets {...props}  stockDictionary={stockDictionary} userBalances={userBalances} refreshFunction = {getUserBalances} alpacaService={alpacaService}/>}
          </Tab.Screen>
  
          <Tab.Screen name="My Portfolio">
          {props => <AppDashboardMyPortfolioEquities {...props} stockDictionary={stockDictionary} userPositions={userPositions} userBalances={userBalances} resetPositions={()=>{getPositions(); getUserBalances();}} alpacaService={alpacaService}isSubscribed={isSubscribed} portfolioid={portfolioid} miscValues = {miscValues} alpacaBalanceService={alpacaBalanceService}/>}  
          </Tab.Screen>
  
          <Tab.Screen name="Sell">
            {(props) => <AppDashboardSell {...props} setSellValue={setSellValue} refreshFunction = {getUserBalances}  userBalances={userBalances} alpacaService={alpacaService}/>}
            </Tab.Screen>
            <Tab.Screen name="Withdrawal">
            {(props) => <AppDashboardWithdrawSelect {...props} setSellValue={setSellValue} refreshFunction = {getUserBalances}  userBalances={userBalances} alpacaService={alpacaService}/>}
            </Tab.Screen>
  
          <Tab.Screen name="Edit Profile">
            {props => <AppDashboardEditProfile {...props} userObject = {userObject}/>}
          </Tab.Screen>
    
        {/* <Tab.Screen name="My Profile" component={AppDashboardUserProfile} /> */}
        <Tab.Screen name="Account Statements">
          {props => <AppDashboardAccountStatements {...props} userBalances={userBalances} alpacaDocumentService={alpacaDocumentService}/>}
        </Tab.Screen>
  
        <Tab.Screen name="My Profile">
        {props => <AppDashboardUserProfile {...props} userObject ={userObject} refreshFunction={getProfile} reward={reward}/>}  
        </Tab.Screen>
        <Tab.Screen name="Stock">
          {(props) => <AppDashboardIndividualStock {...props} userPositions={userPositions} resetPositions={getPositions} refreshFunction = {getUserBalances}  userBalances={userBalances} alpacaService={alpacaService}/>}
        </Tab.Screen>
          {/* <Tab.Screen name="Stock" component={AppDashboardIndividualStock} /> */}
          <Tab.Screen name="News" component={AppDashboardNewsScreen}/>
  
          <Tab.Screen name="Transactions">
          {props => <AppDashboardMyTransactions {...props} stockDictionary={stockDictionary} userPositions={userPositions} refreshFunction = {getUserBalances}  userBalances={userBalances} alpacaService={alpacaService} alpacaBrokerAPIService={alpacaBrokerAPIService} miscValues = {miscValues}/>}  
          </Tab.Screen>
  
  
        </Tab.Navigator>))
}
      
      </View>
  );
}
