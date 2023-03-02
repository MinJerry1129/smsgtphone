import { Linking } from 'react-native';
import Communications from 'react-native-communications';

const sendSMS = (phoneNumber, message) => {
  Communications.text(phoneNumber, message);
};

export default sendSMS;