import React, {FC, useContext, useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '@theme/colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {AuthParamList} from '@navigation/AuthStack';
import {useCountDown} from '@util/hooks/useCountDown';
import {translate} from '@component/language';
import {saveString} from '@util/storages/storages';
import {useStoreActions, useStoreState} from '@state/store/store';
import {getCustomerInfo, getDriverInfo} from '@network/FirebaseApis';
import {CUSTOMER, DRIVER} from '@constant/Account';
import {Passcode} from '@component/otp/OTPCode';
import {getSize} from '@util/responsive';

export const VerifyCodeScreen: FC<
  StackScreenProps<AuthParamList, 'verifycode'>
> = ({route, navigation}) => {
  const {setUserId, setRole, setAuth} = useStoreActions(
    actions => actions.account,
  );
  const {setCustomer} = useStoreActions(action => action.customer);
  const {setDriver} = useStoreActions(action => action.driver);
  const {setLoading} = useStoreActions(action => action.app);
  const {account} = useStoreState(state => state.account);
  const {confirmation} = route.params;
  const {startCountdown, countDown, completed} = useCountDown(60);
  const passcodeLength = 6;
  const [code, setCode] = useState<string[]>(Array(passcodeLength).fill(''));

  const onAuthUser = async (userId: string) => {
    const customerSnapshot = await getCustomerInfo(userId);
    const driverSnapshot = await getDriverInfo(userId);

    if (customerSnapshot.val() != null) {
      setRole(CUSTOMER);
      setAuth(true);
      const customer = customerSnapshot.val();
      customer.userId = userId;
      setCustomer(customer);
      return customerSnapshot.val();
    } else if (driverSnapshot.val() != null) {
      setRole(DRIVER);
      setAuth(true);
      const driver = driverSnapshot.val();
      driver.userId = userId;
      setDriver(driver);
      return driverSnapshot.val();
    }
  };

  const onConfirmCode = async () => {
    setLoading(true);
    try {
      const result = await confirmation?.confirm(code.join(''));
      if (result != undefined) {
        const snapshot = await onAuthUser(result.user.uid);
        if (snapshot == null) {
          setLoading(false);
          return Alert.alert(
            translate('signup.newUser')!,
            translate('signup.createAccount')!,
            [
              {
                text: translate('signup.title')!,
                style: 'default',
                onPress: () => {
                  if (result != undefined) {
                    setUserId(result.user.uid);
                    navigation.navigate('signup');
                  }
                },
              },
              {
                text: translate('common.cancel')!,
                style: 'cancel',
                onPress: () => navigation.navigate('signin'),
              },
            ],
          );
        }
        const accessToken = await auth().currentUser?.getIdToken();
        if (accessToken != undefined) {
          saveString('accessToken', accessToken);
        }
        saveString('uid', result.user.uid);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      Alert.alert(
        translate('verification.IncorrectVerification')!,
        translate('verification.tryAgain')!,
      );
    } finally {
      setLoading(false);
    }
  };

  const resend = () => {
    auth()
      .signInWithPhoneNumber('+84' + account.phone)
      .then(() => {
        Alert.alert(
          translate('verification.resendOTP')!,
          translate('verification.tryAgain')!,
          [
            {
              text: translate('common.ok')!,
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
        <Text style={styles.text_header}>{translate('app.name')}</Text>
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
              marginTop: getSize.s(35),
            },
          ]}>
          {translate('verification.title')}
        </Text>
        <KeyboardAvoidingView>
          <View style={styles.button}>
            <Passcode
              hidePasscode={false}
              setPasscode={setCode}
              passcode={code}
              style={{flexDirection: 'row'}}
            />
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
              onPress={onConfirmCode}
              style={[
                styles.signIn,
                {
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.primary,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: COLORS.white,
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
