import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateOrderScreen} from '@screens/order/driver/create/create-order-screen';
import {ConfirmOrderScreen} from '@screens/order/driver/confirm/confirm-order-screen';

export type OrderParamList = {
  createOrder: undefined;
  confirmOrder: undefined;
};

const Stack = createNativeStackNavigator<OrderParamList>();

export const OrderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="createOrder" component={CreateOrderScreen} />
      <Stack.Screen name="confirmOrder" component={ConfirmOrderScreen} />
    </Stack.Navigator>
  );
};
