import React from 'react';
import { TouchableOpacity, Image, ToastAndroid, Alert, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const CopyToClipboard = ({ referralCode }) => {
  const copyToClipboard = () => {
    Clipboard.setString(
      `Sign up for Elphinstone and invest your money in the United States! Use my referral code ${referralCode} and we both will receive a $5 bonus when you fund your account with $500 or more!`
    );

    if (Platform.OS === 'android') {
      ToastAndroid.show('Text copied to clipboard', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied to clipboard', 'Text copied to clipboard');
    }
  };

  return (
    <TouchableOpacity onPress={copyToClipboard}>
      <Image source={require('../../assets/images/clipboard.png')} style={{ width: 24, height: 24, marginRight:'60%',marginBottom:8}} />
    </TouchableOpacity>
  );
};

export default CopyToClipboard;
