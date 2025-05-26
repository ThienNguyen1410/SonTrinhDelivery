export interface IDriver {
  userId: string;
  generalInfo: {
    username: string;
    birth: string;
    phone: string;
    avatarUri?: string;
    vehicle: string;
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
  isAuth: boolean;

  setDriver: Action<DriverModel, IDriver>;
  setUsername: Action<DriverModel, string>;
  setUserId: Action<DriverModel, string>;
  setBirth: Action<DriverModel, string>;
  setPhone: Action<DriverModel, string>;
  setRole: Action<DriverModel, string>;
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
  setAuth: Action<DriverModel, boolean>;

  resetState: Thunk<DriverModel, void, any, StoreModel, Promise<void>>;
}
