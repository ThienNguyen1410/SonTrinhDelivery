import React, {createContext, useContext, useState} from 'react';
import {AccountContextType, IAccount} from './@types/account';

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined,
);

export const AccountProvider: React.FC<React.ReactNode> = ({children}) => {
  const [account, setAccount] = useState<IAccount>({
    username: '',
    userId: '',
    birth: '',
    phone: '',
    avatarUrl: '',
  });

  const updatePhoneNumber = (phone: string) => {
    account.phone = phone;
    setAccount(account);
  };
  const updateUsername = (name: string) => {
    account.username = name;
    setAccount(account);
  };

  const updateBirth = (birth: string) => {
    account.birth = birth;
    setAccount(account);
  };

  const updateUserId = (userId: string) => {
    account.userId = userId;
    setAccount(account);
  };

  return (
    <AccountContext.Provider
      value={{
        account,
        updatePhoneNumber,
        updateUsername,
        updateBirth,
        updateUserId,
      }}>
      {children}
    </AccountContext.Provider>
  );
};
