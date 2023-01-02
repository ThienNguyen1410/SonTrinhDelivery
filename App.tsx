import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {AuthStack} from './app/navigation/AuthStack';
import {AccountProvider} from './app/state/AccountContext';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {LocaleContextProvider} from './app/components/language/LocaleContext';
import {LogBox, ViewStyle} from 'react-native';
import {DriverContextProvider} from './app/state/DriverContext';
import {StoreProvider} from 'easy-peasy';
import {store} from './app/state/store/store';
import {AppStack} from './app/navigation/AppStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppNavigator} from './app/navigation/AppNavigator';

const App = () => {
  LogBox.ignoreAllLogs();
  Feather.loadFont().then;
  MaterialCommunityIcons.loadFont().then;
  const ROOT: ViewStyle = {
    flex: 1,
  };

  return (
    <GestureHandlerRootView style={ROOT}>
      <StoreProvider store={store}>
        <LocaleContextProvider>
          <AppNavigator />
        </LocaleContextProvider>
      </StoreProvider>
    </GestureHandlerRootView>
  );
};

export default App;
