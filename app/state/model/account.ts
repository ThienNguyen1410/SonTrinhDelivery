import {action, thunk} from 'easy-peasy';
import {AccountModel} from '../@types/account';

const accountStore: AccountModel = {
  account: undefined,
  setAccount: action((state, account) => {
    state.account = account;
  }),

  accessToken: undefined,
  setAccessToken: action((state, token) => {
    state.accessToken = token;
  }),

  role: undefined,
  setRole: action((state, role) => {
    state.role = role;
  }),

  isAuth: false,
  setAuth: action((state, auth) => {
    state.isAuth = auth;
  }),
};

export default accountStore;
