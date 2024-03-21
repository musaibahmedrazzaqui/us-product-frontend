import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Modal,
    Button,
    Image
} from 'react-native'
import {Octicons, Feather, MaterialIcons, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { AppConstants } from '../../assets/AppConstants';
import BigButtonRectangle from './AppDashboardHome/BigButtonRectangle';
import {
    LineChart
} from 'react-native-chart-kit'
import MarketItem from './AppDashboardHome/MarketItem';
import RingButtonSquare from './AppDashboardHome/RingButtonSquare';
import ConfigModal from './AppDashboardInvest/ConfigModal';
import Constants from 'expo-constants'
import ResponseModal from '../components/ResponseModal';
import { fundPortfolioMap } from './AppDashboardInvest/portfolio_map';
import AlpacaService from '../../api/lib/AlpacaService';
import UserService from '../../api/lib/UserService';
import Slider from '@react-native-community/slider';
import ConfirmationModal from '../components/ConfirmationModal';

const listOfRisks = [
    {
        title : 'The Cash Conserver',
        returns : "Low",
        risk : "Low",
        text : "Suitable if you are investing for 0-3 years."
    },
    {
        title : 'The Small-Risk Taker',
        returns : 'Medium-Low',
        risk : 'Medium-Low',
        text : "Suitable if you are investing for 3-5 years."
    },
    {
        title : 'The Moderate',
        returns : "Medium",
        risk : "Medium",
        text : "Suitable if you are investing for 5-7 years."
    },
    {
        title : "The Growth Seeker",
        returns : "Medium-High",
        risk : "Medium",
        text : 'Suitable if you are investing for 7-10 years.'
    },
    {
        title : 'The Fortune Builder',
        returns : "High",
        risk : "High",
        text : "Suitable if you are investing for 10+ years"
    },
]

export default function AppDashboardInvest({navigation, userProfile, userBalances, alpacaService, refreshFunction, session} : any){
    
    useEffect(()=>{
        refreshFunction()
    },[])
    
    const [showConfigModal, setConfigModal] = useState(false)
    const [showResponseModal, setResponseModal] = useState(false)
    const [showConfirmationModal, setConfirmationModal] = useState(false)

    const [proportion, setProportion] = useState(
        userProfile?.risk_tolerance_level === 'The Fortune Builder' ? 4 :
        userProfile?.risk_tolerance_level === 'The Growth Seeker' ? 3 : 
        userProfile?.risk_tolerance_level === 'The Moderate' ? 2 :
        userProfile?.risk_tolerance_level === 'The Small-Risk Taker' ? 1 :
        0
    )
    const [responseModalConfig, setResponseModalConfig] = useState({
        isSuccess : null,
        message : "",
        subMessage : ""
    })

    const [portfolios, setPortfolios] = useState<any>({})

    useEffect(()=> {
        alpacaService.getPortfolios().then(cb=>setPortfolios(cb.portfolios))
    },[])

    const [userPreferences, setUserPreferences] = useState(userProfile?.preference === 'islamic' ? "Islamic" : "Conventional")

    function launchResponseModal({message, subMessage, isSuccess} : any) {
        setResponseModalConfig({
            message,
            subMessage,
            isSuccess
        })
        setResponseModal(true)
    }

    function subscribePortfolio() {
        const riskMap = {
            "The Cash Conserver" : "the-cash-conserver",
            "The Fortune Builder" : "the-fortune-builder",
            "The Growth Seeker" : "the-growth-seeker",
            "The Moderate" : "the-moderate",
            "The Small-Risk Taker" : "the-small-risk-taker"
        }
        let portfolio_id = portfolios[(userPreferences).toLowerCase()][riskMap[listOfRisks[proportion].title]]
        alpacaService.subscribePortfolio({portfolio_id}).then( (cb : any) => {
            launchResponseModal({message: 'Your investment request has been submitted succesfully', subMessage:'We’ve sent you a confirmation email. Please check your inbox.', isSuccess: true})
            UserService.updateUser(session.identity.id, {
                preference : (userPreferences).toLowerCase(),
                risk_tolerance_level : listOfRisks[proportion].title
            })
        }).catch( (cb : any) => {
            launchResponseModal({message: cb.message, subMessage:'', isSuccess: false})
        }
        )   
    }
    
    const INVEST_MESSAGE = "You are about to automatically invest your money into a diversified portfolio of stocks and/or bonds/sukuks, in accordance with your preferred risk tolerance and investment objectives. Your money will become fully invested and any other stocks currently in your portfolio would be sold.\n\nAre you sure you would like to continue?"

    return (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

        <View style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'transparent', paddingTop:100}}>
        <ResponseModal show={showResponseModal} closeModal={()=>setResponseModal(false)} {...responseModalConfig} />
        <ConfirmationModal show={showConfirmationModal} message={INVEST_MESSAGE} closeModal={() => setConfirmationModal(false)} confirmFunction={ () => {setConfirmationModal(false); subscribePortfolio()}}/>
        <ConfigModal showConfigModal={showConfigModal} setConfigModal={setConfigModal} setUserPreferences={setUserPreferences} userPreferences={userPreferences}/>
        
        <View style={{alignSelf:'flex-start', paddingHorizontal:30, height:301}}>
        <Text style={{fontFamily:'Overpass_700Bold', fontSize:40, color:'white'}}>${userBalances.buying_power && parseFloat(userBalances?.buying_power).toLocaleString(undefined,{currency:'USD',maximumFractionDigits:2, minimumFractionDigits:2})}</Text>
          <Text style={{fontFamily:'ArialNova', fontSize:16, color:'white'}}>Uninvested cash balance</Text>
          </View>

        <View style={{backgroundColor:'#fff', borderRadius:6, marginTop:-50,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 9,
                elevation:5,
                width:'95%',
                }}>
        <View style={{ borderBottomWidth:1, borderBottomColor:'rgba(151,151,151,0.2)', padding:20, flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
            <View>
            <Text style={{fontFamily:'ArialNova', fontSize:11, color:'#1E293BCC' }}>
            Fund Preference
            </Text>
            <Text style={{fontFamily:'Overpass_700Bold', fontSize:24, paddingTop:10}}>
            {userPreferences}
            </Text>
            </View>
            <TouchableOpacity onPress={()=>setConfigModal(true)}>
            <Ionicons name="settings-sharp" size={24} color="#A4B3C4B2" />
            </TouchableOpacity>
        </View>

        {/* <View style={{ borderBottomWidth:1, borderBottomColor:'rgba(151,151,151,0.2)', padding:20, flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
            <View>
            <Text style={{fontFamily:'ArialNova', fontSize:11, color:'#1E293BCC' }}>
            Risk Tolerance
            </Text>
            <Text style={{fontFamily:'Overpass_700Bold', fontSize:24, paddingTop:10}}>
            {userPreferences.riskTolerance} 
            </Text>
            <Text style={{fontFamily:'ArialNova', fontSize:11, color:'#1E293BCC' }}>
            { toleranceList.filter(cb => cb.name === userPreferences.riskTolerance)[0]?.mix}
            </Text>
            </View>
            <TouchableOpacity onPress={()=>setConfigModal(true)}>
            <Ionicons name="settings-sharp" size={24} color="#A4B3C4B2" />
            </TouchableOpacity>
        </View> */}

        {/* <TouchableOpacity 
        style={{ borderBottomWidth:1, borderBottomColor:'rgba(151,151,151,0.2)', padding:20, flexDirection:'row',justifyContent:'space-between', alignItems:'center', backgroundColor:AppConstants.loginHeaderBlue, borderBottomStartRadius:6, borderBottomEndRadius:6}}
        onPress={subscribePortfolio}
        >

            <Text style={{fontFamily:'ArialNova', fontSize:16, color:'white' }}>
            Invest now
            </Text>
            <Ionicons name="ios-arrow-forward" size={24} color="white" />
        </TouchableOpacity> */}
        </View>

        <View style={{width:'95%', marginTop:30}}>
            <Text style={{fontFamily:'ArialNova', color:'#1E293B', fontSize:16}}>
                Preferred risk tolerance level
            </Text>
            <View style={{borderWidth:1, borderColor:'#DDD', borderRadius:9, marginVertical:20, paddingHorizontal:15, paddingVertical:20}}>
                <Text style={{color : "#8692A6", fontFamily: 'ArialNova'}}>
                    Set your preferences by moving the slider
                </Text>
                <View style={{borderWidth: 1, borderColor:'#DDD', paddingVertical:20, paddingHorizontal:15, marginVertical:20, borderRadius: 6}}>
                    <Text>
                        {listOfRisks[proportion].title}
                    </Text>
                </View>

                <Slider
                style={{width:'100%', height: 40, alignSelf:'center', marginBottom:20}}
                minimumValue={0}
                maximumValue={4}
                step={1}
                value={proportion}
                onValueChange={cb=>setProportion(cb)}
                minimumTrackTintColor="#004DBC"
                // maximumTrackTintColor="#004DBC"
                thumbImage={require('../../assets/images/slider_icon.png')} 
                />

                <View style={{width:'100%', alignItems:'center'}}>
                    <Text style={{fontFamily:'Overpass_400Regular', color: '#8C949D', marginBottom:20}}>
                        Details
                    </Text>
                    <View style={{flexDirection : "row", justifyContent:'space-between', width:'100%'}}>
                        <View style={{alignItems:'center', flex:1}}>
                        <Feather name="bar-chart" size={26} color={'#8C949D'}/>
                        <Text style={{fontFamily:'Overpass_300Light', color: '#8C949D', marginTop:20}}>
                            Returns
                        </Text>
                        <Text style={{fontFamily:'Overpass_400Regular', color: '#8C949D'}}>
                            {listOfRisks[proportion].returns}
                        </Text>
                        </View>

                        <View style={{alignItems:'center', flex:1}}>
                        <Feather name="umbrella" size={26} color={'#8C949D'}/>
                        <Text style={{fontFamily:'Overpass_300Light', color: '#8C949D', marginTop:20}}>
                            Risk
                        </Text>
                        <Text style={{fontFamily:'Overpass_400Regular', color: '#8C949D'}}>
                            {listOfRisks[proportion].risk}
                        </Text>
                        </View>

                        <View style={{alignItems:'center', flex:1}}>
                        <Feather name="calendar" size={26} color={'#8C949D'}/>
                        <Text style={{fontFamily:'Overpass_300Light', color: '#8C949D', marginTop:20}}>
                            Investment
                        </Text>
                        <Text style={{fontFamily:'Overpass_400Regular', color: '#8C949D'}}>
                            Period
                        </Text>
                        <Text style={{fontFamily:'ArialNova', fontSize:10, color: '#8C949D', width:'66.6%', textAlign:'center'}}>
                            ({listOfRisks[proportion].text})
                        </Text>
                        </View>

                    </View>
                </View>
            </View>

            <TouchableOpacity style={{
                    width:'100%',
                    // marginTop:50,
                    height: 54,
                    backgroundColor:AppConstants.loginHeaderBlue,
                    marginVertical:10,
                    borderRadius: 6,
                    paddingHorizontal:20,
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    opacity : userBalances?.buying_power === "0" ? 0.5 : 1
                }} 
                activeOpacity={0.8}
                onPress={()=>{ 
                    setConfirmationModal(true)
                    
                }
            }
                disabled = {userBalances?.buying_power === "0"}
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:16}}>
                Invest now
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>


        </View>

        <View style={{width:'95%', marginTop:30, marginBottom:50, alignSelf:'center'}}>
            <Text style={{fontFamily:'Overpass_300Light'}}>
                Quick Actions
            </Text>
            <View>
            <View style={{flexDirection:'row', }}>
                <RingButtonSquare title = {"Add \nFunds"} Icon={({color} : any)=>{
                return <AntDesign name="pluscircle" size={24} color={color}/>
                }} dark = {true} onPress={()=>navigation.navigate('Add Funds')}/>

                <RingButtonSquare title = {"Withdraw \nFunds"} Icon={({color} : any)=>{
                return <AntDesign name="minuscircle" size={24} color={color}/>
                }} onPress={()=>navigation.navigate('Withdraw')}/>
          </View>
            </View>
        </View>

        </View>

        <View style={{ zIndex:-1, position:'absolute',width:'100%'}}>
          <Image source={require('../../assets/nyse.png')} style={{}}/>
          <View style = {{backgroundColor:'rgba(0, 23, 139,0.8)', position:'absolute',height:'100%',width:'100%'}}>

          </View>

        </View>
       
        </ScrollView>
      );
}

const toleranceList = [ 
    {name: 'The Fortune Builder', mix: '(100% stocks, 0% bonds)'}, 
    {name: 'The Growth Seeker', mix: '(75% stocks, 25% bonds)'}, 
    {name: 'The Moderate', mix: '(50% stocks, 50% bonds)'}, 
    {name: 'The Small-Risk Taker', mix: '(25% stocks, 75% bonds)'}, 
    {name: 'The Cash Conserver', mix: '(0% stocks, 100% bonds)'},    
  ]