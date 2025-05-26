import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '@colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {translate} from '@component/language/translate';
import {
  BackIcon,
  CarIcon,
  LicensePlateIcon,
  PhoneIcon,
} from '@component/icons/CustomIcons';
import {useStoreActions, useStoreState} from '@store/store';
import {POIFromIcon, POIToIcon} from '@component/icons/places/PlacesIcons';
import {
  ArrivalTimeIcon,
  DepartureTimeIcon,
} from '@component/icons/times/TimeIcons';
import OrderRepositoriesImpl from '@network/apis/driver/order/OrderRepositoriesImpl';
import {IDriverOrder} from '@state/store/driver/OrderStore';
import {APRROVED, PENDING} from '@constant/order/Status';
import {OrderParamList} from '@navigation/driver-navigator/order/OrderNavigator';

export const ConfirmOrderScreen: FC<
  StackScreenProps<OrderParamList, 'confirmOrder'>
> = ({navigation}) => {
  const {setLoading} = useStoreActions(state => state.app);
  const {driver} = useStoreState(state => state.driver);
  const {order} = useStoreState(state => state.driverOrder);
  const {setOrderId, clearOrder, setStatus} = useStoreActions(
    actions => actions.driverOrder,
  );

  async function onApprove(order: IDriverOrder) {
    const orderRepositories = new OrderRepositoriesImpl();
    const newOrder = {...order};
    newOrder['status'] = PENDING;
    setStatus(PENDING);
    let orderStatus = await orderRepositories.createOrder(newOrder);
    if (!orderStatus) {
      Alert.alert(
        translate('errors.order-existed'),
        translate('common.re_check'),
        [
          {
            text: translate('common.ok'),
            onPress: () => {
              clearOrder();
              navigation.navigate('createOrder');
            },
          },
        ],
      );
    }
  }

  function onCancel() {
    clearOrder();
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <BackIcon action={() => navigation.goBack()} />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
          {translate('order.confirmOrder')}
        </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <View style={styles.location}>
            <Text
              style={[
                styles.text_sub_header,
                {
                  marginTop: 10,
                },
              ]}>
              {translate('delivery.location')}
            </Text>
            <View style={styles.action}>
              <POIFromIcon />
              {/* Google Place Input */}
              <Text style={styles.text_info}>{order.from}</Text>
            </View>
            <View style={styles.action}>
              <POIToIcon />
              <Text style={styles.text_info}>{order.to}</Text>
            </View>
          </View>
          <View style={styles.recipient}>
            <Text
              style={[
                styles.text_sub_header,
                {
                  marginTop: 10,
                },
              ]}>
              {translate('time.title')}
            </Text>
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
          <View style={styles.recipient}>
            <Text
              style={[
                styles.text_sub_header,
                {
                  marginTop: 10,
                },
              ]}>
              {translate('DeliveryScreen.title')}
            </Text>
            <View style={styles.action}>
              {/* Set Icon */}
              <CarIcon />
              <Text style={styles.text_info}>{driver.generalInfo.vehicle}</Text>
            </View>
            <View style={styles.action}>
              {/* Custome Icons */}
              <LicensePlateIcon />
              <Text style={styles.text_info}>
                {driver.generalInfo.licensePlate}
              </Text>
            </View>
            <View style={styles.action}>
              {/* Custome Icons */}
              <PhoneIcon />
              <Text style={styles.text_info}>{driver.generalInfo.phone}</Text>
            </View>
          </View>
          <View style={styles.button_container}>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => onCancel()}
                style={[
                  styles.signIn,
                  {
                    backgroundColor: COLORS.error,
                    borderColor: COLORS.error,
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}>
                <Text style={styles.textCancel}>
                  {translate('common.cancel')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => onApprove(order)}
                style={[
                  styles.signIn,
                  {
                    backgroundColor: COLORS.validIcon,
                    borderColor: COLORS.validIcon,
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}>
                <Text style={[styles.textApprove]}>
                  {translate('delivery.go')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
