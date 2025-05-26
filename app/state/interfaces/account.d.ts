import {Action, Actions, Thunk} from 'easy-peasy';

export interface IAccount {
  username: string;
  userId: string;
  birth: string;
  phone: string;
  avatarUri?: string;
}

export interface ICustomer extends IAccount {
  role: string;
}

export const CUSTOMER_INITAL_STATE: ICustomer = {
  username: '',
  userId: '',
  birth: '',
  phone: '',
  role: '',
  avatarUri: '',
};

export interface AccountModel {
  account: IAccount;
  setUsername: Action<this, string>;
  setUserId: Action<this, string>;
  setBirth: Action<this, string>;
  setPhone: Action<this, string>;
  setAvartarUrl: Action<this, string | undefined>;

  role?: string;
  setRole: Action<this, string>;

  isAuth: boolean;
  setAuth: Action<this, boolean>;

  logout: Thunk<this>;
}

export interface CustomerModel {
  isAuth: boolean;
  customer: ICustomer;
  setUsername: Action<this, string>;
  setUserId: Action<this, string>;
  setBirth: Action<this, string>;
  setPhone: Action<this, string>;
  setAvartarUrl: Action<this, string | undefined>;
  accessToken?: string;
  setCustomer: Action<this, ICustomer>;
  setCustomerRole: Action<this, string>;
  setAccessToken: Action<this, string | undefined>;
  setAuth: Action<this, boolean>;
}
