import React, {FC} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {APRROVED} from '@constant/order/Status';
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
import {StackScreenProps} from '@react-navigation/stack';
import {DriverOrderReadyParamList} from '@navigation/driver-navigator/order/status/ready/OrderReadyNavigator';

export const ApprovedScreen: FC<
  StackScreenProps<DriverOrderReadyParamList, 'approved'>
> = ({navigation}) => {
  const {order} = useStoreState(state => state.driverOrder);
  const {driver} = useStoreState(state => state.driver);

  const onGetOrders = () => {
    navigation.navigate('incomming');
  };

  return (
    <View style={styles.container}>
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
            {/* Google Place Input */}
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
        <View style={styles.button_container}>
          {order.status === APRROVED && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => onGetOrders()}>
              <Text style={styles.button_text}>Nhận đơn</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
};
