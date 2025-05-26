import React, {FC, useEffect, useRef, useState} from 'react';
import {BackIconBlack} from '@component/icons/CustomIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {translate} from '@component/language';
import {ListOrderItems} from '@component/list-items/ListOrderItems';
import {AvailableCustomerOrder} from '@domain/model/AvaiableCustomerOrder';
import {DriverOrderReadyParamList} from '@navigation/driver-navigator/order/status/ready/OrderReadyNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {OrderRepositoryImpl} from '@repository/OrderRepositoryImpl';
import {COLORS} from '@theme/colors';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ViewToken,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {styles} from './styles';
import {DriverReposityImpl} from '@repository/DriverReposityImpl';

const data = new Array(2).fill(0).map((_, index) => ({id: index + 1}));
console.log('DATA', data);

export const IncommingOrderScreen: FC<
  StackScreenProps<DriverOrderReadyParamList, 'incomming'>
> = ({navigation}) => {
  const [orders, setOrders] = useState<AvailableCustomerOrder[]>([]);

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const onViewableItemsChanged = ({viewableItems: vItems}) => {
    viewableItems.value = vItems;
  };
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  useEffect(() => {
    const orderRepo = new DriverReposityImpl();
    orderRepo.getCustomersAvailableOrders(orders => {
      console.log('IncommingOrderScreen | Available customer order : ', orders);
      if (orders !== undefined) {
        setOrders(orders);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <BackIconBlack action={() => navigation.goBack()} />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.black}}>
            {translate('order.ready')}
          </Text>
        </View>
      </SafeAreaView>
      {orders.length == 0 ? (
        <View style={styles.unavaible_order_container}>
          <MaterialCommunityIcons
            name="text-box-remove"
            size={40}
            style={styles.unvailable_icon}
          />
          <Text style={styles.unavaible_text}>
            {translate('order.unvailable')}
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          <FlatList
            data={orders}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            renderItem={item => {
              return (
                <ListOrderItems items={item} viewableItems={viewableItems} />
              );
            }}
          />
        </View>
      )}
    </View>
  );
};
