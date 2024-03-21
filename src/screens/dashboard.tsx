import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../components/authProvider";
import { RootStackParamList } from "../components/navigation";
import { StackScreenProps } from "@react-navigation/stack"
import { killAuthenticatedSession } from "../components/ory/helpers/auth";

type Props = StackScreenProps<RootStackParamList, "Home">

export default function Dashboard({ navigation, route }: Props) {
  
  const { setSession } = useContext(AuthContext)
  const { isAuthenticated, session, sessionToken } = useContext(AuthContext)
  console.log(isAuthenticated, session)
  const { name: { first = String(session !== undefined ? session!.identity.id : "")  } = {} } = {name : {first : ""} }
  useEffect(() => {
    if (!isAuthenticated || !session) {
      navigation.navigate('Login', { refresh: true })
    }
  }, [isAuthenticated, sessionToken])

  if (!isAuthenticated || !session) {
    return null
  }

  const logout = () => {
    setSession(null)
  }

  console.log(session.identity.traits)

  return (
    <View>
      <Text>Dashboard, Welcome {first}</Text>
      <Text>Signed up with data : {JSON.stringify(session.identity.traits || "{}", null, 2)}</Text>
      <Button onPress={logout} title="Logout"/>
    </View>
  )
}