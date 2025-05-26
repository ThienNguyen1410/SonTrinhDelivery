import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {useStoreActions, useStoreState} from '@store/store';
import {CUSTOMER, DRIVER} from '@constant/Account';
import {loadString} from '@util/storages/storages';
import {getCustomerInfo, getDriverInfo} from '../network/FirebaseApis';
import {useTranslation} from '@component/language';
import {DriverBottomTab} from './bottomTab/DriverBottomTab';
import {CustomerBottomTab} from './bottomTab/CustomerBottomTab';

export const AppNavigator = () => {
  const {locale} = useTranslation();
  const {isAuth, role} = useStoreState(state => state.account);
  const {setLoading} = useStoreActions(action => action.app);
  const {setRole, setAuth} = useStoreActions(acction => acction.account);
  const {setCustomer} = useStoreActions(action => action.customer);
  const {setDriver} = useStoreActions(action => action.driver);

  function updateUserInfo() {
    loadString('uid')
      ?.then(uid => {
        if (uid != null) {
          getCustomerInfo(uid).then(snapshot => {
            if (snapshot.val() != null) {
              setRole(CUSTOMER);
              setAuth(true);
              setCustomer(snapshot.val().customer);
            }
          });
          getDriverInfo(uid).then(snapshot => {
            if (snapshot.val() != null) {
              setRole(DRIVER);
              setAuth(true);
              setDriver(snapshot.val());
            }
          });
        }
      })
      .catch(error => console.log('Error at AppNavigator', error));
  }

  useEffect(() => {
    updateUserInfo();
  });

  return (
    <NavigationContainer>
      {!isAuth ? (
        <AuthStack />
      ) : role == CUSTOMER && role != undefined ? (
        <CustomerBottomTab />
      ) : (
        <DriverBottomTab />
      )}
    </NavigationContainer>
  );
};
