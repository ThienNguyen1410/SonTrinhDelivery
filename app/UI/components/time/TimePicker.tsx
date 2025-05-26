import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StyleProp, ViewStyle } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../../theme/colors';
import { useTranslation } from '../language';

interface TimePickerProps {
    onTimeSelected: (time: Date) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeSelected }) => {
    const [time, setTime] = useState<Date>(new Date());
    const { locale } = useTranslation()

    const handleTimeChange = (event: any, selectedTime: any) => {
        const currentTime = selectedTime || time;
        setTime(currentTime);
        onTimeSelected(currentTime);
    };

    return (
        <View>
            <DateTimePicker
                value={time}
                locale={locale}
                mode='datetime'
                themeVariant='light'
                is24Hour={true}
                textColor={COLORS.primary}
                display='compact'
                onChange={handleTimeChange}
            />
        </View>
    );
};

export default TimePicker;
