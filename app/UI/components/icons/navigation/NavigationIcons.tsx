import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '@colors';

export const BackIcon = ({ action }) => {
    return (
        <MaterialIcons
            name="arrow-back-ios"
            color={COLORS.white}
            size={25}
            onPress={action}
        />
    );
};