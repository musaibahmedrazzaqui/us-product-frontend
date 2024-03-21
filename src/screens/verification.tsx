import { SelfServiceLoginFlow, SubmitSelfServiceLoginFlowBody } from "@ory/kratos-client";
import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { AuthContext } from "../components/authProvider";
import { newOrySdk } from "../components/ory/sdk";
import { ProjectContext } from "../components/projectProvider";
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "../components/navigation";
import { useFocusEffect } from "@react-navigation/native";
import { SelfServiceFlow } from "../components/ory";
import { handleFormSubmitError } from "../components/ory/helpers/form";
import { SessionContext } from "../components/ory/helpers/auth";
import AuthScreenWrapper from '../ScreenWrappers/AuthScreenWrapper'
import ChangePasswordModal from "./LoginScreen/ChangePasswordModal"
import { ScrollView } from "react-native-gesture-handler";
import { LoginFlow, UpdateLoginFlowBody, UpdateVerificationFlowBody, VerificationFlow } from "@ory/client";
import SignupPhoneOTP from "./SignupScreen/SignupComponents/SignupPhoneOTP";
import SignupEmailOTP from "./SignupScreen/SignupComponents/SignupEmailOTP";
import { AppConstants } from "../../assets/AppConstants";
import ResponseModal from "../components/ResponseModal";
//TODO add type checking for navigation https://reactnavigation.org/docs/typescript/
type Props = StackScreenProps<RootStackParamList, "Login">

export default function VerificationScreen({ navigation, route }: Props) {

    const [flow, setConfig] = useState<VerificationFlow | undefined>(undefined)
    const { project } = useContext(ProjectContext)
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
        .createNativeVerificationFlow()
        // The flow was initialized successfully, let's set the form data:
        .then(({ data: flow }) => {
          setConfig(flow)
        })
        .catch(console.error)
    useEffect(() => console.log(JSON.stringify(flow,null,2)),[flow])
    const fetchFlow = (id: string) =>
      newOrySdk(project)
        .getVerificationFlow({ id })
        .then(({ data }) => {
          setConfig(data)
        })
        .catch(console.error)
  
    // When the component is mounted, we initialize a new verification flow
    // or use the id provided by the route params to fetch that flow:
    useFocusEffect(
      useCallback(() => {
        if (route.params?.flowId) {
          fetchFlow(route.params?.flowId)
        } else {
          initializeFlow()
        }
  
        return () => {
          setConfig(undefined)
        }
      }, [project]),
    )
  
    // This will update the verification flow with the user provided input:
    const onSubmit = async (
      payload: UpdateVerificationFlowBody,
    ): Promise<void> => {
      if (!flow) {
        return
      }

      newOrySdk(project)
        .updateVerificationFlow({
          flow: flow.id,
          updateVerificationFlowBody: payload,
        })
        .then(({ data }) => {
          setConfig(data)
        })
        .catch(
          handleFormSubmitError<VerificationFlow | undefined>(
            setConfig,
            initializeFlow,
          ),
        )
    }
  
    useEffect(() => {
      if (flow && route.params && route.params.email && flow.state === 'choose_method'){
        onSubmit({email: route.params.email, method:'code'})
      }
      if (flow && flow.state === 'sent_email' && flow.ui.messages?.length > 0 && flow.ui.messages[0].type === 'error'){
        launchResponseModal({...AppConstants.GenericErrorResponse, message : "The verification code is invalid or has already been used. Please try again."})
        
      }
      if (flow && flow.state === 'passed_challenge'){
        launchResponseModal({message: "Your account has been successfully created.", subMessage: 'Please login to use elphinstone.',isSuccess:true})
      }
    },[flow?.state, flow?.ui.messages])

    if (flow === undefined) {
        return 
    }
    return (
        <AuthScreenWrapper navigation={navigation} showBackButton={true} backButtonFunction={() => navigation.navigate('Login')}>
          <ResponseModal show={showResponseModal} closeModal={()=>{setResponseModal(false); navigation.goBack('Login')}} {...responseModalConfig} />
            <SignupEmailOTP onSubmit = {(value : string) => onSubmit({method : "code", code : value})}/>
        </AuthScreenWrapper>
    )
}