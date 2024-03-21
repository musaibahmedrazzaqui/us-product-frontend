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
import {useRef, useState} from 'react'
import CountrySelector from './SignupMiscComponents/CountrySelector';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import CustomSelector from './SignupMiscComponents/CustomSelector';



export default function SignupIDType({goToNext, goToPrev, userData, setUserData} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any}){
    const [selectedValue, setSelectedValue] = useState(userData.idType)
    const onSubmit = () =>{
        if (selectedValue != ""){
            setUserData({...userData, idType : selectedValue})
            goToNext()    
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
                    SmartInvest{'\n'}Onboarding
                </Text>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                ID Type
                </Text>
               <CustomSelector selectedValue={selectedValue} setValue={setSelectedValue} itemList={['Social Security Number', 'CNIC']}/>
               <HorizontalNavigatior showBackButton nextFunction={onSubmit} backFunction={goToPrev}/>
        </KeyboardAvoidingView>
    )
}