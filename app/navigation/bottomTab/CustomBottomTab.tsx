import React from 'react';
import {AnimatedTabBar} from '@component/bottomTab/AnimateTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar, StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';

export type CustomerBottomTabParamList = {
  Home: undefined;
  Order: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator();

const PlaceholderScreen = () => {
  return <View style={{flex: 1, backgroundColor: '#604AE6'}} />;
};
export const CustomBottomTab = () => {
  return (
    <>
      <Tab.Navigator tabBar={props => <AnimatedTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          options={{
            // @ts-ignore
            tabBarIcon: ({ref}) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('@UI/assets/lottie/home.icon.json')}
                style={styles.icon}
              />
            ),
          }}
          component={PlaceholderScreen}
        />
        <Tab.Screen
          name="Upload"
          options={{
            // @ts-ignore
            tabBarIcon: ({ref}) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('@UI/assets/lottie/upload.icon.json')}
                style={styles.icon}
              />
            ),
          }}
          component={PlaceholderScreen}
        />
        <Tab.Screen
          name="Chat"
          options={{
            // @ts-ignore
            tabBarIcon: ({ref}) => (
              <Lottie
                ref={ref}
                loop={false}
                source={require('@UI/assets/lottie/chat.icon.json')}
                style={styles.icon}
              />
            ),
          }}
          component={PlaceholderScreen}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
  },
});
