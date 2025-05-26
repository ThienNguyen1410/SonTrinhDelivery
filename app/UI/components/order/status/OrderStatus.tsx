import React from 'react';
import {CarIcon} from '@component/icons/CustomIcons';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {translate} from '@component/language';

interface OrderProps {
  /**
   * @param {string}
   * OrderID of customer
   * */
  orderId: string;
  /**
   * @param {string}
   * Status of customer's order
   * Example : Pending, Approved...
   * * */
  status: string;
}

export const OrderStatus = (props: OrderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon_container}>
        <CarIcon />
      </View>
      <View style={styles.info_container}>
        <Text style={styles.info_text}>
          {translate('delivery.order')} : {props.orderId}
        </Text>
        <Text style={styles.info_text}>
          {translate('delivery.status')} : {translate(`common.${props.status}`)}
        </Text>
      </View>
    </View>
  );
};
