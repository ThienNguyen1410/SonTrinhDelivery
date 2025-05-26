import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@colors';
import {StyleProp, ViewStyle} from 'react-native';

export const CameraIcon = () => {
  return <MaterialIcons name="camera-alt" size={30} />;
};

export const NameIcon = () => {
  return (
    <MaterialCommunityIcons
      name="account-heart"
      color={COLORS.primary}
      size={20}
    />
  );
};

export const DriverIcon = () => {
  return (
    <MaterialCommunityIcons name="account" color={COLORS.primary} size={20} />
  );
};

export const BirthIcon = (style?: StyleProp<ViewStyle>) => {
  return (
    <MaterialCommunityIcons
      name="calendar-heart"
      color={COLORS.primary}
      style={style}
      size={20}
    />
  );
};

export const CarIcon = () => {
  return <MaterialCommunityIcons name="car" color={COLORS.primary} size={20} />;
};

export const NationalIdIcon = () => {
  return (
    <MaterialCommunityIcons
      name="card-account-details"
      color={COLORS.primary}
      size={20}
    />
  );
};

export const LicensePlateIcon = () => {
  return (
    <MaterialCommunityIcons
      name="calendar-month"
      color={COLORS.primary}
      size={20}
    />
  );
};

export const PhoneIcon = () => {
  return (
    <MaterialCommunityIcons name="phone" color={COLORS.primary} size={20} />
  );
};
