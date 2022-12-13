import React, {FC, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from './styles';
import {AccountContext} from '../../../state/AccountContext';
import {AuthParamList} from '../../../navigation/AuthStack';
import {COLORS} from '../../../theme/colors';
import {AccountContextType, IAccount} from '../../../state/@types/account';
import {database} from '../../../service/firebase/database';
import {AppParamList} from '../../../navigation/AppStack';
import HomeScreen from '../../home/home-screen';
import {translate} from '../../../components/language';
import {isFieldEmpty, isValidPhoneNumber} from '../../../utils/Utils';

type Props = NativeStackScreenProps<AppParamList, 'home'>;

export const DriverSignUpScreen: FC<
  StackScreenProps<AuthParamList, 'home'>
> = ({navigation}) => {
  Feather.loadFont().then;
  MaterialCommunityIcons.loadFont().then;
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [vehicle, setVehicle] = useState<string>('');
  const [licensePlate, setLicensePlate] = useState<string>('');

  function isFullField(): boolean {
    if (!isValidPhoneNumber(phone)) {
      Alert.alert(
        translate('errors.invalidPhone'),
        translate('errors.re-input'),
      );
    }
    if (
      isFieldEmpty(name) ||
      isFieldEmpty(date) ||
      isFieldEmpty(vehicle) ||
      isFieldEmpty(licensePlate)
    ) {
      Alert.alert(translate('errors.fieldEmpty'), translate('errors.re-input'));
    }
    return true;
  }

  const onSignUp = async (user: IAccount) => {
    if (isFullField()) {
      database.ref(`user/${user.userId}`).set({
        username: user.username,
        phone: user.phone,
        birth: user.birth,
      });
      navigation.navigate('home');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>
          {translate('account.createAccout')}
        </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            {translate('account.phone')}
          </Text>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="phone"
              color={COLORS.primary}
              size={20}
            />
            <TextInput
              onChangeText={val => setPhone(val)}
              placeholder={translate('placeholder.phone')}
              style={styles.textInput}
              keyboardType="phone-pad"
            />
            {isValidPhoneNumber(phone) ? (
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
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            {translate('account.name')}
          </Text>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="account-heart"
              color={COLORS.primary}
              size={20}
            />
            <TextInput
              onChangeText={val => setName(val)}
              placeholder={translate('placeholder.name')}
              style={styles.textInput}
              autoCapitalize="none"
            />
            {!isFieldEmpty(name) ? (
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
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            {translate('account.birth')}
          </Text>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="calendar-star"
              color={COLORS.primary}
              size={20}
            />
            <TextInput
              onChangeText={val => setDate(val)}
              placeholder={translate('placeholder.birth')}
              style={styles.textInput}
              autoCapitalize="none"
            />
            {!isFieldEmpty(date) ? (
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

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            {translate('vehicle.title')}
          </Text>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="car"
              color={COLORS.primary}
              size={20}
            />
            <TextInput
              onChangeText={val => setVehicle(val)}
              placeholder={translate('placeholder.vehicle')}
              style={styles.textInput}
              autoCapitalize="none"
            />
            {!isFieldEmpty(vehicle) ? (
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
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            {translate('vehicle.licensePlate')}
          </Text>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="calendar-range-outline"
              color={COLORS.primary}
              size={20}
            />
            <TextInput
              onChangeText={val => setLicensePlate(val)}
              placeholder={translate('placeholder.licensePlate')}
              style={styles.textInput}
              autoCapitalize="none"
            />
            {!isFieldEmpty(licensePlate) ? (
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
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => isFullField()}
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
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
