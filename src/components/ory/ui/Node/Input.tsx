import { UiNode, UiNodeInputAttributes } from "@ory/kratos-client"
import React from "react"
import { TextInputProps, View, Text, TextInput, Dimensions } from "react-native"

import {
  getNodeId,
  getNodeTitle,
  isUiNodeInputAttributes,
} from "../../helpers/form"

interface Props extends InputProps {
  node: UiNode
  attributes: UiNodeInputAttributes
}

export interface InputProps {
  onChange: (value: any) => void
  value: any
  disabled?: boolean
  textInputOverride?: TextInputOverride
}

export type TextInputOverride = (
  field: UiNode,
  props: TextInputProps,
) => TextInputProps

const guessVariant = ({ attributes }: UiNode) => {
  if (!isUiNodeInputAttributes(attributes)) {
    return "text"
  }

  if (attributes.name === "identifier") {
    return "username"
  }

  switch (attributes.type) {
    case "hidden":
      return null
    case "email":
      return "email"
    case "submit":
      return "button"
    case "password":
      return "password"
    default:
      return "text"
  }
}

const typeToState = ({
  type,
  disabled,
}: {
  type?: string
  disabled?: boolean
}) => {
  if (disabled) {
    return "disabled"
  }
  switch (type) {
    case "error":
      return "error"
  }
  return undefined
}


export const NodeInput = ({
  node,
  attributes,
  value,
  onChange,
  disabled,
  textInputOverride,
}: Props) => {
  const variant = guessVariant(node)
  if (!variant) {
    return null
  }
  let extraProps: TextInputProps = {}
  switch (variant) {
    case "email":
      extraProps.autoComplete = "email"
      extraProps.keyboardType = "email-address"
      extraProps.textContentType = "emailAddress"
      extraProps.autoCapitalize = "none"
      extraProps.autoCorrect = false
      break
    case "password":
      extraProps.autoComplete = "password"
      extraProps.textContentType = "password"
      extraProps.autoCapitalize = "none"
      extraProps.placeholder = "password"
      extraProps.secureTextEntry = true
      extraProps.autoCorrect = false
      break
    case "username":
      extraProps.autoComplete = "username"
      extraProps.textContentType = "username"
      extraProps.autoCapitalize = "none"
      extraProps.placeholder = "email address"
      extraProps.autoCorrect = false
      break
  }

  if (textInputOverride) {
    extraProps = textInputOverride(node, extraProps)
  }

  const name = getNodeId(node)
  const title = getNodeTitle(node)

  return (
    <View testID={`field/${name}`}>
      {/* <Text>{title}</Text> */}
      <TextInput
        testID={name}
        onChange={onChange}
        value={value ? String(value) : ""}
        editable={!disabled}
        onChangeText={onChange}
        style={{
          width:'100%',
          height: 64,
          borderWidth: 1,
          borderColor: '#DDDDDD',
          fontSize: 16,
          padding:10,
          borderRadius: 6,
          marginVertical:10
        }}
        {...extraProps}
      />
      <>
        {node.messages?.map(({ text, id, type }, k) => (
          <Text key={`${id}${k}`} style={{fontFamily:'ArialNova', color:'red'}}>
            {text === 'Property identifier is missing.' && "Email Address is missing" }
            {text === 'Property password is missing.' && "Password is missing" }

          </Text>
        ))}
      </>
    </View>
  )
}
