import React from 'react';
import {translate, TxKeyPath} from '@component/language';
import Clipboard from '@react-native-clipboard/clipboard';
import {COLORS} from '@theme/colors';
import {Alert, Text, TouchableOpacity} from 'react-native';

type CopyButtonProps = {
  /**
   * @param {string} copy value
   * */
  value: string;
  /**
   * @param {TxKeyPath} value of keypath of i18n
   * Title of alert
   * */
  title: TxKeyPath;
  /**
   * @param {TxKeyPath} value of keypath of i18n
   * Subtitle of alert
   * */
  subtitle: TxKeyPath;
};

export const CopyButton = (props: CopyButtonProps) => {
  const copyToClipboard = () => {
    Clipboard.setString(props.value);
    Alert.alert(translate(props.title)!, translate(props.subtitle)!);
  };
  return (
    <TouchableOpacity
      onPress={() => copyToClipboard()}
      style={{
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
      }}>
      <Text style={{fontSize: 12, fontWeight: 'bold', color: COLORS.white}}>
        {translate('common.copy')}
      </Text>
    </TouchableOpacity>
  );
};
