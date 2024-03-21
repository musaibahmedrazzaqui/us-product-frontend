import {
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'

export function HideKeyboard({children} : {children : React.ReactNode}) {
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
        </TouchableWithoutFeedback>
    )
}