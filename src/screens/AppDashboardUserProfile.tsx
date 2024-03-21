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
    TextInput,
    Linking
} from 'react-native'
import {Octicons, Feather, MaterialIcons, MaterialCommunityIcons, AntDesign, Ionicons, Entypo } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { AuthContext } from '../components/authProvider'
import { getCountryFromISO3 } from '../../assets/countryListISO3'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { usePostHog } from 'posthog-react-native'
import CopyToClipboard from '../components/CopyToClipboard'
export default function AppDashboardUserProfile({navigation, userObject,refreshFunction, reward} : any){
    const posthog = usePostHog()
    useEffect(refreshFunction,[])
    const scrollViewRef = useRef()

    const [selectedCategory, setCategory] = useState<any>('Personal')

    const { setSession, syncSession } = useContext(AuthContext)
  const { isAuthenticated, session, sessionToken } = useContext(AuthContext)
    const logout = async () => {
        posthog.reset()
        setSession(null)
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} bounces={false}>
        <View style={{ justifyContent: 'flex-start', alignItems: 'center',backgroundColor:'transparent', paddingTop:100}}>

        <View style={{ borderRadius:6, height:401-100,width:'100%',
   
                }}>
                    <View style={{alignSelf:'flex-start', paddingHorizontal:30}}>
          <Text style={{fontFamily:'Overpass_700Bold', fontSize:40, color:'white'}}>{userObject?.given_name}</Text>
          {/* <Text style={{fontFamily:'ArialNova', fontSize:16, color:'white'}}>Joined June 5th, 2021</Text> */}
          </View>
        
        </View>
        
        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
        <Image source = {require('../../assets/avatar.png')} style={{height:140, width:140, marginTop:-90, alignSelf:'flex-start', marginLeft:30}}/>

        { <TouchableOpacity style={{width:'45%', height:50, backgroundColor:'white', borderRadius:8, marginTop:-30, marginRight:30, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 9,
                elevation:5,
                alignItems:'center',
                justifyContent:'center'}} 
                activeOpacity={0.8}
                onPress={()=> navigation.navigate('Account Statements')}
                >
                    <Text style={{fontFamily:'ArialNova', color:'#004DBC'}}>
                        Statement of account
                    </Text>
        </TouchableOpacity>}
        </View>

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

                    <TouchableOpacity activeOpacity={1} onPress={()=>setCategory('Other')} style = {{borderBottomColor:'#004DBC', borderBottomWidth: selectedCategory === 'Other' ? 2 : 0, paddingBottom:5, marginHorizontal:10}}>
                        <Text style={{fontFamily:selectedCategory === 'Other' ? 'ArialNova-Bold' : 'ArialNova'}}>
                            Trusted Contact
                        </Text>
                    </TouchableOpacity>
                   
                    </View>
                </ScrollView>

            </View>

            {selectedCategory === 'Personal' && <PersonalView userObject = {userObject} session={session} reward={reward}/>}
            {selectedCategory === 'Financial' && <FinancialView userObject={userObject}/>}
            {selectedCategory === 'Employment' && <EmploymentView userObject={userObject}/>}
            {selectedCategory === 'Bank' && <BankView userObject={userObject}/>}
            {selectedCategory === 'Other' && <OtherView userObject={userObject}/>}
            

            <View style={{ width:'100%',padding:20,flexDirection:'row',}}>

            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center', borderRadius:6, backgroundColor:"#FF000011", width:'40%',height:60}} onPress={logout}>
                <AntDesign name='logout' color={'red'} size={24}/>
            <Text style={{fontFamily:'ArialNova',color:'red',paddingHorizontal:20}}>
                Log out
            </Text>

            </TouchableOpacity>
            
            </View>

            <TouchableWithoutFeedback onPress={()=> navigation.navigate('ContactUs',{
                email : session?.identity.traits.email,
                phone : session?.identity.traits.phone,
                name : userObject?.given_name
            })}>
            <View style={{width:'100%', padding:20, marginBottom:40}}>
            <Text style={{fontFamily:'ArialNova', color:'#004DBC'}}>
                Contact us 
            </Text>
        </View>
        </TouchableWithoutFeedback>
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
const BoldItem = ({ subtext,value} : any) => {
    
    return(
        <View style={{flex:1, paddingVertical:10}}>
            
            <Text style={{fontFamily:'ArialNova', fontSize:14, color:'black'}}>
                {value}
            </Text>
            <Text style={{fontFamily:'ArialNova', fontSize:12, color:'#8692A6',paddingTop:10}}>
                Note: {subtext}
            </Text>
        </View>
    )
}

const PersonalView = ({userObject, session,reward} : any) => {
    
    return (<>    
    <View style={{ width:'100%'}}>
        <View style={{backgroundColor:'#F5FAFF',width:'100%', padding:20}}>
            <View style={{flexDirection:'row',alignItems:'flex-end'}}>
            <DetailItem title= "Referral Code" value = {session?.identity?.traits.phone}/>
            <CopyToClipboard referralCode={session?.identity?.traits.phone} />
        
            </View>
            <BoldItem subtext={reward.subtext} value={reward.msg}/>
            
        </View>
                <View style={{flexDirection:'row', padding:20}}>
                    
                <DetailItem title="Given Name" value={userObject?.given_name}/>
                <DetailItem title="Family Name" value={userObject?.family_name}/>
                </View>
                <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="Date of Birth" value={formatDate(new Date(userObject?.dob))}/>
                <DetailItem title="Place of Birth" value={getCountryFromISO3(userObject?.country_of_birth)}/>
                </View>
            </View>

            <View style={{backgroundColor:'#F5FAFF',width:'100%', padding:20}}>
            <View style={{flexDirection:'row', alignItems:'center',}}>
            <Feather name="mail" size={24} color="#8692A6" style={{paddingRight:20}}/>
            <DetailItem title="Email Address" value={session?.identity?.traits.email}/>
            </View>
            
            <View style={{flexDirection:'row', alignItems:'center',}}>
            <Feather name="phone" size={24} color="#8692A6" style={{paddingRight:20}}/>
            <DetailItem title="Phone number" value={session?.identity?.traits.phone}/>
            </View>
            <View style={{flexDirection:'row', alignItems:'center',}}>
            <Feather name="map-pin" size={24} color="#8692A6" style={{paddingRight:20}}/>
            <DetailItem title="Home Address Line 1" value={userObject?.street_address_1}/>
            </View>
            <View style={{flexDirection:'row', alignItems:'center',}}>
            <Feather name="map-pin" size={24} color="#8692A6" style={{paddingRight:20}}/>
            <DetailItem title="Home Address Line 2" value={userObject?.street_address_2}/>
            </View>

            </View>

            <View style={{ width:'100%'}}>
                <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="ID Type" value="CNIC"/>
                <DetailItem title="CNIC or Passport Number" value={userObject?.id_number}/>
                </View>
                {/* <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="CNIC or Passport Issue Date" value="26 Sep 2020"/>
                <DetailItem title="CNIC or Passport Expiry Date" value="26 Sep 2029"/>
                </View> */}
                {/* <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="Gender" value="Male"/>
                <DetailItem title="Marital Status" value="Married"/>
                </View> */}
                <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="Nationality" value={getCountryFromISO3(userObject?.country_of_citizenship)}/>
                {/* <DetailItem title="Religion" value="Islam"/> */}
                </View>
            </View>
            </>
    )
}

const fund_source_map = {
    'employment_income' : "Salary",
    "business_income" : 'Business / self employed',
    "family" : "Spouse / parents",
    'inheritance' : 'Inheritance' ,
    'investments' : 'Stock / investments',
    "savings" : "Savings"
} 
const FinancialView = ({userObject} : any) => {
    return (<>    
    <View style={{ width:'100%'}}>
                <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="Annual Household Income" value={userObject?.annual_income_max && parseFloat(userObject?.annual_income_max).toLocaleString(undefined,{currency:'PKR',minimumFractionDigits:2, maximumFractionDigits:2})}/>
                <DetailItem title="Investible Assets" value={userObject?.liquid_net_worth_max && parseFloat(userObject?.liquid_net_worth_max).toLocaleString(undefined,{currency:'PKR',minimumFractionDigits:2, maximumFractionDigits:2})}/>
                </View>
                <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="Source of Funds" value={fund_source_map[userObject?.funding_source]}/>
                </View>
            </View>

            

            </>
    )
}

const EmploymentView = ({userObject} : any) => {
    return (<>    
    <View style={{ width:'100%'}}>
                <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="Employment Status" value={userObject?.employment_status}/>
                <DetailItem title="Employer Name" value={userObject?.employer_name}/>
                </View>
                <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="Employer Address" value={userObject?.employer_address}/>
                <DetailItem title="Employment Position" value={userObject?.employment_position}/>
                </View>
            </View>
            </>
    )
}

const BankView = ({userObject} : any) => {
    return (<>    
    <View style={{ width:'100%'}}>
                <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="Bank Name" value={userObject?.bank_details?.bank_name}/>
                <DetailItem title="Bank Account Number" value={userObject?.bank_details?.bank_account_number}/>
                </View>
                <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="Routing Number" value={userObject?.bank_details?.routing_number}/>
                </View>
            </View>

            
            </>
    )
}

const OtherView = ({userObject} : any ) => {
    return (<>    
    <View style={{ width:'100%'}}>
                <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="Given Name" value={userObject?.trusted_contact?.given_name}/>
                <DetailItem title="Family Name" value={userObject?.trusted_contact?.family_name}/>
                </View>
                <View style={{flexDirection:'row', padding:20}}>
                <DetailItem title="Email" value={userObject?.trusted_contact?.email_address}/>
                <DetailItem title="Phone" value={userObject?.trusted_contact?.phone_number}/>
                </View>
            </View>


            </>
    )
}

function formatDate(date : Date) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
      'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthName = months[monthIndex];
    const formattedDate = `${day} ${monthName} ${year}`;
    return formattedDate;
  }
  