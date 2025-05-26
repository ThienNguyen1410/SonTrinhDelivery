import {COLORS} from '@theme/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  timelineContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flexHorizontal: {
    flex: 1,
    flexDirection: 'row',
  },

  flexOneHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexStart: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  flex2: {
    flex: 2,
  },

  flexOneQuarters: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flexTwoQuarter: {
    flex: 2,
    alignItems: 'center',
  },

  flexThreeQuarter: {
    flex: 3,
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 1, height: 1},
  },

  flexFourthQuarter: {
    flex: 4,
  },

  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.1,
    elevation: 1,
    shadowRadius: 5,
    shadowOffset: {width: 1, height: 1},
  },
  line: {
    width: 1.5,
    backgroundColor: COLORS.gray,
  },
  time_text: {
    fontWeight: 'bold',
  },
});
