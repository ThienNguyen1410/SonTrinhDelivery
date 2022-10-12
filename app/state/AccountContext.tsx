import React, { createContext, useContext, useState } from "react";
import { AccountContextType, IAccount } from "./@types/account";

export const AccountContext = createContext<AccountContextType | null>(null)

export const AccountProvider: React.FC<React.ReactNode> = ({ children }) => {

    const [account, setAccount] = useState<IAccount>({
        username: '',
        userId: '',
        birth: '',
        phone: '',
        isAuth: false,

    })

    const updatePhoneNumber = (phone: string) => {
        account.phone = phone
        setAccount(account)
    }
    const updateUsername = (name: string) => {
        account.username = name
        setAccount(account)
    }

    const updateBirth = (birth: string) => {
        account.birth = birth
        setAccount(account)
    }

    const updateUserId = (userId: string) => {
        account.userId = userId
        setAccount(account)
    }
    const onAuthStateChange = (authState: boolean) => {
        account.isAuth = authState
        setAccount(account)

    }

    return (
        <AccountContext.Provider value={{ account, updatePhoneNumber, updateUsername, updateBirth, updateUserId, onAuthStateChange }}>
            {children}
        </AccountContext.Provider>

    )



}
