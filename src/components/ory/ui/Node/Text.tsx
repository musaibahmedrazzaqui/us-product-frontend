import React from "react"
import { Dimensions, View } from "react-native"
import { UiNode, UiNodeTextAttributes } from "@ory/kratos-client"
import StyledText from "../styled-components/StyledText"
import { getNodeId } from "../../helpers/form"

interface Props {
  node: UiNode
  attributes: UiNodeTextAttributes
}

export const NodeText = (props: Props) => {
  const name = getNodeId(props.node)
  return (
    <View style={{
      marginBottom : 14,

    }} testID={`field/${name}`}>
      {props.node.meta.label?.text && (
        <StyledText variant="lead" testID={`field/${name}/label`}>
          {props.node.meta.label?.text}
        </StyledText>
      )}
      <StyledText variant="h3" testID={`field/${name}/text`}>
        {props.attributes.text.text}
      </StyledText>
    </View>
  )
}
