import React, {useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Modal,
    Button,
    Platform,
    UIManager,
    LayoutAnimation
} from 'react-native'
import CustomSelector from '../SignupScreen/SignupComponents/SignupMiscComponents/CustomSelector';
import { AntDesign, Feather } from '@expo/vector-icons'
import { AppConstants } from '../../../assets/AppConstants';
import RiskToleranceSelector from '../SignupScreen/SignupComponents/SignupMiscComponents/RiskToleranceSelector';
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

export default function ConfigModal({showConfigModal, setConfigModal, fundPreference, riskTolerance,setUserPreferences, userPreferences} : any){

    const [fundPref, setFundPreference] = useState(userPreferences)
    // const [riskTol, setRiskTolerance] = useState(userPreferences.riskTolerance)

    return(
        <Modal visible={showConfigModal} transparent={true} animationType="fade">
            <View style={{alignItems:'center',justifyContent:'flex-start',flex:1, backgroundColor:'rgba(127,127,127,0.6)', paddingTop:200}}>


                <View style={{width:'95%', alignItems:'center', justifyContent:'flex-start', backgroundColor:'#fff', borderRadius:6, paddingHorizontal:20, paddingBottom:20}}>
                    <TouchableOpacity style={{alignSelf:'flex-end', marginVertical:20}} onPress={()=>setConfigModal(false)}>
                        <AntDesign name="close" size={16}/>
                    </TouchableOpacity>

                <Text style={{alignSelf:'flex-start', fontFamily:'ArialNova', fontSize:16, marginVertical:10}}>
                    Set funds preference
                </Text>
                <CustomSelector itemList={['Islamic','Conventional']} selectedValue={fundPref} setValue={setFundPreference}/>

                <Text style={{textAlign:'justify', fontSize:11, fontFamily: 'ArialNova', color:'#8C949D', marginTop:20}}>
                <Text style={{fontFamily:'ArialNova-Bold'}}>Note: </Text> conventional investments typically offer higher rates of return than Islamic investments, but may not always be in accordance with Islamic principles.
                </Text>

                {/* <Text style={{alignSelf:'flex-start', fontFamily:'ArialNova', fontSize:16, marginTop: 20}}>
                    Set funds preference
                </Text>
                <RiskToleranceSelector selectedValue={riskTol} setValue={setRiskTolerance}/> */}

                <TouchableOpacity style={{
                    width:'100%',
                    marginTop:50,
                    height: 54,
                    backgroundColor:AppConstants.loginHeaderBlue,
                    marginVertical:10,
                    borderRadius: 6,
                    padding:10,
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between'
                }} 
                activeOpacity={0.8}
                onPress={()=>{ 
                    setUserPreferences(fundPref)
                    setConfigModal(false)
                }
            }
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                Save funds preferences
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>

            </View> 
            </View>
        </Modal>
    )
    
}