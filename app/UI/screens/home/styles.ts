import {ColorPropType, StyleSheet} from 'react-native';
import {COLORS} from '@colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header_container: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingBottom: 30,
  },

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },

  avatar_container: {
    height: 35,
    width: 35,
    margin: 18,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profile: {
    height: 35,
    width: 35,
    resizeMode: 'cover',
  },
  list: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  footer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  text_header: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 22,
    padding: 10,
  },
  text_footer: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
  },

  sub_verticalContainer: {},

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
    borderColor: COLORS.primary,
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
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
