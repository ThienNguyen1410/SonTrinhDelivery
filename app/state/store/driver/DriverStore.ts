import {action, Action, thunk, Thunk} from 'easy-peasy';
import {StoreModel} from '../store';

export interface IDriver {
  userId: string;
  generalInfo: {
    username: string;
    birth: string;
    phone: string;
    avatarUri?: string;
    vehicle: string ;
    licensePlate: string;
  };
  verificationInfo: {
    nationalID: string;
    frontNationIDCardUri?: string;
    backNationIDCardUri?: string;
    frontLicenseIDCardUri?: string;
    backLicenseIDCardUri?: string;
  };
  token: {
    deviceToken: string;
    accessToken: string;
  };
  role: string;
}

export interface DriverModel {
  driver: IDriver;
  setDriver: Action<DriverModel, IDriver>;
  setUserId: Action<DriverModel, string>;
  setUsername: Action<DriverModel, string>;
  setBirth: Action<DriverModel, string>;
  setPhone: Action<DriverModel, string>;
  setNationalID: Action<DriverModel, string>;
  setVehicle: Action<DriverModel, string>;
  setLicensePlate: Action<DriverModel, string>;
  setAvartarUrl: Action<DriverModel, string>;
  setFrontNationIDCardUri: Action<DriverModel, string>;
  setBackNationIDCardUri: Action<DriverModel, string>;
  setFrontLicenseIDCardUri: Action<DriverModel, string>;
  setBackLicenseIDCardUri: Action<DriverModel, string>;
  setAccessToken: Action<DriverModel, string>;
  setDeviceToken: Action<DriverModel, string>;
  setRole: Action<DriverModel, string>;

  isAuth: boolean;
  setAuth: Action<DriverModel, boolean>;

  resetState: Thunk<DriverModel, void, any, StoreModel, Promise<void>>;
}

export const DRIVER_INITIAL_STATE: IDriver = {
  userId: '',
  generalInfo: {
    username: '',
    birth: '',
    phone: '',
    avatarUri: undefined,
    vehicle: '',
    licensePlate: '',
  },
  verificationInfo: {
    nationalID: '',
    frontNationIDCardUri: undefined,
    backNationIDCardUri: undefined,
    frontLicenseIDCardUri: undefined,
    backLicenseIDCardUri: undefined,
  },
  token: {
    deviceToken: '',
    accessToken: '',
  },
  role: '',
};

export const driverModel: DriverModel = {
  driver: DRIVER_INITIAL_STATE,
  isAuth: false,

  setDriver: action((state, driver) => {
    state.driver = driver;
  }),
  setUsername: action((state, username) => {
    state.driver.generalInfo.username = username;
  }),

  setUserId: action((state, userId) => {
    state.driver.userId = userId;
  }),
  setBirth: action((state, date) => {
    state.driver.generalInfo.birth = date;
  }),
  setPhone: action((state, phone) => {
    state.driver.generalInfo.phone = phone;
  }),
  setRole: action((state, role) => {
    state.driver.role = role;
  }),
  setNationalID: action((state, id) => {
    state.driver.verificationInfo.nationalID = id;
  }),
  setVehicle: action((state, vehicle) => {
    state.driver.generalInfo.vehicle = vehicle;
  }),
  setLicensePlate: action((state, licensePlate) => {
    state.driver.generalInfo.licensePlate = licensePlate;
  }),
  setAvartarUrl: action((state, url) => {
    state.driver.generalInfo.avatarUri = url;
  }),
  setFrontNationIDCardUri: action((state, uri) => {
    state.driver.verificationInfo.frontNationIDCardUri = uri;
  }),
  setBackNationIDCardUri: action((state, uri) => {
    state.driver.verificationInfo.backNationIDCardUri = uri;
  }),
  setFrontLicenseIDCardUri: action((state, uri) => {
    state.driver.verificationInfo.frontLicenseIDCardUri = uri;
  }),
  setBackLicenseIDCardUri: action((state, uri) => {
    state.driver.verificationInfo.backLicenseIDCardUri = uri;
  }),
  setAuth: action((state, auth) => {
    state.isAuth = auth;
  }),
  setAccessToken: action((state, token) => {
    state.driver.token.accessToken = token;
  }),
  setDeviceToken: action((state, token) => {
    state.driver.token.deviceToken = token;
  }),

  resetState: thunk(async actions => {
    actions.setDriver(DRIVER_INITIAL_STATE);
    actions.setAuth(false);
    actions.setRole('');
  }),
};
