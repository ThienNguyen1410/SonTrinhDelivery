import {IDriver} from './account';

export interface IOrder {
  order_id: string;
  status: string;
  from: string;
  to: string;
}

export interface OrderModel {
  setOrderId: Action<this, string>;
  setStatus: Action<this, string>;
  setFrom: Action<this, string>;
  setTo: Action<this, string>;
}
