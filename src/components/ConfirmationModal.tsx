import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Dimensions,
    Button,
    TouchableOpacity
} from 'react-native'
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import {AntDesign} from '@expo/vector-icons'
export default function ConfirmationModal({
    message,
    subMessage,
    show,
    closeModal,
    onClose,
    confirmFunction
} : any) {
    return(
        <Modal visible={show} transparent={true} animationType='fade' onDismiss={onClose}>
            <View  style={{height:Dimensions.get('window').height, width : Dimensions.get('window').width,backgroundColor:'rgba(127,127,127,0.5)', alignItems:'center',justifyContent:'center'}}>
                <View style={{ width:'95%',backgroundColor:'#fff', borderRadius:6, flexDirection:'row', overflow:'hidden'}}>
                    <View style={{height:'100%', width:5, backgroundColor: '#004DBC'}}/>
                    <View style={{flex:1, paddingHorizontal:20, justifyContent:'space-evenly', marginVertical:20}}>
                        
                        <TouchableOpacity style={{width:'95%', alignItems:'flex-end'}} onPress={closeModal}>
                            <AntDesign name="close" color={"#666"} size={16}/>
                        </TouchableOpacity>
                        <View style={{height:80, width:80, borderRadius:50, alignItems:'center', justifyContent : 'center',backgroundColor:'#004DBC'}}>
                            <AntDesign name="warning" color='white' size={40}/>
                        </View>

                        <Text style={{fontFamily:'ArialNova-Light', fontSize:16, paddingVertical:10}}>
                        {message}
                        </Text>

                        <Text style={{fontFamily:'ArialNova-Light', fontSize:12}}>{subMessage}
                        </Text>

                        <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{width:'35%', height:50, borderRadius:6, backgroundColor:'#004dbc',alignItems:'center',justifyContent:'center'}} onPress={confirmFunction}>
                            <Text style={{color:'white', fontFamily:'ArialNova'}}>
                                Yes
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:'35%', height:50, borderRadius:6, alignItems:'center', justifyContent:'center', borderWidth: 1, borderColor: '#8C949D', marginHorizontal:10}}
                        onPress={closeModal}
                        >
                            <Text style={{color:'#8C949D', fontFamily:'ArialNova'}}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                {/* <Button title="close" onPress={closeModal}/> */}

                </View>
            </View>
        </Modal>
    )
}