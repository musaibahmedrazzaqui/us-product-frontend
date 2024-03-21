import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Dimensions,
    Button,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import {AntDesign} from '@expo/vector-icons'
export default function SpinnerModal({
    isSuccess,
    message,
    subMessage,
    show,
    closeModal,
    onClose
} : any) {
    return(
        <Modal visible={show} transparent={true} animationType='fade' onDismiss={onClose}>
            <View style={{height:Dimensions.get('window').height, width : Dimensions.get('window').width,backgroundColor:'rgba(127,127,127,0.5)', alignItems:'center',justifyContent:'center'}}>
                <View style={{height:200, width:200,backgroundColor:'#fff', borderRadius:6, flexDirection:'row', overflow:'hidden', alignItems:'center',justifyContent:'center'}}>
                    <ActivityIndicator size="large" color={"#004DBC"}/>
                    

                {/* <Button title="close" onPress={closeModal}/> */}

                </View>
            </View>
        </Modal>
    )
}