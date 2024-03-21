import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'
export function ButtonMain({height, width, onPress} : {height? : number, width? : number, onPress? : ()=>void}) {
    return(
        <TouchableOpacity style={{
            backgroundColor: '#004DBC',
            height : height ? height : 64,
            width : width ? width : 340,
            elevation:5,
            borderRadius:8,
            alignItems:'center',
            justifyContent:'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        }} onPress={onPress}>
            <Text style={{
                color:'white',
                fontFamily:'ArialNova',
                fontWeight:'400',
                fontSize:16
            }}>
                Next
            </Text>
        </TouchableOpacity>
    )
}