import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';

import { AuthStack } from './app/navigation/AuthStack';
import { BottomTab } from './app/navigation/BottomTab';
import { AccountContext, AccountProvider } from './app/state/AccountContext';
import { AccountContextType } from './app/state/@types/account';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AppStack } from './app/navigation/AppStack';
import { LocaleContextProvider } from './app/components/language/LocaleContext';
import { LogBox } from 'react-native';

const App = () => {

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  LogBox.ignoreAllLogs();


  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState)
    })

  }, [])
  return (
    <NavigationContainer>
      <LocaleContextProvider>
        <AccountProvider>
          {/* {!user ?
          (<AuthStack />) : (<AppStack />)
        } */}
          <AuthStack />
        </AccountProvider>
      </LocaleContextProvider>
    </NavigationContainer>
  );
};

export default App;
