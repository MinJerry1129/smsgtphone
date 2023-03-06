import { ToastAndroid,Alert} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

const sendSMS = (phoneNumber, message) => {
    SmsAndroid.autoSend(
      phoneNumber,
      message,
      (fail) => {
        Alert.alert('Error', fail.toString(), [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

        ToastAndroid.show('e::'+ fail.toString() ,ToastAndroid.SHORT);
        console.log('Failed with this error: ' + fail);
      },
      (success) => {
        ToastAndroid.show('SMS sent successfully',ToastAndroid.SHORT);
        console.log('SMS sent successfully');
      },
    );
};

export default sendSMS;