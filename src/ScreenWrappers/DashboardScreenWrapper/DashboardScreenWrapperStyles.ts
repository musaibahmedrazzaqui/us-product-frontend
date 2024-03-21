import {
    StyleSheet,
    Dimensions
} from 'react-native'
import Constants from 'expo-constants'
export const DashboardScreenWrapperStyle = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height * 0.075) + Constants.statusBarHeight,
        paddingTop:Constants.statusBarHeight,
        elevation:5,
        shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.06,
                shadowRadius: 3.84,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        justifyContent:'space-between'

    }
})