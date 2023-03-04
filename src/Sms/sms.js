import { Linking } from 'react-native';
import Communications from 'react-native-communications';
import SendSMS from 'react-native-sms'
import SmsAndroid from 'react-native-get-sms-android';

const sendSMS = (phoneNumber, message) => {
    SmsAndroid.autoSend(
      phoneNumber,
      message,
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (success) => {
        console.log('SMS sent successfully');
      },
    );
};

export default sendSMS;