import React, {useRef, useState, useEffect} from 'react'
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
type Props = StackScreenProps<RootStackParamList, "Intro">

export default function IntroCarousel({ navigation, route }: Props){
    const isDarkMode = useColorScheme() === 'dark';
    const width = Dimensions.get('window').width;
    const [carouselIndex, setCarouselIndex] = useState(0)
    const location = useRef(new Animated.Value(0)).current
    function goToNextScreen(locationState : number) {
        Animated.timing(location,{
            toValue: locationState,
            duration: 500,
            useNativeDriver : true,
          }).start()
    }
    useEffect(()=>{
        goToNextScreen(carouselIndex)
    },[carouselIndex])


    return(
        <View style={{flex:1, backgroundColor:'white',overflow:'hidden'}}>
            <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'white'}
      />
        <Animated.View style={{flexDirection:'row', height:'55%'  ,transform:[{
                translateX : Animated.multiply(Dimensions.get('window').width,location) 
            }],}}>
        <View style={styles.Carousel}>
            <Image source={require('../../assets/images/money.png')} style={{height:280, width:280}}/>

        </View>

        <View style={styles.Carousel}>
            <Image source={require('../../assets/images/notification.png')} style={{height:280, width:280}}/>

        </View>

        <View style={styles.Carousel}>
            <Image source={require('../../assets/images/thumbs-up.png')} style={{height:280, width:280}}/>

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
            }}>{carouselIndex === 0 ? 'Stay on top of your investments with us' :
            (carouselIndex === -1 ? "You deserve the best investment advice" :
            "We’ll keep an eye on the portfolio for you"
            )
            
            }
            </Text>

            <Text style={{
                marginTop:10,
                fontFamily:'Overpass_300Light',
                // fontWeight:'300',
                color:'#8692A6',
                textAlign:'center',
                width:'70%'
            
            }}>
            We are your new financial Advisors to recommed the best investments for you
            </Text>
            <View style={{marginTop:40, flexDirection:'row', alignItems:'center'}}>
                <View style={carouselIndex === 0 ? styles.pipOnIndex : styles.pipOffIndex}/>

                <View style={carouselIndex === -1 ? styles.pipOnIndex : styles.pipOffIndex}/>

                <View style={carouselIndex === -2 ? styles.pipOnIndex : styles.pipOffIndex}/>

            </View>
            <View style={{marginTop:20}}>
            <ButtonMain onPress={() => carouselIndex != -2 ? setCarouselIndex(carouselIndex === -2 ? 0 : carouselIndex-1) : navigation.replace('Login',{refresh: true})} />
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