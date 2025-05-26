import {createStore, createTypedHooks, persist} from 'easy-peasy';
import {AccountModel, CustomerModel} from '../@types/account';
import {AppModel} from '@state/@types/app';
import accountStore from '@state/model/account';
import {AppStore} from '@state/model/app';
import CustomerStore from './customer/CustomerStore';
import {customerOrderModel, CustomerOrderModel} from './customer/OrderStore';
import {DriverModel, driverModel} from './driver/DriverStore';
import {DriverOrderModel, driverOrderModel} from './driver/OrderStore';

export interface StoreModel {
  app: AppModel;
  account: AccountModel;
  customer: CustomerModel;
  driver: DriverModel;
  driverOrder: DriverOrderModel;
  customerOrder: CustomerOrderModel;
}

export const store = createStore<StoreModel>({
  app: AppStore,
  account: accountStore,
  customer: CustomerStore,
  driver: driverModel,
  driverOrder: driverOrderModel,
  customerOrder: customerOrderModel,
});

export const {useStoreActions, useStoreState} = createTypedHooks<StoreModel>();
