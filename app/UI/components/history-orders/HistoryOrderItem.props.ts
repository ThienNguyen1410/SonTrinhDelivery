import React, {FC} from 'react';
import {ViewToken} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

export interface HistoryOrderItemProps {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  /*
   * Type Object
   * Define type of Object
   */
  items: {
    id: string;
  };

  /*
   * Define children
   * Children component
   */
  children?: React.ReactNode;
}
