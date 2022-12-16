import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const signInRequest = async (phoneNumber: string) => {
  const confirmation = await auth().signInWithPhoneNumber('+84' + phoneNumber);
  return confirmation;
};
