import React, { FC, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../../theme/colors';
import { styles } from './styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { StackScreenProps } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { AuthParamList, AuthStack } from '../../navigation/AuthStack';
import { database } from '../../service/firebase/database';
import { hex } from '../../theme/hex';
import { AccountContext } from '../../state/AccountContext';
import { AccountContextType } from '../../state/@types/account';
import { useCountDown } from '../../utils/hooks/useCountDown';
import { firebase } from '@react-native-firebase/auth';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { translate } from '../../components/language';

export const VerifyCodeScreen: FC<StackScreenProps<AuthParamList>> = ({
  route,
  navigation,
}) => {
  const {
    account,
    updateUserId,
    onAuthStateChange,
    updateUsername,
    updateBirth,
    updatePhoneNumber,
  } = useContext(AccountContext) as AccountContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const confirmation = route.params;
  const { startCountdown, countDown, completed } = useCountDown(60);
  const [code, setCode] = useState('');

  const onAuthUser = async (userId: string) => {
    const snapshot = await database
      .ref(`user/${userId}`)
      .once('value')
    return snapshot.val()
  };

  function onConfirmCode() {
    setLoading(true);
    confirmation?.confirmation
      ?.confirm(code)
      .then(result => {
        onAuthUser(result.user.uid).then((snapshot) => {
          console.log(snapshot)
          if (snapshot === null) {
            setLoading(false);
            Alert.alert(
              translate('signup.newUser'),
              translate('signup.createAccount'),
              [
                {
                  text: translate('signup.title'),
                  style: 'default',
                  onPress: () => {
                    updateUserId(result.user.uid);
                    navigation.navigate('signup');
                  },
                },
                {
                  text: translate('common.cancel'),
                  style: 'cancel',
                  onPress: () => navigation.navigate('signin'),
                },
              ],
            );
          } else {
            updateUserId(result.user.uid);
            updateUsername(snapshot.username);
            updatePhoneNumber(snapshot.phone);
            updateBirth(snapshot.birth);
            onAuthStateChange(!result?.additionalUserInfo?.isNewUser);
            navigation.navigate('home');
          }
        }).catch(error => console.log(error))
      })
      .catch(error => {
        setLoading(false);
        Alert.alert(
          translate('verification.IncorrectVerification'),
          translate('verification.tryAgain'),
        );
      });
  }

  const resend = () => {
    auth()
      .signInWithPhoneNumber('+84' + account.phone)
      .then(() => {
        Alert.alert(
          translate('verification.resendOTP'),
          translate('verification.tryAgain'),
          [
            {
              text: translate('common.ok'),
              style: 'cancel',
            },
          ],
        );

        startCountdown();
      })
      .catch(error => {
        Alert.alert(error.toString());
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Sơn Trình Delivery</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: COLORS.background,
          },
        ]}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.indicator} />
        ) : null}
        <Text
          style={[
            styles.text_footer,
            {
              color: COLORS.primary,
              marginTop: 35,
            },
          ]}>
          {translate('verification.title')}
        </Text>
        <KeyboardAvoidingView>
          <View style={styles.button}>
            <OTPInputView
              style={styles.passcodeContainer}
              pinCount={6}
              placeholderTextColor={COLORS.primary}
              selectionColor={COLORS.black}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                setCode(code);
              }}></OTPInputView>
            <TouchableOpacity
              style={styles.resendBtn}
              disabled={!completed}
              onPress={() => resend()}>
              <Text style={!completed ? styles.txtResend : styles.textResend}>
                {translate('verification.resend')}
              </Text>
            </TouchableOpacity>
            {!completed && (
              <>
                <Text
                  style={styles.textResendDisable}>{` 00:${countDown}`}</Text>
              </>
            )}
            <TouchableOpacity
              onPress={() => onConfirmCode()}
              style={[
                styles.signIn,
                {
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: COLORS.primary,
                  },
                ]}>
                {translate('common.ok')}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animatable.View>
    </View>
  );
};
