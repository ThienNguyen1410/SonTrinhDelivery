import {Action, action, Thunk, thunk} from 'easy-peasy';
import {StoreModel} from '@store/store';

export interface IDriverOrder {
  orderId: string;
  status: string;
  from: string;
  to: string;
  driverId: string;
  driverAvatarUrl?: string;
  driverName: string;
  departureTime: string;
  arrivalTime: string;
}

export interface DriverOrderModel {
  order: IDriverOrder;
  setOrder: Action<this, IDriverOrder>;
  setOrderId: Action<this, string>;
  setStatus: Action<this, string>;
  setFrom: Action<this, string>;
  setTo: Action<this, string>;
  setDriverId: Action<this, string>;
  setDriverName: Action<this, string>;
  setDriverAvatarUrl: Action<this, string | undefined>;
  setDepartureTime: Action<this, string>;
  setArrivalTime: Action<this, string>;
  clearOrder: Thunk<this, void, any, StoreModel, Promise<void>>;
}

export const ORDER_INITAL_STATE: IDriverOrder = {
  driverId: '',
  driverAvatarUrl: undefined,
  driverName: '',
  departureTime: '',
  arrivalTime: '',
  orderId: '',
  status: '',
  from: '',
  to: '',
};

export var driverOrderModel: DriverOrderModel = {
  order: ORDER_INITAL_STATE,

  setOrder: action((state, order) => {
    state.order = order;
  }),

  setDriverId: action((state, id) => {
    state.order.driverId = id;
  }),
  setDriverName: action((state, name) => {
    state.order.driverName = name;
  }),
  setDriverAvatarUrl: action((state, url) => {
    state.order.driverAvatarUrl = url;
  }),
  setDepartureTime: action((state, departure_time) => {
    state.order.departureTime = departure_time;
  }),

  setArrivalTime: action((state, arrival_time) => {
    state.order.arrivalTime = arrival_time;
  }),
  setOrderId: action((state, id) => {
    state.order.orderId = id;
  }),
  setStatus: action((state, status) => {
    state.order.status = status;
  }),
  setFrom: action((state, from) => {
    state.order.from = from;
  }),
  setTo: action((state, to) => {
    state.order.to = to;
  }),
  clearOrder: thunk(async action => {
    action.setOrder(ORDER_INITAL_STATE);
  }),
};
