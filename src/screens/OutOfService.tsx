import React, {useRef, useState, useEffect, useContext} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    useColorScheme,
    Dimensions,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native'
import { ButtonMain } from '../components/ButtonMain';
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "../components/navigation"
import { AuthContext } from '../components/authProvider';


export default function OutOfService({ navigation, route }: any){

    const { setSession, syncSession } = useContext(AuthContext)
  const { isAuthenticated, session, sessionToken } = useContext(AuthContext)

    const isDarkMode = useColorScheme() === 'dark';
    const [carouselIndex, setCarouselIndex] = useState(0)
    console.log("Out of Service screen shown.")
    useEffect(() => {
        if (!isAuthenticated || !session) {
          navigation.navigate('Login', { refresh: true })
        }
      }, [isAuthenticated, sessionToken])


    return(
        <View style={{flex:1, backgroundColor:'white',overflow:'hidden'}}>
            <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'white'}
      />
        <Animated.View style={{flexDirection:'row', height:'55%'}}>
        <View style={styles.Carousel}>
            <Image source={require('../../assets/noService.png')} style={{height:280, width:280}}/>

        </View>
        </Animated.View>
        <View style={{
            // backgroundColor:'#ddd',
            flex:1,
            alignItems:'center',
            marginTop:20
        }}>
            <Text style={{
                fontFamily:'Overpass_700Bold',
                // fontWeight:'700',
                fontSize:30,
                textAlign:'center',
                color:'black',
            }}>{'The service is not \navailable at the moment'
            
            }
            </Text>

            <Text style={{
                marginTop:10,
                fontFamily:'Overpass_300Light',
                // fontWeight:'300',
                color:'#8692A6',
                textAlign:'center',
                width:'80%'
            
            }}
            numberOfLines={2}
            >
            Try again later in sometime. If the problem persists, please email us at help@elphinstone.us
            </Text>
            <View style={{marginTop:60}}>
            <TouchableOpacity style={{
            backgroundColor: '#004DBC',
            height : 64,
            width : 340,
            elevation:5,
            borderRadius:8,
            alignItems:'center',
            justifyContent:'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        }} onPress={()=>{setSession(null)}}>
            <Text style={{
                color:'white',
                fontFamily:'ArialNova',
                fontWeight:'400',
                fontSize:16
            }}>
                Back
            </Text>
        </TouchableOpacity>
            </View>

        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Carousel:{
        height:'100%',
        width:Dimensions.get('window').width,
        backgroundColor:'#F7F8FC',
        alignItems:'center',
        justifyContent:'center'
    },
    pipOnIndex : 
        {
            width:12,
            height:12,
            backgroundColor:'#004DBC',
            borderRadius:6,
            marginHorizontal:2.5
        },
    pipOffIndex : {
        width:9,
        height:9,
        backgroundColor:'rgba(0, 77, 188, 0.2)',
        borderRadius:4.5,
        marginHorizontal:2.5
    }
    
})