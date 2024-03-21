import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import React,{useState, useEffect} from 'react'
import { DashboardScreenWrapperStyle } from './DashboardScreenWrapper/DashboardScreenWrapperStyles'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { AppConstants } from '../../assets/AppConstants'

export default function DashboardScreenWrapper(props : any) {
    return(
        <View style={{flex:1, width:Dimensions.get('window').width}}>
            {/* <StatusBar barStyle={isDrawerOpen ? 'light-content' : 'dark-content'}/> */}
            <View style={DashboardScreenWrapperStyle.header}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={props.toggleDrawer}>
                    <Entypo name="menu" size={32} color={AppConstants.loginHeaderBlue}/>
                    
                </TouchableOpacity>
                <Text
                style={{
                    fontFamily: 'Overpass_600SemiBold',
                    color: AppConstants.loginHeaderBlue,
                    fontSize: 18,
                    marginLeft: 20
                }}
                >
                    {props.navigation.getState().routeNames[props.navigation.getState().index]}
                </Text>
                </View>
                <View style={{height:40, width:40, borderRadius:20, overflow:'hidden'}}>
                    <Image source={require('../assets/images/profile_example.jpg')}
                    style={{
                        height:'100%',
                        width:'100%'
                    }}
                    />
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {props.children}
            </View>

        </View>
    )
}