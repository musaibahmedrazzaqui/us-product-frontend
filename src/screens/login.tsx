import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
} from "@ory/kratos-client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { View, Text, ActivityIndicator, Linking } from "react-native";
import { AuthContext } from "../components/authProvider";
import { newOrySdk } from "../components/ory/sdk";
import { ProjectContext } from "../components/projectProvider";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../components/navigation";
import { useFocusEffect } from "@react-navigation/native";
import { SelfServiceFlow } from "../components/ory";
import { handleFormSubmitError } from "../components/ory/helpers/form";
import { SessionContext } from "../components/ory/helpers/auth";
import AuthScreenWrapper from "../ScreenWrappers/AuthScreenWrapper";
import ChangePasswordModal from "./LoginScreen/ChangePasswordModal";
import { ScrollView } from "react-native-gesture-handler";
import { LoginFlow, UpdateLoginFlowBody } from "@ory/client";
//TODO add type checking for navigation https://reactnavigation.org/docs/typescript/
type Props = StackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation, route }: Props) {
  const { project } = useContext(ProjectContext);
  const { setSession, sessionToken } = useContext(AuthContext);
  const [flow, setFlow] = useState<LoginFlow | undefined>(undefined);
  const [passModalOpen, setPassModal] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const initializeFlow = () =>
    newOrySdk(project)
      .createNativeLoginFlow({
        aal: route.params?.aal,
        refresh: route.params?.refresh,
        xSessionToken: sessionToken,
        returnTo: "http://localhost:4457/Callback",
        returnSessionTokenExchangeCode: true,
      })
      .then(({ data: f }) => setFlow(f))
      .catch(console.error);

  const refetchFlow = () =>
    newOrySdk(project)
      .getLoginFlow({ id: flow!.id })
      .then(({ data: f }) => setFlow({ ...flow, ...f })) // merging ensures we don't lose the code
      .catch(console.error);

  // When the component is mounted, we initialize a new use login flow:
  useFocusEffect(
    React.useCallback(() => {
      initializeFlow();

      return () => {
        setFlow(undefined);
      };
    }, [project])
  );

  const setSessionAndRedirect = (session: SessionContext) => {
    console.log("Set session after login", session);
    setSession(session);
  };

  // This will update the login flow with the user provided input:
  const onSubmit = (payload: UpdateLoginFlowBody) => {
    setUserEmail(payload.identifier);
    return flow
      ? newOrySdk(project)
          .updateLoginFlow({
            flow: flow.id,
            updateLoginFlowBody: payload,
            xSessionToken: sessionToken,
          })
          .then(({ data }) => Promise.resolve(data as SessionContext))
          // Looks like everything worked and we have a session!
          .then(setSessionAndRedirect)
          .catch(
            handleFormSubmitError(
              flow,
              setFlow,
              initializeFlow,
              setSessionAndRedirect,
              refetchFlow
            )
          )
      : Promise.resolve();
  };
  useEffect(() => {
    console.log("LOgin")
    flow?.ui?.messages &&
      flow.ui.messages[0].text ===
        "Account not active yet. Did you forget to verify your email address?" &&
      navigation.navigate("Verification", { email: userEmail });
  });
  if (flow === undefined) {
    return;
  }
  return (
    <AuthScreenWrapper navigation={navigation} showBackButton={false}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        
        <ChangePasswordModal
          visible={passModalOpen}
          closeModal={() => setPassModal(false)}
        />

        <Text
          style={{
            fontFamily: "Overpass_700Bold",
            fontSize: 30,
            marginTop: 40,
          }}
        >
          Login
        </Text>

        <Text
          style={{
            fontFamily: "Overpass_300Light",
            fontSize: 16,
            color: "#8692A6",
            marginBottom: 40,
          }}
        >
          access your Elphinstone account
        </Text>

        <SelfServiceFlow flow={flow} onSubmit={onSubmit} />

        <Text
          style={{ color: "#8692A6", fontFamily: "ArialNova" }}
          // onPress={() => setPassModal(true)}
          onPress={() => Linking.openURL('https://users.elphinstone.us/recovery')}
        >
          Forgot your password?{" "}
        </Text>

        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <Text style={{ color: "#8692A6", fontFamily: "ArialNova" }}>
            Don't have an account yet?{" "}
          </Text>

          <Text
            style={{ color: "#004DBC", fontFamily: "ArialNova" }}
            onPress={() => navigation.navigate("Registration")}
          >
            Sign up
          </Text>
        </View>

      </ScrollView>
    </AuthScreenWrapper>
  );
}
