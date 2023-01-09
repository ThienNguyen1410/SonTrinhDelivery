import React, {FC, useContext, useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../../theme/colors';
import {styles} from './styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {StackScreenProps} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {AuthParamList, AuthStack} from '../../navigation/AuthStack';
import {database} from '../../service/firebase/database';
import {useCountDown} from '../../utils/hooks/useCountDown';
import {translate} from '../../components/language';
import {useStoreActions, useStoreState} from '../../state/store/store';

export const VerifyCodeScreen: FC<
  StackScreenProps<AuthParamList, 'verifycode'>
> = ({route, navigation}) => {
  // const setAccessToken = useStoreActions(
  //   action => action.account.setAccessToken,
  // );
  const {setAccessToken, setAuth, setUsername, setBirth} = useStoreActions(
    actions => actions.account,
  );
  const {setPhone, setUserId} = useStoreActions(action => action.customer);
  const {setLoading} = useStoreActions(action => action.app);
  const {accessToken, account} = useStoreState(state => state.account);
  const {confirmation} = route.params;
  const {startCountdown, countDown, completed} = useCountDown(60);
  const [code, setCode] = useState('');

  const onAuthUser = async (userId: string | undefined) => {
    const snapshot = await database.ref(`${userId}`).once('value');
    return snapshot.val();
  };

  function onConfirmCode() {
    setLoading(true);
    confirmation
      ?.confirm(code)
      .then(result => {
        onAuthUser(result?.user.uid)
          .then(snapshot => {
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
                      if (result != undefined) {
                        setUserId(result.user.uid);
                        navigation.navigate('signup');
                      }
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
              setUsername(snapshot.username);
              setBirth(snapshot.birth);
              setAuth(true);
              setLoading(false);
            }
          })
          .catch(error => console.log(error));
      })
      .catch(function () {
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
