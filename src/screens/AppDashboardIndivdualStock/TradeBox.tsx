import React,{ useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import { AlpacaAccountsError, AppConstants } from '../../../assets/AppConstants'
import CustomSelector from '../SignupScreen/SignupComponents/SignupMiscComponents/CustomSelector'
import {AntDesign} from '@expo/vector-icons'


export default function TradeBox({navigation, route, alpacaService, launchResponseModal, stock, userBalances, currentHolding} : any){
    const [amount, setAmount] = useState("")
    const [orderType, setOrderType] = useState('Market')
    const [orderSide, setOrderSide] = useState('Buy')
    const [noOfShares, setNoOfShares] = useState<Number>()
    const [limitPrice, setLimitPrice] = useState("")
    const [stopPrice, setStopPrice] = useState("")
    const [trailPercent, setTrailPercent] = useState<any>(null)
    const [trailPrice, setTrailPrice] = useState<any>(null)
    const [timeInForce, setTimeInForce] = useState<string>('Day')
    const updateNoOfShare = () => {
        try{
            
            const value = parseFloat(amount)/parseFloat(stock?.bar?.c)
            setNoOfShares(value)
        }catch(e){
        }
    }
    const resetFields = () => {
        setAmount("")
        setAmount("")
        setLimitPrice("")
        setNoOfShares()
    }

    const updateMarket = (val : string) => {
        try{
            setAmount(val)
            const value = parseFloat(val)/parseFloat(stock?.bar?.c)
            setNoOfShares(value)
        }catch(e){
            console.log(e)
        }
    }

    const updateMarketSell = (val : string) => {
        try{
            setNoOfShares(parseFloat(val))
            const value = parseFloat(val) * parseFloat(stock?.bar?.c)
            setAmount(value)
        }catch(e){
            console.log(e)
        }
    }

    const updateLimitPriceNOS = (nos : string) => {
        try{
            setNoOfShares(nos)
            setAmount((parseFloat(limitPrice) * parseFloat(nos)).toLocaleString())
        }catch(e){
            console.log(e)
        }
    }

    const updateLimitPriceLP = (lp : string) => {
        try{
            setLimitPrice(lp)
            setAmount((parseFloat(lp) * parseFloat(noOfShares)).toLocaleString())
        }catch(e){
            console.log(e)
        }
    }

    const updateSpotPriceNOS = (nos : string) => {
        try{
            setNoOfShares(nos)
            setAmount((parseFloat(stopPrice) * parseFloat(nos)).toLocaleString())
        }catch(e){
            console.log(e)
        }
    }

    const updateSpotPriceSP = (sp : string) => {
        try{
            setLimitPrice(sp)
            setAmount((parseFloat(sp) * parseFloat(noOfShares)).toLocaleString())
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        resetFields()
    },[orderType, orderSide])
    return(
        <View style={{alignItems:'center'}}>
            
            <View style={{backgroundColor:'#F5FAFF', width:Dimensions.get('window').width, paddingHorizontal:0, paddingVertical:20,alignItems:'center', marginTop:20}}>
            <View style={{flexDirection:'row', width:'100%', paddingLeft:20, marginVertical:20}}>
                <TouchableWithoutFeedback onPress={()=>setOrderSide('Buy')}>
                    <View style={{padding:10, paddingHorizontal:20, backgroundColor: orderSide ==='Buy' ? AppConstants.loginHeaderBlue : 'transparent', borderRadius:6, borderWidth:1, borderColor:AppConstants.loginHeaderBlue}}>
                        <Text style={{color:orderSide ==='Buy' ? 'white' : AppConstants.loginHeaderBlue, fontSize:16, fontFamily:'ArialNova-Bold'}}>
                            Buy
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>setOrderSide('Sell')}>
                    <View style={{padding:10, paddingHorizontal:20, marginLeft:15, backgroundColor: orderSide ==='Sell' ? AppConstants.loginHeaderBlue : 'transparent', borderRadius:6, borderWidth:1, borderColor:AppConstants.loginHeaderBlue}}>
                        <Text style={{color:orderSide ==='Sell' ? 'white' : AppConstants.loginHeaderBlue, fontSize:16, fontFamily:'ArialNova-Bold'}}>
                            Sell
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
                <Text style={{fontFamily:'ArialNova', paddingTop:20, alignSelf:'flex-start', fontSize:18, paddingHorizontal:Dimensions.get('window').width * 0.05}}>
                    Order type
                </Text>
                <CustomSelector
                itemList={['Market', 'Limit Price', 'Stop Price', 'Stop-Limit Price', 'Trailing Stop']}
                selectedValue={orderType}
                setValue={setOrderType}
                />
                <Text style={{paddingTop:10, fontFamily:'ArialNova', color:'#8C949D', fontSize:11, paddingHorizontal:Dimensions.get('window').width * 0.05}}>
                <Text style={{fontFamily:'ArialNova-Bold'}}>Note: </Text> 
                {orderType === 'Market' && "For market orders, you can set the amount of money you want to transact in a particular stock or ETF, and we will buy or sell it for you at the prevailing market price."}
                {orderType === 'Limit Price' && "For limit orders, you can set the price and quantity of shares you wish to buy or sell, but note that if no other buyers or sellers wish to transact at that price, your trade may not get executed."}
                {orderType === 'Stop Price' && "A stop order allows you to buy or sell a stock at the market price once the stock has hit a specified price. Bear in mind that the stop price is not the one you are guaranteed to get."}
                {orderType === 'Stop-Limit Price' && "A stop-limit order allows you to buy or sell a stock at the market price, but within a limit that you set."}
                {orderType === 'Trailing Stop' && "A trailing stop order allows you to buy or sell a stock once it has hit a limit that you set, allowing you to limit your losses."}
                

                </Text>

                
                



            </View>
            <View style={{width:'100%', alignItems:'center'}}>
                {
                    (orderType === 'Market' && orderSide === 'Buy') &&  
                    <View style={{width:'90%', marginTop:40, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{width:'50%',}}>
                        <Text>
                            Amount
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20,marginRight:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder={'e.g., 50'}
                        keyboardType='numeric'
                        onChangeText={cb => updateMarket(cb)}
                        value={amount}
                        />
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{marginLeft:10}}>
                            No. of Shares
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20, marginLeft:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder='e.g., 0.06'
                        keyboardType='numeric'
                        value={Number.isNaN(noOfShares) ? '0' : noOfShares && noOfShares.toLocaleString(undefined,{minimumFractionDigits:2, maximumSignificantDigits:2})}
                        editable={false}
                        />
                        </View>
                    </View>
                }
                {
                    (orderType === 'Market' && orderSide === 'Sell') &&  
                    <View style={{width:'90%', marginTop:40, flexDirection:'row', justifyContent:'space-between'}}>

                        <View style={{width:'50%'}}>
                        <Text style={{marginRight:10}}>
                            No. of Shares
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20, marginRight:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder='e.g., 0.06'
                        keyboardType='numeric'
                        onChangeText={cb => updateMarketSell(cb)}
                        value={noOfShares}
                        
                        />
                        <TouchableOpacity style={{marginTop:10}} onPress ={()=>updateMarketSell((currentHolding))}>
                            <Text style={{color:AppConstants.loginHeaderBlue}}>
                            Sell All
                            </Text>
                        </TouchableOpacity>
                        </View>

                        <View style={{width:'50%',}}>
                        <Text style={{marginLeft:10}}>
                            Amount
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20,marginLeft:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder={'e.g., 50'}
                        keyboardType='numeric'
                        value={isNaN(amount) ? '0' : amount && parseFloat(amount).toString()}
                        editable={false}
                        />
                        </View>
                        
                    </View>
                }
                {
                    orderType === 'Limit Price' && 
                    <View style={{width:'90%', marginTop:40}}>
                        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between' }}>
                        <View style={{width:'50%',}}>
                        <Text>
                            No. of shares
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20,marginRight:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder={'e.g., 50'}
                        keyboardType='numeric'
                        onChangeText={cb => updateLimitPriceNOS(cb)}
                        value={noOfShares?.toString()}
                        />
                        {false && orderSide === 'Sell' && <TouchableOpacity style={{marginTop:10}} onPress ={()=>updateLimitPriceNOS((currentHolding))}>
                            <Text style={{color:AppConstants.loginHeaderBlue}}>
                            Sell All
                            </Text>
                        </TouchableOpacity>}
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{marginLeft:10}}>
                            Limit Price
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20, marginLeft:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder='e.g., 50'
                        keyboardType='numeric'
                        onChangeText={cb => updateLimitPriceLP(cb)}
                        editable={true}
                        />
                        </View>
                        </View>


                        <View style={{width:'100%', height:100}}>
                        <Text style={{marginTop:10}}>
                            Amount
                        </Text>
                        <TextInput
                        style={{width:Dimensions.get('window').width * 0.9,height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20, borderWidth:1, borderColor:'#DDD'}}
                        placeholder='e.g., 50'
                        keyboardType='numeric'
                        value={isNaN(amount) ? '0' : amount}
                        editable={false}
                        />
                        </View>

                        <View style={{width:'100%', height:100}}>
                        <Text style={{marginTop:20}}>
                            Time-In-Force
                        </Text>
                        <CustomSelector
                        selectedValue={timeInForce}
                        setValue={setTimeInForce}
                        itemList = {['Day','Good until canceled']}
                        />
                        
                        </View>
                        
                    </View>
                }

{
                    orderType === 'Stop Price' && 
                    <View style={{width:'90%', marginTop:40}}>
                        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between' }}>
                        <View style={{width:'50%',}}>
                        <Text>
                            No. of shares
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20,marginRight:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder={'e.g., 50'}
                        keyboardType='numeric'
                        onChangeText={cb => updateSpotPriceNOS(cb)}
                        value = {noOfShares?.toString()}
                        />
                        {false && orderSide === 'Sell' && <TouchableOpacity style={{marginTop:10}} onPress ={()=>updateSpotPriceNOS((currentHolding))}>
                            <Text style={{color:AppConstants.loginHeaderBlue}}>
                            Sell All
                            </Text>
                        </TouchableOpacity>}
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{marginLeft:10}}>
                            Stop Price
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20, marginLeft:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder='e.g., 55'
                        keyboardType='numeric'
                        onChangeText={cb => updateSpotPriceSP(cb)}
                        editable={true}
                        />
                        </View>
                        </View>


                        <View style={{width:'100%', height:100}}>
                        <Text style={{marginTop:10}}>
                            Amount
                        </Text>
                        <TextInput
                        style={{width:Dimensions.get('window').width * 0.9,height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20, borderWidth:1, borderColor:'#DDD'}}
                        placeholder='e.g., 0.06'
                        keyboardType='numeric'
                        value={isNaN(amount) ? '0' : amount}
                        editable={false}
                        />
                        
                        </View>

                        <View style={{width:'100%', height:100}}>
                        <Text style={{marginTop:20}}>
                            Time-In-Force
                        </Text>
                        <CustomSelector
                        selectedValue={timeInForce}
                        setValue={setTimeInForce}
                        itemList = {['Day','Good until canceled']}
                        />
                        
                        </View>
                        
                        
                    </View>
                }

                {
                    orderType === 'Stop-Limit Price' && 
                    <View style={{width:'90%', marginTop:40}}>
                        <View style={{width:'100%'}}>
                        <Text style={{}}>
                            No. of Shares
                        </Text>
                        <TextInput
                        style={{width:Dimensions.get('window').width * 0.9,height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20, borderWidth:1, borderColor:'#DDD'}}
                        placeholder='e.g., 50'
                        keyboardType='numeric'
                        editable={true}
                        onChangeText={cb=>setNoOfShares(cb)}
                        value = {noOfShares?.toString()}
                        />
                        {false && orderSide === 'Sell' && <TouchableOpacity style={{marginTop:10}} onPress ={()=>setNoOfShares((currentHolding))}>
                            <Text style={{color:AppConstants.loginHeaderBlue}}>
                            Sell All
                            </Text>
                        </TouchableOpacity>}
                        </View>
                        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between' ,marginTop:20}}>
                        <View style={{width:'50%',}}>
                        <Text>
                            Limit Price
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20,marginRight:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder={'e.g., 50'}
                        keyboardType='numeric'
                        onChangeText={cb => setLimitPrice(cb)}
                        />
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{marginLeft:10}}>
                            Stop Price
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20, marginLeft:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder='e.g., 55'
                        keyboardType='numeric'
                        onChangeText={cb => setStopPrice(cb)}
                        editable={true}
                        />
                        </View>
                        </View>

                        <View style={{width:'100%', height:100}}>
                        <Text style={{marginTop:20}}>
                            Time-In-Force
                        </Text>
                        <CustomSelector
                        selectedValue={timeInForce}
                        setValue={setTimeInForce}
                        itemList = {['Day','Good until canceled']}
                        />
                        
                        </View>


                        
                        
                    </View>
                }

                {
                    orderType === 'Trailing Stop' && 
                    <View style={{width:'90%', marginTop:40}}>
                        <View style={{width:'100%'}}>
                        <Text style={{}}>
                            No. of Shares
                        </Text>
                        <TextInput
                        style={{width:Dimensions.get('window').width * 0.9,height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20, borderWidth:1, borderColor:'#DDD'}}
                        placeholder='e.g., 50'
                        keyboardType='numeric'
                        editable={true}
                        onChangeText={cb=>setNoOfShares(cb)}
                        value = {noOfShares?.toString()}
                        />
                        {false && orderSide === 'Sell' && <TouchableOpacity style={{marginTop:10}} onPress ={()=>setNoOfShares((currentHolding))}>
                            <Text style={{color:AppConstants.loginHeaderBlue}}>
                            Sell All
                            </Text>
                        </TouchableOpacity>}
                        </View>
                        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between' ,marginTop:20}}>
                        <View style={{width:'50%',}}>
                        <Text>
                            Trail Percent
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20,marginRight:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder={'e.g., 50'}
                        keyboardType='numeric'
                        onChangeText={cb => {setTrailPercent(cb); setTrailPrice(null)}}
                        value={trailPercent}
                        />
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={{marginLeft:10}}>
                            Trail Price
                        </Text>
                        <TextInput
                        style={{height:60, backgroundColor:'white', padding:10, borderRadius:6, marginTop:20, marginLeft:10, borderWidth:1, borderColor:'#DDD'}}
                        placeholder='e.g., 55'
                        keyboardType='numeric'
                        onChangeText={cb => {setTrailPrice(cb); setTrailPercent(null)}}
                        editable={true}
                        value={trailPrice}
                        />
                        </View>
                        </View>


                        <View style={{width:'100%', height:100}}>
                        <Text style={{marginTop:20}}>
                            Time-In-Force
                        </Text>
                        <CustomSelector
                        selectedValue={timeInForce}
                        setValue={setTimeInForce}
                        itemList = {['Day','Good until canceled']}
                        />
                        
                        </View>


                        
                        
                    </View>
                }
            </View>
                
            <View style={{backgroundColor:'#fff', width:Dimensions.get('window').width *0.9 , height:100,shadowColor: "#000", justifyContent:'space-around',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 9,
                elevation:5,
                borderRadius:6,
                marginTop:30,
                flexDirection:'row'
                }}>
                    <View style={{height:'100%', padding:20,flex:1}}>
                    <Text style={{fontFamily:'ArialNova'}}>
                    Funds Available
                </Text>
                <Text style={{fontFamily:'Overpass_700Bold', fontSize:24}}>
                ${userBalances && parseFloat(userBalances?.buying_power).toFixed(2)}
                </Text>
                </View>
                <TouchableOpacity style={{width:'40%', height:'100%', backgroundColor:'#F1F5F9', flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={()=>navigation.navigate('Add Funds')}>
                    <AntDesign
                    name='pluscircleo'
                    color='#8B97A8'

                    />
                    <Text style={{fontFamily:'Overpass_400Regular', color:'#8B97A8', paddingLeft:10}}>
                        Add Funds
                    </Text>
                </TouchableOpacity>

                
                </View>
                <TouchableOpacity style={{width:Dimensions.get('window').width * 0.9, height:54, borderWidth:0, borderColor: '#3293F6', borderRadius:6, backgroundColor:'#004DBC', flexDirection:'row', paddingHorizontal:20, justifyContent:'space-between', alignItems:'center', marginTop:30}} 
                onPress={()=> noOfShares && alpacaService.placeIndividualStockOrder({
                    stockTicker : route.params.stockTicker,
                    qty : noOfShares?.toString(),
                    orderType : orderType,
                    side : orderSide.toLowerCase(),
                    limit_price : limitPrice,
                    stop_price : stopPrice,
                    trail_price : trailPrice,
                    trail_percent : trailPercent,
                    time_in_force : timeInForce.toLowerCase()

                }).then( cb => {
                    console.log(cb)
                    launchResponseModal({message: `Your ${orderSide.toLowerCase()} order has been placed successfully`, subMessage:'We’ve sent you a confirmation email. Please check your inbox.', isSuccess: true})
                }).catch( cb => {
                   
                    launchResponseModal(AlpacaAccountsError(cb.getErrorMsg(),cb.getStatusCode(),orderSide.toLowerCase()).GenericErrorResponse)
                }
                )
            
            }
                disabled={!noOfShares}
                >
                        <Text style={{color:'white', fontFamily:'ArialNova'}}>
                            {orderSide} {route.params.stockTicker}
                        </Text>
                        <AntDesign name='arrowright' color={'white'} size={24}/>
                    </TouchableOpacity>
        </View>        
    )
}