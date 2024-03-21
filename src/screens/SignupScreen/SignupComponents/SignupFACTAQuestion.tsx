import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    ScrollView,
    StyleSheet,
    Pressable,
    SafeAreaView,
    Image
} from 'react-native'
import { AppConstants } from '../../../assets/AppConstants'
import { Entypo, Feather } from '@expo/vector-icons'; 
import {useRef, useState} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import { BooleanSelector } from '../../../miscComponents/BooleanSelector';
const SignupSchema = Yup.object().shape({
    birthPlace: Yup.string().min(1).required('Required'),
  });


export default function SignupFACTAQuestion({goToNext, goToPrev} : {goToNext : ()=>void, goToPrev : ()=> void}){
    const emailInputRef = useRef<any>()
    const [isFACTA,setFACTA] = useState<boolean | null>(null)
    return(
        <View
        style={{
            
        }}
        >
                <ScrollView 
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
                Do any of the following conditions 
apply to you:
                </Text>

                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:16,
                    lineHeight:26,
                    paddingTop:20
                }}>
                    {'\u25CF'} US citizen {'\n'}
                    {'\u25CF'} US permanent resident {'\n'}
                    {'\u25CF'} US tax resident {'\n'}
                    {'\u25CF'} Born in the US {'\n'}
                    {'\u25CF'} Citizen or resident of any country other than Pakistan and the US {'\n'}
                    {'\u25CF'} Given power of attorney to a person residing overseas {'\n'}
                </Text>
                
                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:12,
                    lineHeight:18,
                    color:'#8C949D',
                    marginTop:10
                }}>
                If any of those conditions apply, select “yes” below. 
                If none of them apply, select “no”.
                </Text>
                
                
                <BooleanSelector value={isFACTA} setValue={(value)=>setFACTA(value)}/>
            
                
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
                onPress = {() => {isFACTA != null && goToNext()}}
                disabled= {isFACTA === null}
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