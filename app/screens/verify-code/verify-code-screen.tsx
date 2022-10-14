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

export const VerifyCodeScreen: FC<StackScreenProps<AuthParamList>> = ({ route, navigation }) => {

  const { account, updateUserId, onAuthStateChange } = useContext(AccountContext) as AccountContextType
  const [loading, setLoading] = useState<boolean>(false)
  const confirmation = route.params
  const { startCountdown, countDown, completed } = useCountDown(60)
  const [code, setCode] = useState('');

  // const getUser = async () => {
  //   database.ref('user').once('value').then(snapshot => {
  //     console.log(snapshot.val().userId)
  //   })
  // }

  // useEffect(() => {
  //   getUser()
  // })

  function onConfirmCode() {
    setLoading(true)
    confirmation?.confirmation?.confirm(code).then((result) => {
      if (result?.additionalUserInfo?.isNewUser) {
        setLoading(false)
        Alert.alert("Người Dùng Mới", "Có vẻ bạn là người dùng mới, hãy đăng kí tài khoản nhé",
          [{
            text: "Đăng kí",
            style: "default",
            onPress: () => {
              updateUserId(result.user.uid)
              navigation.navigate("signup")
            },
          },
          {
            text: "Huỷ Bỏ",
            style: "cancel",
            onPress: () => navigation.navigate("signin"),
          }
          ])
      } else {
        onAuthStateChange(!result?.additionalUserInfo?.isNewUser)
        navigation.navigate("home")
      }
      console.log(result)
    }).catch((error) => {
      setLoading(false)
      Alert.alert("Mã OTP không đúng", "Vui lòng thử lại")
    })
  };

  const resend = () => {
    auth().signInWithPhoneNumber("+84" + account.phone).then(() => {
      Alert.alert('Gửi lại mã xác minh thành công', 'Vui lòng thử lại', [
        {
          text: 'Đồng ý',
          style: 'cancel',
        },
      ]);

      startCountdown()

    }).catch(error => {
      Alert.alert(error.toString())
    });
  }


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
          Mã Số Xác Minh
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
              onCodeFilled={(code => {
                setCode(code)
              })}
            >

            </OTPInputView>
            <TouchableOpacity
              style={styles.resendBtn}
              disabled={!completed}
              onPress={() => resend()}
            >
              <Text
                style={!completed ? styles.txtResend : styles.textResend}
              >Resend</Text>
            </TouchableOpacity>
            {!completed && (
              <>
                <Text style={styles.textResendDisable} >{` 00:${countDown}`}</Text>
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
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animatable.View>
    </View >
  );
}
