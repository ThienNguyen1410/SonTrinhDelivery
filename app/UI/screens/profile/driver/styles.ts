import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  header: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_footer: {
    color: '#05375a',
    fontWeight: 'bold',
    fontSize: 18,
  },
  customer_info_container: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  customer_info: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    padding: 10,
  },
  profile: {
    marginTop: 10,
    borderRadius: 100 / 2,
    height: 100,
    width: 100,
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
    marginTop: 10,
    color: '#05375a',
    borderColor: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    marginLeft: 20,
    color: '#05375a',
    borderColor: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
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
