import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const IndependentStack = createNativeStackNavigator();

export const IndependentStackNavigator = (
  ScreenComponent: () => JSX.Element,
): React.FC => {
  const StackNavigator: React.FC = () => (
    <IndependentStack.Navigator>
      <IndependentStack.Screen
        name={ScreenComponent.name}
        component={ScreenComponent}
        options={{headerShown: false}}
      />
    </IndependentStack.Navigator>
  );

  return StackNavigator;
};
