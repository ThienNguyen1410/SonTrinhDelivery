import {action, thunk} from 'easy-peasy';
import {signOut} from '../../network/FirebaseApis';
import {clear} from '../../utils/storages/storages';
import {AccountModel} from '../@types/account';
import {store} from '../store/store';

const accountStore: AccountModel = {
  isAuth: false,
  account: {
    username: '',
    userId: '',
    birth: '',
    phone: '',
    avatarUri: undefined,
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
    state.account.avatarUri = url;
  }),

  role: undefined,
  setRole: action((state, role) => {
    state.role = role;
  }),

  setAuth: action((state, auth) => {
    state.isAuth = auth;
  }),
  logout: thunk(async action => {
    await signOut();
    clear();
    action.setAuth(false);
    action.setRole('');
  }),
};

export default accountStore;
