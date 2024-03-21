import React from 'react'
import { Tooltip, TooltipProps } from '@rneui/themed';
import { Text, View, TouchableHighlight, TouchableOpacity, Linking } from 'react-native';
const ControlledTooltip: React.FC<TooltipProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Tooltip
        visible={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        {...props}
      />
    );
  };


function ToolTipComponent({contactUsRoute} : any) {
    return (
        <View style={{width:'100%',height:'100%'}}>
            <TouchableOpacity onPress={()=>Linking.openURL('https://elphinstone.us/wp-content/uploads/2023/01/Privacy-Policy.pdf')} style={{height:'33.3%', padding: 10, justifyContent:'center', borderBottomColor: '#DFE0EB', borderBottomWidth:1}}>
                <Text style={{fontFamily:'ArialNova', color:'#8692A6'}}>
                    Privacy Policy
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Linking.openURL('https://elphinstone.us/wp-content/uploads/2023/01/Terms-and-Conditions-Platform.pdf')} style={{height:'33.3%', padding: 10, justifyContent:'center', borderBottomColor: '#DFE0EB', borderBottomWidth:1}}>
                <Text style={{fontFamily:'ArialNova', color:'#8692A6'}}>
                    Terms & Conditions
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={contactUsRoute} style={{height:'33.4%', padding: 10, justifyContent:'center', borderBottomColor: '#DFE0EB', borderBottomWidth:1}}>
                <Text style={{fontFamily:'ArialNova', color:'#8692A6'}}>
                    Contact Us
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default function LegalToolTip({children, contactUsRoute} : {children : React.ReactNode, contactUsRoute : any}) {
    return(
        <ControlledTooltip
            width={200}
            height={180}
            backgroundColor={'#f0f0f0'}
            popover={<ToolTipComponent contactUsRoute ={contactUsRoute}/>}
            skipAndroidStatusBar={false}
            containerStyle={{
                padding:0,
                // overflow:'hidden',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.06,
                shadowRadius: 3.84,

                elevation: 5,
            }}
            pointerStyle = {{
                // padding:0,
                // overflow:'hidden',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.06,
                shadowRadius: 3.84,

                elevation: 5,
            }}
            // highlightColor={'#ccc'}
          >
            <View style={{padding:0}}>
            {children}
            </View>
        </ControlledTooltip>
    )
}