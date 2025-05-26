import React, {useEffect} from 'react';
import {Animated, Text, View} from 'react-native';
import {useStoreActions, useStoreState} from '@store/store';
import {CarIcon} from '@component/icons/CustomIcons';
import {
  DriverIcon,
  LicensePlateIcon,
  PhoneIcon,
} from '@component/icons/general/InfomationIcons';
import {POIFromIcon, POIToIcon} from '@component/icons/places/PlacesIcons';
import {ApprovedIcon} from '@component/icons/status/StatusIcons';
import {
  ArrivalTimeIcon,
  DepartureTimeIcon,
} from '@component/icons/times/TimeIcons';
import {translate} from '@component/language';
import {styles} from './styles';
import {Screen} from '@component/screens/screen';
import {delay} from '@util/Utils';
import {InitialCustomerOrderState} from '@state/store/customer/OrderStore';

export const ApprovedScreen = () => {
  const {customerOrder} = useStoreState(state => state.customerOrder);
  const {setOrder} = useStoreActions(action => action.customerOrder);
  const delayTime = 5000; // 5 seconds

  console.log('Approved screen | CustomerOrder : ', customerOrder);
  useEffect(() => {
    delay(delayTime)
      .then(() => {
        setOrder(InitialCustomerOrderState);
        console.log('Clear customer order successful!');
      })
      .catch(error => console.log('Clear customer order error : ', error));
  }, []);

  return (
    <Screen style={styles.container} preset="scroll">
      <Animated.View style={styles.status_container}>
        <View style={styles.icons_container}>
          <ApprovedIcon />
        </View>
        <View style={styles.header_container}>
          <Text style={styles.header}>
            {translate('order.status.approved')}
          </Text>
        </View>
        <View style={styles.info_container}>
          <View style={styles.action}>
            <POIFromIcon />
            <Text style={styles.text_info}>{customerOrder.from}</Text>
          </View>
          <View style={styles.action}>
            <POIToIcon />
            <Text style={styles.text_info}>{customerOrder.to}</Text>
          </View>
          <View style={styles.action}>
            {/* Set Icon */}
            <DepartureTimeIcon />
            <Text style={styles.time_text}>{customerOrder.date}</Text>
          </View>
          <View style={styles.action}>
            {/* Set Icon */}
            <ArrivalTimeIcon />
            <Text style={styles.time_text}>{customerOrder.packageType}</Text>
          </View>
        </View>
        <View style={styles.driver_info}>
          <View style={styles.action}>
            {/* Custome Icons */}
            <DriverIcon />
            <Text style={styles.text_info}>{customerOrder.packageWeight}</Text>
          </View>
          <View style={styles.action}>
            {/* Custome Icons */}
            <PhoneIcon />
            <Text style={styles.text_info}>{customerOrder.receiver}</Text>
          </View>
          <View style={styles.action}>
            {/* Custome Icons */}
            <LicensePlateIcon />
            <Text style={styles.text_info}>{customerOrder.price}</Text>
          </View>
          <View style={styles.action}>
            {/* Set Icon */}
            <CarIcon />
            <Text style={styles.text_info}>{customerOrder.receiverPhone}</Text>
          </View>
        </View>
        <View style={styles.button_container}></View>
      </Animated.View>
    </Screen>
  );
};
