import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/home/home-screen';
import {View} from 'react-native';
import {COLORS} from '../theme/colors';
import {CreateOrderScreen} from '../screens/order/create-order-screen';

export type BottomTabParamList = {
  home: undefined;
  createOrder: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
      }}
      initialRouteName="home">
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={28}
            />
          ),
        }}
        name="home"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderWidth: 2,
                borderColor: COLORS.primary,
                borderRadius: 30,
                elevation: 5,
                top: -25,
              }}>
              <MaterialCommunityIcons
                name="package-variant"
                color={color}
                size={28}
              />
            </View>
          ),
        }}
        name="createOrder"
        component={CreateOrderScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="history" color={color} size={28} />
          ),
        }}
        name="history"
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
};

