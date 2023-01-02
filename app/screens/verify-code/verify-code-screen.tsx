import React, {FC, useContext, useEffect, useState} from 'react';
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
import {COLORS} from '../../theme/colors';
import {styles} from './styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {StackScreenProps} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {AuthParamList, AuthStack} from '../../navigation/AuthStack';
import {database} from '../../service/firebase/database';
import {AccountContext} from '../../state/AccountContext';
import {AccountContextType} from '../../state/@types/account';
import {useCountDown} from '../../utils/hooks/useCountDown';
import {translate} from '../../components/language';
import {DriverContext} from '../../state/DriverContext';
import {DriverContextType} from '../../state/@types/driver';
import {useStoreActions, useStoreState} from '../../state/store/store';

export const VerifyCodeScreen: FC<
  StackScreenProps<AuthParamList, 'verifycode'>
> = ({route, navigation}) => {
  const {account} = useContext(AccountContext) as AccountContextType;
  // const setAccessToken = useStoreActions(
  //   action => action.account.setAccessToken,
  // );
  const {setAccessToken} = useStoreActions(actions => actions.account);

  const {accessToken} = useStoreState(state => state.account);
  const {driver} = useContext(DriverContext) as DriverContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const {role, confirmation} = route.params;
  const {startCountdown, countDown, completed} = useCountDown(60);
  const [code, setCode] = useState('');

  const onAuthUser = async (userId: string) => {
    const snapshot = await database.ref(`${role}/${userId}`).once('value');
    return snapshot.val();
  };

  function onConfirmCode() {
    setLoading(true);
    confirmation
      ?.confirm(code)
      .then(result => {
        console.log('Original ' + result?.user.uid);
        setAccessToken(result?.user.uid);
        console.log('EP ' + accessToken);
        onAuthUser(result.user.uid);
      })
      // .then(snapshot => {
      //   if (snapshot === null) {
      //     if (role == CUSTOMER) {
      //       setLoading(false);
      //       Alert.alert(
      //         translate('signup.newUser'),
      //         translate('signup.createAccount'),
      //         [
      //           {
      //             text: translate('signup.title'),
      //             style: 'default',
      //             onPress: () => {
      //               updateUserId(result.user.uid);
      //               navigation.navigate('signup');
      //             },
      //           },
      //           {
      //             text: translate('common.cancel'),
      //             style: 'cancel',
      //             onPress: () => navigation.navigate('signin'),
      //           },
      //         ],
      //       );
      //     }
      //     if (role == DRIVER) {
      //       createDriverAccount(driver).then(() =>
      //         navigation.navigate('driverHome'),
      //       );
      //     } else {
      //       console.log(result);
      //       updateUsername(snapshot.username);
      //       updatePhoneNumber(snapshot.phone);
      //       updateBirth(snapshot.birth);
      //       onAuthStateChange(!result?.additionalUserInfo?.isNewUser);
      //       navigation.navigate('home');
      //     }
      //   }
      // })
      // .catch(error => console.log(error));
      // })
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
