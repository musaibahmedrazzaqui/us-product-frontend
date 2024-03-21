import React from 'react'
import {
    View,
    TouchableWithoutFeedback,
    Text
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {DocumentResult} from 'expo-document-picker'

export default function CustomPictureSelector({selectedValue, setValue, placeholder, mimetype} : {selectedValue : DocumentResult | null | undefined, setValue : any, placeholder:string, mimetype : string}){
    console.log(selectedValue?.uri.split('/').slice(-1)[0])
    return (
        <View style={{height:82, width:'100%', borderWidth:1, borderRadius:6, borderColor:'#ddd',borderStyle:'dashed'}}>
            <TouchableWithoutFeedback onPress={()=>ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing : false,
                quality : 1
            
            }).then(cb => {
                if (cb.canceled){
                    return
                }
                console.log(cb.assets)
                setValue(cb.assets[0])
            })}>
                <View style={{height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:12,
                    color:'#1E293B'
                    // lineHeight:18,
                }}>
                    {selectedValue ? (selectedValue.fileName || selectedValue?.uri.split('/').slice(-1)[0]) : placeholder}
                </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}