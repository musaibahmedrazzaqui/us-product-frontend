import {
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    Image,
    ScrollView
} from 'react-native'
import { AppConstants } from '../../../../assets/AppConstants';
import { Entypo, Feather } from '@expo/vector-icons'; 
import {useRef, useState} from 'react'
import { GlobalStyles } from '../../../GlobalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AntDesign} from '@expo/vector-icons'
import CustomTextInput from './SignupMiscComponents/CustomTextInput';
import HorizontalNavigatior from '../../../miscComponents/HorizontalNavigator';
import CustomSelector from './SignupMiscComponents/CustomSelector';
import { usePostHog } from 'posthog-react-native';



export default function SignupPEPFollowUps({goToNext, goToPrev, userData, setUserData} : {goToNext : ()=>void, goToPrev : ()=> void, userData : any, setUserData : any}){

    

    const pepJobTitleInputRef = useRef<any>()
    const relatedPEPNameInputRef = useRef<any>()
    const relatedPEPJobTitleInputRef = useRef<any>()

    const [PEP,setPEP] = useState<string>(userData.isUserPEP)
    const [isPEPDomesticOrForeign,setPEPDomesticOrForeign] = useState<string>(userData.isPEPDomesticOrForeign)
    const [pepCategory, setPEPCategory] = useState<string>(userData.pepCategory)
    const [relatedPEPRelation, setRelatedPEPRelation] = useState(userData.relatedPEPRelation)

    const PEPList = ['Myself', 'Family Member']
    const posthog = usePostHog()

    const SignupSchema = Yup.object().shape({
        pepJobTitle : PEP === 'Myself' ? Yup.string().required() : Yup.string(),
        relatedPEPName : PEP === 'Family Member' ? Yup.string().required() : Yup.string(),
        relatedPEPJobTitle : PEP === 'Family Member' ? Yup.string().required() : Yup.string(),
    
      });

    return(
        <KeyboardAvoidingView behavior='height' style={{
            width:Dimensions.get('window').width,
            height:'100%',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            paddingHorizontal:20
            }}>
                <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
                    <View onStartShouldSetResponder={()=>true} style={{width:'100%'}}>
                <View style={{
                    marginBottom:20
                }}>
                    <Image source={require('../../../../assets/images/tree.png')} style={{height:36,width:36}}/>
                </View>

                <Text style={{
                    width:'100%',
                    fontFamily:'PlayfairDisplay_700Bold',
                    fontSize:32,
                    color:AppConstants.loginHeaderBlue

                }}>
                    Elphinstone US{'\n'}Onboarding
                </Text>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    lineHeight:32,
                    paddingTop:20
                }}
                >
                PEP follow-up questions
                </Text>
                
                <Formik
                initialValues={{  
                    pepJobTitle : userData.pepJobTitle,
                    relatedPEPName : userData.relatedPEPName,
                    relatedPEPJobTitle : userData.relatedPEPJobTitle,
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    if (isPEPDomesticOrForeign === ''){
                        return
                    }
                    if (pepCategory === ''){
                        return
                    }
                    if (PEP === ''){
                        return
                    }
                    if (PEP === 'Family Member' && relatedPEPRelation === ''){
                        return
                    }
                    console.log(values)
                    Keyboard.dismiss()
                    posthog?.capture('Onboarding : Next button pressed on PEP followups screen', {
                        isUserPEP : PEP, pepCategory : pepCategory, isPEPDomesticOrForeign : isPEPDomesticOrForeign, relatedPEPRelation : relatedPEPRelation
                    })
                    setUserData({...userData, ...values, isUserPEP : PEP, pepCategory : pepCategory, isPEPDomesticOrForeign : isPEPDomesticOrForeign, relatedPEPRelation : relatedPEPRelation})
                    goToNext()
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                
                
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                {'\u25CF'} Is the PEP yourself of a family member? {'\n'}
                </Text>
                <CustomSelector
                itemList={PEPList}
                selectedValue={PEP}
                setValue={setPEP}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                {'\u25CF'} Is the relevant politically exposed person domestic or foreign? {'\n'}
                </Text>
                <CustomSelector
                itemList={['Domestic','Foreign']}
                selectedValue={isPEPDomesticOrForeign}
                setValue={setPEPDomesticOrForeign}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                {'\u25CF'} Please select which of the following category the relevant politically exposed person falls under {'\n'}
                </Text>
                <CustomSelector
                itemList={[
                    'Head of State',
                    'Head of Government',
                    'Senior Government official (grade 21 or above)', 
                    'Senior Political party official',
                    'Senior Judicial official', 
                    'Senior Military official',
                    'Senior Executive of state-owned company',
                    'Senior Executive of international organisation'
                ]}
                selectedValue={pepCategory}
                setValue={setPEPCategory}
                />
                {(PEP === 'Myself') && 
                <>
                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
                What is you job title?
                </Text>
                <CustomTextInput
                reference={pepJobTitleInputRef}
                touched={touched.pepJobTitle}
                errors={errors.pepJobTitle}
                value = {values.pepJobTitle}
                handleChange={handleChange('pepJobTitle')}
                handleBlur={handleBlur('pepJobTitle')}
                placeholder={"e.g., Operations Manager"}
                />

                </>
                }

                {(PEP === 'Family Member') && <>

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
              What is the name of the politically exposed person?
                </Text>
                <CustomTextInput
                reference={relatedPEPNameInputRef}
                touched={touched.relatedPEPName}
                errors={errors.relatedPEPName}
                value = {values.relatedPEPName}
                handleChange={handleChange('relatedPEPName')}
                handleBlur={handleBlur('relatedPEPName')}
                placeholder={"e.g., Farhan Paracha"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
               E-mail address of compliance person
                </Text>
                <CustomTextInput
                reference={relatedPEPJobTitleInputRef}
                touched={touched.relatedPEPJobTitle}
                errors={errors.relatedPEPJobTitle}
                value = {values.relatedPEPJobTitle}
                handleChange={handleChange('relatedPEPJobTitle')}
                handleBlur={handleBlur('relatedPEPJobTitle')}
                placeholder={"e.g., Executive Director"}
                />

                <Text
                style={{
                    fontFamily:'ArialNova',
                    fontSize:18,
                    // lineHeight:32,
                    paddingTop:20
                }}
                >
               What is your relationship to them?
                </Text>

                <CustomSelector
                selectedValue={relatedPEPRelation}
                setValue = {setRelatedPEPRelation}
                itemList={[
                    'Parent',
                    'Sibling',
                    'Child',
                    'Spouse',
                    'Grandparent',
                    'Grandchild'
                ]}
                />
                </>
                }
                <HorizontalNavigatior showBackButton nextFunction={handleSubmit} backFunction={goToPrev}/>
            </>)}
            </Formik>
            
            </View>
            <View style={{height:100}}/>
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}