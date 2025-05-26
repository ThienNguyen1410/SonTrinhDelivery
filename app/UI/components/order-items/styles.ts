import {COLORS} from '@theme/colors';
import {getSize} from '@util/responsive';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    margin: getSize.m(10),
    padding: getSize.m(10),
    borderColor: COLORS.offwhite,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    elevation: 1,
    shadowRadius: 5,
    shadowOffset: {width: 1, height: 1},
  },
  body: {
    flexDirection: 'column',
    paddingHorizontal: getSize.m(10),
    paddingVertical: getSize.m(10),
  },

  name_container: {
    flexDirection: 'row',
    paddingHorizontal: getSize.m(10),
    paddingVertical: getSize.m(10),
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    width: 30,
    height: 30,
  },
  text_name: {
    marginLeft: getSize.m(10),
    fontWeight: 'bold',
  },

  position_container: {
    flexDirection: 'column',
    borderColor: COLORS.offwhite,
    borderTopWidth: 1,
    // backgroundColor: COLORS.white,
    // borderRadius: 10,
    // borderWidth: 1,
    // paddingHorizontal: getSize.m(10),
    // paddingVertical: getSize.m(10),
    // shadowColor: COLORS.black,
    // shadowOpacity: 0.1,
    // elevation: 1,
    // shadowRadius: 5,
    // shadowOffset: {width: 1, height: 1},
  },
  position: {
    alignItems: 'center',
    paddingHorizontal: getSize.m(10),
    paddingVertical: getSize.m(10),
  },

  text_position: {
    marginLeft: getSize.m(5),
    fontWeight: 'bold',
  },

  button_container: {
    flexDirection: 'row',
    marginVertical: getSize.m(10),
    justifyContent: 'center',
    padding: 10,
  },

  button_decline: {
    width: '50%',
    borderRadius: 5,
    borderColor: COLORS.error,
    backgroundColor: COLORS.error,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: getSize.m(10),
  },

  button_approve: {
    width: '50%',
    borderRadius: 5,
    borderColor: COLORS.validIcon,
    backgroundColor: COLORS.validIcon,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: getSize.m(10),
  },

  text_button: {
    fontSize: getSize.m(16),
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
