import {Text, View} from 'react-native';
import {styles} from './style';
export const FloatToast = () => {
  return (
    <View style={styles.toastContainer}>
      <View style={styles.copiedToast}>
        <Text>Copied</Text>
      </View>
      <View style={styles.rotateSquare} />
    </View>
  );
};
