
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Button,
    Animated,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
    Platform
} from 'react-native';
import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthScreenWrapper from '../ScreenWrappers/AuthScreenWrapper'
import SignupWelcomeScreen from './SignupScreen/SignupComponents/WelcomeScreen';
import { NavigationProp } from '@react-navigation/native';
import SignupLegalNames from './SignupScreen/SignupComponents/SignupLegalNames';
import SignupTaxResidence from './SignupScreen/SignupComponents/SignupTaxResidence';
import SignupCitizenship from './SignupScreen/SignupComponents/SignupCitizenship';
import SignupDOB from './SignupScreen/SignupComponents/SignupDOB';
import SignupBirthCountry from './SignupScreen/SignupComponents/SignupBirthCountry';
import SignupIDDetails from './SignupScreen/SignupComponents/SignupIDDetails';
import SignupAddress from './SignupScreen/SignupComponents/SignupAddress';
import SignupIncomeDetails from './SignupScreen/SignupComponents/SignupIncomeDetails';
import SignupEmploymentDetails from './SignupScreen/SignupComponents/SignupEmploymentDetails';
import SignupBankDetails from './SignupScreen/SignupComponents/SignupBankDetails';
import SignupFundPreference from './SignupScreen/SignupComponents/SignupFundPreference';
import SignupAffiliationQs from './SignupScreen/SignupComponents/SignupAffiliationQs';
import SignupPEPQuestion from './SignupScreen/SignupComponents/SignupPEPQuestion';
import SignupAffiliationDetails from './SignupScreen/SignupComponents/SignupAffiliationDetails';
import SignupPEPFollowUps from './SignupScreen/SignupComponents/SignupPEPFollowups';
import SignupFATCA from './SignupScreen/SignupComponents/SignupFATCA';
import SignupNONUSDeclaration from './SignupScreen/SignupComponents/SignupNONUSDeclaration';
import SignupW8 from './SignupScreen/SignupComponents/SignupW8';
import SignupTrustedContact from './SignupScreen/SignupComponents/SignupTrustedContact';
import SignupDocumentUpload from './SignupScreen/SignupComponents/SignupDocumentUpload';
import SignupAgreementsDisclosures from './SignupScreen/SignupComponents/SignupAgreementsDisclosures';
import SignupLastScreen from './SignupScreen/SignupComponents/SignupLastScreen';
import { AuthContext } from '../components/authProvider';
import UserService from '../../api/lib/UserService';
import { getISO3FromCountry, getCountryFromISO3 } from '../../assets/countryListISO3';
import ResponseModal from '../components/ResponseModal';
import publicIP from 'react-native-public-ip';
import AlpacaService from '../../api/lib/AlpacaService';
import { AppConstants, humanReadableDate } from '../../assets/AppConstants';
import SpinnerModal from '../components/SpinnerModal';
import { usePostHog } from 'posthog-react-native';
import SignupScreenWrapper from '../ScreenWrappers/SignupScreenWrapper';
import SignupOptionalDetails from './SignupScreen/SignupComponents/SignupOptionalDetails';


const fund_source_map_back = {
    'employment_income' : "Salary",
    "business_income" : 'Business / self employed',
    "family" : "Spouse / parents",
    'inheritance' : 'Inheritance' ,
    'investments' : 'Stock / investments',
    "savings" : "Savings"
} 

const fund_source_map = {
    "Salary" : 'employment_income',
    'Business / self employed' : "business_income",
    "Spouse / parents" : "family",
    'Inheritance' :  'inheritance',
    'Stock / investments' : 'investments',
    "Savings" : "savings"
} 

export default function SignupScreen({ navigation, IP }: { navigation : any, IP :string }) {
    const [showResponseModal, setResponseModal] = useState(false)
    const [responseModalConfig, setResponseModalConfig] = useState({
        isSuccess : null,
        message : "",
        subMessage : ""
    })
    const posthog = usePostHog()
    const {  setSession, ... session } = useContext(AuthContext)
    const [percentageCompleted, setPercentageCompleted] = useState(0)
    const [disableButton, setDisableButton] = useState(false)
    const [userFetched, setUserFetched] = useState(false)
    const [userData, setUserData] = useState({
        legalFirstName: "",
        legalMiddleName: "",
        legalLastName: "",
        taxResidence: "",
        citizenship: "",
        dob: "",
        birthCountry: "",
        idType: "",
        idNumber: "",
        idExpirationData: "",
        homeAddress1: "",
        homeAddress2: "",
        city: "",
        zipCode: "",
        state: "",
        addressCountry: "",
        annualHouseholdIncome: "",
        investibleAssets: "",
        sourceOfFunds: "",
        employmentStatus: "",
        employerName: "",
        employerAddress: "",
        jobTitle: "",
        bankName: "",
        bankAccountNumber: "",
        routingNumber: "",
        fundPreference: "",
        riskTolerance: "",
        isUSBrokerAffiliated: false,
        isExecutiveOrShareholderPC: false,
        isSeniorPoliticalFigure: false,
        isRelatedToPoliticalFigure: false,
        brokerRegulatorName: "",
        brokerRegulatorAddress: "",
        brokerRegulatorEmail: "",
        publicCompanyName: "",
        publicCompanyAddress: "",
        publicCompanyCity : "",
        publicCompanyState: "",
        publicCompanyCountry : "",
        publicCompanyEmail: "",
        publicCompanyExchange: "",
        publicCompanyTicker: "",
        isPEP: null,
        isUserPEP: "", //uneeded ?
        isPEPDomesticOrForeign: "",
        pepCategory: "",
        pepJobTitle: "",
        relatedPEPName: "",
        relatedPEPJobTitle: "",
        relatedPEPRelation: "",
        isUSCitizen: null,
        isUSPR: null,
        greenCardNumber: "",
        isUSResident: null,
        visaType: "",
        visaExpirationDate: "",
        nonUSDeclaration: null,
        trustedContactName: "",
        trustedContactLastName: "",
        trustedContactEmail: "",
        trustedContactNumber: "",
        photoIDFront: null,
        photoIDBack:null,
        bankStatement: null,
        customerAgreementAck: null,
        digitalSignatureAck: null,
        paymentGateway: "",
        accountType : "",
        profile_start_ts : Date.now()
    
    })
    const location = useRef(new Animated.Value(0)).current
    const [locationState, setLocationState] = useState(0)
    function goToNextScreen(locationState: number) {
        Animated.timing(location, {
            toValue: locationState,
            duration: 500,
            useNativeDriver: true
        }).start()
    }
    async function handleOnboardingSubmit() {
        setDisableButton(true)
        let payload = {
        permanent_resident : userData.isUSPR,
        id_number : userData.idNumber,
            disclosures: {
                is_control_person: userData.isExecutiveOrShareholderPC,
                is_affiliated_exchange_or_finra: userData.isUSBrokerAffiliated,
                is_politically_exposed: userData.isSeniorPoliticalFigure,
                is_us_resident : userData.isUSResident,
                is_us_citizen : userData.isUSCitizen,
                is_uspr : userData.isUSPR,
                immediate_family_exposed: userData.isRelatedToPoliticalFigure,
                context: [] as any
            },

        }

        if (userData.isExecutiveOrShareholderPC) {
            payload.disclosures.context.push({
                context_type : "CONTROLLED_FIRM",
                company_name : userData.publicCompanyName,
                company_street_address : userData.publicCompanyAddress,
                company_city : userData.publicCompanyCity,
                company_state : userData.publicCompanyState,
                company_country : userData.publicCompanyCountry,
                company_compliance_email : userData.publicCompanyEmail
            })
        }

        if(userData.isUSBrokerAffiliated) {
            payload.disclosures.context.push({
                context_type : "AFFILIATE_FIRM",
                company_name : userData.brokerRegulatorName,
                company_street_address : userData.brokerRegulatorAddress,
                company_city : "",//append user object ....
                company_state : "",
                company_country : "",
                company_compliance_email : userData.brokerRegulatorEmail
            })
        }

        if(userData.isPEP) {
            //TODO
        }

        if(userData.isRelatedToPoliticalFigure) {
            payload.disclosures.context.push({
                context_type : "IMMEDIATE_FAMILY_EXPOSED",
                given_name : userData.relatedPEPName.split(" ")[0],
                family_name : userData.relatedPEPName.split(" ")[1] ? userData.relatedPEPName.split(" ")[1] : "",
                relation : userData.relatedPEPRelation,
                employment_position : userData.relatedPEPJobTitle
            })
        }
        // console.log(JSON.stringify(payload, null, 2))
        // console.log(userData.idType === 'USA_SSN' ? 'identity_verification' : 'tax_id_verification')
        
        // console.log("file:///" + userData.photoIDFront.uri.split("file:/").join(""))
        // console.log(userData.photoIDFront.uri)
        // return


        const res = await UserService.updateUser(session.session?.identity.id,{...payload, "supress_push" : "true", meta : {
            profile_start_ts : humanReadableDate(userData.profile_start_ts),
            profile_completeness : 0.6,
            signup_page_location : -9,
            profile_end_ts : humanReadableDate(Date.now())
        }})


        const photoIdFrontUploadBody = new FormData()
        photoIdFrontUploadBody.append("sub_type","photoIdFront")
        photoIdFrontUploadBody.append('document', {
            uri: userData.photoIDFront.uri,
            type: 'image/jpeg',
            name: 'pid_front.jpg'
            });
        let doc_upload_1 = UserService.uploadSingleDocument(session.session?.identity.id,userData.idType === 'USA_SSN' ? 'identity_verification' : 'tax_id_verification',photoIdFrontUploadBody)
        
        const bankStatementBody = new FormData()
        bankStatementBody.append("sub_type","bank-statement")
        bankStatementBody.append('document', {
            uri:  userData.bankStatement.uri,
            type: 'application/pdf',
            name: 'document.pdf'
            });
        let doc_upload_2 = UserService.uploadSingleDocument(session.session?.identity.id,'address_verification',bankStatementBody)
        let doc_upload_3;
        if (userData.photoIDBack){
            const photoIdBackUploadBody = new FormData()
            photoIdBackUploadBody.append("sub_type","photoIdBack")
            photoIdBackUploadBody.append('document', {
                uri: userData.photoIDBack.uri,
                type: 'image/jpeg',
                name: 'pid_back.jpg'
                });
            doc_upload_3 = UserService.uploadSingleDocument(session.session?.identity.id,userData.idType === 'USA_SSN' ? 'identity_verification' : 'tax_id_verification',photoIdBackUploadBody)
        }
        await doc_upload_1
        await doc_upload_2
        await doc_upload_3


        await UserService.agreements((session.session?.identity.id as string))
        let account_details;
        for (let i = 0; i < 5; i++) {
            try {
                account_details = await AlpacaService.getAccountId(session.session?.identity.traits.email)
                break
            }catch (e){
                await new Promise((resolve, reject) => setTimeout(resolve,1000))
            }
        }
        posthog?.capture('Onboarding completed')
        if (account_details.status === "ONBOARDING"){
            navigation.navigate("Onfido Screen",{
                account_details
            })
        }else{
            setPercentageCompleted(1)
            setLocationState(locationState-1)
        }
    }

    useEffect(() => {
        UserService.getUser(session.session?.identity.id).then(cb => {
            setUserData({
                ...userData,
                legalFirstName : cb.given_name,
                legalLastName : cb.family_name,
                idType : cb.tax_id_type,
                citizenship: getCountryFromISO3(cb.country_of_citizenship) || '',
                birthCountry : getCountryFromISO3(cb.country_of_birth) || '',
                taxResidence : getCountryFromISO3(cb.country_of_tax_residence) || '',
                visaType : cb.visa_type,
                visaExpirationDate : cb.visa_expiration_date ? new Date(cb.visa_expiration_date) : "",
                isUSPR : cb.permanent_resident,
                dob : cb.dob ? new Date(cb.dob) : "",
                idNumber : cb.id_number,
                homeAddress1 : cb.street_address_1,
                homeAddress2 : cb.street_address_2,
                city : cb.city,
                state : cb.state,
                zipCode: cb.postal_code,
                addressCountry : cb.country,
                employmentStatus : cb.employment_status,
                employerName : cb.employer_name,
                employerAddress : cb.employer_address,
                jobTitle : cb.employment_position,
                fundPreference : cb.preference === 'conventional' ? "Conventional" : (cb.preference === 'islamic' ? "Islamic" : ""),
                riskTolerance : cb.risk_tolerance_level || "",
                bankName : cb.bank_details?.bank_name,
                bankAccountNumber : cb.bank_details?.bank_account_number,
                routingNumber : cb.bank_details?.routing_number || cb.bank_details?.swift_code,
                trustedContactName: cb.trusted_contact?.given_name,
                trustedContactLastName: cb.trusted_contact?.family_name,
                trustedContactEmail : cb.trusted_contact?.email_address,
                trustedContactNumber : cb.trusted_contact?.phone_number,
                annualHouseholdIncome : cb.annual_income_max,
                investibleAssets : cb.liquid_net_worth_max,
                sourceOfFunds : fund_source_map_back[cb.funding_source],
                accountType : cb.bank_details?.bank_type,
                isExecutiveOrShareholderPC : cb.disclosures?.is_control_person || false,
                isUSBrokerAffiliated : cb.disclosures?.is_affiliated_exchange_or_finra || false,
                isSeniorPoliticalFigure : cb.disclosures?.is_politically_exposed || false,
                isRelatedToPoliticalFigure : cb.disclosures?.immediate_family_exposed || false,
                isUSCitizen : cb.disclosures?.is_us_citizen || false,
                isUSResident: cb.disclosures?.is_us_resident || false,
                profile_start_ts : (cb.meta && cb.meta[0].profile_start_ts) || humanReadableDate(Date.now())
            })
            cb.meta && setPercentageCompleted(cb.meta[0].profile_completeness || 0)
            cb.meta && setLocationState(cb.meta[0].signup_page_location || 0)
        }).catch().finally(() => setUserFetched(true))
        posthog?.identify(session.session?.identity?.id,{
            email : session.session?.identity?.traits.email,
          })
    },[])

    useEffect(() => {
        goToNextScreen(locationState)
    }, [locationState])

    const logout = async () => {
        posthog?.reset()
        setSession(null)
      }
    const showBackButton = true

    function launchResponseModal({message, subMessage, isSuccess} : any) {
        setResponseModalConfig({
            message,
            subMessage,
            isSuccess
        })
        setResponseModal(true)
    }

    async function updateUser(body : any, cb : () => void) {
        try {
            const resp = await UserService.updateUser(session.session?.identity.id as string, {...body, supress_push : "true"})
            // console.log(JSON.stringify(resp,null,2))
            cb()
        }catch(e) {
            // console.log("Some error",JSON.stringify(e,null,2))
            launchResponseModal(AppConstants.GenericErrorResponse)
        }
    }

    return (
        <SignupScreenWrapper navigation={navigation} showBackButton={false} showLogoutButton={true} backButtonFunction={logout} percentageValue={percentageCompleted}>
            <SpinnerModal show={disableButton}/>
            <ResponseModal show={showResponseModal} closeModal={()=>setResponseModal(false)} {...responseModalConfig} />
            <View style={{
                width: Dimensions.get('window').width,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                height: '100%',
                overflow: 'hidden',
            }}>
                <Animated.View style={{
                    transform: [{
                        translateX: Animated.multiply(Dimensions.get('window').width, location)
                    }],
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    height: '100%',
                    flex: 1
                }}>
                    <SignupWelcomeScreen goToNext={() => setLocationState(locationState - 1)} userFetched={userFetched} userData = {userData} IP ={IP}/>
                    {
                    userFetched && 
                    <>
                    
                    <SignupLegalNames goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.1,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    <SignupTaxResidence goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.15,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    <SignupCitizenship goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.20,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    <SignupDOB goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.25,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    <SignupBirthCountry goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.30,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    <SignupAddress goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.4,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    <SignupIncomeDetails goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.5,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    <SignupOptionalDetails goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.6,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    <SignupAffiliationQs goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.65,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    
                    {(userData.isExecutiveOrShareholderPC || userData.isUSBrokerAffiliated) &&
                        <SignupAffiliationDetails goToNext={() => setLocationState(locationState - 1)}  goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    }
                    <SignupPEPQuestion goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.70,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>

                    {userData.isPEP &&
                        <SignupPEPFollowUps goToNext={() => setLocationState(locationState - 1)}  goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    }
                    <SignupFATCA goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.75,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>

                    {!(userData.isUSCitizen || userData.isUSPR || userData.isUSResident) &&

                        <>
                            <SignupNONUSDeclaration goToNext={() => setLocationState(locationState - 1)} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                            <SignupW8 goToNext={() => setLocationState(locationState - 1)} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                        </>
                    }
                    <SignupIDDetails goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.85,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    
                    <SignupDocumentUpload goToNext={() => {setLocationState(locationState - 1); setPercentageCompleted(Math.max(0.99,percentageCompleted))}} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} updateUser = {updateUser}/>
                    <SignupAgreementsDisclosures goToNext={()=>handleOnboardingSubmit().catch(err => {console.log(JSON.stringify(err,null,2));
                        launchResponseModal(AppConstants.GenericErrorResponse);    
                    }).finally(()=>setDisableButton(false))} goToPrev={() => setLocationState(locationState + 1)} userData={userData} setUserData={setUserData} disableButton = {disableButton} updateUser = {updateUser}/>
                    {/* <SignupPaymentGateway  goToNext = {()=>setLocationState(locationState-1)} goToPrev = {()=>setLocationState(locationState+1)} userData={userData} setUserData={setUserData}/> */}
                    <SignupLastScreen goToNext={logout} goToPrev={() => {setLocationState(locationState + 1); console.log(JSON.stringify(userData,null,2))}} userData={userData} setUserData={setUserData} />
                    </>
                    }
                </Animated.View>
            </View>
        </SignupScreenWrapper>
    )
}