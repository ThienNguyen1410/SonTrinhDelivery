import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '@colors';
import {HomeNavigator} from '../driver-navigator/HomeNavigator';
import {useStoreActions, useStoreState} from '@store/store';
import OrderRepositoriesImpl from '@network/apis/driver/order/OrderRepositoriesImpl';
import {APRROVED, COMPLETED, PENDING} from '@constant/order/Status';
import {IDriverOrder, ORDER_INITAL_STATE} from '@state/store/driver/OrderStore';
import {ConditionalNavigator} from '../driver-navigator/order/status/ConditionalNavigator';
import {AvailableDriverOrder} from '@domain/model/AvailableDriverOrder';
import {OrderHistoryScreen} from '@screens/order/driver/history/OrdersHistoryScreen';
import Lottie from 'lottie-react-native';
import {AnimatedTabBar} from '@component/bottomTab/AnimateTab';

export type DriverBottomTabParamList = {
  Home: undefined;
  Order: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<DriverBottomTabParamList>();

export const DriverBottomTab = () => {
  const {setOrder} = useStoreActions(actions => actions.driverOrder);

  useEffect(() => {
    const orderRepo = new OrderRepositoriesImpl();
    orderRepo.ordersRef().on('value', snapshot => {
      if (snapshot.exists()) {
        const orderSnapshot: Record<string, AvailableDriverOrder> =
          snapshot.val();
        const availableOrder = Object.values(orderSnapshot).filter(
          (value: AvailableDriverOrder) =>
            value.status === PENDING || value.status === APRROVED,
        );
        if (availableOrder.length != 0) {
          setOrder(availableOrder[0]);
        } else {
          setOrder(ORDER_INITAL_STATE);
        }
      }
    });
  }, []);

  return (
    <Tab.Navigator
      tabBar={props => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Home">
      <Tab.Screen
        options={{
          // @ts-ignore
          tabBarIcon: ({ref}) => (
            <Lottie
              ref={ref}
              loop={false}
              source={require('@UI/assets/naviagation-icons/home.icon.json')}
              style={styles.icon}
            />
          ),
        }}
        name="Home"
        component={HomeNavigator}
      />
      <Tab.Screen
        options={{
          // @ts-ignore
          tabBarIcon: ({ref}) => (
            <Lottie
              ref={ref}
              loop={false}
              source={require('@UI/assets/naviagation-icons/place-order.icon.json')}
              style={styles.icon}
            />
          ),
        }}
        name="Order"
        component={ConditionalNavigator}
      />

      <Tab.Screen
        options={{
          // @ts-ignore
          tabBarIcon: ({ref}) => (
            <Lottie
              ref={ref}
              loop={false}
              source={require('@UI/assets/naviagation-icons/history.icon.json')}
              style={styles.icon}
            />
          ),
        }}
        name="History"
        component={OrderHistoryScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
  },
});
