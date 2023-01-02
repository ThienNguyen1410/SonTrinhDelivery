import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/signin/sign-in';
import {VerifyCodeScreen} from '../screens/verify-code/verify-code-screen';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SignUpScreen} from '../screens/signup/sign-up';

const Stack = createNativeStackNavigator<AuthParamList>();

export type AuthParamList = {
  signup: undefined;
  signin: undefined;
  verifycode: {
    role: string;
    confirmation?: FirebaseAuthTypes.ConfirmationResult;
  };
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
    </Stack.Navigator>
  );
};
