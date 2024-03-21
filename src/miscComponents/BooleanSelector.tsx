import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard
} from 'react-native'
import React,{useState} from 'react'
import { AntDesign } from '@expo/vector-icons'
export function BooleanSelector({value, setValue} : {value : boolean | null, setValue : (value : boolean)=>void}){
    return(
        <View style={{
            width: '60%', 
            flexDirection:'row',
            marginTop:10, 
            borderRadius: 6,
            // height:64,
            marginLeft:20,
            justifyContent:'flex-start',
        }}>
        <View style={{flexDirection:'row', alignItems:'center', width:'30%', justifyContent:'space-around', marginRight:50}}>
        <TouchableOpacity activeOpacity={1} 
        style={{
            height:32, 
            width: 32, 
            borderRadius:16, 
            backgroundColor: value === true ? '#19C18F' : 'transparent',
            borderWidth:1,
            borderColor: value === true ? '#19C18F' : '#ddd',
            alignItems:'center',
            justifyContent:'center',
            marginRight:20
            }} onPress = {()=>setValue(true)}>
        <AntDesign name='check' color={value === true ? 'white' : 'transparent'}/>
        </TouchableOpacity>
        <Text>
            Yes
        </Text>
        </View>


        <View style={{flexDirection:'row', alignItems:'center', width:'30%', justifyContent:'space-around'}}>
        <TouchableOpacity activeOpacity={1} 
        style={{
            height:32, 
            width: 32, 
            borderRadius:16, 
            backgroundColor: value === false ? '#19C18F' : 'transparent',
            borderWidth:1,
            borderColor: value === false ? '#19C18F' : '#ddd',
            alignItems:'center',
            justifyContent:'center',
            }} onPress = {()=>setValue(false)}>
        <AntDesign name='check' color={value === false ? 'white' : "transparent"}/>
        </TouchableOpacity>
        <Text>
            No
        </Text>
        </View>

        </View>
    )
}