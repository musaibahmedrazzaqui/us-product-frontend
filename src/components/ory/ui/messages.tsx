import React from "react";
import { View, Text, Dimensions } from "react-native";
import { UiText } from "@ory/kratos-client";

interface Props {
  messages?: Array<UiText>;
  testID?: string;
}

export default ({ messages = [], testID }: Props) => (
  <View testID={testID}>
    {messages.map(({ text, id }, k) => (
      <Text
        style={{
          color: "red",
          padding: 10,
          textAlign: "center",
          marginBottom: 32,
          width: Dimensions.get('window').width * 0.9
        }}
        testID={`ui/message/${id}`}
        key={`${id}${k}`}
      >
        {text === 'The provided credentials are invalid, check for spelling mistakes in your password or username, email address, or phone number.' ? "The provided credentials are invalid." : text}
      </Text>
    ))}
  </View>
);
