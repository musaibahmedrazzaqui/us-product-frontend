import React from 'react'
import {
    View,
    TouchableWithoutFeedback,
    Text
} from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import {DocumentResult} from 'expo-document-picker'

export default function CustomDocumentSelector({selectedValue, setValue, placeholder, mimetype} : {selectedValue : DocumentResult | null | undefined, setValue : any, placeholder:string, mimetype : string}){
    return (
        <View style={{height:82, width:'100%', borderWidth:1, borderRadius:6, borderColor:'#ddd',borderStyle:'dashed'}}>
            <TouchableWithoutFeedback onPress={()=>DocumentPicker.getDocumentAsync({type:mimetype}).then(cb => {
                if (cb?.type === 'cancel'){
                    return
                }
                setValue(cb)
            })}>
                <View style={{height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                <Text style={{
                    fontFamily:'ArialNova',
                    fontSize:12,
                    color:'#1E293B'
                    // lineHeight:18,
                }}>
                    {selectedValue ? (selectedValue.name) : placeholder}
                </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}