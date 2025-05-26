import {POIFromIcon, POIToIcon} from '@component/icons/places/PlacesIcons';
import {translate} from '@component/language';
import {COLORS} from '@theme/colors';
import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View, ViewToken} from 'react-native';
import {OrderItemsProps} from './OrderItems.props';
import {styles} from './styles';

export const OrderItemsView = (props: OrderItemsProps) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.body}>
        <View style={styles.name_container}>
          <Image
            style={styles.image}
            source={require('@UI/assets/profile/profile.png')}
          />
          <Text style={styles.text_name}>{props.items.customerId}</Text>
        </View>
        <View style={styles.position_container}>
          <View style={styles.position}>
            <POIFromIcon />
            <Text style={styles.text_position}>{props.items.from}</Text>
          </View>

          <View style={styles.position}>
            <POIToIcon />
            <Text style={styles.text_position}>{props.items.to}</Text>
          </View>
        </View>
        <View style={styles.button_container}>
          <TouchableOpacity style={styles.button_decline}>
            <Text style={styles.text_button}>{translate('common.reject')}</Text>
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
  );
};
