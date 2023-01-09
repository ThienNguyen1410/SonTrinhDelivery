import {action, thunk} from 'easy-peasy';
import {AccountModel} from '../@types/account';

const accountStore: AccountModel = {
  account: {
    username: '',
    userId: '',
    birth: '',
    phone: '',
    avatarUrl: '',
  },
  setUsername: action((state, username) => {
    state.account.username = username;
  }),

  setUserId: action((state, userId) => {
    state.account.userId = userId;
  }),

  setBirth: action((state, birth) => {
    state.account.birth = birth;
  }),

  setPhone: action((state, phone) => {
    state.account.phone = phone;
  }),

  setAvartarUrl: action((state, url) => {
    state.account.avatarUrl = url;
  }),

  role: undefined,
  setRole: action((state, role) => {
    state.role = role;
  }),

  setAccount: action((state, account) => {
    state.account = account;
  }),

  accessToken: undefined,
  setAccessToken: action((state, token) => {
    state.accessToken = token;
  }),

  isAuth: false,
  setAuth: action((state, auth) => {
    state.isAuth = auth;
  }),
};

export default accountStore;
