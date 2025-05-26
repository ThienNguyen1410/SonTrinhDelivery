import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DriverBottomTab,
  DriverBottomTabParamList,
} from './bottomTab/DriverBottomTab';
import {DriverProfileScreen} from '../UI/screens/profile/driver/driver-profile';

const Stack = createStackNavigator<DriverParamList>();

export type DriverParamList = {
  home: NavigatorScreenParams<DriverBottomTabParamList>;
  profile: undefined;
};

export const DriverStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={DriverBottomTab} />
      <Stack.Screen name="profile" component={DriverProfileScreen} />
    </Stack.Navigator>
  );
};
