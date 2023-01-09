import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {useStoreState} from '../state/store/store';
import {CustomerStack} from './CustomerStack';
import {CUSTOMER} from '../constant/Account';
import {DriverStack} from './DriverStack';

export const AppNavigator = () => {
  const {isAuth, role} = useStoreState(state => state.account);
  return (
    <NavigationContainer>
      {!isAuth ? (
        <AuthStack />
      ) : role == CUSTOMER && role != undefined ? (
        <CustomerStack />
      ) : (
        <DriverStack />
      )}
    </NavigationContainer>
  );
};
