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

const indexNames = ['S&P', 'Dow Jones', 'NASDAQ']



export default function AppDashboardNewsScreen({navigation, route} : any){
    const  {news_object} = route.params
    const [userPreferences, setUserPreferences] = useState({
        fundPreference : 'Islamic',
        riskTolerance : 'The Growth Seeker'
    })

    const [selectedCategory, setCategory] = useState<any>('')

    return (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={{ justifyContent: 'flex-start', alignItems: 'center',backgroundColor:'transparent', paddingTop:100}}>

        <View style={{ borderRadius:6, height:401-100,width:'100%'
   
                }}>
                    <View style={{alignSelf:'flex-start', paddingHorizontal:30}}>
          <Text style={{fontFamily:'Overpass_700Bold', fontSize:40, color:'white'}} numberOfLines={5}>{news_object.headline}</Text>
          <Text style={{fontFamily:'ArialNova', color:'#FFF', fontSize:16}}>
                {news_object?.source} {'\ @ '}
                {new Date(news_object?.created_at).getHours()}:{new Date(news_object?.created_at).getMinutes()} 
                </Text>

          </View>
        
        </View>

        {news_object?.images[0]?.url && <Image source={{uri : news_object.images[0].url}} style={{height:300, width:360, borderRadius:10, marginTop:-10}}/>}
            <View style={{padding:30}}>
            <RenderHtml
            source={{html : news_object.content}}
            contentWidth = {Dimensions.get('window').width}
            tagsStyles={{
                p:{
                    fontFamily:'ArialNova',
                    lineHeight:24
                }
            }}
            ignoredDomTags={['caption', 'svg']}
            />
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
