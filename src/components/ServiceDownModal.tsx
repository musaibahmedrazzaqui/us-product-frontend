import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Dimensions,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
    Platform
} from 'react-native'
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import {AntDesign} from '@expo/vector-icons'
export default function ServiceDownModal({
    isSuccess,
    message,
    subMessage,
    show,
    closeModal,
    onClose
} : any) {
    return(
        <Modal visible={true} transparent={true} animationType='fade' onDismiss={onClose}>
            <View  style={{height:Dimensions.get('window').height, width : Dimensions.get('window').width,backgroundColor:'rgba(127,127,127,1)', alignItems:'center',justifyContent:'center'}}>
                <View style={{ width:'95%',backgroundColor:'#fff', borderRadius:6, flexDirection:'row', overflow:'hidden'}}>
                    <View style={{height:'100%', width:5, backgroundColor: '#004DBC'}}/>
                    <View style={{flex:1, paddingHorizontal:20, justifyContent:'space-evenly', marginVertical:20}}>
                        
                        <TouchableOpacity style={{width:'95%', alignItems:'flex-end'}} onPress={closeModal}>
                            {/* <AntDesign name="close" color={"#666"} size={16}/> */}
                        </TouchableOpacity>
                        <View style={{height:80, width:80, borderRadius:50, alignItems:'center', justifyContent : 'center',backgroundColor:'#004DBC'}}>
                            <AntDesign name="warning" color='white' size={40}/>
                        </View>
                        <Text style={{fontFamily:'ArialNova-Bold', fontSize:18, paddingVertical:10}}>
                        Sorry about that!
                        </Text>
                        <Text style={{fontFamily:'ArialNova-Light', fontSize:18, paddingVertical:5}}>
                        Sorry about that! We don't know what went wrong, but we are working to figure it out. 
                        </Text>

                        <Text style={{fontFamily:'ArialNova-Light', fontSize:14, paddingVertical:20, paddingBottom:10}}>In the meantime, please e-mail help@elphinstone.us with any requests or questions.
                        </Text>

                        <View style={{flexDirection:'row'}}>
                        

                        </View>
                    </View>

                {/* <Button title="close" onPress={closeModal}/> */}

                </View>
            </View>
        </Modal>
    )
}