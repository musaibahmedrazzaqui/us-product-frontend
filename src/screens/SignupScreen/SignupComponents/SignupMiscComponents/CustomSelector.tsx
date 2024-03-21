import { Tooltip, TooltipProps } from '@rneui/themed';
import React from 'react'
import {
    TouchableOpacity,
    Text,
    ScrollView,
    View,
    Dimensions
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
  const ControlledTooltip: React.FC<TooltipProps | any> = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Tooltip
      skipAndroidStatusBar={false}
        visible={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        {...props}
        popover={<ToolTipComponent list ={props.list} setSelectedStatus={(value : string)=>{props.setSelectedStatus(value); setOpen(false)}}/>}
      />
    );
  };

  function ToolTipComponent({setSelectedStatus, list} : {setSelectedStatus : any, list : any[]}) {
    // const MaritalStatuses = ['Islam', 'Hinduism', 'Christianity','Sikhism','Buddhism','Other']

    const ItemComponent = ({item} : {item : string}) =>{
        return (
            <TouchableOpacity onPress={()=>setSelectedStatus(item)} style={{height:60, justifyContent:'center', borderBottomColor: '#DFE0EB', borderBottomWidth:0,padding:10}}>
                <Text style={{fontFamily:'ArialNova', color:'black'}}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <ScrollView style={{width:'100%',height:'100%'}} showsVerticalScrollIndicator={false}>
            <View onStartShouldSetResponder={()=>true}>
            {list.map((item,index) => <ItemComponent item = {item} key={index}/>)}
            </View>
        </ScrollView>
    )
}

export default function CustomSelector({selectedValue, setValue, itemList} : {selectedValue : any, setValue : any, itemList : any[]}){
    return (

            <ControlledTooltip
            width={Dimensions.get('window').width * 0.85 }
            height={itemList.length > 5 ? Dimensions.get('window').height * 0.4 : itemList.length * 60}
            backgroundColor={'white'}
            closeOnlyOnBackdropPress={false}
            setSelectedStatus = {setValue}
            list = {itemList}
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
                borderRadius:6,
                elevation: 5,
                borderWidth:0.5,
                borderColor:'#ddd'
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
                flexDirection:'row',
                backgroundColor:'white'
            }}>
                <Text>
                    {selectedValue === '' ? 'Select' : selectedValue}
                </Text>
                <Entypo name='chevron-down' size={20} color='#A4B3C4'/>
            </View>
            </ControlledTooltip>
    )
}