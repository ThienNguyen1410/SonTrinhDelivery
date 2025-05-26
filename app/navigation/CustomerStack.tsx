import React from 'react';
import {
  CustomerBottomTab,
  CustomerBottomTabParamList,
} from './bottomTab/CustomerBottomTab';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CustomBottomTab} from './bottomTab/CustomBottomTab';
import {ProfileScreen} from '@screens/profile/profile';

const Stack = createStackNavigator<CustomerParamlist>();

export type CustomerParamlist = {
  home: NavigatorScreenParams<CustomerBottomTabParamList>;
  profile: undefined;
  delivery: undefined;
};

export const CustomerStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={CustomBottomTab} />
      <Stack.Screen name="profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
