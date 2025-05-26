import {COLORS} from '@theme/colors';
import {getSize} from '@util/responsive';
import React, {Children} from 'react';
import {GestureResponderEvent, TouchableOpacity, ViewToken} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

type ListItemProps = {
  /**
   * ViewableItems
   * Items which is Viewable if not it will not be render
   **/
  viewableItems: Animated.SharedValue<ViewToken[]>;
  /**
   * @param {object} items - Items to display.
   */
  item: any;

  /**
   * Children component
   * Child component, class, view, etc...
   **/
  children?: React.ReactNode;
  /**
   * @param {object} handle press
   * Handle press
   **/

  handlePress?: any;
};

export const ListItem: React.FC<ListItemProps> = React.memo(
  ({item, viewableItems, children, handlePress}) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter(item => item.isViewable)
          .find(viewableItem => viewableItem.item.id === item.id),
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      };
    }, []);

    return (
      <TouchableOpacity onPress={handlePress}>
        <Animated.View
          style={[
            {
              height: 80,
              width: '90%',
              alignSelf: 'center',
              margin: getSize.m(10),
              padding: getSize.m(10),
              borderColor: COLORS.offwhite,
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: COLORS.white,
              shadowColor: COLORS.black,
              shadowOpacity: 0.1,
              elevation: 1,
              shadowRadius: 5,
              shadowOffset: {width: 1, height: 1},
              justifyContent: 'center',
              alignItems: 'center',
            },
            rStyle,
          ]}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    );
  },
);
