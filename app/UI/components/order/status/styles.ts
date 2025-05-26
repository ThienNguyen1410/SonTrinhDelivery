import {COLORS} from '@theme/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  icon_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.primary,
    borderRightWidth: 1,
  },
  info_container: {
    flex: 4,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  info_text: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
  },
});
