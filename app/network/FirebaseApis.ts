import {database} from '../service/firebase/database';
import {IAccount} from '../state/@types/account';

export async function createCustomerAccount(customer: IAccount) {
  console.log(customer);
  database.ref(`${customer.userId}`).set({
    username: customer.username,
    phone: customer.phone,
    birth: customer.birth,
    role: 'customer',
  });
}

export async function createDriverAccount(driver: IAccount) {
  database.ref(`${driver.userId}`).set({
    username: driver.username,
    phone: driver.phone,
    birth: driver.birth,
    role: 'driver',
  });
}
