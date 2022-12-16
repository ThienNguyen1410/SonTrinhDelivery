import React, {createContext, useState} from 'react';
import {DriverContextType, IDriver} from './@types/driver';

export const DriverContext = createContext<DriverContextType | null>(null);

export const DriverContextProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const [driver, setDriver] = useState<IDriver>({
    name: '',
    id: '',
    birth: '',
    phone: '',
    vehicle: '',
    licensePlate: '',
    isAuth: false,
  });
  const updatePhoneNumber = (phone: string) => {
    driver.phone = phone;
    setDriver(driver);
  };
  const updateDriverName = (name: string) => {
    driver.name = name;
    setDriver(driver);
  };
  const updateDriverId = (driverId: string) => {
    driver.id = driverId;
    setDriver(driver);
  };

  const updateBirth = (birth: string) => {
    driver.birth = birth;
    setDriver(driver);
  };

  const updateVehicle = (vehicle: string) => {
    driver.vehicle = vehicle;
    setDriver(driver);
  };

  const updateLicensePlate = (licensePlate: string) => {
    driver.licensePlate = licensePlate;
    setDriver(driver);
  };

  const onAuthStateChange = (authState: boolean) => {
    driver.isAuth = authState;
    setDriver(driver);
  };
  return (
    <DriverContext.Provider
      value={{
        driver,
        updatePhoneNumber,
        updateDriverName,
        updateDriverId,
        updateBirth,
        updateVehicle,
        updateLicensePlate,
        onAuthStateChange,
      }}>
      {children}
    </DriverContext.Provider>
  );
};
