import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button,
    TouchableOpacity
} from 'react-native'

import {MaterialIcons} from '@expo/vector-icons'
import { AppConstants } from '../../../assets/AppConstants'
import { LinearGradient } from 'expo-linear-gradient'

export default function RingButtonSquare({title, Icon, text, isInverted, dark, onPress} : any){
    return(
    <TouchableOpacity style={{
        width:Dimensions.get('window').width *0.45, 
        backgroundColor: dark ? '#004DBC' : '#3293F6',
        aspectRatio : 1/0.7,
        borderRadius:6,
        marginHorizontal:Dimensions.get('window').width *0.0125,
        marginVertical:10,
        borderWidth:0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation:5,
        // overflow:'hidden'
        }}
        onPress={onPress}
        >
            <View style={{width:'100%',height:'100%',overflow:'hidden'}}>
                <LinearGradient style={{height:190, width:190, borderRadius:95, alignItems:'center',justifyContent:'center', marginTop:-60, marginLeft:30}}
                colors={dark ? ['#0A2A88','#004DBC']  : ['#008BE6','#004DBC'] }
                >
                    <View style={{height:110, width:110, borderRadius:55, backgroundColor:dark ? '#004DBC' : '#3293F6'}}/>
                </LinearGradient>
                
            </View>
            <View style={{position:'absolute', width:'100%',height:'100%',padding:20}}>
            <View>
                    {<Icon color={ "white" }/>}
            </View>
            <Text style={{
                fontFamily:'Overpass_600SemiBold',
                color:  'white',
                marginTop:10,
                fontSize: 20
            }}>
                {title}
            </Text>
            </View>
    </TouchableOpacity>
    
    )

}