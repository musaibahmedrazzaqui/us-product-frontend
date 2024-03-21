import React, {useState, useRef, useEffect, useContext} from 'react'
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
    TextInput
} from 'react-native'
import Constants from 'expo-constants'
import PersonalDetailForm from './AppDashboardEditProfile/PersonalDetailForm';
import FinancialDetailForm from './AppDashboardEditProfile/FinancialDetailForm';
import EmploymentDetailForm from './AppDashboardEditProfile/EmploymentDetailForm';
import BankDetailForm from './AppDashboardEditProfile/BankDetailForm';
import TrustedContactDetailForm from './AppDashboardEditProfile/TrustedContentDetailForm';
import { AuthContext } from '../components/authProvider';
import ResponseModal from '../components/ResponseModal';
const indexNames = ['S&P', 'Dow Jones', 'NASDAQ']

export default function AppDashboardEditProfile({navigation, userObject} : any){

    const { isAuthenticated, session, sessionToken } = useContext(AuthContext)

    const scrollViewRef = useRef()

    const [selectedCategory, setCategory] = useState<any>('Personal')

    const [showResponseModal, setResponseModal] = useState(false)
    const [responseModalConfig, setResponseModalConfig] = useState({
        isSuccess : null,
        message : "",
        subMessage : ""
    })

    function launchResponseModal({message, subMessage, isSuccess} : any) {
        setResponseModalConfig({
            message,
            subMessage,
            isSuccess
        })
        setResponseModal(true)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} bounces={false}>
            <ResponseModal show={showResponseModal} closeModal={()=>setResponseModal(false)} {...responseModalConfig} onClose={()=>false && navigation.goBack()}/>
        <View style={{ justifyContent: 'flex-start', alignItems: 'center',backgroundColor:'transparent', paddingTop:100}}>

        <View style={{ borderRadius:6, height:401-100,width:'100%',
   
                }}>
                    <View style={{alignSelf:'flex-start', paddingHorizontal:30}}>
          <Text style={{fontFamily:'Overpass_700Bold', fontSize:40, color:'white'}}>{userObject?.given_name}</Text>
          </View>
        
        </View>

        <Image source = {require('../../assets/avatar.png')} style={{height:140, width:140, marginTop:-90, alignSelf:'flex-start', marginLeft:30}}/>


            <View style={{paddingLeft:10, paddingRight:30, paddingTop:40, marginBottom:40, width:'100%'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false} bouncesZoom={false}>
                    <View style={{flexDirection:'row'}}>

                    <TouchableOpacity activeOpacity={1} onPress={()=>setCategory('Personal')} style = {{borderBottomColor:'#004DBC', borderBottomWidth: selectedCategory === 'Personal' ? 2 : 0, paddingBottom:5, marginHorizontal:10}}>
                        <Text style={{fontFamily:selectedCategory === 'Personal' ? 'ArialNova-Bold' : 'ArialNova'}}>
                            Personal
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={()=>setCategory('Financial')} style = {{borderBottomColor:'#004DBC', borderBottomWidth: selectedCategory === 'Financial' ? 2 : 0, paddingBottom:5, marginHorizontal:10}}>
                        <Text style={{fontFamily:selectedCategory === 'Financial' ? 'ArialNova-Bold' : 'ArialNova'}}>
                            Financial
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={()=>setCategory('Employment')} style = {{borderBottomColor:'#004DBC', borderBottomWidth: selectedCategory === 'Employment' ? 2 : 0, paddingBottom:5, marginHorizontal:10}}>
                        <Text style={{fontFamily:selectedCategory === 'Employment' ? 'ArialNova-Bold' : 'ArialNova'}}>
                            Employment
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={()=>setCategory('Bank')} style = {{borderBottomColor:'#004DBC', borderBottomWidth: selectedCategory === 'Bank' ? 2 : 0, paddingBottom:5, marginHorizontal:10}}>
                        <Text style={{fontFamily:selectedCategory === 'Bank' ? 'ArialNova-Bold' : 'ArialNova'}}>
                            Bank
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={()=>setCategory('Trusted Contact')} style = {{borderBottomColor:'#004DBC', borderBottomWidth: selectedCategory === 'Trusted Contact' ? 2 : 0, paddingBottom:5, marginHorizontal:10}}>
                        <Text style={{fontFamily:selectedCategory === 'Trusted Contact' ? 'ArialNova-Bold' : 'ArialNova'}}>
                            Trusted Contact
                        </Text>
                    </TouchableOpacity>
                   
                    </View>
                </ScrollView>

            </View>

            {selectedCategory === 'Personal' && <PersonalDetailForm userData={userObject} session={session} launchResponseModal={launchResponseModal}/>}
            {selectedCategory === 'Financial' && <FinancialDetailForm userData={userObject} session={session} launchResponseModal={launchResponseModal}/>}
            {selectedCategory === 'Employment' && <EmploymentDetailForm userData={userObject} session={session} launchResponseModal={launchResponseModal}/>}
            {selectedCategory === 'Bank' && <BankDetailForm userData={userObject} session={session} launchResponseModal={launchResponseModal}/>}
            {selectedCategory === 'Trusted Contact' && <TrustedContactDetailForm userData={userObject} session={session} launchResponseModal={launchResponseModal}/>}
            

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


const DetailItem = ({title, value} : any) => {
    return(
        <View style={{flex:1, paddingVertical:10}}>
            <Text style={{fontFamily:'ArialNova', fontSize:12, color:'#8692A6'}}>
                {title}
            </Text>
            <Text style={{fontFamily:'ArialNova', fontSize:16, color:'black',paddingTop:10}}>
                {value}
            </Text>
        </View>
    )
}
