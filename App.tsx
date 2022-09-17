import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AuthStack } from './app/navigation/AuthStack';
import { AccountContext, AccountProvider } from './app/state/AccountContext';
const App = () => {
  return (
    <NavigationContainer>
      <AccountProvider>
        <AuthStack />
      </AccountProvider>
    </NavigationContainer>
  );
};

export default App;
