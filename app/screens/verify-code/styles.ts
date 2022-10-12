import {StyleSheet, Dimensions, Image, Platform} from 'react-native';
import {COLORS} from '../../theme/colors';
import {hex} from '../../theme/hex';

const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    flex: 2,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: height / 1.8,
    width: width,
    paddingVertical: 30,
    alignItems: 'center',
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontWeight: 'bold',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
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
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: width / 2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  passcodeContainer: {
    color: '#000000',
    margin: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  passcodeBox: {
    borderRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    margin: 20,
  },
  passcodeText: {
    fontSize: 25,
    color: '#000000',
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderColor: COLORS.primary,
    color: '#000000',
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  otpView: {
    width: '80%',
    height: 200,
    color: 'black',
  },
  resendBtn: {
    paddingHorizontal: 0,
  },
  textResend: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  textResendDisable: {
    color: hex.IGray50,
  },
  txtDis: {
    color: hex.CGreen,
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  txtReceive: {
    color: hex.IGray50,
    marginHorizontal: 2,
  },
  txtResend: {
    color: hex.IGray50,
    fontWeight: 'bold',
  },
});
