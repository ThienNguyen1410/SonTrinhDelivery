import React, { FC, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import { AuthParamList } from '../../navigation/AuthStack';

export const VerifyCodeScreen: FC<StackScreenProps<AuthParamList>> = ({ route, navigation }) => {


  const [loading, setLoading] = useState<boolean>(false)
  const confirmation = route.params
  const [code, setCode] = useState('');

  function onConfirmCode() {
    setLoading(true)
    confirmation?.confirmation?.confirm(code).then((result) => {
      if (result?.additionalUserInfo?.isNewUser) {
        setLoading(false)
        Alert.alert("Người Dùng Mới", "Có vẻ bạn là người dùng mới, hãy đăng kí tài khoản nhé",
          [{
            text: "Đăng kí",
            style: "default",
            onPress: () => navigation.navigate("signup"),
          },
          {
            text: "Huỷ Bỏ",
            style: "cancel",
            onPress: () => navigation.navigate("signin"),
          }
          ])
      } else {
        console.log("navigate to homescreen")
      }
      console.log(result)
    }).catch((error) => Alert.alert("Mã OTP không đúng", "Vui lòng thử lại"))
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
