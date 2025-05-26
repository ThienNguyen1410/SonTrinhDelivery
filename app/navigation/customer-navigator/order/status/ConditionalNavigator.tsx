import React, {useEffect} from 'react';
import {useStoreActions, useStoreState} from '@store/store';
import {InitialCustomerOrderState} from '@state/store/customer/OrderStore';
import {OrderRepositoryImpl} from '@repository/customer/OrderRepositoryImpl';
import {ApprovedNavigator, PendingNavigator} from './StatusNavigator';
import {CustomerOrderNavigator} from '../CustomerOrderNavigator';
import {PENDING} from '@constant/order/Status';
import {APRROVED} from '@constant/order/State';

export const ConditionalNavigator: React.FC = () => {
  const {customerOrder} = useStoreState(state => state.customerOrder);
  const {setOrder} = useStoreActions(actions => actions.customerOrder);

  useEffect(() => {
    const orderRepo = new OrderRepositoryImpl();
    orderRepo.getAvaiableOrder().then(availableOrder => {
      if (availableOrder != undefined) {
        setOrder(availableOrder);
      }
    });
  }, []);

  if (customerOrder.orderStatus !== undefined) {
    console.log('customerOrder : ', customerOrder.orderStatus);
    switch (customerOrder.orderStatus.state) {
      case PENDING:
        return <PendingNavigator />;
      case APRROVED:
        return <ApprovedNavigator />;
    }
  }
  // Fallback component when order status doesn't match any case
  return <CustomerOrderNavigator />;
};
