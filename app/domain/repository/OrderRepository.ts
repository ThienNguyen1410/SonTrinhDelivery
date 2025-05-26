import {AvailableDriverOrder} from '../model/AvailableDriverOrder';

export interface OrderRepository {
  getAvaiableOrders(): Promise<AvailableDriverOrder[]>;
}
