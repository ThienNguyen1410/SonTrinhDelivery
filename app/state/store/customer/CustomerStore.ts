import {action, thunk} from 'easy-peasy';
import {CustomerModel} from '@state/@types/account';

const CustomerStore: CustomerModel = {
  customer: {
    username: '',
    userId: '',
    birth: '',
    phone: '',
    role: '',
    avatarUri: '',
  },

  setCustomer: action((state, customer) => {
    state.customer = customer;
  }),

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
    state.customer.avatarUri = url;
  }),

  setCustomerRole: action((state, role) => {
    state.customer.role = role;
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
