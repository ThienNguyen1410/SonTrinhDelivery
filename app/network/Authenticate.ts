import auth from '@react-native-firebase/auth';

export const signInRequest = async (phoneNumber: string) => {
  const confirmation = await auth().signInWithPhoneNumber('+84' + phoneNumber);
  return confirmation;
};
