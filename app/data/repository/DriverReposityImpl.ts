import {APRROVED, PENDING} from '@constant/order/Status';
import {AvailableCustomerOrder} from '@domain/model/AvaiableCustomerOrder';
import {AvailableDriverOrder} from '@domain/model/AvailableDriverOrder';
import {DriverRepository} from '@domain/repository/DriverRepository';
import {database} from '@service/firebase/database';

export class DriverReposityImpl implements DriverRepository {
  getDriverGeneralInfo(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        database.ref(`drivers/${uid}/generalInfo`).on('value', snapshot => {
          resolve(snapshot.val());
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getDriverAvaibleOrder(callback: (orders: AvailableDriverOrder) => void) {
    database.ref('orders/drivers/').on('value', snapshot => {
      try {
        const availableOrders = Object.values(snapshot.val())
          .filter(
            (items: any) =>
              items.status === APRROVED || items.status === PENDING,
          )
          .map((items: any) => {
            return {
              orderId: items.orderId,
              driverId: items.driverId,
              driverName: items.driverName,
              driver_avatarUrl: items.driver_avatarUrl,
              departureTime: items.departureTime,
              arrivalTime: items.arrivalTime,
              from: items.from,
              to: items.to,
              status: items.status,
            } as AvailableDriverOrder;
          });
        callback(availableOrders[0]);
      } catch (error) {
        console.log('Error when fetching driver order : ', error);
      }
    });
  }

  getCustomersAvailableOrders(
    callback: (orders: AvailableCustomerOrder[]) => void,
  ) {
    database.ref('orders/customers/').on('value', snapshot => {
      try {
        const availableOrders = Object.values(snapshot.val())
          .filter((items: any) => items.order.orderStatus === APRROVED)
          .map((items: any) => {
            return {
              orderId: items.order.orderId,
              customerId: items.order.customerId,
              driverId: items.order.driverId,
              driverOrderId: items.order.driverOrderId,
              from: items.order.from,
              to: items.order.to,
              receiver: items.order.receiver,
              receiverPhone: items.order.receiverPhone,
              packageType: items.order.type,
              packageWeight: items.order.packageWeight,
              note: items.order.note,
              date: items.order.date,
              orderStatus: items.order.orderStatus,
              price: items.order.price,
              paymentMethod: items.order.paymentMethod,
            } as AvailableCustomerOrder;
          });
        console.log('Available Driver Order : ', availableOrders);
        callback(availableOrders);
      } catch (error) {
        console.log('Error when fetching driver order : ', error);
      }
    });
  }
}
