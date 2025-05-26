import React from 'react';
import {Animated, Text, View} from 'react-native';
import {useStoreState} from '@state/store/store';
import {CarIcon} from '@component/icons/CustomIcons';
import {
  DriverIcon,
  LicensePlateIcon,
  PhoneIcon,
} from '@component/icons/general/InfomationIcons';
import {POIFromIcon, POIToIcon} from '@component/icons/places/PlacesIcons';
import {PendingIcon} from '@component/icons/status/StatusIcons';
import {
  ArrivalTimeIcon,
  DepartureTimeIcon,
} from '@component/icons/times/TimeIcons';
import {translate} from '@component/language';
import {styles} from './styles';

export const PendingScreen = () => {
  const {order} = useStoreState(state => state.driverOrder);
  const {driver} = useStoreState(state => state.driver);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.status_container}>
        <View style={styles.icons_container}>
          <PendingIcon />
        </View>
        <View style={styles.header_container}>
          <Text style={styles.header}>{translate('order.status.pending')}</Text>
        </View>
        <View style={styles.info_container}>
          <View style={styles.action}>
            <POIFromIcon />
            <Text style={styles.text_info}>{order.from}</Text>
          </View>
          <View style={styles.action}>
            <POIToIcon />
            <Text style={styles.text_info}>{order.to}</Text>
          </View>
          <View style={styles.action}>
            {/* Set Icon */}
            <DepartureTimeIcon />
            <Text style={styles.time_text}>{order.departureTime}</Text>
          </View>
          <View style={styles.action}>
            {/* Set Icon */}
            <ArrivalTimeIcon />
            <Text style={styles.time_text}>{order.arrivalTime}</Text>
          </View>
        </View>
        <View style={styles.driver_info}>
          <View style={styles.action}>
            {/* Custome Icons */}
            <DriverIcon />
            <Text style={styles.text_info}>{driver.generalInfo.username}</Text>
          </View>
          <View style={styles.action}>
            {/* Custome Icons */}
            <PhoneIcon />
            <Text style={styles.text_info}>{driver.generalInfo.phone}</Text>
          </View>
          <View style={styles.action}>
            {/* Custome Icons */}
            <LicensePlateIcon />
            <Text style={styles.text_info}>
              {driver.generalInfo.licensePlate}
            </Text>
          </View>
          <View style={styles.action}>
            {/* Set Icon */}
            <CarIcon />
            <Text style={styles.text_info}>{driver.generalInfo.vehicle}</Text>
          </View>
        </View>
        <View style={styles.notification}>
          <Text style={styles.notification_text}>
            {translate('notification.pendding')}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};
