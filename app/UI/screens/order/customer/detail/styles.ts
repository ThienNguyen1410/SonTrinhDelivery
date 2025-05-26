import {StyleSheet} from 'react-native';
import {COLORS} from '@colors';
import {getSize} from '@util/responsive';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: getSize.m(20),
    paddingBottom: getSize.m(10),
  },
  footer: {
    height: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  text_footer: {
    color: '#05375a',
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
    height: 75,
    width: 75,
    borderRadius: 75,
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
    height: '10%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  text_button: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
