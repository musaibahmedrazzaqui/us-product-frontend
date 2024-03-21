import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ReferralBonusModal({
  show,
  closeModal,
}) {
  return (
    <Modal visible={show} transparent={true} animationType='fade'>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.line} />
          <View style={styles.content}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <AntDesign name="close" color={"#666"} size={16} />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <AntDesign name="check" color='white' size={40} />
            </View>
            <Text style={styles.title}>
              Now Elphinstone allows you to send your own referral code to family and friends, and you will both receive a $5 bonus when they fund their account!
            </Text>
            <Text style={styles.note}>
              Note: To be eligible for the referral bonus, the minimum funding amount is $500, which must remain in their account for at least 30 days.
            </Text>
            <Text style={styles.instruction}>
            Locate your referral code by visiting the 'Personal' section under Profile in the app.
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
    backgroundColor: 'rgba(127,127,127,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '95%',
    height: "65%",
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
  note: {
    fontFamily: 'ArialNova-Light',
    fontSize: 14,
    paddingBottom: 10,
    color: '#666',
  },
  instruction: {
    fontFamily: 'ArialNova-Regular',
    fontSize: 14,
    paddingBottom: 10,
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
