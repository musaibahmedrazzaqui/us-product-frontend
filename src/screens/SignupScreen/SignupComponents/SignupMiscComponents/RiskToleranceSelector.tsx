import { Tooltip, TooltipProps } from '@rneui/themed';
import React from 'react'
import {
    TouchableOpacity,
    Text,
    ScrollView,
    View,
    Dimensions,
    FlatList
} from 'react-native'
import {Entypo} from '@expo/vector-icons'
import CountryFlag from "react-native-country-flag";


  const ControlledTooltip: React.FC<TooltipProps | any> = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Tooltip
        visible={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        {...props}
        withPointer={false}
        skipAndroidStatusBar={false}
        popover={<ToolTipComponent list ={props.list} setSelectedStatus={(value : string)=>{props.setSelectedStatus(value); setOpen(false)}}/>}
      />
    );
  };

  function ToolTipComponent({setSelectedStatus, list} : {setSelectedStatus : any, list : any[]}) {
    // const MaritalStatuses = ['Islam', 'Hinduism', 'Christianity','Sikhism','Buddhism','Other']

    const ItemComponent = ({item} : any) =>{
        // console.log(name,code)
        return (
            <TouchableOpacity onPress={()=>setSelectedStatus(item.name)} style={{height:60, justifyContent:'center', alignItems:'flex-start', borderBottomColor: '#DFE0EB', borderBottomWidth:1,padding:10}}>
                <Text style={{fontFamily:'ArialNova', color:'black', paddingLeft:10}}>
                    {item.name}
                </Text>
                <Text style={{fontFamily:'ArialNova', color:'#888', paddingLeft:10, fontSize:12,}}>
                    {item.mix}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <FlatList data={toleranceList} renderItem={ItemComponent} style={{width:'100%', overflow:'hidden'}} showsVerticalScrollIndicator={false}/>
    )
}

export default function RiskToleranceSelector({selectedValue, setValue} : {selectedValue : any, setValue : any}){
    return (

            <ControlledTooltip
            width={Dimensions.get('window').width * 0.85 }
            height={toleranceList.length > 5 ? Dimensions.get('window').height * 0.4 : toleranceList.length * 60}
            backgroundColor={'#fff'}
            closeOnlyOnBackdropPress={false}
            setSelectedStatus = {setValue}
            list = {toleranceList}
            skipAndroidStatusBar={true}
            containerStyle={{
                padding:0,
                // overflow:'hidden',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.06,
                shadowRadius: 3.84,
                // borderRadius:6,
                elevation: 5,
                borderWidth:0.5,
                borderColor: '#ddd'
            }}
            pointerStyle = {{
                padding:0,
                // overflow:'hidden',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.06,
                shadowRadius: 3.84,

                elevation: 5,
            }}
            // highlightColor={'#ccc'}
          >
            

            <View
            style={{
                height:64,
                width:Dimensions.get('window').width * 0.9,
                borderWidth:1,
                borderColor:'#ddd',
                borderRadius:6,
                marginTop:10,
                justifyContent:'space-between',
                alignItems:'center',
                padding:10,
                flexDirection:'row'
            }}>
                <View style={{flexDirection:'row',}}>
                <Text >
                    {selectedValue === '' ? 'Select' : selectedValue}
                </Text>
                </View>
                <Entypo name='chevron-down' size={20}/>
            </View>
            </ControlledTooltip>
    )
}

const toleranceList = [ 
    {name: 'The Fortune Builder', mix: '(100% stocks, 0% bonds)'}, 
    {name: 'The Growth Seeker', mix: '(75% stocks, 25% bonds)'}, 
    {name: 'The Moderate', mix: '(50% stocks, 50% bonds)'}, 
    {name: 'The Small-Risk Taker', mix: '(25% stocks, 75% bonds)'}, 
    {name: 'The Cash Conserver', mix: '(0% stocks, 100% bonds)'}, 

   
  ]