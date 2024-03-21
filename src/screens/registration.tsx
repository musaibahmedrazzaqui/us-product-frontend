import { SelfServiceRegistrationFlow, SubmitSelfServiceRegistrationFlowBody } from "@ory/kratos-client";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button, Platform, View, Text, Image, ScrollView, TextInput, TouchableOpacity, Modal } from "react-native";
import { AppConstants } from "../../assets/AppConstants";
import { AuthContext } from "../components/authProvider";
import { RootStackParamList } from "../components/navigation";
import { SelfServiceFlow } from "../components/ory";
import { getNodeId, handleFormSubmitError } from "../components/ory/helpers/form";
import { newOrySdk } from "../components/ory/sdk";
import { ProjectContext } from "../components/projectProvider";
import AuthScreenWrapper from "../ScreenWrappers/AuthScreenWrapper";
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from "./SignupScreen/SignupComponents/SignupMiscComponents/CustomTextInput";
import PasswordValidationView from "./RegisterScreen/PasswordValidationView";
import { GlobalStyles } from "../GlobalStyles";
import { AntDesign, Feather } from '@expo/vector-icons'
import ResponseModal from "../components/ResponseModal";
import { UpdateRegistrationFlowBody } from "@ory/client";
import { SessionContext } from "../components/ory/helpers/auth";
const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().matches(/[A-Z]/).matches(/[a-z]/).matches(/[0-9]/).matches(/[-!$%^&*@.]/).required().min(8),
    phone: Yup.string().matches(/^[0-9]+$/).required(),
});

type Props = StackScreenProps<RootStackParamList, "Registration">

export default function Registration({ navigation }: Props) {
    const emailInputRef = useRef()
    const passInputRef = useRef()
    const phoneInputRef = useRef()
    const [passView, setShowPassView] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const [flow, setConfig] = useState<SelfServiceRegistrationFlow | undefined>(
        undefined,
    )
    const { project } = useContext(ProjectContext)
    const { setSession, isAuthenticated } = useContext(AuthContext)

    const [showResponseModal, setResponseModal] = useState(false)
    const [uninvestedCashBalance, setCashBalance] = useState(47749)
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

    const initializeFlow = () =>
        newOrySdk(project)
            .createNativeRegistrationFlow({
                returnTo: "http://localhost:4457/Callback",
                returnSessionTokenExchangeCode: true,
              })
            // The flow was initialized successfully, let's set the form data:rr
            .then(({ data: flow }) => {
                setConfig(flow)
            })
            .catch(console.error)

    // When the component is mounted, we initialize a new use login flow:
    useFocusEffect(
        useCallback(() => {
            initializeFlow()

            return () => {
                setConfig(undefined)
            }
        }, [project]),
    )

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         navigation.navigate("Home")
    //     }
    // }, [isAuthenticated])

    if (isAuthenticated) {
        return null
    }

    // This will update the registration flow with the user provided input:
    let onSubmit2 = (
        payload: {
            email : string,
            password : string,
            phone : string
        },
    ): Promise<void> =>
        flow
            ? newKratosSdk(project)
                .submitSelfServiceRegistrationFlow(flow.id, {
                    "csrf_token": "",
                    "method": "password",
                    "password": payload.password,
                    "traits.email": payload.email.toLowerCase(),
                    "traits.phone": "+" + payload.phone,
                } as any)
                .then(({ data }) => {
                    // ORY Kratos can be configured in such a way that it requires a login after
                    // registration. You could handle that case by navigating to the Login screen
                    // but for simplicity we'll just print an error here:

                    if (!data.session_token || !data.session) {
                        const err = new Error(
                            "It looks like you configured ORY Kratos to not issue a session automatically after registration. This edge-case is currently not supported in this example app. You can find more information on enabling this feature here: https://www.ory.sh/kratos/docs/next/self-service/flows/user-registration#successful-registration",
                        )
                        return Promise.reject(err)
                    }

                    // Looks like we got a session!
                    return Promise.resolve({
                        session: data.session,
                        session_token: data.session_token,
                    })
                })
                // Let's log the user in!
                .then(()=>launchResponseModal({message: "Your account has been successfully created.", subMessage: ' A verification email has been sent to your email address. Please check your inbox and follow the instructions in the email to complete the verification process.',isSuccess:true}))
                .catch((err) => {

                    if (err.response.data.ui.messages){
                        launchResponseModal({...AppConstants.GenericErrorResponse, message : err.response.data.ui.messages[0].text})
                    }else if(err.response.data.ui.nodes[1].messages.length){
                        launchResponseModal({...AppConstants.GenericErrorResponse, message : 'Phone number is either invalid or already used'})
                    }else if(err.response.data.ui.nodes[2].messages.length){
                        launchResponseModal({...AppConstants.GenericErrorResponse, message : err.response.data.ui.nodes[2].messages[0].text})
                    }
                    else{
                        launchResponseModal(AppConstants.GenericErrorResponse)
                    }
                    
                })
                // .catch(handleFormSubmitError(setConfig, initializeFlow,undefined, () => launchResponseModal({...AppConstants.GenericErrorResponse, message : formError})))
            : Promise.resolve()


    const refetchFlow = () =>
    newOrySdk(project)
        .getRegistrationFlow({ id: flow!.id })
        .then(({ data: f }) => setConfig({ ...flow, ...f })) // merging ensures we don't lose the code
        .catch(console.error)

    const setSessionAndRedirect = (session: SessionContext) => {
        setSession(session)
        setTimeout(() => {
            navigation.navigate("Home")
        }, 100)
        }

    const onSubmit = async (
        payload: UpdateRegistrationFlowBody,
        ): Promise<void> => {
        if (!flow) {
            return
        }
    
        newOrySdk(project)
            .updateRegistrationFlow({
            flow: flow.id,
            updateRegistrationFlowBody: {
                "csrf_token": "",
                "method": "password",
                "password": payload.password,
                "traits.email": payload.email.toLowerCase(),
                "traits.phone": "+" + payload.phone,
            },
            
            })
            .then(({ data }) => {
            // ORY Kratos can be configured in such a way that it requires a login after
            // registration. You could handle that case by navigating to the Login screen
            // but for simplicity we'll just print an error here:
            if (!data.session_token || !data.session) {
                const err = new Error(
                "It looks like you configured ORY Kratos to not issue a session automatically after registration. This edge-case is currently not supported in this example app. You can find more information on enabling this feature here: https://www.ory.sh/kratos/docs/next/self-service/flows/user-registration#successful-registration",
                )
                return Promise.reject(err)
            }
    
            const s: SessionContext = {
                session: data.session,
                session_token: data.session_token,
            }
    
            let verificationFlow = false
            if (data.continue_with) {
                for (const c of data.continue_with) {
                switch (c.action) {
                    case "show_verification_ui": {
                    console.log("got a verfification flow, navigating to it", c)
                    verificationFlow = true
                    navigation.navigate("Verification", {
                        flowId: c.flow.id,
                    })
                    break
                    }
                    case "set_ory_session_token": {
                    // Right now, this is redundant, and is just supposed to show that the session token is also included
                    // in the continue_with elements.
                    console.log(
                        "found an ory session token, storing it for further use",
                    )
                    s.session_token = c.ory_session_token
                    break
                    }
                }
                }
            }
    
            // Let's log the user in!
            // setSession(s)
            // if (!verificationFlow) {
            //     navigation.navigate("Home")
            // }
            })
            .catch(
                (err) => {
                    console.log(err.response.data.ui.messages)
                    if (err.response.data.ui.messages){
                        launchResponseModal({...AppConstants.GenericErrorResponse, message : err.response.data.ui.messages[0].text})
                    }else if(err.response.data.ui.nodes[1].messages.length){
                        launchResponseModal({...AppConstants.GenericErrorResponse, message : 'Phone number is either invalid or already used'})
                    }else if(err.response.data.ui.nodes[2].messages.length){
                        launchResponseModal({...AppConstants.GenericErrorResponse, message : err.response.data.ui.nodes[2].messages[0].text})
                    }
                    else{
                        launchResponseModal(AppConstants.GenericErrorResponse)
                    }
                    
                }
            )
        }



    useEffect(()=>{
        flow?.ui?.messages && setFormError(flow?.ui?.messages[0].text)
    },[flow])
    return (
        <AuthScreenWrapper navigation={navigation} showBackButton={false}>
            <ResponseModal show={showResponseModal} closeModal={()=>{setResponseModal(false); navigation.goBack()}} {...responseModalConfig} />
            <ScrollView style={{ paddingHorizontal: '5%' }} onStartShouldSetResponder={() => true} bounces={false} showsVerticalScrollIndicator={false}>
                <View onStartShouldSetResponder={() => true}>
                    <Image source={require('../../assets/images/tree.png')} style={{ height: 36, width: 36 }} />
                    <Text style={{
                        width: '100%',
                        fontFamily: 'PlayfairDisplay_700Bold',
                        fontSize: 32,
                        color: AppConstants.loginHeaderBlue,
                        marginTop: 20

                    }}
                    >
                        SmartInvest {'\n'}Onboarding
                    </Text>
                    <Formik
                        initialValues={{ email: '', password: "", phone: '' }}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            onSubmit(values).then(() => {}).catch((e) => {
                                //display error here ...
                                console.log(`Error whiile creating user : ${e}`)
                                
                            })
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <>
                                <Text
                                    style={{
                                        fontFamily: 'ArialNova',
                                        fontSize: 18,
                                        lineHeight: 32,
                                        paddingTop: 20
                                    }}
                                >
                                    Can we have your email address?
                                </Text>
                                <CustomTextInput
                                    reference={emailInputRef}
                                    touched={touched.email}
                                    errors={errors.email}
                                    value={values.email}
                                    onFocus={() => { }}
                                    handleChange={handleChange('email')}
                                    handleBlur={handleBlur('email')}
                                    keyboardType="email-address"
                                    placeholder={"email address"}
                                    editable={true}
                                    textContentType={"email"}
                                />

                                <Text
                                    style={{
                                        fontFamily: 'ArialNova',
                                        fontSize: 18,
                                        lineHeight: 32,
                                        paddingTop: 20
                                    }}
                                >
                                    Set your account password
                                </Text>

                                <CustomTextInput
                                    reference={passInputRef}
                                    touched={touched.password}
                                    errors={errors.password}
                                    value={values.password}
                                    handleChange={handleChange('password')}
                                    handleBlur={handleBlur('password')}
                                    keyboardType="default"
                                    placeholder={"password"}
                                    editable={true}
                                    textContentType={"password"}
                                    secureTextEntry={true}
                                    onFocus={() => setShowPassView(true)}
                                />

                                <PasswordValidationView
                                    showView={passView}
                                    password={values.password}
                                />

                                <Text
                                    style={{
                                        fontFamily: 'ArialNova',
                                        fontSize: 18,
                                        lineHeight: 32,
                                        paddingTop: 20
                                    }}
                                >
                                    What is your mobile number?
                                </Text>


                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    marginTop: 20,
                                    borderWidth: 1,
                                    borderColor: touched.phone ? (errors.phone ? 'red' : '#19C18F') : '#DDDDDD',
                                    borderRadius: 6,
                                }}>
                                    <View style={{
                                        height: 64,
                                        width: '15%',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        flexDirection: 'row',
                                    }}>
                                        <Text style={{ fontFamily: 'ArialNova', fontSize: 20 }}>
                                            {'+'}
                                        </Text>
                                    </View>
                                    <TextInput
                                        ref={phoneInputRef}
                                        style={{ ...GlobalStyles.textInputStyle, width: '65%', borderWidth: 0, paddingHorizontal: 0 }}
                                        placeholder=""
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                        value={values.phone}
                                        autoCapitalize="none"
                                        keyboardType='phone-pad'
                                    />
                                    <View style={{
                                        height: 64,
                                        width: '20%',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {(touched.phone) ?
                                            (errors.phone ?
                                                <AntDesign name='close' size={24} color={'red'} /> :
                                                <AntDesign name='check' size={24} color={'#19C18F'} />
                                            ) :
                                            <></>
                                        }
                                    </View>
                                </View>

                                <View
                                    style={{
                                        alignItems: 'flex-end',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        marginTop: 20,
                                        flex: 1,
                                        flexDirection: 'row',
                                        paddingBottom: 20,
                                    }}>
                                    <TouchableOpacity style={{
                                        width: '17.5%',
                                        marginTop: 10,
                                        height: 54,
                                        marginVertical: 10,
                                        borderRadius: 6,
                                        padding: 10,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#DDD'
                                    }}
                                        onPress={() => navigation.navigate("Login", { refresh: true })}
                                    >
                                        <Feather name="arrow-left" size={24} color="#8692A6" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '80%',
                                        marginTop: 10,
                                        height: 54,
                                        backgroundColor: AppConstants.loginHeaderBlue,
                                        marginVertical: 10,
                                        borderRadius: 6,
                                        padding: 10,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        elevation: 5,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                    }}
                                        activeOpacity={0.8}

                                        onPress={() => handleSubmit()}
                                        disabled={false}
                                    >
                                        <Text style={{ color: 'white', fontFamily: 'ArialNova', fontSize: 18 }}>
                                            Next
                                        </Text>
                                        <Feather name="arrow-right" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>


                            </>
                        )}
                    </Formik>


                </View>
            </ScrollView>
        </AuthScreenWrapper>
    )
}