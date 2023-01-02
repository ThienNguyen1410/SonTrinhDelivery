import {database} from '../service/firebase/database';
import {IAccount} from '../state/@types/account';
import {IDriver} from '../state/@types/driver';

export async function createCutomerAccount(customer: IAccount) {
  database.ref(`customer/${customer.userId}`).set({
    username: customer.username,
    phone: customer.phone,
    birth: customer.birth,
  });
}

export async function createDriverAccount(driver: IDriver) {
  database.ref(`driver/${driver.id}`).set({
    username: driver.name,
    phone: driver.phone,
    birth: driver.birth,
  });
}
