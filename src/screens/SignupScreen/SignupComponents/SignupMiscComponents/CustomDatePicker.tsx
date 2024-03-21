import { Tooltip, TooltipProps } from '@rneui/themed';
import React,{useState} from 'react'
import {
    TouchableOpacity,
    Text,
    ScrollView,
    View,
    Dimensions,
    FlatList,
    Platform
} from 'react-native'
import {Feather} from '@expo/vector-icons'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AppConstants } from '../../../../../assets/AppConstants';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';



export default function CustomDatePicker({selectedValue, setValue, maximumDate} : {selectedValue : any, setValue : any, maximumDate? :any}){
    const [open, setOpen] = useState(false)

    const showMode = () => {
        DateTimePickerAndroid.open({
          value: selectedValue || new Date(),
          onChange : ((event, selectedValue) => setValue(selectedValue)),
          mode: "date",
          is24Hour: true,
          maximumDate: maximumDate
        });
      };
    return (
            <TouchableOpacity
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
            }}
            onPress={()=> Platform.OS  === 'ios'  ? setOpen(!open) : showMode()}
            activeOpacity={1}
            >
                <View style={{flexDirection:'row',}}>
                <Text style={{paddingLeft:10}}>
                    {selectedValue === '' ? 'e.g., 12/31/2028' : selectedValue.toLocaleDateString()}
                </Text>
                </View>
                <Feather name='calendar' size={20}/>

                {Platform.OS === 'ios' && <DateTimePickerModal
                    isVisible={open}
                    mode="date"
                    onConfirm={(cb) => {setValue(cb); setOpen(!open)}}
                    onCancel={()=>setOpen(!open)}
                    display="inline"
                    accentColor={AppConstants.loginHeaderBlue}
                    maximumDate={maximumDate}
                /> 


            
            }
            </TouchableOpacity>
    )
}
