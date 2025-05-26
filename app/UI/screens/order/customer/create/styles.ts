import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '@colors';
import {getSize} from '@util/responsive';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: getSize.m(20),
    paddingBottom: getSize.m(10),
  },
  footer: {
    height: '96%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  location: {
    borderStyle: 'solid',
    borderWidth: 1.2,
    borderColor: COLORS.offwhite,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    elevation: 6,
  },
  recipient: {
    borderStyle: 'solid',
    borderWidth: 1.2,
    borderColor: COLORS.offwhite,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 10,
    marginBottom: 10,
  },
  note: {
    borderStyle: 'solid',
    borderWidth: 1.2,
    borderColor: COLORS.offwhite,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 10,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_sub_header: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 18,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  text_info: {
    color: COLORS.primary,
    fontSize: 16,
    fontStyle: 'normal',
    marginStart: 10,
  },
  time_text: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: COLORS.primary,
    paddingTop: 10,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
  time_action: {
    flexDirection: 'column',
    marginStart: 10,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: COLORS.primary,
    borderColor: COLORS.primary,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginBottom: 10,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
