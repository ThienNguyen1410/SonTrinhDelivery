import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useStoreState} from '../state/store/store';

export const AppNavigator = () => {
  const {isAuth} = useStoreState(state => state.account);
  return (
    <NavigationContainer>
      {!isAuth ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};
