import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '../screens/profile/profile';
import {BottomTab, BottomTabParamList} from './BottomTab';
import {NavigatorScreenParams} from '@react-navigation/native';
import {DeliveryScreen} from '../screens/delivery/delivery-info';
import {CreateOrderScreen} from '../screens/order/create-order-screen';

const Stack = createStackNavigator<AppParamList>();

export type AppParamList = {
  home: NavigatorScreenParams<BottomTabParamList>;
  profile: undefined;
  delivery: undefined;
  createOrder: undefined;
};

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={BottomTab} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="delivery" component={DeliveryScreen} />
      <Stack.Screen name="createOrder" component={CreateOrderScreen} />
    </Stack.Navigator>
  );
};
