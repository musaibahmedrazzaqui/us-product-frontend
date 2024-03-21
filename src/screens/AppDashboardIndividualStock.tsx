import React, {useState, useRef, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Modal,
    Button,
    Image,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native'
import {Octicons, Feather, MaterialIcons, MaterialCommunityIcons, AntDesign, Ionicons, Entypo } from '@expo/vector-icons'
import Constants from 'expo-constants';
import { nasdaq100, snp500, dji30 } from '../../assets/sampleIndices';
import MarketItem from './AppDashboardHome/MarketItem';
import { getLatestStockData } from '../../apis/alpaca';
import {
    LineChart, PieChart
} from 'react-native-chart-kit'
import { AAPL } from './AppDashboardStockSample';
import CustomSelector from './SignupScreen/SignupComponents/SignupMiscComponents/CustomSelector';
import AlpacaService from '../../api/lib/AlpacaService';
import ResponseModal from '../components/ResponseModal';
import TradeBox from './AppDashboardIndivdualStock/TradeBox';



function compressNumber(num : number) {
    // Dictionary of suffixes
    const suffixes = {
      0: '',
      3: 'K',
      6: 'M',
      9: 'B',
      12: 'T',
      15: 'Q',
    };
  
    // If the number is 0, return 0
    if (num === 0) {
      return '0';
    }
  
    // Find the magnitude of the number
    const magnitude = Math.floor(Math.log10(num) / 3);
    let suffix = '';
    if (suffixes[magnitude * 3]) {
      suffix = suffixes[magnitude * 3];
    }
  
    // Return the number with the suffix
    return `${(num / (10 ** (magnitude * 3))).toFixed(1)}${suffix}`;
  }

  

export default function AppDashboardIndividualStock({route, navigation, userPositions, resetPositions, userBalances,alpacaService} : any){

    useEffect(()=>{
        resetPositions()
    },[])


    const [showResponseModal, setResponseModal] = useState(false)
    const [responseModalConfig, setResponseModalConfig] = useState({
        isSuccess : null,
        message : "",
        subMessage : ""
    })
    function launchResponseModal({message, subMessage, isSuccess} : any) {
        setResponseModalConfig({
            message,
            subMessage,
            isSuccess
        })
        setResponseModal(true)
    }


    const [stock, setStock] = useState<any>({})
    const [position, setPosition] = useState(userPositions.filter(cb => cb.symbol === route.params.stockTicker)[0])
    useEffect(() => {
         alpacaService.getLatestStockData({symbol : route.params.stockTicker}).then(cb=>setStock(cb))
    },[route.params.stockTicker])


    return (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={{ justifyContent: 'flex-start', alignItems: 'center',backgroundColor:'transparent', paddingTop:100}}>
        <ResponseModal show={showResponseModal} closeModal={()=>setResponseModal(false)} {...responseModalConfig}/>
        <View style={{ borderRadius:6, height:401-100,width:'100%',
   
                }}>
                    <View style={{alignSelf:'flex-start', paddingHorizontal:30}}>
          <Text style={{fontFamily:'Overpass_700Bold', fontSize:40, color:'white'}}>
            ${stock?.bar && (stock?.bar?.c)?.toLocaleString(undefined,{currency:'USD',maximumFractionDigits:2, minimumFractionDigits:2})}
            </Text>
          <Text style={{fontFamily:'ArialNova', fontSize:16, color:'white'}}>Stock Price</Text>
          </View>
        
        </View>

        <View style={{backgroundColor:'#fff', width:Dimensions.get('window').width * 0.8, height:180, marginTop:-120,shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 9,
                elevation:5,
                borderRadius:6
                }}>
                    <View style={{width:'100%', height:'50%', borderBottomColor:'#97979744', borderBottomWidth:1, overflow:'hidden', flexDirection:'row', justifyContent:'space-between',alignItems:'center',borderRadius:6}}>
                        <View style={{height:'100%', width:'50%', padding:20}}>
                            <Text style={{fontFamily:'ArialNova', fontSize:11, color:'#1E293BCC'}}>
                                Open
                            </Text>
                            <Text style={{fontFamily:'Overpass_700Bold', fontSize:24}} adjustsFontSizeToFit={true} numberOfLines={1}>
                                {stock.bar && (stock?.bar?.o)?.toLocaleString(undefined, {minimumFractionDigits : 2, maximumFractionDigits:2})}
                            </Text>

                        </View>
                        <View style={{height:'100%', width:'50%', padding:20}}>
                            <Text style={{fontFamily:'ArialNova', fontSize:11, color:'#1E293BCC'}}>
                                Volume
                            </Text>
                            <Text style={{fontFamily:'Overpass_700Bold', fontSize:24}} adjustsFontSizeToFit={true} numberOfLines={1}>
                                {stock.bar && compressNumber(stock?.bar?.v)}
                            </Text>

                        </View>
                    </View>

                    <View style={{width:'100%', height:'50%', borderBottomColor:'#97979744', borderBottomWidth:1, overflow:'hidden', flexDirection:'row', justifyContent:'space-between',alignItems:'center',borderRadius:6}}>
                        <View style={{height:'100%', width:'50%', padding:20}}>
                            <Text style={{fontFamily:'ArialNova', fontSize:11, color:'#1E293BCC'}}>
                                Day Low
                            </Text>
                            <Text style={{fontFamily:'Overpass_700Bold', fontSize:24}} adjustsFontSizeToFit={true} numberOfLines={1}>
                                {stock.bar && (stock?.bar?.l)?.toLocaleString(undefined, {minimumFractionDigits : 2, maximumFractionDigits:2})}
                            </Text>

                        </View>
                        <View style={{height:'100%', width:'50%', padding:20}}>
                            <Text style={{fontFamily:'ArialNova', fontSize:11, color:'#1E293BCC'}}>
                                Day High
                            </Text>
                            <Text style={{fontFamily:'Overpass_700Bold', fontSize:24}} adjustsFontSizeToFit={true} numberOfLines={1}>
                                {stock.bar && (stock?.bar?.h)?.toLocaleString(undefined, {minimumFractionDigits : 2, maximumFractionDigits:2})}
                            </Text>

                        </View>
                    </View>

        </View>


        <View style={{backgroundColor:'#fff', width:Dimensions.get('window').width * 0.8,shadowColor: "#000", justifyContent:'space-around',paddingVertical:20,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 9,
                elevation:5,
                borderRadius:6,
                marginTop:30
                }}>
                    <View style={{width:'100%', borderBottomColor:'#97979744', borderBottomWidth:0, paddingHorizontal:20, paddingBottom:0}}>
                    <Text style={{fontFamily:'ArialNova', fontSize:16}}>
                    My Existing Holding
                </Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20, paddingHorizontal:20}}>
                <View style={{marginVertical:10}}>
                    <Text style={{fontFamily: 'ArialNova', fontSize:11, color:'#1E293BCC', marginHorizontal:25}}>
                        Market Value
                    </Text>
                
                <View style={{flexDirection:'row', alignItems:'center', marginVertical:10}}>

                <View style={{height:10, width:10, borderRadius:5, backgroundColor:'#004DBC', marginHorizontal:5, marginRight:10 }}/>
                
                <Text style={{fontFamily:'Overpass_700Bold', fontSize:20}} numberOfLines={1} adjustsFontSizeToFit>
                $ {position ? parseFloat(position.market_value).toLocaleString(undefined, {minimumFractionDigits : 2, maximumFractionDigits:2}) : (0).toLocaleString(undefined, {minimumFractionDigits : 2, maximumFractionDigits:2})} 
                 {/* {position?.qty && <Text style={{fontSize:12, fontFamily:'ArialNova', color:'#888'}}>(No. of Shares : {parseFloat(position.qty).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})})</Text>} */}
                </Text>
                </View>


                </View>


                <View style={{marginVertical:10}}>
                    <Text style={{fontFamily: 'ArialNova', fontSize:11, color:'#1E293BCC', marginHorizontal:20,}}>
                        No. of Shares
                    </Text>
                
                <View style={{flexDirection:'row', alignItems:'center', marginVertical:10}}>

                <View style={{height:10, width:10, borderRadius:5, backgroundColor:'#3293F6', marginHorizontal:5, marginRight:10 }}/>
                
                <Text style={{fontFamily:'Overpass_700Bold', fontSize:20}} numberOfLines={1} adjustsFontSizeToFit>
                {position?.qty ? parseFloat(position.qty).toLocaleString(undefined, {minimumFractionDigits : 2, maximumFractionDigits:2}) : (0).toLocaleString(undefined, {minimumFractionDigits : 2, maximumFractionDigits:2})} 
                 {/* {position?.qty && <Text style={{fontSize:12, fontFamily:'ArialNova', color:'#888'}}>(No. of Shares : {parseFloat(position.qty).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})})</Text>} */}
                </Text>
                </View>


                </View>

                </View>
                </View>
            
        
            <TradeBox navigation={navigation} alpacaService = {alpacaService} route={route} launchResponseModal={launchResponseModal} userBalances={userBalances} stock={stock} currentHolding={position?.qty}/>
            
            <View style={{height:100}}/>
                
        </View>

        <View style={{ zIndex:-1, position:'absolute',width:'100%'}}>
          <Image source={require('../../assets/nyse.png')} style={{}}/>
          <View style = {{backgroundColor:'rgba(0, 23, 139,0.8)', position:'absolute',height:'100%',width:'100%'}}>
                
          </View>

        </View>
       
        </ScrollView>
      );
}
