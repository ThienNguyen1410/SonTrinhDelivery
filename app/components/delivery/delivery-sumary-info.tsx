import * as React from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthParamList } from '../../navigation/AuthStack';
export const DeliverySumaryInfo = ({ driver, from, to, eventHandler }) => {

  return (
    <TouchableOpacity
      onPress={eventHandler}>
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          backgroundColor: COLORS.white,
          borderRadius: 5,
          borderStyle: 'solid',
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            margin: 4,
            width: '20%',
          }}>
          <Image
            style={{
              height: 35,
              width: 35,
              resizeMode: 'cover',
            }}
            source={require('../../assets/profile/profile.png')}
          />
          <Text
            style={{
              color: COLORS.black,
              marginTop: 10,
            }}>
            {driver}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
            paddingLeft: 10,
            borderLeftColor: COLORS.gray,
            borderLeftWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
            }}>
            <Text>From</Text>
            <MaterialCommunityIcons name="dots-vertical" size={25} />
            <Text>{from}</Text>
          </View>
          <MaterialCommunityIcons
            style={{ paddingTop: 20 }}
            name="truck-delivery-outline"
            size={40}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
            }}>
            <Text>To</Text>
            <MaterialCommunityIcons name="dots-vertical" size={25} />
            <Text>{to} </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

