import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useStoreState } from '../../../state/store/store';
import { COLORS } from '../../../theme/colors';
import styles from './styles';

interface LoadingProps extends ActivityIndicatorProps {
  isLoading?: boolean;
  children?: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
}

const Loading: React.FC<LoadingProps> = ({ children }) => {
  const isLoading = useStoreState(state => state.app.loading);
  return (
    <>
      {children}
      {isLoading && (
        <View style={styles.containerFull}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      )}
    </>
  );
};
export default Loading;
