import {COLORS} from '@theme/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  copyContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'none',
  },
  rotateSquare: {
    width: 8,
    height: 8,
    transform: [{rotate: '45deg'}],
    top: -4,
    backgroundColor: COLORS.primary,
  },
  copiedToast: {
    padding: 5,
    marginTop: -16,
    borderRadius: 5,
    borderWidth: 1,
  },
});
