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

const SignInScreen: FC<StackScreenProps<AuthParamList, 'signin'>> = ({
  navigation,
}) => {
  MaterialCommunityIcons.loadFont();
  Feather.loadFont();
  const { account, updatePhoneNumber } = useContext(AccountContext) as AccountContextType
  const [data, setData] = React.useState('');
  const [validPhone, setValidPhone] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');

  const onPhoneNumberChange = (val: string) => {
    setPhoneNumber(val);
  };

  function checkPhoneNumber(): boolean {
    if (phoneNumber.length >= 10 && phoneNumber.length < 12) {
      return true;
    } else {
      return false;
    }
  }

  // function signInWithPhoneNumber() {
  //   auth()
  //     .signInWithPhoneNumber('+84' + phoneNumber)
  //     .then(confirmation => navigation.navigate('verifycode', { confirmation }))
  //     .catch(error => {
  //       Alert.alert('Số điện thoại không đúng', 'Vui lòng thử lại', [
  //         {
  //           text: 'Đồng ý',
  //           style: 'cancel',
  //         },
  //       ]);
  //       console.log(error);
  //     });
  // }

  function signInWithPhoneNumber() {
    updatePhoneNumber(phoneNumber)
    navigation.navigate('signup')
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Chào Mừng!</Text>
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
          Số Điện Thoại
        </Text>
        <ScrollView>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="phone"
              color={COLORS.icon}
              size={20}
            />
            <TextInput
              placeholder="Vui lòng nhập số điện thoại"
              placeholderTextColor={COLORS.placeHoldertext}
              keyboardType="phone-pad"
              onChangeText={val => onPhoneNumberChange(val)}
              style={[styles.textInput]}
              autoCapitalize="none"
            />
            {checkPhoneNumber() ? (
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
        {/* <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}>
          Mật Khẩu
        </Text>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="cellphone-lock"
            color={COLORS.icon}
            size={20}
          />
          <TextInput
            placeholder="Mật khẩu của bạn"
            placeholderTextColor={COLORS.placeHoldertext}
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
          />
          <TouchableOpacity>
            {data.secureTextEntry ? (
              <MaterialCommunityIcons
                name="eye-off"
                color={COLORS.icon}
                size={20}
              />
            ) : (
              <MaterialCommunityIcons
                name="eye"
                color={COLORS.icon}
                size={20}
              />
            )}
          </TouchableOpacity>
        </View> */}

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => signInWithPhoneNumber()}
            // disabled={!checkPhoneNumber()}
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
              Đăng Nhập
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
