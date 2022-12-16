export interface IDriver {
  name: string;
  id: string;
  birth: string;
  phone: string;
  vehicle: string;
  licensePlate: string;
  isAuth: boolean;
}

export type DriverContextType = {
  driver: IDriver;
  updatePhoneNumber: (phone: string) => void;
  updateDriverName: (name: string) => void;
  updateDriverId: (id: string) => void;
  updateBirth: (birth: string) => void;
  updateVehicle: (vehicle: strign) => void;
  updateLicensePlate: (licensePlate: string) => void;
  onAuthStateChange: (authState: boolean) => void;
};
