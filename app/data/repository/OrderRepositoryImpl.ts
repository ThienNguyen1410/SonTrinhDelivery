import {APRROVED, COMPLETED, PENDING} from '@constant/order/Status';
import {AvailableCustomerOrder} from '@domain/model/AvaiableCustomerOrder';
import {AvailableDriverOrder} from '@domain/model/AvailableDriverOrder';
import {OrderRepository} from '@domain/repository/OrderRepository';
import {database} from '@service/firebase/database';
import {IDriverOrder} from '@state/store/driver/OrderStore';

export class OrderRepositoryImpl implements OrderRepository {
  getAvaiableOrders(): Promise<AvailableDriverOrder[]> {
    return new Promise((resolve, reject) => {
      database.ref('orders/drivers/').on('value', snapshot => {
        try {
          const availableOrders = Object.values(snapshot.val())
            .filter((items: any) => items.status === APRROVED)
            .map((items: any) => {
              return {
                orderId: items.orderId,
                driverId: items.driverId,
                driverName: items.driverName,
                driver_avatarUrl: items.driverAvatarUrl,
                departureTime: items.departureTime,
                arrivalTime: items.arrivalTime,
                from: items.from,
                to: items.to,
                status: items.status,
              } as AvailableDriverOrder;
            });

          resolve(availableOrders);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  // Convert to call back
  getAvaiableCustomerOrders(): any {
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
        return availableOrders;
      } catch (error) {
        console.log('Error when get customers order :  ', error);
      }
    });
  }

  getAvaiableOrder(): Promise<IDriverOrder> {
    return new Promise((resolve, reject) => {
      database.ref('orders/drivers/').on('value', snapshot => {
        try {
          const driverOrder = Object.values(snapshot.val());
          console.log('Drivers Order : ', driverOrder);
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
              } as IDriverOrder;
            });
          resolve(availableOrders[0]);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  getOrdersHistories(): Promise<IDriverOrder[]> {
    return new Promise((resolve, reject) => {
      database.ref('orders/drivers/').on('value', snapshot => {
        try {
          const ordersHistories = Object.values(snapshot.val())
            .filter((items: any) => items.status === COMPLETED)
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
              } as IDriverOrder;
            });
          resolve(ordersHistories);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
