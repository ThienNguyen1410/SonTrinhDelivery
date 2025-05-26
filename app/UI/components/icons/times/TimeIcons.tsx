import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@colors';

export const DepartureTimeIcon = () => {
  return (
    <MaterialCommunityIcons
      name="timeline-plus"
      color={COLORS.primary}
      size={20}
      style={{paddingTop: 8}}
    />
  );
};

export const ArrivalTimeIcon = () => {
  return (
    <MaterialCommunityIcons
      name="timeline-check"
      color={COLORS.primary}
      size={20}
      style={{paddingTop: 7}}
    />
  );
};
