import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '../UI/screens/profile/profile';
import {
  CustomerBottomTab,
  CustomerBottomTabParamList,
} from './bottomTab/CustomerBottomTab';
import {NavigatorScreenParams} from '@react-navigation/native';

import {CreateOrderScreen} from '../UI/screens/order/create-order-screen';

const Stack = createStackNavigator<AppParamList>();

export type AppParamList = {
  home: NavigatorScreenParams<CustomerBottomTabParamList>;
  profile: undefined;
  delivery: undefined;
  createOrder: undefined;
};

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={CustomerBottomTab} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="createOrder" component={CreateOrderScreen} />
    </Stack.Navigator>
  );
};
