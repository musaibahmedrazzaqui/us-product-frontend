import React from "react"
import { UiNode, UiNodeImageAttributes } from "@ory/kratos-client"
import { getNodeId } from "../../helpers/form"
import { View, Image } from "react-native"

interface Props {
  node: UiNode
  attributes: UiNodeImageAttributes
}

const StyledImage = ({ attributes }: Props) => { 
  return( <Image
  source={{uri : attributes.src}}
  style = {{
    width: attributes.width,
    height: attributes.height
  }}
/>)}

export const NodeImage = (props: Props) => {
  const name = getNodeId(props.node)
  return (
    <View testID={`field/${name}`}>
      <StyledImage
        {...props}
      />
    </View>
  )
}
