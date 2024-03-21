import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ReferralResponseModal({
  message,
  subtext,
  show,
  continueAction,
  closeModal,
  check,
}) {
  return (
    <Modal visible={show} transparent={true} animationType='fade'>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
         
            {/* Replace with tick or confirmation icon */}
            <View style={[styles.iconContainer, check ? styles.tickIcon : styles.crossIcon]}>
            {check ? (
              <MaterialIcons name="check" color='white' size={40} />
            ) : (
              <MaterialIcons name="close" color='white' size={40} />
            )}
         
          </View>
          <Text style={styles.titleText}>{message}</Text>
          <Text style={styles.subText}>{subtext}</Text>
          {check ? (
              <TouchableOpacity style={styles.continueButton} onPress={continueAction}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.continueButton} onPress={closeModal}>
                <Text style={styles.continueButtonText}>Retry</Text>
              </TouchableOpacity>
            )}
          
        </View>
      </View>
    </Modal>
  );
}

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(127,127,127,1)',
//   },
//   modalContent: {
//     width: '95%',
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     flexDirection: 'column',
//     overflow: 'hidden',
//     padding: 20,
//     alignItems: 'center',
//   },
//   iconContainer: {
//     height: 80,
//     width: 80,
//     borderRadius: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#00A854', // Green color for confirmation
//   },
//   titleText: {
//     fontFamily: 'ArialNova-Bold',
//     fontSize: 18,
//     paddingVertical: 10,
//   },
//   subText: {
//     fontFamily: 'ArialNova-Light',
//     fontSize: 18,
//     paddingVertical: 5,
//     textAlign: 'center',
//   },
//   continueButton: {
//     backgroundColor: '#004DBC',
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   continueButtonText: {
//     color: 'white',
//     fontSize: 16,
//     textAlign: 'center',
//     fontFamily: 'ArialNova-Bold',
//   },
// });
const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding:16,
      elevation: 10,
      backgroundColor: 'rgba(127,127,127,0.5)', // Adjust the opacity as needed
    },
    modalContent: {
      width: '95%',
      backgroundColor: '#fff',
      borderRadius: 6,
      flexDirection: 'column',
      overflow: 'hidden',
      padding: 20,
      alignItems: 'center',
      
    },
    iconContainer: {
        height: 80,
        width: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
    tickIcon: {
        backgroundColor: '#00A854', // Green color for confirmation
      },
      crossIcon: {
        backgroundColor: 'red',
      },
    titleText: {
      fontFamily: 'ArialNova-Bold',
      fontSize: 18,
      paddingVertical: 10,
    },
    subText: {
      fontFamily: 'ArialNova-Light',
      fontSize: 16,
      paddingVertical: 5,
      textAlign: 'center',
    },
    continueButton: {
      backgroundColor: '#004DBC',
      padding: 10,
      paddingHorizontal:20,
      borderRadius: 8,
      marginTop: 20,
    },
    continueButtonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'ArialNova-Bold',
    },
  });
  
