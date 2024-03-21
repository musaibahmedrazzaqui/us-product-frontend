import {
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native'


function convertDateFormat(datetime : any) {
    const date = new Date(datetime);
    const options = {
        day: 'numeric',
        month: 'short',
    }
    const dateString = date.toLocaleDateString('en-US', options as any);
    const timeString = date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    return `${dateString}, ${timeString}`;
}

// export function TransferInItemOld(props : any){

//     const {status, amount, updated_at} = props
//     return(
//         <View style={{
//             width:Dimensions.get('window').width *0.9, height:120, borderRadius:6, backgroundColor:'#fff',
//         shadowColor: "#000",
//                 shadowOffset: {
//                     width: 0,
//                     height: 2,
//                 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 9,
//                 elevation:5,
//                 marginVertical:7.5,
//                 // overflow: 'hidden'
//         }}>
//             <View style={{height:20,alignItems:'flex-end'}}>
//             </View>
//         <View style={{
                
//                 padding:15,
//                 flexDirection:'row',
//                 justifyContent:'space-between'}}>
//             <View style={{height:'100%', justifyContent:'flex-start'}}>
//             <Text style={{fontFamily:'ArialNova', fontSize:16}}>
//             Cash Transfer In
//             </Text>
//             { <Text style={{fontSize:10, color:'#888',marginVertical:2}}>
//             {convertDateFormat(updated_at) }
//             </Text>

//             }
            
//             </View>
//             <View style={{width:'50%', alignItems:'flex-end'}}>
//                 <Text style={{fontFamily:'ArialNova', fontSize:16}}>
//                     Total: $ {parseFloat(amount).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}
//                 </Text> 
                
//                 {status === 'COMPLETE' ? <Text style={{fontFamily:'ArialNova', fontSize:10, color:'#21BF73', marginVertical:4}}>
//                 Successfully Completed
//                 </Text> 
//                 : (
//                     status === 'CANCELED' ? 
//                     <Text style={{fontFamily:'ArialNova', fontSize:10, color:'red', marginVertical:4}}>
//                         Canceled
//                     </Text> :
//                     <Text style={{fontFamily:'ArialNova', fontSize:10, color:'black', marginVertical:4}}>
//                     Queued
//                     </Text> 

//                 )
                
//                 }{
//                     ['new','partially_filled','done_for_day','accepted', 'pending_new', 'accepted_for_bidding','stopped','suspended'].includes(status) && 
//                 <TouchableOpacity style={{borderWidth:1, borderRadius:100, borderColor:'red', padding:2, paddingHorizontal:7.5, marginTop:5}} 
//                 onPress={()=>{}}>
//                     <Text style={{fontFamily:'ArialNova', fontSize:9, color:'red'}}>
//                         Cancel Transfer
//                     </Text>
//                 </TouchableOpacity>
//                 }
//             </View>
//         </View>
//         </View>
//     )
// }


export function TransferInItem(props : any){
    const {status, net_amount, settle_date} = props
    return(
        <View style={{
            width:Dimensions.get('window').width *0.9, height:120, borderRadius:6, backgroundColor:'#fff',
        shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 9,
                elevation:5,
                marginVertical:7.5,
                // overflow: 'hidden'
        }}>
            <View style={{height:20,alignItems:'flex-end'}}>
            </View>
        <View style={{
                
                padding:15,
                flexDirection:'row',
                justifyContent:'space-between'}}>
            <View style={{height:'100%', justifyContent:'flex-start'}}>
            <Text style={{fontFamily:'ArialNova', fontSize:16}}>
            Cash Transfer In
            </Text>
            { <Text style={{fontSize:10, color:'#888',marginVertical:2}}>
            {convertDateFormat(settle_date) }
            </Text>

            }
            
            </View>
            <View style={{width:'50%', alignItems:'flex-end'}}>
                <Text style={{fontFamily:'ArialNova', fontSize:16}}>
                    Total: $ {parseFloat(net_amount).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}
                </Text> 
                
                {status === 'executed' ? <Text style={{fontFamily:'ArialNova', fontSize:10, color:'#21BF73', marginVertical:4}}>
                Successfully Completed
                </Text> 
                : (
                    ['canceled','rejected','refused','deleted'].includes(status) ? 
                    <Text style={{fontFamily:'ArialNova', fontSize:10, color:'red', marginVertical:4}}>
                        Canceled
                    </Text> :
                    <Text style={{fontFamily:'ArialNova', fontSize:10, color:'black', marginVertical:4}}>
                    Queued
                    </Text> 

                )
                
                }
            </View>
        </View>
        </View>
    )
}


export function TransferOutItem(props : any){
    const {status, net_amount, settle_date} = props
    return(
        <View style={{
            width:Dimensions.get('window').width *0.9, height:120, borderRadius:6, backgroundColor:'#fff',
        shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 9,
                elevation:5,
                marginVertical:7.5,
                // overflow: 'hidden'
        }}>
            <View style={{height:20,alignItems:'flex-end'}}>
            </View>
        <View style={{
                
                padding:15,
                flexDirection:'row',
                justifyContent:'space-between'}}>
            <View style={{height:'100%', justifyContent:'flex-start'}}>
            <Text style={{fontFamily:'ArialNova', fontSize:16}}>
            Cash Transfer Out
            </Text>
            { <Text style={{fontSize:10, color:'#888',marginVertical:2}}>
            {convertDateFormat(settle_date) }
            </Text>

            }
            
            </View>
            <View style={{width:'50%', alignItems:'flex-end'}}>
                <Text style={{fontFamily:'ArialNova', fontSize:16}}>
                    Total: $ {parseFloat(net_amount).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}
                </Text> 
                
                {status === 'executed' ? <Text style={{fontFamily:'ArialNova', fontSize:10, color:'#21BF73', marginVertical:4}}>
                Successfully Completed
                </Text> 
                : (
                    ['canceled','rejected','refused','deleted'].includes(status) ? 
                    <Text style={{fontFamily:'ArialNova', fontSize:10, color:'red', marginVertical:4}}>
                        Canceled
                    </Text> :
                    <Text style={{fontFamily:'ArialNova', fontSize:10, color:'black', marginVertical:4}}>
                    Queued
                    </Text> 

                )
                
                }
            </View>
        </View>
        </View>
    )
}