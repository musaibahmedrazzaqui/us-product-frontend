import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    Image,
    Button
} from 'react-native'
import { AppConstants, humanReadableDate } from '../../../../assets/AppConstants';
import { Entypo, Feather } from '@expo/vector-icons'; 
import {useRef, useState} from 'react'
import CountrySelector from './SignupMiscComponents/CountrySelector';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomDatePicker from './SignupMiscComponents/CustomDatePicker';
import { usePostHog } from 'posthog-react-native';
function getEighteenYearsAgo(date) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() - 18);
    return newDate;
  }

  function formatDate(date : Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
export default function SignupDOB({goToNext, goToPrev, userData, setUserData, updateUser} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any, updateUser : any}){
    const [date, setDate] = useState(userData.dob);
    const posthog = usePostHog()
    const onSubmit = () =>{
        if (date != ""){
            setUserData({...userData, dob : date})
            posthog?.capture('Onboarding : Next button pressed on DOB screen', {
                dob: formatDate(date),
            })
            updateUser({
                dob: formatDate(date),
                meta : {
                    profile_start_ts : humanReadableDate(userData.profile_start_ts),
                    profile_completeness : 0.25,
                    signup_page_location: -5
                }
            }, goToNext)   
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
                Date of Birth
                </Text>

                <CustomDatePicker selectedValue={date} setValue={setDate} maximumDate={getEighteenYearsAgo(new Date())}/>

               <HorizontalNavigatior showBackButton nextFunction={onSubmit} backFunction={goToPrev}/>
        </KeyboardAvoidingView>
    )
}