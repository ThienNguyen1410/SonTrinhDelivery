import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DriverHomeScreen from '../../UI/screens/driver-home/driver-home-screen';
import {DriverProfileScreen} from '../../UI/screens/profile/driver/driver-profile';

export type HomeParamList = {
  home: undefined;
  profile: undefined;
};

const Stack = createNativeStackNavigator<HomeParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={DriverHomeScreen} />
      <Stack.Screen name="profile" component={DriverProfileScreen} />
    </Stack.Navigator>
  );
};
