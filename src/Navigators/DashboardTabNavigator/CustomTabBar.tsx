import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import {Feather, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import { AppConstants } from '../../../assets/AppConstants'

export default function CustomTabBar({ state, descriptors, navigation } : any){
    return(
        <View style={{width:'100%', height:95, backgroundColor:'#FFF', flexDirection:'row', alignItems:'center', justifyContent:'space-around', paddingBottom:20, paddingHorizontal:'5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation:10}}>
            <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate('Home')} style={{alignItems:'center'}}>
            <Feather name="home" size={30} color="#8B97A8" />
            {(state.index === 0) &&
            <Text>
                {'\u2022'}
            </Text>
            }
            </TouchableOpacity>

            

            <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate('Add Funds')} style={{alignItems:'center'}}>
            <Ionicons name="ios-add-circle-outline" size={30} color="#8B97A8" />
            {(state.index === 1) &&
            <Text>
                {'\u2022'}
            </Text>
            }
            </TouchableOpacity>
            
            
            <TouchableOpacity onPress={()=>navigation.navigate('Invest')} style={{height:100, width: 100,borderWidth:10, borderColor:'#FEFEFE', borderRadius:50, alignItems:'center',justifyContent:'center', marginTop:-60}}>
            <View style={{height:80, width: 80, backgroundColor:AppConstants.loginHeaderBlue, borderRadius:40, alignItems:'center', justifyContent:'center'}}>
             <View style={{height:60, width: 60, backgroundColor:AppConstants.loginHeaderBlue, borderRadius:30, alignItems:'center', justifyContent:'center', borderWidth:0, borderColor:'white'}}>   
             <Feather name="dollar-sign" size={32} color="white" />
            </View>
            </View>
            </TouchableOpacity>


            <TouchableOpacity activeOpacity={1} style={{alignItems:'center'}} onPress={()=>navigation.navigate('Withdraw')}>
            <Ionicons name="ios-remove-circle-outline" size={30} color="#8B97A8" />
            {(state.index === 3) &&
            <Text>
                {'\u2022'}
            </Text>
            }
            </TouchableOpacity>
            
            
            
            <TouchableOpacity activeOpacity={1} style={{alignItems:'center'}} onPress={()=>navigation.navigate('Markets')}>
            <MaterialCommunityIcons name="view-column-outline" size={30} color="#8B97A8" />
            {(state.index === 4) &&
            <Text>
                {'\u2022'}
            </Text>
            }
            </TouchableOpacity>

            

        </View>
    )
}