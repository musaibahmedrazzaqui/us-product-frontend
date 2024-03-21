import React, {useState, useRef, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Modal,
    Button,
    Image,
    TextInput,
    Linking
} from 'react-native'
import {Feather, FontAwesome, AntDesign } from '@expo/vector-icons'
import Constants from 'expo-constants'
import AlpacaDocumentService from '../../api/lib/AlpacaDocumentsService'

function getMonthYear(dateString : string) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

export default function AppDashboardAccountStatements({navigation, userBalances, alpacaDocumentService} : {navigation : any, userBalances: any, alpacaDocumentService :AlpacaDocumentService}){

    const [userPreferences, setUserPreferences] = useState({
        fundPreference : 'Islamic',
        riskTolerance : 'The Growth Seeker'
    })

    const scrollViewRef = useRef()

    const [docList, setDocList] = useState([])

    useEffect(()=>{
        alpacaDocumentService.getAllDocuments().then(cb=>setDocList(cb.data))
    },[])

    const getReport = (date : string) => {
        alpacaDocumentService.getDocument(date).then((cb) => Linking.openURL(cb.URL))
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} bounces={false}>
        <View style={{ justifyContent: 'flex-start', alignItems: 'center',backgroundColor:'transparent', paddingTop:Constants.statusBarHeight  + 50}}>

        <View style={{ borderRadius:6, height:401-100,width:'100%',
   
                }}>
                    <View style={{alignSelf:'flex-start', paddingHorizontal:30}}>
          <Text style={{fontFamily:'Overpass_700Bold', fontSize:40, color:'white'}}>${userBalances.portfolio_value && parseFloat(userBalances?.portfolio_value).toLocaleString(undefined,{currency:'USD',maximumFractionDigits:2, minimumFractionDigits:2})}</Text>
          <Text style={{fontFamily:'ArialNova', fontSize:16, color:'white'}}>Total Portfolio Value</Text>
          </View>
        
        </View>

        {/* <Image source = {require('../../assets/avatar.png')} style={{height:140, width:140, marginTop:-90, alignSelf:'flex-start', marginLeft:30}}/> */}


            <View style={{ paddingHorizontal:20, marginVertical:20, width:'100%', alignItems:'center'}}>
                {docList.map((item, index)=> <AccountStatementItem title={getMonthYear(item?.date)}  date={item?.date} getReport={() => getReport(item?.date)} key={index}/>)}
            </View>

        
            

            <View style={{height:100}}/>


        </View>

        <View style={{ zIndex:-1, position:'absolute',width:'100%'}}>
          <Image source={require('../../assets/nyse.png')} style={{}}/>
          <View style = {{backgroundColor:'rgba(0, 23, 139,0.8)', position:'absolute',height:'100%',width:'100%'}}>
                
          </View>

        </View>
       
        </ScrollView>
      );
}


const AccountStatementItem = ({title, getReport} : any) => {


    return (
        <View style={{flexDirection:'row',justifyContent:'space-between', paddingHorizontal:30, shadowColor: "#000",borderRadius:6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation:5,
        backgroundColor:'#fff',
        paddingVertical:30,
        width:'100%'
        }}>
            <View style={{flexDirection:'row'}}>
            <FontAwesome name="file-pdf-o" size={32} color="red" />
            <View style={{paddingLeft:20}}>
                <Text style={{fontFamily: 'ArialNova', fontSize:16}}>
                    {title}
                </Text>
                <Text style={{fontFamily: 'ArialNova', fontSize:12, color:'#777'}}>
                    Statement of Account
                </Text>
            </View>
            </View>
            <View style={{flexDirection:'row'}}>
                {/* <View style={{alignItems:'center', paddingHorizontal:2}}>
            <Feather name="mail" size={14} color="#6C757D" style={{}}/>
            <Text style={{color:'#6C757D', fontFamily:'ArialNova'}}>
                Email
            </Text>
            </View> */}

            <TouchableOpacity style={{alignItems:'center' , paddingHorizontal:2, justifyContent:'center'}} onPress={getReport}>
            <AntDesign name="download" size={14} color="#6C757D" style={{}}/>
            <Text style={{color:'#6C757D', fontFamily:'ArialNova'}}>
                Download
            </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}