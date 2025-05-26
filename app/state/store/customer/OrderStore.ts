import {EMPTY} from '@constant/order/State';
import {OrderState} from '@domain/model/customer/order/State';
import {action, Action} from 'easy-peasy';

export interface CustomerOrder {
  orderId: string;
  customerId: string;
  driverId: string;
  driverOrderId: string;
  from: string;
  to: string;
  sender: string;
  receiver: string;
  receiverPhone: string;
  packageType: string;
  packageWeight: string;
  note?: string;
  date: string;
  orderStatus: OrderState;
  price?: string;
  paymentMethod?: string;
}
export const InitialCustomerOrderState: CustomerOrder = {
  orderId: '',
  customerId: '',
  driverId: '',
  driverOrderId: '',
  from: '',
  to: '',
  sender: '',
  receiver: '',
  receiverPhone: '',
  packageType: '',
  packageWeight: '',
  orderStatus: {
    state: EMPTY,
    date: '',
    time: '',
  },
  note: undefined,
  date: '',
};

export interface CustomerOrderModel {
  customerOrder: CustomerOrder;
  setOrder: Action<this, CustomerOrder>;
  setOrderId: Action<this, string>;
  setCustomerId: Action<this, string>;
  setDriverId: Action<this, string>;
  setDriverOrderId: Action<this, string>;
  setFrom: Action<this, string>;
  setTo: Action<this, string>;
  setSender: Action<this, string>;
  setReceiver: Action<this, string>;
  setReceiverPhone: Action<this, string>;
  setPackageType: Action<this, string>;
  setPackageWeight: Action<this, string>;
  setNote: Action<this, string>;
  setDate: Action<this, string>;
  setOrderState: Action<this, string>;
  setOrderTime: Action<this, string>;
  setOrderDate: Action<this, string>;
  setPrice: Action<this, string>;
  setPaymentMethod: Action<this, string>;
}

export const customerOrderModel: CustomerOrderModel = {
  customerOrder: InitialCustomerOrderState,
  setOrder: action((state, order) => {
    state.customerOrder = order;
  }),
  setOrderId: action((state, id) => {
    state.customerOrder.orderId = id;
  }),
  setCustomerId: action((state, id) => {
    state.customerOrder.customerId = id;
  }),

  setDriverId: action((state, id) => {
    state.customerOrder.driverId = id;
  }),

  setDriverOrderId: action((state, id) => {
    state.customerOrder.driverOrderId = id;
  }),

  setFrom: action((state, from) => {
    state.customerOrder.from = from;
  }),
  setTo: action((state, to) => {
    state.customerOrder.to = to;
  }),

  setSender: action((state, sender) => {
    state.customerOrder.sender = sender;
  }),

  setReceiver: action((state, receiver) => {
    state.customerOrder.receiver = receiver;
  }),

  setReceiverPhone: action((state, phone) => {
    state.customerOrder.receiverPhone = phone;
  }),
  setPackageType: action((state, type) => {
    state.customerOrder.packageType = type;
  }),
  setPackageWeight: action((state, weight) => {
    state.customerOrder.packageWeight = weight;
  }),
  setNote: action((state, note) => {
    state.customerOrder.note = note;
  }),
  setDate: action((state, date) => {
    state.customerOrder.date = date;
  }),
  setOrderState: action((state, orderState) => {
    state.customerOrder.orderStatus.state = orderState;
  }),
  setOrderTime: action((state, time) => {
    state.customerOrder.orderStatus.time = time;
  }),

  setOrderDate: action((state, date) => {
    state.customerOrder.orderStatus.date = date;
  }),

  setPrice: action((state, price) => {
    state.customerOrder.price = price;
  }),
  setPaymentMethod: action((state, paymentMethod) => {
    state.customerOrder.paymentMethod = paymentMethod;
  }),
};
