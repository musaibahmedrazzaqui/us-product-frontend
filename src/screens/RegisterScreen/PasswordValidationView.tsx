import { 
    View,
    Animated,
    Text
} from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {AntDesign, FontAwesome} from '@expo/vector-icons'
export default function PasswordValidationView({password, showView} : {password : string, showView : boolean}){
    const slideAnimator = useRef(new Animated.Value(0)).current
    const showViewAnimator = useRef(new Animated.Value(0)).current
    const [passCheck,setPassCheck] = useState<boolean[]>([false,false,false,false,false])
    const sliderFunction = (to : number) => {
        Animated.timing(slideAnimator,{
            toValue: to,
            duration: 500,
            useNativeDriver : false
          }).start()
    }
    const initAnimation = () => {
        Animated.timing(showViewAnimator,{
            toValue: 1000,
            duration: 500,
            useNativeDriver : false
          }).start()
    }
    const parsePassword = (password : string) => {
        let conditionArray = [false,false,false,false,false]
        let conditionMatch = 0
        if (password.length > 7){
            conditionArray[0] = true
            conditionMatch = conditionMatch + 1
        }
        if (/[A-Z]/.test(password)){
            conditionArray[1] = true
            conditionMatch = conditionMatch + 1
        }
        if (/[a-z]/.test(password)){
            conditionArray[2] = true
            conditionMatch = conditionMatch + 1
        }
        if (/[0-9]/.test(password)){
            conditionArray[3] = true
            conditionMatch = conditionMatch + 1
        }
        if (/[-!$%^&*@.]/.test(password)){
            conditionArray[4] = true
            conditionMatch = conditionMatch + 1
        }
        return {
            num : conditionMatch,
            arr : conditionArray
        }

    }
    const sliderWidth = slideAnimator.interpolate({
        inputRange: [0 , 1],
        outputRange: ['0%','100%']
    })
    const bgColor = slideAnimator.interpolate({
        inputRange:[0.8,1],
        outputRange:['#FC5C5C','#71DE56']
    })
    useEffect(()=>{
        setPassCheck(parsePassword(password).arr)
        sliderFunction(parsePassword(password).num/5)
    },[password])
    useEffect(()=>{
        if(showView){
            initAnimation()
        }
    },[showView])
    return(<Animated.View style={{paddingTop:10, overflow:'hidden',maxHeight:showViewAnimator}}>
        <View
        style={{width : '100%',height:4, backgroundColor:'#ddd', borderRadius:2, alignItems:'flex-start'}}
        >
        <Animated.View
            style={{
                width : sliderWidth,
                height:4, 
                backgroundColor:bgColor, 
                borderRadius:2,
            }}
        >

        </Animated.View>
        </View>
        <View style = {{flexDirection:'row', alignItems:'center'}}>
            {passCheck[0] ?
            <AntDesign name='check' color='#71DE56' size={20}/>:
            <FontAwesome name='circle' color='#ccc' size={12}/>
            }
            <Text style={{padding:10, fontFamily:'ArialNova', color:'#8692A6'}}>
            At least 8 characters
            </Text>
        </View>
        <View style = {{flexDirection:'row', alignItems:'center'}}>
            {(passCheck[1] && passCheck[2]) ?
            <AntDesign name='check' color='#71DE56' size={20}/>:
            <FontAwesome name='circle' color='#ccc' size={12}/>
            }
            <Text style={{padding:10, fontFamily:'ArialNova', color:'#8692A6'}}>
            Includes an uppercase and a lowercase character
            </Text>
        </View>
        <View style = {{flexDirection:'row', alignItems:'center'}}>
            {passCheck[3] ?
            <AntDesign name='check' color='#71DE56' size={20}/>:
            <FontAwesome name='circle' color='#ccc' size={12}/>
            }
            <Text style={{padding:10, fontFamily:'ArialNova', color:'#8692A6'}}>
            Includes a number
            </Text>
        </View>
        <View style = {{flexDirection:'row', alignItems:'center'}}>
            {passCheck[4] ?
            <AntDesign name='check' color='#71DE56' size={20}/>:
            <FontAwesome name='circle' color='#ccc' size={12}/>
            }
            <Text style={{padding:10, fontFamily:'ArialNova', color:'#8692A6'}}>
            Includes a symbol (!@#$%^&*)
            </Text>
        </View>

    </Animated.View>)
}