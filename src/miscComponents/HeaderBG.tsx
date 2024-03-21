import {
    View,
    Text,
    Dimensions
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppConstants } from '../assets/AppConstants'

export default function HeaderBG(props : any) {
    const config = {
        light : {
            backgroundColor : '#3293F6',
            gradient : ['#008BE6','#004DBC']
            
        },
        dark : {
            gradient : ['#0A2A88','#004DBC'],
            backgroundColor : '#004DBC'
        }
    }
    return(
        <View
        style={{
            width: Dimensions.get('window').width * 0.9,
            height: 140,
        }}
        >
        <View
        style={{
            width: '100%',
            height: '100%',
            backgroundColor: (config[props.theme]).backgroundColor,
            borderRadius: 6,
            overflow:'hidden',
            alignItems:'flex-end',
        }}
        >
            <LinearGradient
            style={{
                height:190, 
                width:190, 
                borderRadius:95,
                alignItems:'center',
                justifyContent:'center',
                marginRight:-50,
                marginTop:-70
            }}
            colors={config[props.theme].gradient}
            >
                <View
                style={{
                    height:110, 
                    width:110, 
                    borderRadius:55, 
                    backgroundColor:config[props.theme].backgroundColor
                }}
                >

                </View>
            </LinearGradient>
        </View>
        <View style={{
            height:'100%',
            width:'100%',
            position:'absolute',
            borderRadius:6
            // backgroundColor:'#eeee'
        }}>
            {props.children}

        </View>
        </View>
    )
}