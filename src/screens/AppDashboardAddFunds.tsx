import React, {useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    Platform
} from 'react-native'
import Constants from 'expo-constants'

export default function AppDashboardAddFunds({sellValue, userBalances, refreshFunction} : any){
    useEffect(()=>{
        refreshFunction()
    },[])
    return (
        <ScrollView bounces={true} scrollEnabled={false} nestedScrollEnabled={true}>
        <View style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'transparent',paddingHorizontal:0, paddingTop: 100, width:'100%'}}>
        <View style={{alignSelf:'flex-start', paddingHorizontal:30}}>
        <Text style={{fontFamily:'Overpass_700Bold', fontSize:40, color:'white'}}>${userBalances.portfolio_value && parseFloat(userBalances?.portfolio_value).toLocaleString(undefined,{currency:'USD',maximumFractionDigits:2, minimumFractionDigits:2})}</Text>

          <Text style={{fontFamily:'ArialNova', fontSize:16, color:'white'}}>Available Cash Balance</Text>
          </View>


        <View style={{backgroundColor:'#fff', borderRadius:6, marginTop:50,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 9,
                elevation:5,
                width:'95%',
                // overflow:'hidden',
                // marginHorizontal:20
                }}>
        <View style={{ borderBottomWidth:1, borderBottomColor:'rgba(151,151,151,0.2)', padding:20}}>
            <Text style={{fontFamily:'Overpass_700Bold', fontSize:24}}>
            Funding your{'\n'}
            account  
            </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{height:Dimensions.get('window').height/2, marginBottom:100}}>
        <View style={{ padding:20}}>
            <Text style={{fontFamily:'ArialNova', fontSize:18, lineHeight:24}}>
            If you currently have a US checking account, a Payoneer account, or a Wise account, you may send funds to the following bank account:
            </Text>
            <Text style={{fontFamily:'ArialNova', fontSize:16, lineHeight:30, paddingTop:20}}>
            Bank name: <Text style={{fontFamily:'ArialNova-Bold'}}> JPMorgan Chase Bank, N.A. </Text> {'\n'}
            Account number: 910173209{'\n'}
            Routing number: 044000037{'\n'}
            Account holder: Elphinstone, Inc.{'\n'}
            Currency: USD{'\n'}
            Country: United States {'\n'}
            Address, Line 1: 405 Lexington Avenue {'\n'} 
            Address, Line 2: Suite 866 {'\n'}
            City: New York {'\n'}
            State: New York{'\n'}
            Zip code: 10174{'\n'}
            E-mail address: payments@elphinstone.us {'\n'}
            Account type: Checking {'\n'}
            </Text>
        </View>

        <View style={{width:'100%',backgroundColor:'#F5FAFF', padding:20}}>
            <Text style= {{fontFamily:'ArialNova', fontSize:14, lineHeight:30, textAlign:'justify'}}>
            PLEASE REMEMBER TO ADD YOUR MOBILE NUMBER, IN THE FORMAT 3XXXXXXXXX, TO THE PAYMENT REFERENCE FIELD. IF YOU DO NOT REMEMBER TO DO THIS, WE WILL NOT BE ABLE TO TRACK YOUR FUNDS AND IT MAY TAKE SEVERAL DAYS BEFORE WE ARE ABLE TO MANUALLY RECONCILE THE AMOUNTS.
            </Text>
        </View>

        <View style={{width:'100%', padding:20, marginBottom:40}}>
            <Text style= {{fontFamily:'ArialNova', fontSize:14, lineHeight:30,}}>
            If you need help moving money from your Wise or Payoneer accounts, click here for details on how to move money from those accounts to your Elphinstone account.
            </Text>
        </View>
        <View style={{height:50, width:'100%'}}>

        </View>

        </ScrollView>
        </View>

        

        </View>
        <View style={{ zIndex:-1, position:'absolute',width:'100%'}}>
          <Image source={require('../../assets/nyse.png')} style={{}}/>
          <View style = {{backgroundColor:'rgba(0, 23, 139,0.8)', position:'absolute',height:'100%',width:'100%'}}>

          </View>

        </View>
        </ScrollView>
      );
}
