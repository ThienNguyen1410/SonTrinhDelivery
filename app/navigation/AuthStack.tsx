import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '@screens/signin/sign-in';
import {VerifyCodeScreen} from '@screens/verify-code/verify-code-screen';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SignUpScreen} from '@screens/signup/sign-up';
import {DriverSignUpScreen} from '@screens/signup/driver/driver-sign-up';
import {DriverVerifyCodeScreen} from '@screens/verify-code/driver/driver-verify-code-screen';
import {NationalIdIdentifierScreen} from '@screens/signup/driver/nationalid-identifier/nationalid-identifier';
import {LicenseIdIdentifierScreen} from '@screens/signup/driver/license/lincense';
import {FaceRecognitionScreen} from '@screens/signup/driver/face-recognition/face-recognition';

const Stack = createNativeStackNavigator<AuthParamList>();

export type AuthParamList = {
  signup: undefined;
  signin: undefined;
  verifycode: {
    confirmation?: FirebaseAuthTypes.ConfirmationResult;
  };
  driverSignUp: undefined;
  nationalIdIdentifier: undefined;
  licenseIdentifier: undefined;
  faceRecognition: undefined;
  driverVerifyCode: undefined;
};

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="signin">
      <Stack.Screen name="signin" component={SignInScreen} />
      <Stack.Screen name="verifycode" component={VerifyCodeScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="driverSignUp" component={DriverSignUpScreen} />
      <Stack.Screen
        name="nationalIdIdentifier"
        component={NationalIdIdentifierScreen}
      />
      <Stack.Screen
        name="licenseIdentifier"
        component={LicenseIdIdentifierScreen}
      />
      <Stack.Screen name="faceRecognition" component={FaceRecognitionScreen} />
      <Stack.Screen
        name="driverVerifyCode"
        component={DriverVerifyCodeScreen}
      />
    </Stack.Navigator>
  );
};
