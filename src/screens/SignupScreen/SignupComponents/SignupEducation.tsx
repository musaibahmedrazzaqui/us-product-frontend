import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    Platform,
    ScrollView,
    KeyboardAvoidingViewComponent,
    KeyboardAvoidingViewBase,
    Image
} from 'react-native'
import { AppConstants } from '../../../assets/AppConstants'
import { Entypo, Feather } from '@expo/vector-icons'; 
import React,{useRef, useState} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import {Picker, PickerIOS} from '@react-native-picker/picker';
import { Tooltip, TooltipProps } from '@rneui/themed';
const SignupSchema = Yup.object().shape({
    mothersMaidenName: Yup.string().min(1).required('Required'),
  });


  const ControlledTooltip: React.FC<TooltipProps | any> = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Tooltip
        visible={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        {...props}
        popover={<ToolTipComponent setSelectedStatus={(value : string)=>{props.setSelectedStatus(value); setOpen(false)}}/>}
      />
    );
  };

  function ToolTipComponent({setSelectedStatus} : {setSelectedStatus : any}) {
    const MaritalStatuses = ["No formal education", "Less than Matric/O levels", "Matriculation/O levels", "Intermediate/A levels", "Attended college, no degree", "Bachelors degree (two years)", "Bachelors degree (three years)", "Bachelors degree (four years)", "Masters degree (16 years of education)", "Masters degree (18 years of education)", "PhD", "Professional degree (MBBS, LLB, etc)"]

    const ItemComponent = ({item} : {item : string}) =>{
        return (
            <TouchableOpacity onPress={()=>setSelectedStatus(item)} style={{height:60, justifyContent:'center', borderBottomColor: '#DFE0EB', borderBottomWidth:1,padding:10}}>
                <Text style={{fontFamily:'ArialNova', color:'#8692A6'}}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <ScrollView style={{width:'100%',height:'100%'}} showsVerticalScrollIndicator={false}>
            {MaritalStatuses.map((item,index) => <ItemComponent item = {item} key={index}/>)}
        </ScrollView>
    )
}

export default function SignupEducation({goToNext, goToPrev} : {goToNext : ()=>void, goToPrev : ()=>void}){
    const [selectedStatus, setSelectedStatus] = useState<string>('');
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
                    paddingTop:30
                }}
                >
                Education
                </Text>

                {  
                <ControlledTooltip
                width={Dimensions.get('window').width * 0.85 }
                height={250}
                backgroundColor={'#f0f0f0'}
                closeOnlyOnBackdropPress={false}
                setSelectedStatus = {setSelectedStatus}
                containerStyle={{
                    padding:0,
                    // overflow:'hidden',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.06,
                    shadowRadius: 3.84,
                    borderRadius:6,
                    elevation: 5,
                }}
                pointerStyle = {{
                    padding:0,
                    // overflow:'hidden',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.06,
                    shadowRadius: 3.84,
    
                    elevation: 5,
                }}
                // highlightColor={'#ccc'}
              >
                

                <View
                style={{
                    height:64,
                    width:Dimensions.get('window').width * 0.9,
                    borderWidth:1,
                    borderColor:'#ddd',
                    borderRadius:6,
                    marginTop:30,
                    justifyContent:'center',
                    padding:10
                }}>
                    <Text>
                        {selectedStatus === '' ? 'Select' : selectedStatus}
                    </Text>
                </View>
                </ControlledTooltip>
                }
                
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
                onPress = {() => {(selectedStatus != '') && goToNext()}}
                disabled={selectedStatus ===''}
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                    Next
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}