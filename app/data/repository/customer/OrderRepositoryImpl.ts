import {APRROVED, PENDING} from '@constant/order/Status';
import {OrderRepository} from '@domain/repository/customer/OrderRepository';
import {database} from '@service/firebase/database';
import {
  CustomerOrder,
  customerOrderModel,
} from '@state/store/customer/OrderStore';

export class OrderRepositoryImpl implements OrderRepository {
  async createOrder(order: CustomerOrder): Promise<boolean> {
    const orderReference = database.ref('orders/customers').push();
    let pushOrder = {...order};
    if (orderReference.key != undefined) {
      pushOrder.orderId = orderReference.key;
    }

    return orderReference
      .set(pushOrder)
      .then(() => {
        console.log("Successfully pushed customer's order");
        return true;
      })
      .catch(error => {
        console.log("Error when push customer's order", error);
        return false;
      });
  }

  async createNewOrder(order: CustomerOrder): Promise<boolean> {
    try {
      console.log('Customer Order : ', order);
      await database.ref(`orders/customers/${order.orderId}`).set({order});
      return true;
    } catch (error) {
      console.log('Error when create new customer order : ', error);
      return false;
    }
  }
  getAvaiableOrder(): Promise<CustomerOrder> {
    return new Promise((resolve, reject) => {
      database.ref('orders/customers').on('value', snapshot => {
        try {
          const availableOrders = Object.values(snapshot.val())
            .filter(
              (items: any) =>
                items.order.orderStatus.state === APRROVED ||
                items.order.orderStatus.state === PENDING,
            )
            .map((items: any) => {
              console.log('Order firebase customer order map : ', items);
              return {
                orderId: items.order.orderId,
                customerId: items.order.customerId,
                driverOrderId: items.order.driverOrderId,
                from: items.order.from,
                to: items.order.to,
                receiver: items.order.receiver,
                receiverPhone: items.order.receiverPhone,
                packageType: items.order.packageType,
                packageWeight: items.order.packageWeight,
                note: items.order.note,
                date: items.order.date,
                orderStatus: items.order.orderStatus,
                price: items.order.price,
                paymentMethod: items.order.paymentMethod,
              } as CustomerOrder;
            });

          resolve(availableOrders[0]);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  getOrderState(callback: (orders: CustomerOrder[]) => void) {
    try {
      database.ref('orders/customers/').on('value', snapshot => {
        const availableOrders = Object.values(
          snapshot.val(),
        ) as CustomerOrder[];
        console.log('Avaiable customer order in get state : ', availableOrders);
        callback(availableOrders);
      });
    } catch (error) {
      console.log('Error when get order state : ', error);
    }
  }
}
