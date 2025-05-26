import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@colors';

export const BankIcon = () => {
  return (
    <MaterialCommunityIcons
      name="bank"
      color={COLORS.primary}
      size={20}
      style={{paddingTop: 8}}
    />
  );
};

export const BankSmallIcon = () => {
  return (
    <MaterialCommunityIcons
      name="bank"
      color={COLORS.primary}
      size={20}
      style={{paddingTop: 8}}
    />
  );
};

export const BankHolderNameIcon = () => {
  return (
    <MaterialCommunityIcons
      name="account-heart"
      color={COLORS.primary}
      style={{paddingTop: 8}}
      size={20}
    />
  );
};

export const BankCardIcon = () => {
  return (
    <MaterialCommunityIcons
      name="credit-card"
      color={COLORS.primary}
      style={{paddingTop: 8}}
      size={20}
    />
  );
};

export const OrderIcon = () => {
  return (
    <MaterialCommunityIcons
      name="package"
      color={COLORS.primary}
      style={{paddingTop: 8}}
      size={20}
    />
  );
};

export const CopyIcon = ({action}) => {
  return (
    <MaterialCommunityIcons
      onPress={action}
      name="content-copy"
      color={COLORS.black}
      style={{paddingTop: 8}}
      size={20}
    />
  );
};
