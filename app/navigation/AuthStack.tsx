import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/signin/sign-in';
import { VerifyCodeScreen } from '../screens/verify-code/verify-code-screen';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { SignUpScreen } from '../screens/signup/sign-up';
import HomeScreen from '../screens/home/home-screen';
import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTab, BottomTabParamList } from './BottomTab';
import { ProfileScreen } from '../screens/profile/profile';
import { DeliveryScreen } from '../screens/delivery/delivery-info';
import { CreateOrderScreen } from '../screens/order/create-order-screen';
import { DriverSignUpScreen } from '../screens/signup/driver/driver-sign-up';

const Stack = createNativeStackNavigator<AuthParamList>();

export type AuthParamList = {
  signup: undefined;
  signin: undefined;
  verifycode: { confirmation?: FirebaseAuthTypes.ConfirmationResult };
  home: NavigatorScreenParams<BottomTabParamList>;
  profile: undefined;
  delivery: undefined;
  createOrder: undefined;
  driverSignUp: undefined;
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
      <Stack.Screen name="home" component={BottomTab} />
      <Stack.Screen name='profile' component={ProfileScreen} />
      <Stack.Screen name='delivery' component={DeliveryScreen} />
      <Stack.Screen name='createOrder' component={CreateOrderScreen} />
      <Stack.Screen name='driverSignUp' component={DriverSignUpScreen} />
    </Stack.Navigator>
  );
};
