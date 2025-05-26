import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header_container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingStart: 10,
    paddingBottom: 20,
  },
  footer: {
    flex: 7,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  avatar_container: {
    borderColor: COLORS.primary,
    borderWidth: 5,
    borderStyle: 'dotted',
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  image: {
    height: '100%',
    width: '100%',
    borderColor: COLORS.primary,
    borderRadius: 200,
    resizeMode: 'cover',
  },
  instruction_container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text_container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text_header: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  text_instruction: {
    marginTop: 20,
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer_button: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  button_container: {
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
