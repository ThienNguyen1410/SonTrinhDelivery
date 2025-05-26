import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateOrderScreen} from '@screens/order/customer/create/CreateOrderScreen';
import {ConfirmScreen} from '@screens/order/customer/confirm/ConfirmScreen';
import {OrderDetailScreen} from '@screens/order/customer/detail/OrderDetailScreen';
import HomeScreen from '@screens/order/customer/home/HomeScreen';
import {AvailableDriverOrder} from '@domain/model/AvailableDriverOrder';
import {BankInfoScreen} from '@screens/bank-info/BankInfo';
import {PendingScreen} from '@screens/order/customer/status/PendingScreen';
import {ApprovedScreen} from '@screens/order/customer/status/ApprovedScreen';

export type CustomerOrderParamList = {
  home: undefined;
  detail: {
    order: AvailableDriverOrder;
  };
  create: {
    availableOrder: AvailableDriverOrder;
  };
  confirm: undefined;
  bankInfo: undefined;
  pending: undefined;
  success: undefined;
};

const Stack = createNativeStackNavigator<CustomerOrderParamList>();

export const CustomerOrderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="detail" component={OrderDetailScreen} />
      <Stack.Screen name="create" component={CreateOrderScreen} />
      <Stack.Screen name="confirm" component={ConfirmScreen} />
      <Stack.Screen name="bankInfo" component={BankInfoScreen} />
      <Stack.Screen name="pending" component={PendingScreen} />
      <Stack.Screen name="success" component={ApprovedScreen} />
    </Stack.Navigator>
  );
};
