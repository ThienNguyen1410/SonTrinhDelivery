import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  block: {
    flex: 1,
  },
  column: {
    flexDirection: 'column',
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
  },
  // eslint-disable-next-line react-native/no-color-literals
  shadow: {
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
  },
});
