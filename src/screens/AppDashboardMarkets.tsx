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
    TextInput
} from 'react-native'
import {Octicons, Feather, MaterialIcons, MaterialCommunityIcons, AntDesign, Ionicons, Entypo } from '@expo/vector-icons'
import { AppConstants } from '../../assets/AppConstants';
import BigButtonRectangle from './AppDashboardHome/BigButtonRectangle';
import {
    LineChart
} from 'react-native-chart-kit'
import RingButtonSquare from './AppDashboardHome/RingButtonSquare';
import ConfigModal from './AppDashboardInvest/ConfigModal';
import Constants from 'expo-constants'
import { companyList, sectorList } from '../../assets/ExampleSNP';
import { nasdaq100, snp500, dji30 } from '../../assets/sampleIndices';
import MarketItem from './AppDashboardHome/MarketItem';
import RenderHtml from 'react-native-render-html';
import { alpacaNews } from '../../apis/alpaca';
import AlpacaService from '../../api/lib/AlpacaService';

const indexNames = ['S&P', 'Dow Jones', 'NASDAQ']

export default function AppDashboardMarkets({navigation, stockDictionary, userBalances, refreshFunction, alpacaService} : any){
    // useEffect(()=>{
    //     refreshFunction()
    // },[])
    const [userPreferences, setUserPreferences] = useState({
        fundPreference : 'Islamic',
        riskTolerance : 'The Growth Seeker'
    })

    const scrollViewRef = useRef()

    const [selectedCategory, setCategory] = useState<any>('')
    const [searchText, setSearchText] = useState<string>('')
    const [news, setNews] = useState<any>([])
    const [searchItems, setSearchItems] = useState([])
    useEffect(()=>{
        alpacaService.getNews({limit: 5, symbols : 'SPY'}).then(cb => 
            {
                setNews(cb.news)
            }
        
            )
    },[])

    useEffect(() => {
        if(searchText.length > 1){
            matchDictionary(searchText)
        }else{
            setSearchItems('')
        }
        
    },[searchText])
    const matchDictionary = (substr : string) => {
        setSearchItems(stockDictionary.filter(cb=>((cb.name).toLowerCase()).startsWith(substr.toLowerCase()) || ((cb.symbol).toLowerCase()).startsWith(substr.toLowerCase())).slice(0,5))
    }
    const getStocks = () => {
        return ChosenCompanies.slice(0,5).map(cb => {
            return {
                stockName : cb.Company,
                stockTicker : cb.Symbol
            }
        })
    }

    
    return (
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} bounces={false}>
        <View style={{ justifyContent: 'flex-start', alignItems: 'center',backgroundColor:'transparent', paddingTop:100}}>

        <View style={{ borderRadius:6, height:401-100,width:'100%',
   
                }}>
                    <View style={{alignSelf:'flex-start', paddingHorizontal:30}}>
                    <Text style={{fontFamily:'Overpass_700Bold', fontSize:40, color:'white'}}>${userBalances.portfolio_value && parseFloat(userBalances?.portfolio_value).toLocaleString(undefined,{currency:'USD',maximumFractionDigits:2, minimumFractionDigits:2})}</Text>
          <Text style={{fontFamily:'ArialNova', fontSize:16, color:'white'}}>Portfolio Value</Text>
          </View>
        
        </View>
        <View style={{width:'100%',alignItems:'center', height:70}}>
        <View style={{width:'100%', alignItems:'center', flexDirection:'row',justifyContent:'center',
            height:70, marginTop:-(35),borderRadius:8,shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9,
        }}>
            <View style={{flexDirection:'row',width:'90%',height:'100%',justifyContent:'center',elevation:10}}>
        <TextInput style={{height:'100%', width:'83.33%', padding:20,backgroundColor:'white',borderBottomLeftRadius:8, borderTopLeftRadius:8}} placeholder="search stocks here for trade"
                onFocus={()=>scrollViewRef.current?.scrollTo({y:368-120})}
                keyboardType='name-phone-pad'
                onChangeText={(cb)=>{
                    setSearchText(cb)
                }}
                value={searchText}
                >

        </TextInput>
        <View style={{height:'100%', width:'16.67%', padding:20,backgroundColor:'#fff', borderBottomRightRadius:8,borderTopRightRadius:8,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>setSearchText('')}>
                    <AntDesign name='close' color="#bbb" size={20}/>
                </TouchableOpacity>
        </View>
        </View>
        </View>
        {searchItems.length > 0 && <View style={{
            // height:100, 
            width:'90%',
            backgroundColor:'#fff',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9,
            elevation:5,
            zIndex:1
        }}>
            {searchItems.slice(0,5).map((cb, index) => {
                return(
                    <TouchableOpacity key={index} style={{padding:20}} onPress={()=> navigation.navigate('Stock',{
                        stockTicker: cb.symbol
                    })}>
                <Text numberOfLines={1}>
                    {cb.name}
                </Text>
            </TouchableOpacity>
                )
            })}
            
        </View>}

        </View>
            
        
        <View style={{zIndex:-1, width:'100%', alignItems:'flex-end'}}>
        
            {ChosenCompanies.map(cb => <MarketItem key={cb.stockTicker} stockName={cb.stockName} stockTicker={cb.stockTicker} data={cb.data} onPress={() => navigation.navigate('Stock', {
                stockTicker : cb.stockTicker
            })} alpacaService={alpacaService}/>)}
            <View style={{paddingLeft:10, paddingRight:30, paddingTop:40, marginBottom:40, width:'100%'}}>
            <Text style={{fontFamily:'Overpass_300Light', fontSize:20}}>
                <Text style={{fontFamily:'Overpass_700Bold'}}> News </Text> Latest & Greatest
            </Text>
            
            {news.map((cb : any, index : any)=><NewsItem news={cb} navigation={navigation} key={index}/>)}

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


const NewsItem = ({news, navigation} : any,) =>{
    return (
    <TouchableOpacity style={{paddingLeft:10, height:100, alignItems:'center', justifyContent:'space-between', flexDirection:'row'}} activeOpacity={1} onPress={() => navigation.navigate('News',{
        news_object : news
    })}>
        <View style={{width:'60%'}}>
        <Text style={{fontFamily:'ArialNova'}} numberOfLines={3}>
        {news?.headline}
        </Text>
        <Text style={{fontFamily:'ArialNova', color:'#8B97A8'}}>
        {news?.source} {'\ @ '}
        {new Date(news?.created_at).getHours()}:{new Date(news?.created_at).getMinutes()} 
        </Text>
        </View>
        <Image source={{
            uri : news?.images[1]?.url
        }}
        style={{
            height:80,
            width:80
        }}
        />
    </TouchableOpacity>
    )
}

const ChosenCompanies = [
    {
        stockName : 'Apple Inc.',
        stockTicker : 'AAPL'
    },
    {
        stockName : "The Coca-Cola Company",
        stockTicker : 'KO'
    },
    {
        stockName : "JPMorgan Chase & Co.",
        stockTicker : "JPM",
    },
    {
        stockName : "The Walt Disney Company",
        stockTicker : "DIS"
    },
    {
        stockName : "Procter & Gamble Company",
        stockTicker : "PG"
    }

]