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

export default function BigButtonSquare({title, Icon, text, isInverted, onPress} : any){
    return(
    <TouchableOpacity style={{
        width:Dimensions.get('window').width *0.45, 
        backgroundColor: !isInverted ? '#fff' : '#004DBC',
        aspectRatio : 175/175,
        borderRadius:6,
        marginHorizontal:Dimensions.get('window').width *0.0125,
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
        elevation:10
        }}
        onPress={onPress}
        >
            <View style={{width:'100%', alignItems:'flex-end', marginTop:-4, }}>
                <MaterialIcons name="bookmark" size={30} color={!isInverted ? "#3293F6" : 'white'} />
                
            </View>
            <View style={{flex:1, justifyContent:'space-evenly'}}>
            <View>
            <View>
                    {<Icon color={isInverted ? "white" : AppConstants.loginHeaderBlue}/>}
            </View>
            <Text style={{
                fontFamily:'ArialNova-Bold',
                color: !isInverted ? AppConstants.loginHeaderBlue : 'white',
                marginTop:10,
                fontSize: 20
            }}>
                {title}
            </Text>
            </View>
            <Text style={{
                fontFamily:'ArialNova',
                fontSize:12.5,
                color: !isInverted ? '#3293F6' : 'white',
                marginTop:20,
                paddingBottom:10

                // letterSpacing:-0.75
            }}>
                {text}
            </Text>
            </View>
    </TouchableOpacity>
    
    )

}