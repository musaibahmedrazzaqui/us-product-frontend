import { UiNode, UiNodeInputAttributes } from "@ory/kratos-client"
import React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { getNodeId, getNodeTitle } from "../../helpers/form"
import Button from "../styled-components/StyledButton"
import {Feather} from "@expo/vector-icons"
import {LoginScreenStyle} from '../../../../screens/LoginScreen/LoginScreenStyleSheet'
interface Props extends InputSubmitProps {
  node: UiNode
  attributes: UiNodeInputAttributes
}

export interface InputSubmitProps {
  isSubmitting: boolean
  onSubmitPress: (key: string, value: any) => void
  onChange: (value: any) => void
}

export const NodeInputSubmit = ({
  node,
  attributes,
  isSubmitting,
  onSubmitPress,
  onChange,
}: Props) => {
  if (attributes.type !== "submit") {
    return null
  }

  const name = getNodeId(node)
  const title = getNodeTitle(node)
  return (
    <View testID={`field/${name}/${attributes.value}`}>
      <TouchableOpacity style={LoginScreenStyle.loginButton} activeOpacity={0.8} onPress={()=>onSubmitPress(attributes.name, attributes.value)}>
          <Text style={{color:'white', fontFamily:'ArialNova'}}>
              Login to your account
          </Text>
          <Feather name="arrow-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}
