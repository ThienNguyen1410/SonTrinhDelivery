import {POIFromIcon, POIToIcon} from '@component/icons/places/PlacesIcons';
import {translate} from '@component/language';
import {AvailableCustomerOrder} from '@domain/model/AvaiableCustomerOrder';
import {COLORS} from '@theme/colors';
import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View, ViewToken} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {styles} from './styles';

type ListOrderItemsProp = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  items: {
    item: AvailableCustomerOrder;
  };
};
export const ListOrderItems: FC<ListOrderItemsProp> = React.memo(
  ({items, viewableItems}) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = viewableItems.value.filter(items => items.isViewable);
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
      <Animated.View style={[styles.container, rStyle]}>
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <View style={styles.name_container}>
              <Image
                style={styles.image}
                source={require('@UI/assets/profile/profile.png')}
              />
              <Text style={styles.text_name}>{items.item.customerId}</Text>
            </View>

            <View style={styles.position_container}>
              <View style={styles.position}>
                <POIFromIcon />
                <Text style={styles.text_position}>{items.item.from}</Text>
              </View>

              <View style={styles.position}>
                <POIToIcon />
                <Text style={styles.text_position}>{items.item.to}</Text>
              </View>
            </View>
            <View style={styles.button_container}>
              <TouchableOpacity style={styles.button_decline}>
                <Text style={styles.text_button}>
                  {translate('common.reject')}
                </Text>
              </TouchableOpacity>
              <View style={{backgroundColor: COLORS.white, width: 20}} />
              <TouchableOpacity style={styles.button_approve}>
                <Text style={styles.text_button}>
                  {translate('common.approve')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  },
);
