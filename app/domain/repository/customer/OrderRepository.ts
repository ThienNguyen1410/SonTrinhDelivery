import {CustomerOrder} from '@state/store/customer/OrderStore';

export interface OrderRepository {
  createOrder(order: CustomerOrder): Promise<boolean>;
}
