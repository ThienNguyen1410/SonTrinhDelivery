import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AuthStack } from './app/navigation/AuthStack';
import { AppStack } from './app/navigation/AppStack';
import { AccountContext, AccountProvider } from './app/state/AccountContext';

const App = () => {
  const isAuth: boolean = false
  return (
    <NavigationContainer>
      <AccountProvider>
        {isAuth ? (
          <AppStack />) : (<AuthStack />)
        }
      </AccountProvider>
    </NavigationContainer>
  );
};

export default App;
