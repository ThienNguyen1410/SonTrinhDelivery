import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import Lottie from 'lottie-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@colors';

export const PendingIcon = (styles?: StyleProp<ViewStyle>) => {
  return (
    <Animatable.View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: COLORS.white,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        shadowColor: COLORS.orange,
        shadowOpacity: 0.5,
        elevation: 1,
        shadowRadius: 15,
        shadowOffset: {width: 1, height: 1},
      }}>
      <MaterialCommunityIcons
        name="clipboard-text-clock-outline"
        style={[styles, {color: COLORS.orange}]}
        size={30}
      />
    </Animatable.View>
  );
};

export const ApprovedIcon = (styles?: StyleProp<ViewStyle>) => {
  return (
    <Animatable.View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: COLORS.white,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        shadowColor: COLORS.validIcon,
        shadowOpacity: 1,
        elevation: 10,
        shadowRadius: 15,
        shadowOffset: {width: 1, height: 1},
      }}>
      <MaterialCommunityIcons
        name="check"
        style={[styles, {color: COLORS.validIcon}]}
        size={30}
      />
    </Animatable.View>
  );
};

export const CheckIcon = () => {
  return (
    <MaterialCommunityIcons
      name="check"
      style={{color: COLORS.white}}
      size={15}
    />
  );
};

export const DeniendIcon = (styles?: StyleProp<ViewStyle>) => {
  return (
    <Animatable.View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: COLORS.white,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: {width: 1, height: 13},
      }}>
      <MaterialCommunityIcons
        name="exclamation"
        style={[styles, {color: COLORS.error}]}
        size={30}
      />
    </Animatable.View>
  );
};

export const VerifiedIcon = (style?: StyleProp<ViewStyle>) => {
  return (
    <Animatable.View animation="bounceIn" style={style}>
      <Feather name="check-circle" color={COLORS.validIcon} size={20} />
    </Animatable.View>
  );
};

export const RejectIcon = (style?: StyleProp<ViewStyle>) => {
  return (
    <Animatable.View animation="bounceIn" style={style}>
      <Feather name="x-circle" color={COLORS.error} size={20} />
    </Animatable.View>
  );
};
