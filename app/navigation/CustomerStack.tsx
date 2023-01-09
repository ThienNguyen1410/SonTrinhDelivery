import React from 'react';
import {BottomTab, BottomTabParamList} from './BottomTab';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home/home-screen';
import {ProfileScreen} from '../screens/profile/profile';
import {DeliveryScreen} from '../screens/delivery/delivery-info';
import {CreateOrderScreen} from '../screens/order/create-order-screen';

const Stack = createStackNavigator<CustomerParamlist>();

export type CustomerParamlist = {
  home: NavigatorScreenParams<BottomTabParamList>;
  profile: undefined;
  delivery: undefined;
  createOrder: undefined;
};

export const CustomerStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={BottomTab} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="delivery" component={DeliveryScreen} />
      <Stack.Screen name="createOrder" component={CreateOrderScreen} />
    </Stack.Navigator>
  );
};
