import {createStore, createTypedHooks, persist} from 'easy-peasy';
import {AccountModel} from '../@types/account';
import accountStore from '../model/account';
export interface StoreModel {
  account: AccountModel;
}

export const store = createStore<StoreModel>(
  persist({
    account: accountStore,
  }),
);

export const {useStoreActions, useStoreState} = createTypedHooks<StoreModel>();
