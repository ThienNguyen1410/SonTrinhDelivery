import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@colors';

export const BackIcon = ({action}) => {
  return (
    <MaterialIcons
      name="arrow-back-ios"
      color={COLORS.white}
      size={25}
      onPress={action}
    />
  );
};

export const BackIconBlack = ({action}) => {
  return (
    <MaterialIcons
      name="arrow-back-ios"
      color={COLORS.black}
      size={25}
      onPress={action}
    />
  );
};

export const BirthIcon = () => {
  return (
    <MaterialCommunityIcons
      name="calendar-heart"
      color={COLORS.primary}
      size={20}
    />
  );
};

export const CameraIcon = () => {
  return <MaterialIcons name="camera-alt" size={30} />;
};

export const CarIcon = () => {
  return <MaterialCommunityIcons name="car" color={COLORS.primary} size={20} />;
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

export const CarCheckIcon = ({size}) => {
  return (
    <MaterialCommunityIcons
      name="truck-check"
      size={size}
      color={COLORS.white}
    />
  );
};

export const DeliveringCarIcon = ({size}) => {
  return (
    <MaterialCommunityIcons
      name="truck-delivery"
      size={size}
      color={COLORS.white}
    />
  );
};

export const ReceivedPackage = ({size}) => {
  return (
    <MaterialCommunityIcons
      name="book-check"
      size={size}
      color={COLORS.white}
    />
  );
};
