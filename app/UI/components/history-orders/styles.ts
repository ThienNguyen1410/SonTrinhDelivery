import {COLORS} from '@theme/colors';
import {getSize} from '@util/responsive';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '90%',
    alignSelf: 'center',
    margin: getSize.m(10),
    padding: getSize.m(10),
    borderColor: COLORS.offwhite,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    elevation: 1,
    shadowRadius: 5,
    shadowOffset: {width: 1, height: 1},
  },
});
