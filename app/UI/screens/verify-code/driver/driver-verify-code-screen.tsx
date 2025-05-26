import React, {FC, useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../../../../theme/colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {AuthParamList, AuthStack} from '../../../../navigation/AuthStack';
import {useCountDown} from '../../../../utils/hooks/useCountDown';
import {translate} from '../../../components/language';
import {useStoreActions, useStoreState} from '../../../../state/store/store';
import {
  driverRegisterRequest,
  getDriverAvatarUrl,
  getDriverInfo,
  getLicenseBackCardUrl,
  getLicenseFrontCardUrl,
  getNationalIdBackCardUrl,
  getNationalIdFrontCardUrl,
  updateDriverImage,
  updateLicenseBackCard,
  updateLicenseFrontCard,
  updateNationalIdBackCard,
  updateNationalIdFrontCard,
} from '../../../../network/FirebaseApis';
import {formatUri} from '../../../../utils/Utils';
import {IDriver} from '../../../../state/@types/account';
import {requestNotificationPermission} from '../../../../utils/permission/RequestPermission';
import {DRIVER} from '../../../../constant/Account';
import {Passcode} from '@component/otp/OTPCode';

export const DriverVerifyCodeScreen: FC<
  StackScreenProps<AuthParamList, 'driverVerifyCode'>
> = ({navigation}) => {
  const {driver} = useStoreState(state => state.driver);
  const {setLoading} = useStoreActions(action => action.app);

  const {
    setUserId,
    setAvartarUrl,
    setFrontNationIDCardUri,
    setBackNationIDCardUri,
    setFrontLicenseIDCardUri,
    setBackLicenseIDCardUri,
    setDeviceToken,
    setRole,
  } = useStoreActions(action => action.driver);

  const {startCountdown, countDown, completed} = useCountDown(60);
  const [confirmation, setConfirmation] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const passcodeLength = 6;
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(passcodeLength).fill(''),
  );

  const onAuthUser = async (userId: string) => {
    const snapshot = await getDriverInfo(userId);
    return snapshot.val();
  };

  const resend = () => {
    auth()
      .signInWithPhoneNumber('+84' + driver.generalInfo.phone)
      .then(confirmation => {
        setConfirmation(confirmation);
        Alert.alert(
          translate('verification.resendOTP'),
          translate('common.sendVerifycationCode') + driver.generalInfo.phone,
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

  const onConfirmCode = async () => {
    // Get comfirmation from auth phone request
    try {
      setLoading(true);
      const result = await confirmation?.confirm(verificationCode.join(''));
      if (result != undefined) {
        const snapshot = await onAuthUser(result.user.uid);
        if (snapshot == null) {
          // Formart uri
          let avatarUri = formatUri(driver.generalInfo.avatarUri);
          let frontNationalCardUri = formatUri(
            driver.verificationInfo.frontNationIDCardUri,
          );
          let backNationalCardUri = formatUri(
            driver.verificationInfo.backNationIDCardUri,
          );
          let frontLicenseCardUri = formatUri(
            driver.verificationInfo.frontLicenseIDCardUri,
          );
          let backLicenseCardUri = formatUri(
            driver.verificationInfo.backLicenseIDCardUri,
          );
          // Update to card image to firestore
          await updateDriverImage(result.user.uid, avatarUri);
          await updateNationalIdFrontCard(
            result.user.uid,
            frontNationalCardUri,
          );
          await updateNationalIdBackCard(result.user.uid, backNationalCardUri);
          await updateLicenseFrontCard(result.user.uid, frontLicenseCardUri);
          await updateLicenseBackCard(result.user.uid, backLicenseCardUri);
          // Get uri from storage
          const avatarUrl = await getDriverAvatarUrl(result.user.uid);
          const nationalIdFrontCardUrl = await getNationalIdFrontCardUrl(
            result.user.uid,
          );
          const nationalIdBackCardUrl = await getNationalIdBackCardUrl(
            result.user.uid,
          );
          const licenseFrontCardUrl = await getLicenseFrontCardUrl(
            result.user.uid,
          );
          const licenseBackCardUrl = await getLicenseBackCardUrl(
            result.user.uid,
          );
          // Set driver infomation
          setAvartarUrl(avatarUrl);
          setBackNationIDCardUri(nationalIdBackCardUrl);
          setFrontNationIDCardUri(nationalIdFrontCardUrl);
          setBackLicenseIDCardUri(licenseBackCardUrl);
          setFrontLicenseIDCardUri(licenseFrontCardUrl);
          setRole(DRIVER);
          setUserId(result.user.uid);
        } else {
          Alert.alert(translate('errors.accountExisted'), {
            text: translate('loginScreen.re-signin'),
            style: 'default',
            onPress: () => {
              navigation.navigate('signin');
            },
          });
        }
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      Alert.alert(
        translate('verification.IncorrectVerification'),
        translate('verification.tryAgain'),
      );
    } finally {
      setLoading(false);
    }
  };

  async function isHasDeviceToken(driver: IDriver): Promise<boolean> {
    if (driver.userId != '') {
      const grantPermission = await requestNotificationPermission();
      if (grantPermission) {
        const token = await messaging().getToken();
        setDeviceToken(token);
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    // Push driver sign-up request to realtime database
    if (driver.userId != '') {
      driverRegisterRequest(driver).then(() => {
        Alert.alert(
          translate('verification.pendingVerify'),
          translate('verification.notifyWhenDone'),
          [
            {
              text: translate('common.ok'),
              style: 'cancel',
              onPress: navigation.navigate('signin'),
            },
          ],
        );
      });
    }
  }, [driver.userId]);

  useEffect(() => {
    // Create a auth request with phone
    auth()
      .signInWithPhoneNumber('+84' + driver.generalInfo.phone)
      .then(confirmation => {
        setConfirmation(confirmation);
        Alert.alert(
          translate('common.verifycode'),
          translate('common.sendVerifycationCode') + driver.generalInfo.phone,
        );
      })
      .catch(error => {
        Alert.alert(error);
      });
  }, []);

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
              marginTop: 35,
            },
          ]}>
          {translate('verification.title')}
        </Text>
        <View style={styles.button}>
          <Passcode
            hidePasscode={false}
            setPasscode={setVerificationCode}
            passcode={verificationCode}
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
              <Text style={styles.textResendDisable}>{` 00:${countDown}`}</Text>
            </>
          )}
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: COLORS.primary,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={onConfirmCode}>
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
      </Animatable.View>
    </View>
  );
};
