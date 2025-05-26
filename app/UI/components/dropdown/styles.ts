import {COLORS} from '@theme/colors';
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
  },
  title: {
    paddingStart: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: COLORS.black,
    fontWeight: 'bold',
    marginRight: 10,
    paddingBottom: 10,
  },

  item: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'cover',
    width: 20, // Adjust the width and height to your desired size
    height: 20,
    borderRadius: 10,
    borderColor: COLORS.primary,
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
