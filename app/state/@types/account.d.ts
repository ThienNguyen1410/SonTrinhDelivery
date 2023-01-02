import {Action, Actions, Thunk} from 'easy-peasy';

export interface IAccount {
  username: string;
  userId: string;
  birth: string;
  phone: string;
  avatarUrl?: string;
}

export interface AccountModel {
  account?: IAccount;
  setAccount: Action<this, IAccount>;
  accessToken?: string;
  setAccessToken: Action<this, string | undefined>;
  role?: string;
  setRole: Action<this, string | undefined>;
  isAuth: boolean;
  setAuth: Action<this, boolean>;
}

export type AccountContextType = {
  account: IAccount;
  updatePhoneNumber: (phone: string) => void;
  updateUsername: (name: string) => void;
  updateBirth: (birth: string) => void;
  updateUserId: (userId: string) => void;
};
