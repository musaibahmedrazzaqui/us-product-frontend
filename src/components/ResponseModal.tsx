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
export default function ResponseModal({
    isSuccess,
    message,
    subMessage,
    show,
    closeModal,
    onClose
} : any) {
    return(
        <Modal visible={show} transparent={true} animationType='fade' onDismiss={onClose}>
            <BlurView intensity={20} style={{height:Dimensions.get('window').height, width : Dimensions.get('window').width,backgroundColor:'rgba(127,127,127,0.3)', alignItems:'center',justifyContent:'center'}}>
                <View style={{height:310, width:'95%',backgroundColor:'#fff', borderRadius:6, flexDirection:'row', overflow:'hidden'}}>
                    <View style={{height:'100%', width:5, backgroundColor: isSuccess ? '#19C18F' : '#FC5C5C'}}/>
                    <View style={{flex:1, paddingHorizontal:20, justifyContent:'space-evenly'}}>
                        
                        <TouchableOpacity style={{width:'95%', alignItems:'flex-end'}} onPress={closeModal}>
                            <AntDesign name="close" color={"#666"} size={16}/>
                        </TouchableOpacity>
                        <LottieView
                        autoPlay
                        // ref={animation}
                        style={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#fff',
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={isSuccess ? require('../../assets/success_anim.json') : require('../../assets/failed_anim.json')}
                        loop={false}
                    />

                        <Text style={{fontFamily:'ArialNova-Light', fontSize:16}}>
                        {message}
                        </Text>

                        <Text style={{fontFamily:'ArialNova-Light', fontSize:12}}>{subMessage}
                        </Text>
                    </View>

                {/* <Button title="close" onPress={closeModal}/> */}

                </View>
            </BlurView>
        </Modal>
    )
}