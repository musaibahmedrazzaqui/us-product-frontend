import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    ScrollView,
    StyleSheet,
    Image,
    Animated,ScrollViewComponent
} from 'react-native'
import { AppConstants } from '../../../../assets/AppConstants';
import { Entypo, Feather } from '@expo/vector-icons'; 
import React,{useRef, useState, useEffect} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import { BooleanSelector } from '../../../miscComponents/BooleanSelector';
import { Tooltip, TooltipProps } from '@rneui/themed';
import { useKeyboard } from '../../../miscComponents/useKeyboard';
import CustomTextInput from './SignupMiscComponents/CustomTextInput';
import CustomSelector from './SignupMiscComponents/CustomSelector';
import { LoremIpsum } from './SignupMiscComponents/LoremIpsum';


  

export default function SignupLastScreen({goToNext, goToPrev, userData, setUserData} : {goToNext : ()=>void, goToPrev : ()=> void, userData? : any, setUserData? : any}){
    const scrollViewRef = useRef<any>()

    return(
        <View>
                <ScrollView 
                ref={scrollViewRef}
                style={{width:Dimensions.get('window').width, paddingHorizontal:30}}
                bounces={false}
                >
                <View onStartShouldSetResponder={() => true}>
                <View style={{
                    marginBottom:20
                }}>
                    <Image source={require('../../../../assets/images/tree.png')} style={{height:36,width:36}}/>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
                    <View
                    style={{
                        height:54,
                        width: 54,
                        borderRadius:27,
                        backgroundColor:'#19C18F',
                        marginRight:20,
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                    >
                        <AntDesign name='check' size={24} color='white'/>
                    </View>
                <Text style={{
                    width:'100%',
                    fontFamily:'PlayfairDisplay_700Bold',
                    fontSize:32,
                    color:AppConstants.loginHeaderBlue

                }}>
                    Voilà! {'\n'}
                You’re all set ...
                </Text>
                </View>
                <Text
                style={{
                    marginTop:20,
                    fontFamily:'ArialNova',
                    lineHeight: 32,
                    fontSize:18
                }}
                >
                    Your account application has been submitted. Once it is approved, you will receive an e-mail and you will be able to begin investing in the United States. In case we need more information to open your account, we will also notify you via e-mail with further instructions.
                </Text>
                

                <View
                style={{
                    alignItems:'flex-end',
                    justifyContent:'space-between',
                    width:'100%', 
                    marginTop:20, 
                    flex:1,
                    flexDirection:'row',
                    paddingBottom:20,
                }}>
                
                <TouchableOpacity style={{
                    width:'100%',
                    marginTop:10,
                    height: 54,
                    backgroundColor:AppConstants.loginHeaderBlue,
                    marginVertical:10,
                    borderRadius: 6,
                    padding:10,
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    elevation:5,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }} 
                activeOpacity={0.8}
                onPress = {goToNext}
                // disabled= {true}
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                Done
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    bullets : {

    }
})