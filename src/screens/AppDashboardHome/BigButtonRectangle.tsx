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

export default function BigButtonRectangle({title, Icon, text, isInverted, onPress} : any){
    return(
    <TouchableOpacity style={{
        width:Dimensions.get('window').width *0.92, 
        height:Dimensions.get('window').width * 0.24,
        backgroundColor: !isInverted ? '#fff' : '#004DBC',
        // aspectRatio : 175/147,
        borderRadius:6,
        // marginHorizontal:Dimensions.get('window').width *0.0125,
        marginVertical:10,
        paddingHorizontal:15,
        borderWidth:0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation:5
        }}
        onPress={onPress}
        >
            <View style={{width:'100%', alignItems:'flex-start', flexDirection:'row', justifyContent:'space-between', marginTop:-4}}>
                
            <View style={{paddingTop:20, flexDirection:'row'}}>
                    {<Icon color={isInverted ? "white" : AppConstants.loginHeaderBlue}/>}
                    <Text style={{
                fontFamily:'ArialNova-Bold',
                color: !isInverted ? AppConstants.loginHeaderBlue : 'white',
                marginTop:5,
                fontSize: 20,
                paddingLeft:20
            }}>
                {title}
            </Text>
            </View>
            <View style={{paddingTop:-20}}>
                <MaterialIcons name="bookmark" size={30} color={!isInverted ? "#3293F6" : 'white'} />
                </View>
            </View>
            
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
            
            <Text style={{
                fontFamily:'ArialNova',
                fontSize:12.5,
                color: !isInverted ? '#3293F6' : 'white',
                marginTop:10,
            }}>
                {text}
            </Text>
            </View>
    </TouchableOpacity>
    
    )

}