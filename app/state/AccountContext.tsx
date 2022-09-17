import React, { createContext, useContext, useState } from "react";
import { AccountContextType, IAccount } from "./@types/account";

export const AccountContext = createContext<AccountContextType | null>(null)

export const AccountProvider: React.FC<React.ReactNode> = ({ children }) => {

    const [account, setAccount] = useState<IAccount>({
        username: '',
        userId: '',
        birth: '',
        phone: ''
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
    return (
        <AccountContext.Provider value={{ account, updatePhoneNumber, updateUsername, updateBirth }}>
            {children}
        </AccountContext.Provider>

    )



}
