import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '@colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '8%',
  },

  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  roundedImage: {
    resizeMode: 'cover',
    width: 75, // Adjust the width and height to your desired size
    height: 75,
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  recipient: {
    paddingVertical: 10,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_sub_header: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
  text_info: {
    color: COLORS.primary,
    fontSize: 16,
    fontStyle: 'normal',
  },
  time_text: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: COLORS.black,
    paddingTop: 10,
    fontSize: 16,
    fontStyle: 'normal',
  },
  action: {
    flexDirection: 'row',
    borderBottomColor: '#f2f2f2',
    marginTop: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: COLORS.primary,
    borderColor: COLORS.primary,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    padding: 10,
    marginTop: 20,
  },
  clipboardToastContainer: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
  clipboardText: {
    fontSize: 18,
    textAlign: 'center',
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
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
