import {
  Modal,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
  Linking,
} from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { AppConstants } from "../../../assets/AppConstants";

import {
  SelfServiceRecoveryFlow,
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
} from "@ory/kratos-client";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthContext } from "../../components/authProvider";
import { RootStackParamList } from "../../components/navigation";
import { SelfServiceFlow } from "../../components/ory";
import {
  getNodeId,
  handleFormSubmitError,
} from "../../components/ory/helpers/form";
import { newOrySdk } from "../../components/ory/sdk";
import { ProjectContext } from "../../components/projectProvider";

export default function ChangePasswordModal({
  visible,
  closeModal,
}: {
  visible: boolean;
  closeModal: () => void;
}) {
  const emailInputRef = useRef<any>();
  const passInputRef = useRef<any>();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [flow, setConfig] = useState<SelfServiceRecoveryFlow | undefined>(
    undefined
  );
  const { project } = useContext(ProjectContext);
  const { setSession, isAuthenticated } = useContext(AuthContext);

  const initializeFlow = () =>
    newOrySdk(project)
      .createNativeRecoveryFlow()
      // The flow was initialized successfully, let's set the form data:
      .then(({ data: flow }) => {
        setConfig(flow);
      })
      .catch(console.error);

  // When the component is mounted, we initialize a new use login flow:
  useFocusEffect(
    useCallback(() => {
      initializeFlow();

      return () => {
        setConfig(undefined);
      };
    }, [project])
  );

  if (isAuthenticated) {
    return null;
  }

  // This will update the registration flow with the user provided input:
  const onSubmit = (payload: SubmitSelfServiceRegistrationFlowBody) =>
    flow
      ? newKratosSdk(project)
          .submitSelfServiceRecoveryFlow(flow.id, {
            csrf_token: "",
            email: email,
            method: "link",
          })
          .then(({ data }) => {
            // ORY Kratos can be configured in such a way that it requires a login after
            // registration. You could handle that case by navigating to the Login screen
            // but for simplicity we'll just print an error here:

            // Looks like we got a session!
            return Promise.resolve({
              session: data.session,
              session_token: data.session_token,
            });
          })
          // Let's log the user in!
          .then(() => setSubmitted(true))
          .catch((err) => console.log(err))
      : Promise.resolve();

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          backgroundColor: "rgba(127,127,127,0.4)",
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            // height:'50%',
            width: "95%",
            backgroundColor: "white",
            borderRadius: 6,
          }}
        >
          {!submitted ? (
            <>
              <View
                style={{
                  width: "100%",
                  padding: 20,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity onPress={closeModal}>
                  <AntDesign name="close" size={20} color="#A4B3C4" />
                </TouchableOpacity>
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <Text
                  style={{
                    fontFamily: "Overpass_700Bold",
                    fontSize: 30,
                    paddingVertical: 20,
                  }}
                >
                  Password Recovery
                </Text>
                <Text
                  style={{
                    fontFamily: "Overpass_300Light",
                    fontSize: 16,
                    color: "#8692A6",
                  }}
                >
                  Enter your registered email address for password recovery
                </Text>
                <TextInput
                  ref={emailInputRef}
                  style={{
                    height: 64,
                    borderWidth: 1,
                    borderColor: "#DDDDDD",
                    fontSize: 16,
                    padding: 10,
                    borderRadius: 6,
                    marginVertical: 20,
                  }}
                  placeholder="email address"
                  onChangeText={(value) => setEmail(value)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
                {/* <SelfServiceFlow flow={flow} onSubmit={onSubmit}/> */}
                <TouchableOpacity
                  style={{
                    height: 54,
                    backgroundColor: AppConstants.loginHeaderBlue,
                    marginVertical: 10,
                    marginBottom: 30,
                    borderRadius: 6,
                    padding: 10,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  activeOpacity={0.8}
                  onPress={() => onSubmit()}
                >
                  <Text style={{ color: "white", fontFamily: "ArialNova" }}>
                    Submit
                  </Text>
                  <Feather name="arrow-right" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  width: "100%",
                  padding: 20,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity onPress={closeModal}>
                  <AntDesign name="close" size={20} color="#A4B3C4" />
                </TouchableOpacity>
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <View style={{ paddingVertical: 20, marginBottom: 50 }}>
                  <Text
                    style={{
                      fontFamily: "Overpass_700Bold",
                      fontSize: 30,
                      paddingBottom: 20,
                    }}
                  >
                    A password reset link has been sent to your email.
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Overpass_300Light",
                      fontSize: 16,
                      color: "#8692A6",
                    }}
                  >
                    Follow the link in the email to recover your account.
                  </Text>
                </View>

                {/* <SelfServiceFlow flow={flow} onSubmit={onSubmit}/> */}
                {/* <TouchableOpacity style={{
                            height: 54,
                            backgroundColor:AppConstants.loginHeaderBlue,
                            marginVertical:10,
                            borderRadius: 6,
                            padding:10,
                            alignItems:'center',
                            flexDirection:'row',
                            justifyContent:'space-between',
                        }} activeOpacity={0.8} onPress={()=>{}}>
                            <Text style={{color:'white', fontFamily:'ArialNova'}}>
                                Submit
                            </Text>
                            <Feather name="arrow-right" size={24} color="white" />
                        </TouchableOpacity> */}
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
