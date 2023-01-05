import {action, thunk} from 'easy-peasy';
import {CustomerModel} from '../../@types/account';

const CustomerStore: CustomerModel = {
  customer: {
    username: '',
    userId: '',
    birth: '',
    phone: '',
    avatarUrl: '',
  },
  setUsername: action((state, username) => {
    state.customer.username = username;
  }),

  setUserId: action((state, userId) => {
    state.customer.userId = userId;
  }),

  setBirth: action((state, birth) => {
    state.customer.birth = birth;
  }),

  setPhone: action((state, phone) => {
    state.customer.phone = phone;
  }),

  setAvartarUrl: action((state, url) => {
    state.customer.avatarUrl = url;
  }),

  setRole: action((state, role) => {
    state.role = role;
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

export default CustomerStore;
