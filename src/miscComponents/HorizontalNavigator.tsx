import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import {Feather} from '@expo/vector-icons'
import { AppConstants } from '../../assets/AppConstants'


export default function HorizontalNavigatior({backFunction, nextFunction, showBackButton, disableNextButton} : {backFunction : () => void, nextFunction : ()=>void, showBackButton : boolean, disableNextButton? : any}){
    return(
        <View
                style={{
                    alignItems:'flex-end',
                    justifyContent:'space-between',
                    width:'100%', 
                    marginTop:20, 
                    flex:1,
                    flexDirection:'row',
                    paddingBottom:20,
                    // backgroundColor:'#eee'
                }}>
                <TouchableOpacity style={{
                    width:'17.5%',
                    marginTop:10,
                    height: 54,
                    marginVertical:10,
                    borderRadius: 6,
                    padding:10,
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'center',
                    borderWidth: 1,
                    borderColor:'#DDD',
                    opacity : showBackButton ? 1 : 0
                }} 
                onPress={backFunction}
                disabled = {!showBackButton}
                >
                    <Feather name="arrow-left" size={24} color="#8692A6" />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width:'80%',
                    marginTop:10,
                    height: 54,
                    backgroundColor:AppConstants.loginHeaderBlue,
                    marginVertical:10,
                    borderRadius: 6,
                    padding:10,
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    elevation:5,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }} 
                activeOpacity={0.8}
                onPress = {nextFunction}
                disabled= {disableNextButton}
                >
                <Text style={{color:'white', fontFamily:'ArialNova', fontSize:18}}>
                    Next
                </Text>
                <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
            </View>
    )
}