import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Dimensions,
    TouchableOpacity,
    Linking,
    Platform
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function TermsConditionsModal({
    show,
    closeModal,
} : any) {
    const termsAndConditionsUrl = 'http://elphinstone.us/wp-content/uploads/2023/12/Elphinstone-Inc.-Client-Account-Agreement-20230214.pdf';

    const handleTermsPress = () => {
        Linking.openURL(termsAndConditionsUrl);
    };

    return (
        <Modal visible={show} transparent={true} animationType='fade'>
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <View style={styles.line} />
                    <View style={styles.content}>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <AntDesign name="close" color={"#666"} size={16}/>
                        </TouchableOpacity>
                        <View style={{height:80, width:80, borderRadius:50, alignItems:'center', justifyContent : 'center',backgroundColor:'#004DBC'}}>
                            <AntDesign name="warning" color='white' size={40}/>
                        </View>
                        <Text style={styles.title}>
                        The Terms & Conditions have been updated. The following is a summary of the changes:
                        </Text>
                        <Text style={styles.summary}>
                            1. Language in the fee section now includes explicit mention of the fees instead of only referring to the website. No change has been made in the fees.
                        </Text>
                        <Text style={styles.summary}>
                            2. The brochure of services has been added to the document, instead of only being a referral to the website.
                        </Text>
                        <TouchableOpacity onPress={handleTermsPress}>
                            <Text style={styles.termsLink}>
                                Terms and Conditions
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.agreementText}>
                            By continuing to use our services you agree with the updated Terms & Conditions.
                        </Text>
                        <TouchableOpacity style={styles.okButton} onPress={closeModal}>
                            <Text style={styles.okButtonText}>
                                Okay
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(127,127,127,1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        width: '95%',
        height:"65%",
        backgroundColor: '#fff',
        borderRadius: 6,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    line: {
        height: '100%',
        width: 5,
        backgroundColor: '#004DBC',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-evenly',
        marginVertical: 20,
    },
    closeButton: {
        width: '95%',
        alignItems: 'flex-end',
    },
    iconContainer: {
        height: 80,
        width: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#004DBC',
    },
    title: {
        fontFamily: 'ArialNova-Light',
        fontSize: 18,
        paddingVertical: 10,
    },
    summary: {
        fontFamily: 'ArialNova-Light',
        fontSize: 14,
        paddingBottom: 10,
    },
    termsLink: {
        color: 'blue',
        textDecorationLine: 'underline',
        paddingBottom: 10,
    },
    agreementText: {
        fontFamily: 'ArialNova-Light',
        fontSize: 14,
        color: '#666',
    },
    okButton: {
        backgroundColor: '#004DBC',
        borderRadius: 6,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    okButtonText: {
        color: 'white',
        fontFamily: 'ArialNova',
    },
});
