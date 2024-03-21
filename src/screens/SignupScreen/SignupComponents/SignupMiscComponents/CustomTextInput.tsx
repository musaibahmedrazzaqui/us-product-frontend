import {
    View,
    TextInput
} from 'react-native'
import { GlobalStyles } from '../../../../GlobalStyles'
import {AntDesign} from '@expo/vector-icons'
export default function CustomTextInput({
    reference,
    touched,
    errors,
    handleChange,
    handleBlur,
    value,
    keyboardType,
    placeholder,
    editable,
    selectTextOnFocus,
    textContentType,
    secureTextEntry,
    onFocus,
    onLayout,
    disabled,
    additionalStyle
} : {
    reference : any,
    touched : any,
    errors : any,
    value : any
    handleChange : any,
    handleBlur : any,
    keyboardType? : any,
    placeholder? : any,
    editable? : boolean,
    selectTextOnFocus? : any,
    textContentType? : any,
    secureTextEntry? : any,
    onFocus? : any,
    onLayout? : any,
    disabled? : any,
    additionalStyle? : any

}) {
    return (
    <View style={{
        // backgroundColor:'#eee',
        width: '100%', 
        flexDirection:'row',
        marginTop:20, 
        borderWidth:1,
        borderColor: touched ? (errors ? 'red' : '#19C18F' ) : '#DDDDDD',
        borderRadius: 6,
    }}>
    <TextInput 
    ref={reference}
    style={{...GlobalStyles.textInputStyle, width:'80%', borderWidth:0}}
    placeholder={placeholder}
    onChangeText={handleChange}
    onBlur={handleBlur}
    value={value}
    autoCapitalize="none"
    keyboardType={keyboardType}
    editable={editable} 
    selectTextOnFocus={selectTextOnFocus}
    textContentType={textContentType}
    secureTextEntry={secureTextEntry}
    onFocus={onFocus}
    />
    <View style={{
        height: 64,
        width:'20%',
        alignItems:'center',
        justifyContent : 'center'
    }}>
        {(touched) ? 
        (errors ? 
            <AntDesign name='close' size={24} color={'red'}/> :
            <AntDesign name='check' size={24} color={'#19C18F'}/> 
        ) :
       <></>
    }
    </View>
    </View>
    )
}