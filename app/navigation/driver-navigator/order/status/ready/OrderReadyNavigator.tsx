import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ApprovedScreen} from '@screens/order/driver/status/ApprovedScreen';
import {IncommingOrderScreen} from '@screens/order/driver/incomming/IncommingOrder';

const Stack = createStackNavigator<DriverOrderReadyParamList>();

export type DriverOrderReadyParamList = {
  approved: undefined;
  incomming: undefined;
};

export const OrderReadyNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="approved" component={ApprovedScreen} />
      <Stack.Screen name="incomming" component={IncommingOrderScreen} />
    </Stack.Navigator>
  );
};
