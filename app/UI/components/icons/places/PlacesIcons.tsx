import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@colors';

export const POIFromIcon = () => {
  return (
    <MaterialCommunityIcons
      name="map-marker-radius-outline"
      color={COLORS.primary}
      size={20}
    />
  );
};

export const POIToIcon = () => {
  return (
    <MaterialCommunityIcons
      name="map-marker-check-outline"
      color={COLORS.primary}
      size={20}
    />
  );
};

export const FromToIcon = () => {
  return (
    <MaterialCommunityIcons
      name="debug-step-into"
      color={COLORS.primary}
      size={20}
    />
  );
};
