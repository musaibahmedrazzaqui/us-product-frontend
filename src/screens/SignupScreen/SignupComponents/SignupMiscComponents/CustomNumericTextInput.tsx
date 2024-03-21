import {
    View,
    TextInput,
    Text,
    Dimensions
} from 'react-native'
import { GlobalStyles } from '../../../../GlobalStyles'
import {AntDesign} from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
export default function CustomNumericTextInput({
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
    disabled? : any

}) {
    return (
    <TouchableWithoutFeedback onPress={() =>reference.current.focus()}>
    <View style={{
        // backgroundColor:'#eee',
        width: '100%', 
        flexDirection:'row',
        marginTop:20, 
        // borderWidth:1,
        borderColor: touched ? (errors ? 'red' : '#19C18F' ) : '#DDDDDD',
        borderRadius: 6,
    }}>
    <TextInput 
    ref={reference}
    style={{
        width:Dimensions.get('window').width * 0.9,
        height: 64,
        // borderWidth: 1,
        borderColor: '#DDDDDD',
        fontSize: 16,
        padding:10,
        borderRadius: 6,
        // width:'80%', 
        // borderWidth:0
    }}
    placeholder={placeholder}
    onChangeText={handleChange}
    onBlur={handleBlur}
    value={value}
    autoCapitalize="none"
    keyboardType={"numeric"}
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
    <View style={{
        // backgroundColor:'#eee',
        position:'absolute',
        width: '100%', 
        flexDirection:'row',
        marginTop:20, 
        borderWidth:1,
        borderColor: touched ? (errors ? 'red' : '#19C18F' ) : '#DDDDDD',
        borderRadius: 6,
        height: 64,
        backgroundColor:'#fff',
        // paddingLeft:10,
        alignItems:'center',
        justifyContent:'space-between'
    }}>
        <View style={{width:'20%', backgroundColor:'#eee', alignItems:'center',justifyContent:'center', height:'100%', borderTopStartRadius:6, borderBottomStartRadius:6}}>
            <Text>
                USD
            </Text>
        </View>
        <View style={{flex:1, paddingHorizontal:10}}>
        <Text style={{fontSize:16}} numberOfLines={1} adjustsFontSizeToFit>
            {value &&  parseFloat(value).toLocaleString(undefined,{maximumFractionDigits:10})}
        </Text>
        </View>
        <View style={{
        height: 64,
        width:'20%',
        alignItems:'center',
        justifyContent : 'center',
        // backgroundColor:'#eee'
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
    </TouchableWithoutFeedback>
    )
}