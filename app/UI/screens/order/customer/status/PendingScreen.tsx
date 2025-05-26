import React, {FC, useEffect} from 'react';
import {Alert, Animated, SafeAreaView, Text, View} from 'react-native';
import {useStoreActions, useStoreState} from '@state/store/store';
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
import {MomoRepositoryImpl} from '@repository/customer/payments/MomoRepoImpl';
import {OrderRepositoryImpl} from '@repository/customer/OrderRepositoryImpl';
import {CustomerOrder} from '@state/store/customer/OrderStore';
import {APRROVED} from '@constant/order/State';
import {getCurrentDate, getCurrentTime} from '@util/Utils';

export const PendingScreen = () => {
  const {customerOrder} = useStoreState(state => state.customerOrder);
  const {setOrderState, setOrderTime, setOrderDate, setPrice} = useStoreActions(
    action => action.customerOrder,
  );

  useEffect(() => {
    const momoRepo = new MomoRepositoryImpl();
    const orderRepo = new OrderRepositoryImpl();
    momoRepo
      .checkStatus(customerOrder.orderId)
      .then(data => {
        if (data.resultCode === 0) {
          const price: number = data.amount;
          const formattedPrice: string = price.toLocaleString('en-US', {
            minimumFractionDigits: 0,
          });
          const currentTime = getCurrentTime();
          const currentDate = getCurrentDate();
          setOrderState(APRROVED);
          setOrderTime(currentTime);
          setOrderDate(currentDate);
          const pushOrder: CustomerOrder = {...customerOrder};
          console.log(
            'PUSH ORDERS : ',
            JSON.stringify(pushOrder, undefined, 2),
          );
          pushOrder.orderStatus['date'] = currentDate;
          pushOrder.orderStatus['state'] = APRROVED;
          pushOrder.orderStatus['time'] = currentTime;
          pushOrder['price'] = formattedPrice;
          orderRepo
            .createNewOrder(pushOrder)
            .then(isCreateOrder => {
              if (isCreateOrder) {
                console.log(
                  'PendingScreen | Create customer order successful : ',
                  JSON.stringify(pushOrder, undefined, 2),
                );
              }
            })
            .catch(error =>
              console.log(
                'PendingScreen | Create customer order fail : ',
                error,
              ),
            );
        }
      })
      .catch(error =>
        console.log('PendingScreen | Check payment status error :  ', error),
      );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Animated.View style={styles.status_container}>
          <View style={styles.icons_container}>
            <PendingIcon />
          </View>
          <View style={styles.header_container}>
            <Text style={styles.header}>
              {translate('order.status.pending')}
            </Text>
          </View>
          <View style={styles.info_container}>
            <View style={styles.action}>
              <POIFromIcon />
              {/* Google Place Input */}
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
              <Text style={styles.text_info}>{customerOrder.receiver}</Text>
            </View>
            <View style={styles.action}>
              {/* Custome Icons */}
              <PhoneIcon />
              <Text style={styles.text_info}>
                {customerOrder.receiverPhone}
              </Text>
            </View>
            <View style={styles.action}>
              {/* Custome Icons */}
              <LicensePlateIcon />
              <Text style={styles.text_info}>
                {customerOrder.packageWeight}
              </Text>
            </View>
            <View style={styles.action}>
              {/* Set Icon */}
              <CarIcon />
              <Text style={styles.text_info}>
                {customerOrder.orderStatus.date}
              </Text>
            </View>
          </View>
          <View style={styles.notification}>
            <Text style={styles.notification_text}>
              {translate('notification.pendding')}
            </Text>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
