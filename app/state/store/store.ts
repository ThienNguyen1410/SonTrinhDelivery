import {createStore, createTypedHooks, persist} from 'easy-peasy';
import {AccountModel, CustomerModel} from '../@types/account';
import accountStore from '../model/account';
import CustomerStore from './customer/CustomerStore';
export interface StoreModel {
  account: AccountModel;
  customer: CustomerModel;
}

export const store = createStore<StoreModel>(
  persist({
    account: accountStore,
    customer: CustomerStore,
  }),
);

export const {useStoreActions, useStoreState} = createTypedHooks<StoreModel>();
