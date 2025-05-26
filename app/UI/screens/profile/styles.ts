import {getSize} from '@util/responsive';
import {StyleSheet} from 'react-native';
import {COLORS} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
    paddingHorizontal: getSize.m(10),
  },
  header: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  text_footer: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 18,
  },
  customer_info_container: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.offwhite,
  },
  customer_info: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    padding: getSize.m(10),
  },
  profile: {
    paddingTop: 20,
    marginTop: 10,
    height: 35,
    width: 35,
    resizeMode: 'cover',
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  text_profile: {
    color: COLORS.black,
    borderColor: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    padding: 10,
    margin: 12,
    color: COLORS.black,
    borderColor: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  features_container: {
    justifyContent: 'center',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
});
