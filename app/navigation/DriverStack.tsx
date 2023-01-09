import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DriverHomeScreen from '../screens/driver-home/driver-home-screen';
import {BottomTabParamList} from './BottomTab';

const Stack = createStackNavigator<DriverParamList>();

export type DriverParamList = {
  home: NavigatorScreenParams<BottomTabParamList>;
};

export const DriverStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={DriverHomeScreen} />
    </Stack.Navigator>
  );
};
