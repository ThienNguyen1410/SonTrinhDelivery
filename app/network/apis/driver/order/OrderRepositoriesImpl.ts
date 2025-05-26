import {database} from '@service/firebase/database';
import {IDriverOrder} from '@state/store/driver/OrderStore';

export default class OrderRepositoriesImpl {
  async registerOrderRef(order: IDriverOrder): Promise<string | undefined> {
    try {
      if (order.orderId === '') {
        let orderId = database.ref(`orders/drivers`).push({order}).key;
        if (orderId != null) {
          return orderId;
        }
      } else {
        return order.orderId;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async updateOrder(order: IDriverOrder): Promise<boolean> {
    try {
      await database.ref(`orders/drivers/${order.orderId}`).update({order});
      return true; // Return true if successful
    } catch (e) {
      console.log(e);
      return false; // Return false if an error occurred
    }
  }

  async updateOrderStatus(
    order: IDriverOrder,
    newStatus: string,
  ): Promise<boolean> {
    try {
      await database
        .ref(`orders/drivers/${order.orderId}`)
        .update({status: newStatus});
      return true; // Return true if successful
    } catch (e) {
      console.log(e);
      return false; // Return false if an error occurred
    }
  }

  createOrder(order: IDriverOrder): Promise<boolean> {
    const orderReference = database.ref('orders/drivers').push();
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

  async getOrderStatus(order: IDriverOrder) {
    try {
      const orderSnapshot = await database.ref(`orders/drivers`).once('value');
      const orderValue = orderSnapshot.val();
      return orderValue.status;
    } catch (e) {
      console.log(e);
    }
  }

  orderRef(order: IDriverOrder) {
    return database.ref(`orders/${order.orderId}`);
  }

  ordersRef() {
    return database.ref('orders/drivers/');
  }
}
