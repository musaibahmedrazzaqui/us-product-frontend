import {
    View,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'
import {
    LineChart
} from 'react-native-chart-kit'

import {Feather} from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import AlpacaService from '../../../api/lib/AlpacaService'



export default function MarketItem({stockTicker, stockName, data, isLast, onPress, alpacaService} : any) {

    const [historicalData, setHistoricalData] = useState([])
    const [latestData, setLatestData] = useState<any>({})
    useEffect(()=>{
      alpacaService.getHistoricalStockData(
        {symbol: stockTicker}).then(cb=>setHistoricalData((cb.map((item:any) => item.c)).reverse())).catch(err=>{})
    },[])
    useEffect(()=>{
      alpacaService.getLatestStockData({symbol: stockTicker}).then(cb=>setLatestData(cb))
    },[])

    const upOrDown = () => {
      return historicalData[historicalData.length - 1] <= latestData?.bar?.c.toFixed(2)
  }
    return(
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={{width:'95%', height:100, justifyContent:'space-between', alignItems:'center', flexDirection:'row', borderBottomWidth:isLast ? 0 : 1, borderBottomColor:'rgba(151,151,151,0.2)', paddingHorizontal:10, paddingRight:30}}>
            <View style={{width:'50%'}}>
            <Text style={{fontFamily:'Overpass_600SemiBold', fontSize: 16}}>
                {stockTicker}
            </Text>
            <Text style={{
                fontFamily:'ArialNova',
                fontSize:12,
                zIndex:2
            }}>
                {stockName}
            </Text>
            </View>
            <View style={{width:'20%'}}>
            <Chart data={latestData.bar ? historicalData.concat([parseFloat(latestData?.bar?.c.toFixed(2))]) : historicalData} positive = {upOrDown()}/>
            </View>
            { latestData.bar && historicalData.length>0 &&  <View style={{width:'30%',alignItems:'flex-end'}}>
                <Text style={{
                    fontFamily:'Overpass_600SemiBold',
                    fontSize:16
                }}>

                <Text style={{color:upOrDown() ? `#44D94C` : 'red'}}>$ </Text>  {latestData?.bar?.c.toFixed(2)}
                
                </Text>
                <Text style={{fontFamily: 'Overpass_600SemiBold', color:upOrDown() ? `#44D94C` : 'red'}}>
                <Feather name={upOrDown() ? "arrow-up" : "arrow-down"} size={16} color={upOrDown() ? `#44D94C` : 'red'} />
                
                $ { ((latestData?.bar?.c.toFixed(2) - historicalData[historicalData.length - 1]).toFixed(2)).toLocaleString()}
                </Text>
            </View>}
        </TouchableOpacity>
    )
}

const Chart = ({data, positive} : any) => {
return <LineChart
    data={{
      labels: [],
      datasets: [
        {
          data: data
        }
      ]
    }}
    width={Dimensions.get("window").width *0.25} // from react-native
    height={60}
    chartConfig={{
      backgroundGradientFrom: "white",
      backgroundGradientTo: "white",

      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => positive ? `#44D94C` : 'red',
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: 1,
        strokeWidth: 1,
        stroke: positive ? `#44D94C` : 'red'
      },
      propsForHorizontalLabels : {
      }
    }}

    style={{
      marginVertical: 8,
      borderRadius: 16,
      marginLeft:-50,
      zIndex:-2
    }}
    withInnerLines={false}
    withOuterLines={false}
    withShadow={false}
    yAxisInterval={50}

    // formatYLabel={() => {}}
    
  />
}