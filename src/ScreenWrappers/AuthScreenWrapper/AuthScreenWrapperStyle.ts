import { 
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native'
import Constants from 'expo-constants'
import { AppConstants } from '../../../assets/AppConstants'

export const AuthScreenWrapperStyle = StyleSheet.create({
    viewMain : {
        alignItems:'center',
        justifyContent:'flex-start',
        flex:1,
        fontFamily:'ArialNova',
        width: Dimensions.get('window').width
    },
    header : {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height * 0.1) + Constants.statusBarHeight,
        backgroundColor: '#F7F8FC',
        paddingTop:Constants.statusBarHeight,
        flexDirection: 'row',
        alignItems:'center'
    },
    body : {
        height : (Platform.OS === 'ios' ? (Dimensions.get('window').height * 0.8)- Constants.statusBarHeight : (Dimensions.get('window').height * 0.85)- Constants.statusBarHeight),
        paddingTop:40,
        // width:'100%'
    },
    textInputStyle : {
        width:Dimensions.get('window').width * 0.9,
        height: 64,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        fontSize: 16,
        padding:10,
        borderRadius: 6,
        marginVertical:10
    },
    loginButton : {
        width:Dimensions.get('window').width * 0.9,
        height: 54,
        backgroundColor:AppConstants.loginHeaderBlue,
        marginVertical:10,
        borderRadius: 6,
        padding:10,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    footer : {
        // height: Dimensions.get('window').height * 0.1,
        width: '100%',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        paddingTop:0,
        paddingBottom:10,
    }
})