import React, {useEffect} from 'react';
import {APRROVED, PENDING} from '@constant/order/Status';
import {useStoreActions, useStoreState} from '@store/store';
import {OrderNavigator} from '../OrderNavigator';
import {PendingNavigator} from './StatusNavigator';
import {OrderRepositoryImpl} from '@repository/OrderRepositoryImpl';
import {ORDER_INITAL_STATE} from '@state/store/driver/OrderStore';
import {OrderReadyNavigator} from './ready/OrderReadyNavigator';
import {DriverReposityImpl} from '@repository/DriverReposityImpl';
import {database} from '@service/firebase/database';

export const ConditionalNavigator: React.FC = () => {
  const {order} = useStoreState(state => state.driverOrder);
  const {setOrder} = useStoreActions(actions => actions.driverOrder);

  useEffect(() => {
    console.log('Driver | ConditionalNavigator');
    const driverRepo = new DriverReposityImpl();
    driverRepo.getDriverAvaibleOrder(availableOrder => {
      if (availableOrder != undefined) {
        setOrder(availableOrder);
        console.log('Driver AvailableDriverOrder ', availableOrder);
      } else {
        setOrder(ORDER_INITAL_STATE);
      }
    });
  }, []);

  if (order !== undefined) {
    switch (order.status) {
      case PENDING:
        return <PendingNavigator />;
      case APRROVED:
        return <OrderReadyNavigator />;
    }
  }
  // Fallback component when order status doesn't match any case
  return <OrderNavigator />;
};
