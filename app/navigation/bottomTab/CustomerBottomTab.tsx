import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '@colors';
import {HomeNavigator} from '@navigation/customer-navigator/home/HomeNavigator';
import {AnimatedTabBar} from '@component/bottomTab/AnimateTab';
import Lottie from 'lottie-react-native';
import {StyleSheet} from 'react-native';
import {OrderHistoryScreen} from '@screens/order/driver/history/OrdersHistoryScreen';
import {ConditionalNavigator} from '@navigation/customer-navigator/order/status/ConditionalNavigator';

export type CustomerBottomTabParamList = {
  Home: undefined;
  Order: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<CustomerBottomTabParamList>();

export const CustomerBottomTab = () => {
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
    height: 30,
    width: 30,
  },
});
