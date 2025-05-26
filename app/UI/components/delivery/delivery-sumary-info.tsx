import * as React from 'react';

import {View, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '@colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {translate} from '@component/language';
import {AvailableDriverOrder} from '@domain/model/AvailableDriverOrder';

interface DeliverySumaryInfoProps {
  order: AvailableDriverOrder;
  eventHandler: (event: any) => void;
}

export const DeliverySumaryInfo: React.FC<DeliverySumaryInfoProps> = ({
  order,
  eventHandler,
}) => {
  return (
    <TouchableOpacity onPress={eventHandler}>
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          backgroundColor: COLORS.white,
          borderColor: COLORS.offwhite,
          borderRadius: 5,
          borderWidth: 1,
          borderStyle: 'solid',
          shadowColor: COLORS.black,
          shadowOffset: {width: 1, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 3,
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
              height: 40,
              width: 40,
              borderRadius: 20,
              resizeMode: 'cover',
            }}
            source={{uri: order.driver_avatarUrl}}
          />
          <Text
            style={{
              color: COLORS.black,
              marginTop: 10,
            }}>
            {order.driverName}
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
            <Text>{translate('HomeScreen.pickup')}</Text>
            <MaterialCommunityIcons name="dots-vertical" size={20} />
            <Text>{order.from}</Text>
          </View>
          <MaterialCommunityIcons
            style={{paddingTop: 20}}
            name="truck-delivery-outline"
            size={30}
            color={COLORS.primary}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
            }}>
            <Text>{translate('HomeScreen.destination')}</Text>
            <MaterialCommunityIcons name="dots-vertical" size={25} />
            <Text>{order.to} </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
