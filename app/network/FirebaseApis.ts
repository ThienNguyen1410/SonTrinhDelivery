import {database} from '../service/firebase/database';
import auth from '@react-native-firebase/auth';
import {ICustomer, IDriver} from '../state/@types/account';
import storage from '@react-native-firebase/storage';
import {CUSTOMER} from '../constant/Account';

export async function createCustomerAccount(customer: ICustomer) {
  try {
    customer['role'] = CUSTOMER;
    database.ref(`customers/${customer.userId}`).set({
      customer,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function driverRegisterRequest(driver: IDriver) {
  try {
    await database.ref(`registers/drivers/${driver.userId}`).set(driver);
  } catch (error) {
    console.error(error);
  }
}

export function getCustomerInfo(uid: string) {
  return database.ref('customers').child(uid).once('value');
}
export function getDriverInfo(uid: string) {
  return database.ref('drivers').child(uid).once('value');
}

export async function updateNationalIdFrontCard(uid: string, uri?: string) {
  try {
    if (uri != undefined) {
      await storage().ref(`drivers/${uid}/national-id/front-card`).putFile(uri);
    }
  } catch (err) {
    console.log(err);
  }
}
export async function updateNationalIdBackCard(uid: string, uri?: string) {
  try {
    if (uri != undefined) {
      await storage().ref(`drivers/${uid}/national-id/back-card`).putFile(uri);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function updateLicenseFrontCard(uid: string, uri?: string) {
  try {
    if (uri != undefined) {
      await storage().ref(`drivers/${uid}/license/front-card`).putFile(uri);
    }
  } catch (err) {
    console.log(err);
  }
}
export async function updateLicenseBackCard(uid: string, uri?: string) {
  try {
    if (uri != undefined) {
      await storage().ref(`drivers/${uid}/license/back-card`).putFile(uri);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function updateDriverImage(uid: string, uri?: string) {
  try {
    if (uri != undefined) {
      await storage().ref(`drivers/${uid}/avatar`).putFile(uri);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getDriverAvatarUrl(uid: string) {
  try {
    return await storage().ref(`drivers/${uid}/avatar`).getDownloadURL();
  } catch (error) {
    console.log(error);
  }
}

export async function getNationalIdFrontCardUrl(uid: string) {
  try {
    return await storage()
      .ref(`drivers/${uid}/national-id/front-card`)
      .getDownloadURL();
  } catch (error) {
    console.log(error);
  }
}

export async function getNationalIdBackCardUrl(uid: string) {
  try {
    return await storage()
      .ref(`drivers/${uid}/national-id/back-card`)
      .getDownloadURL();
  } catch (error) {
    console.log(error);
  }
}

export async function getLicenseFrontCardUrl(uid: string) {
  try {
    return await storage()
      .ref(`drivers/${uid}/license/front-card`)
      .getDownloadURL();
  } catch (error) {
    console.log(error);
  }
}

export async function getLicenseBackCardUrl(uid: string) {
  try {
    return await storage()
      .ref(`drivers/${uid}/license/back-card`)
      .getDownloadURL();
  } catch (error) {
    console.log(error);
  }
}

export function signOut() {
  return auth().signOut();
}

export function testApi() {
  try {
    database.ref('orders/customers').on('value', snapshot => {
      console.log('Read orders/customer/ in firebase', snapshot.val());
    });
  } catch (error) {
    console.log('Read firebase orders/customers fail ', error);
  }
}
