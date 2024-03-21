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

const upOrDown = (data : number[]) => {
    return data[data.length - 2] < data[data.length - 1]
}

export default function MarketItem({stockTicker, stockName, data, qty, value, isLast, onPress} : any) {
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
            <Chart data={data}/>
            </View>
            <View style={{width:'30%',alignItems:'flex-end'}}>
                <Text style={{
                    fontFamily:'Overpass_600SemiBold',
                    fontSize:16
                }}>

                <Text style={{color:upOrDown(data) ? `#44D94C` : 'red'}}>$ </Text>  {value.toFixed(2)}
                
                </Text>
                <Text style={{fontFamily: 'Overpass_600SemiBold', color:upOrDown(data) ? `#44D94C` : 'red'}}>
                <Feather name={upOrDown(data) ? "arrow-up" : "arrow-down"} size={16} color={upOrDown(data) ? `#44D94C` : 'red'} />
                
                $ {qty?.toLocaleString()}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const Chart = ({data} : any) => {
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
      color: (opacity = 1) => upOrDown(data) ? `#44D94C` : 'red',
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: 1,
        strokeWidth: 1,
        stroke: upOrDown(data) ? `#44D94C` : 'red'
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