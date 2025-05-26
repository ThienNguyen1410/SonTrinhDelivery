import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@screens/home/home-screen';
import {ProfileScreen} from '@screens/profile/profile';
import {CustomerOrderStep} from '@screens/order/customer/stepper/Step';
import {AvailableCustomerOrder} from '@domain/model/AvaiableCustomerOrder';
import {CustomerOrder} from '@state/store/customer/OrderStore';

export type HomeParamList = {
  home: undefined;
  orderSteps: {
    item: CustomerOrder;
  };
  profile: undefined;
};

const Stack = createNativeStackNavigator<HomeParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="orderSteps" component={CustomerOrderStep} />
      <Stack.Screen name="profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
