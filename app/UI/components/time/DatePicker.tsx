import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import {COLORS} from '@theme/colors';
import {useTranslation} from '@component/language';
import RNDateTimePicker from '@react-native-community/datetimepicker';

interface TimePickerProps {
  onTimeSelected: (time: Date) => void;
}

const DatePicker: React.FC<TimePickerProps> = ({onTimeSelected}) => {
  const {locale} = useTranslation();

  const [time, setTime] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const handleTimeChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    setShow(Platform.OS === 'ios');
    onTimeSelected(currentTime);
  };

  return (
    <View>
      <RNDateTimePicker
        style={{marginEnd: 10}}
        locale={locale}
        value={time}
        mode="date"
        is24Hour={true}
        textColor={COLORS.primary}
        display="default"
        onChange={handleTimeChange}
      />
    </View>
  );
};

export default DatePicker;
