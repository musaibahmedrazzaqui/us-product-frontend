import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    Image
} from 'react-native'
import { AppConstants } from '../../../../assets/AppConstants';
import { Entypo, Feather } from '@expo/vector-icons'; 
import {useRef, useState} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import CustomSelector from './SignupMiscComponents/CustomSelector';
import CountrySelector from './SignupMiscComponents/CountrySelector';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import RiskToleranceSelector from './SignupMiscComponents/RiskToleranceSelector';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

const SignupSchema = Yup.object().shape({
    birthPlace: Yup.string().min(1).required('Required'),
  });

  const listOfRisks = [
    {
        title : 'The Cash Conserver',
        returns : "Low",
        risk : "Low",
        text : "Suitable if you are investing for 0-3 years."
    },
    {
        title : 'The Small-Risk Taker',
        returns : 'Medium-Low',
        risk : 'Medium-Low',
        text : "Suitable if you are investing for 3-5 years."
    },
    {
        title : 'The Moderate',
        returns : "Medium",
        risk : "Medium",
        text : "Suitable if you are investing for 5-7 years."
    },
    {
        title : "The Growth Seeker",
        returns : "Medium-High",
        risk : "Medium",
        text : 'Suitable if you are investing for 7-10 years.'
    },
    {
        title : 'The Fortune Builder',
        returns : "High",
        risk : "High",
        text : "Suitable if you are investing for 10+ years"
    },
]

export default function SignupFundPreference({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser : any}){
    const [selectedFundPreference, setSelectedFundPreference] = useState(userData.fundPreference)
    const [selectedRiskTolerance, setSelectedRiskTolerance] = useState(userData.riskTolerance)
    const [proportion, setProportion] = useState(2)
    const onSubmit = () =>{
        if (selectedFundPreference != ""){
            setUserData({...userData, fundPreference : selectedFundPreference, riskTolerance : selectedRiskTolerance})
            updateUser({
                preference : selectedFundPreference.toLowerCase(),
                risk_tolerance_level : listOfRisks[proportion].title
            },goToNext)
        }
    }
    return(
        <KeyboardAvoidingView behavior='height' style={{
            width:Dimensions.get('window').width,
            height:'100%',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            paddingHorizontal:20
            }}>
                <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
                <View style={{
                    marginBottom:20
                }}>
                    <Image source={require('../../../../assets/images/tree.png')} style={{height:36,width:36}}/>
                </View>

                <Text style={{
                    width:'100%',
                    fontFamily:'PlayfairDisplay_700Bold',
                    fontSize:32,
                    color:AppConstants.loginHeaderBlue

                }}>
                    Elphinstone US{'\n'}Onboarding
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                Funds preference
                </Text>
               <CustomSelector selectedValue={selectedFundPreference} setValue={setSelectedFundPreference} itemList = {['Islamic', 'Conventional']}/>
               <Text style={{fontFamily:'ArialNova', color:'#8C949D', fontSize:11, marginTop:10}}>
               <Text style={{fontFamily:'ArialNova-Bold'}}>Note:</Text> conventional investments typically offer higher rates of return than Islamic investments, but may not always be in accordance with Islamic principles.
               </Text>

               <View style={{width:'100%', marginTop:30}} onStartShouldSetResponder={() => true}>
            <Text style={{fontFamily:'ArialNova', color:'#1E293B', fontSize:16}}>
                Preferred risk tolerance level
            </Text>
            <View style={{borderWidth:1, borderColor:'#DDD', borderRadius:9, marginVertical:20, paddingHorizontal:15, paddingVertical:20}}>
                <Text style={{color : "#8692A6", fontFamily: 'ArialNova'}}>
                    Set your preferences by moving the slider
                </Text>
                <View style={{borderWidth: 1, borderColor:'#DDD', paddingVertical:20, paddingHorizontal:15, marginVertical:20, borderRadius: 6}}>
                    <Text>
                        {listOfRisks[proportion].title}
                    </Text>
                </View>

                <Slider
                style={{width:'100%', height: 40, alignSelf:'center', marginBottom:20}}
                minimumValue={0}
                maximumValue={4}
                step={1}
                value={proportion}
                onValueChange={cb=>setProportion(cb)}
                minimumTrackTintColor="#004DBC"
                // maximumTrackTintColor="#004DBC"
                thumbImage={require('../../../../assets/images/slider_icon.png')} 
                />

                <View style={{width:'100%', alignItems:'center'}}>
                    <Text style={{fontFamily:'Overpass_400Regular', color: '#8C949D', marginBottom:20}}>
                        Details
                    </Text>
                    <View style={{flexDirection : "row", justifyContent:'space-between', width:'100%'}}>
                        <View style={{alignItems:'center', flex:1}}>
                        <Feather name="bar-chart" size={26} color={'#8C949D'}/>
                        <Text style={{fontFamily:'Overpass_300Light', color: '#8C949D', marginTop:20}}>
                            Returns
                        </Text>
                        <Text style={{fontFamily:'Overpass_400Regular', color: '#8C949D'}}>
                            {listOfRisks[proportion].returns}
                        </Text>
                        </View>

                        <View style={{alignItems:'center', flex:1}}>
                        <Feather name="umbrella" size={26} color={'#8C949D'}/>
                        <Text style={{fontFamily:'Overpass_300Light', color: '#8C949D', marginTop:20}}>
                            Risk
                        </Text>
                        <Text style={{fontFamily:'Overpass_400Regular', color: '#8C949D'}}>
                            {listOfRisks[proportion].risk}
                        </Text>
                        </View>

                        <View style={{alignItems:'center', flex:1}}>
                        <Feather name="calendar" size={26} color={'#8C949D'}/>
                        <Text style={{fontFamily:'Overpass_300Light', color: '#8C949D', marginTop:20}}>
                            Investment
                        </Text>
                        <Text style={{fontFamily:'Overpass_400Regular', color: '#8C949D'}}>
                            Period
                        </Text>
                        <Text style={{fontFamily:'ArialNova', fontSize:10, color: '#8C949D', width:'66.6%', textAlign:'center'}}>
                            ({listOfRisks[proportion].text})
                        </Text>
                        </View>

                    </View>
                </View>
            </View>


        </View>
               <HorizontalNavigatior showBackButton nextFunction={onSubmit} backFunction={goToPrev}/>
               </ScrollView>
        </KeyboardAvoidingView>
    )
}