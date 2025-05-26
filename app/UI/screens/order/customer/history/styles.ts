import {COLORS} from '@theme/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  text_header: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 20,
  },
  list: {
    flex: 1,
  },
  item: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    margin: 10,
    padding: 10,
    borderColor: COLORS.black,
    borderRadius: 10,
    borderWidth: 1,
  },
});
