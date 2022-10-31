import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  ColorPropType,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { styles } from './styles';
import auth from '@react-native-firebase/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthParamList } from '../../navigation/AuthStack';
import { AccountContext } from '../../state/AccountContext';
import { AccountContextType } from '../../state/@types/account';
import { translate, useTranslation } from '../../components/language';

const SignInScreen: FC<StackScreenProps<AuthParamList, 'signin'>> = ({
  navigation,
}) => {
  MaterialCommunityIcons.loadFont();
  Feather.loadFont();
  const { updatePhoneNumber } = useContext(AccountContext) as AccountContextType
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');

  const onPhoneNumberChange = (val: string) => {
    setPhoneNumber(val);
  };

  function isValidPhoneNumber(): boolean {
    var regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return regex.test(phoneNumber)
  }

  function onSignInWithPhoneNumber() {
    auth()
      .signInWithPhoneNumber('+84' + phoneNumber)
      .then(confirmation => {
        updatePhoneNumber(phoneNumber)
        navigation.navigate('verifycode', { confirmation })
      })
      .catch(error => {
        // Alert.alert('Số điện thoại không đúng', 'Vui lòng thử lại', [
        //   {
        //     text: 'Đồng ý',
        //     style: 'cancel',
        //   },
        // ]);
        Alert.alert(error.toString())
      });
  }
  const { changeLocale } = useTranslation()
  const useChangeSelect = async (data) => {
    changeLocale(data)
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>{translate('common.welcome')}</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: COLORS.background,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: COLORS.titleText,
            },
          ]}>
          {translate("loginScreen.phone")}
        </Text>
        <ScrollView>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="phone"
              color={COLORS.icon}
              size={20}
            />
            <TextInput
              placeholder={translate('loginScreen.placeHolder')?.toString()}
              placeholderTextColor={COLORS.placeHoldertext}
              keyboardType="phone-pad"
              onChangeText={val => onPhoneNumberChange(val)}
              style={[styles.textInput]}
              autoCapitalize="none"
            />
            {isValidPhoneNumber() ? (
              <Animatable.View animation="bounceIn">
                <Feather
                  name="check-circle"
                  color={COLORS.validIcon}
                  size={20}
                />
              </Animatable.View>
            ) : (
              <Animatable.View animation="bounceIn">
                <Feather name="x-circle" color={COLORS.error} size={20} />
              </Animatable.View>
            )}
          </View>
        </ScrollView>
        <View style={styles.button}>
          <TouchableOpacity
            // onPress={() => onSignInWithPhoneNumber()}
            onPress={() => changeLocale('vi')}
            disabled={!isValidPhoneNumber()}
            style={[
              styles.signIn,
              {
                borderColor: isValidPhoneNumber() ? COLORS.primary : COLORS.gray,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: isValidPhoneNumber() ? COLORS.primary : COLORS.gray,
                },
              ]}>
              {translate('loginScreen.title')}
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
