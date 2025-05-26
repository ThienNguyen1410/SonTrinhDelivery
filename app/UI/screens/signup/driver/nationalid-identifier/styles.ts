import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.primary,
  },
  header_container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingStart: 10,
    paddingBottom: 20,
  },
  text_container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card_container: {
    flex: 7,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderWidth: 3,
    borderRadius: 10,
    height: Dimensions.get('screen').height / 4,
    marginTop: 10,
  },
  card_image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    color: COLORS.primary,
  },
  center_row: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  text_header: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  text_instruction: {
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
