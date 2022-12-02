import {StyleSheet} from 'react-native';
import {COLORS} from '../../theme/colors';

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
    fontSize: 18,
    fontWeight: 'bold',
  },
  text_button: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  driver_info_container: {
    flexDirection: 'row',
    margin: 10,
  },

  driver_image: {
    paddingTop: 20,
    marginTop: 10,
    height: 40,
    width: 40,
    resizeMode: 'cover',
  },

  driver_info: {
    flexDirection: 'column',
    padding: 10,
    marginLeft: 10,
  },

  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  name: {
    color: '#05375a',
    fontSize: 18,
    fontWeight: 'bold',
  },

  phone: {
    color: '#05375a',
    marginTop: 5,
    fontSize: 16,
  },
  date: {
    color: '#05375a',
    marginTop: 5,
    fontSize: 16,
  },

  vehicle_info: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  delivery_info: {
    marginTop: 10,
    justifyContent: 'space-between',
  },

  vertical_container: {
    flexDirection: 'column',
    marginLeft: 20,
  },

  row_container: {
    marginTop: 20,
    flexDirection: 'row',
  },

  textInput: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    color: '#05375a',
    borderColor: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  textDetail: {
    color: '#05375a',
    borderColor: COLORS.primary,
    fontSize: 16,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.primary,
  },
});
