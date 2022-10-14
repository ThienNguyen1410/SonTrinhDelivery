import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';

import { AuthStack } from './app/navigation/AuthStack';
import { AppStack } from './app/navigation/AppStack';
import { AccountContext, AccountProvider } from './app/state/AccountContext';
import { AccountContextType } from './app/state/@types/account';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const App = () => {
  const isAuth: boolean = false
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState)
      console.log("User State : ", userState)
    })

  }, [])
  return (
    <NavigationContainer>
      <AccountProvider>
        {!user ?
          (<AuthStack />) : (<AppStack />)
        }
      </AccountProvider>
    </NavigationContainer>
  );
};

export default App;
