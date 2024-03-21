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
import { AppConstants } from '../../../assets/AppConstants'
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


  

export default function SignupDisclaimer({goToNext, goToPrev} : {goToNext : ()=>void, goToPrev : ()=> void}){
    const scrollViewRef = useRef<any>()
    const [PEP,setPEP] = useState<string>('')
    const [isPEPLocalOrForeign,setPEPLocalOrForeign] = useState<string>('')


    const PEPList = ['Myself', 'Family Member']

    return(
        <View>
                <ScrollView 
                ref={scrollViewRef}
                style={{width:Dimensions.get('window').width, paddingHorizontal:20}}
                bounces={false}
                >
                <View onStartShouldSetResponder={() => true}>
                <View style={{
                    marginBottom:20
                }}>
                    <Image source={require('../../../assets/images/tree.png')} style={{height:36,width:36}}/>
                </View>
                <Text style={{
                    width:'100%',
                    fontFamily:'PlayfairDisplay_700Bold',
                    fontSize:32,
                    color:AppConstants.loginHeaderBlue

                }}>
                    SmartRupee{'\n'}Onboarding
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Disclosures & Disclaimers
                </Text>
                <Text
                style={{marginTop:20}}
                >
                    {LoremIpsum}
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
                    width:'17.5%',
                    marginTop:10,
                    height: 54,
                    marginVertical:10,
                    borderRadius: 6,
                    padding:10,
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'center',
                    borderWidth: 1,
                    borderColor:'#DDD'
                }} 
                onPress={goToPrev}
                >
                    <Feather name="arrow-left" size={24} color="#8692A6" />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width:'80%',
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
                onPress = {() => {goToNext()}}
                disabled= {false}
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                    Next
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