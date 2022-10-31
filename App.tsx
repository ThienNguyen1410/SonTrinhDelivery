import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';

import { AuthStack } from './app/navigation/AuthStack';
import { BottomTab } from './app/navigation/BottomTab';
import { AccountContext, AccountProvider } from './app/state/AccountContext';
import { AccountContextType } from './app/state/@types/account';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AppStack } from './app/navigation/AppStack';
import { LocaleContextProvider } from './app/components/language/LocaleContext';

const App = () => {

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

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
