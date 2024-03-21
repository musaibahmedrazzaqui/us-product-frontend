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
    Animated,ScrollViewComponent, TouchableWithoutFeedback
} from 'react-native'
import { AppConstants } from '../../../assets/AppConstants'
import { Entypo, Feather } from '@expo/vector-icons'; 
import React,{useRef, useState, useEffect} from 'react'
import * as DocumentPicker from 'expo-document-picker';
import {DocumentResult} from 'expo-document-picker'
import {Ionicons} from '@expo/vector-icons'
import { Camera, CameraType } from 'expo-camera';

export default function SignupSelfieUpload({goToNext, goToPrev} : {goToNext : ()=>void, goToPrev : ()=> void}){
    const scrollViewRef = useRef<any>()
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [showCamera, setShowCamera] = useState(false)
    const cameraRef = useRef<any>()
    const [takenImage, setTakenImage] = useState<string | null>(null)
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
                To finish it off, upload your selfie
                </Text>
                {showCamera?
                <Camera ref={cameraRef} style={{height:240, width:240, borderRadius:120, overflow:'hidden',marginTop:40, alignSelf:'center'}} type={type}/>
                :
                (
                takenImage ? 

                <View style={{height:240, width:240, borderRadius:120, overflow:'hidden',marginTop:40, alignSelf:'center'}}>
                    <Image source={{uri : takenImage}} style={{height:'100%', width:'100%'}}/>
                </View>
                :
                <TouchableWithoutFeedback onPress={()=> permission?.granted ? setShowCamera(!showCamera) : requestPermission().then(()=>setShowCamera(!showCamera))}>
                <View style={{height:240, width:240,marginTop:40, alignSelf:'center'}}>
                    <Image source={require('../../../assets/images/avatar.png')} />
                    <View style={{height:240, width:240, borderRadius:120, backgroundColor:'rgba(223,223,223,0.5)', alignSelf:'center', position:'absolute',alignItems:'flex-end',justifyContent:'flex-end'}}>
                        <View style={{height:40, width:40, borderRadius:20, backgroundColor:'#F7F8FC', alignItems:'center', justifyContent:'center', margin:12}}>
                            <Ionicons name="camera" size={20} color={AppConstants.loginHeaderBlue}/>
                        </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>)
                }

                {takenImage &&
                
                <TouchableOpacity style={{alignSelf:'center', marginTop:40}} onPress={()=>setShowCamera(true)}>
                    <Text style={{color:AppConstants.loginHeaderBlue}}>
                        Take Again
                    </Text>
                </TouchableOpacity>
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

                {

                showCamera ? 
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
                onPress={()=>cameraRef.current.takePictureAsync().then((cb : any) => {setTakenImage(cb.uri); setShowCamera(false)})}
                disabled= {false}
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                    Take Picture
                </Text>
                {/* <Feather name="arrow-right" size={24} color="white" /> */}
            </TouchableOpacity>
                :
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
            onPress={goToNext}
            disabled= {takenImage === null}
            >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                    Next
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
            }
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