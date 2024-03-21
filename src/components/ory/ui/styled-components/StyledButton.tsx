import React, { useContext } from "react"
import { NativeSyntheticEvent, NativeTouchEvent, TouchableOpacity, Text } from "react-native"

const StyledText = (props : StyleProps) => { 
  return <Text style={{
    fontWeight : "400",
    fontSize : 14,
    lineHeight : 25,
    textAlign : "center"
  }} />
} /*styled.Text`
  font-family: "Rubik_400Regular";
  font-weight: 400;
  font-size: 14px;
  line-height: ${({ big }: ThemeProps & StyleProps) =>
    !big ? "20px" : "30px"};
  text-align: center;
  color: ${({ disabled, theme }: ThemeProps & StyleProps) =>
    disabled ? theme.grey30 : theme.grey0};*/


const StyledContainer = (props : StyleProps) => {
return(<TouchableOpacity 
  style={{
    width : "100%",
    padding : 6,
    margin : 4,
  }}
/>)}
/*`
  background-color: ${({ disabled, theme }: ThemeProps & StyleProps) =>
    disabled ? theme.grey10 : theme.primary60};
  border-radius: ${({ theme }: ThemeProps) => theme.borderRadius};

  width: 100%;

  padding: 5px 12px;
  margin: 7px 0;
  border: 2px solid transparent;
`*/

interface StyleProps {
  disabled?: boolean
  testID?: string
  big?: boolean
}

interface ButtonProps extends StyleProps {
  title: string
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void
}

const StyledButton = ({
  onPress,
  testID,
  title,
  big,
  disabled,
}: ButtonProps) => (
  <TouchableOpacity 
  style={{
    width : "100%",
    padding : 6,
    margin : 4,
  }}

    /*big={big}*/
    disabled={disabled}
    onPress={onPress}
  >
    <Text style={{
    fontWeight : "400",
    fontSize : 14,
    lineHeight : 25,
    textAlign : "center"
  }} /*big={big}*/
   disabled={disabled}>
      {title}
    </Text>
  </TouchableOpacity>
)

export default StyledButton
