import {createStore, createTypedHooks, persist} from 'easy-peasy';
import {AccountModel, CustomerModel} from '../@types/account';
import {AppModel} from '../@types/app';
import accountStore from '../model/account';
import {AppStore} from '../model/app';
import CustomerStore from './customer/CustomerStore';
export interface StoreModel {
  app: AppModel;
  account: AccountModel;
  customer: CustomerModel;
}

export const store = createStore<StoreModel>(
  persist({
    app: AppStore,
    account: accountStore,
    customer: CustomerStore,
  }),
);

export const {useStoreActions, useStoreState} = createTypedHooks<StoreModel>();
