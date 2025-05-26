import React, {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
  version,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Animated,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from './styles';
import {AuthParamList} from '@navigation/AuthStack';
import {COLORS} from '@colors';
import {translate} from '@component/language';
import {isFieldEmpty, isValidPhoneNumber} from '@util/Utils';
import {useStoreActions, useStoreState} from '@store/store';
import {RejectIcon, VerifiedIcon} from '@component/icons/status/StatusIcons';
import {BackIcon} from '@component/icons/navigation/NavigationIcons';
import {
  BirthIcon,
  CarIcon,
  LicensePlateIcon,
  NameIcon,
  NationalIdIcon,
  PhoneIcon,
} from '@component/icons/general/InfomationIcons';
import DatePicker from '@component/time/DatePicker';

export const DriverSignUpScreen: FC<
  StackScreenProps<AuthParamList, 'driverSignUp'>
> = ({navigation}) => {
  const {driver} = useStoreState(state => state.driver);

  const {
    setUsername,
    setNationalID,
    setBirth,
    setPhone,
    setVehicle,
    setLicensePlate,
  } = useStoreActions(action => action.driver);

  const windowHeight = Dimensions.get('window').height;
  const animateHeight = useRef(new Animated.Value(windowHeight * 0.8)).current;
  const animateMarginTop = useRef(new Animated.Value(30)).current;

  function isFullField(): boolean {
    if (!isValidPhoneNumber(driver.generalInfo.phone)) {
      Alert.alert(
        translate('errors.invalidPhone'),
        translate('errors.re-input'),
      );
      return false;
    }
    if (
      isFieldEmpty(driver.generalInfo.username) ||
      isFieldEmpty(driver.verificationInfo.nationalID) ||
      isFieldEmpty(driver.generalInfo.birth) ||
      isFieldEmpty(driver.generalInfo.vehicle) ||
      isFieldEmpty(driver.generalInfo.licensePlate)
    ) {
      Alert.alert(translate('errors.fieldEmpty'), translate('errors.re-input'));
      return false;
    }
    return true;
  }

  const onSignUp = () => {
    changeDimension(windowHeight * 0.8, 35);
    if (isFullField()) {
      Alert.alert(
        translate('confirm-personal-info.title'),
        translate('confirm-personal-info.msg'),
        [
          {
            text: translate('common.confirm'),
            onPress: () => navigation.navigate('nationalIdIdentifier'),
          },
          {
            text: translate('common.check'),
            style: 'cancel',
          },
        ],
      );
    }
  };

  const changeDimension = (windowHeight: number, marginTop: number) => {
    Animated.timing(animateHeight, {
      toValue: windowHeight,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(animateMarginTop, {
      toValue: marginTop,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header_container}>
        <View style={styles.header}>
          <BackIcon action={() => navigation.goBack()} />
          <Text style={styles.text_header}>
            {translate('account.information')}
          </Text>
        </View>
      </View>
      <Animated.ScrollView style={[styles.footer, {height: animateHeight}]}>
        {/* Phone Input */}
        <Animated.Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}>
          {translate('account.phone')}
        </Animated.Text>
        <View style={[styles.action, {}]}>
          <PhoneIcon />
          <TextInput
            value={driver.generalInfo.phone}
            onChangeText={val => setPhone(val)}
            placeholder={translate('placeholder.phone')?.toString()}
            placeholderTextColor={COLORS.placeHoldertext}
            style={styles.textInput}
            keyboardType="phone-pad"
          />
          {isValidPhoneNumber(driver.generalInfo.phone) ? (
            <VerifiedIcon />
          ) : (
            <RejectIcon />
          )}
        </View>
        {/* Name input */}
        <Animated.Text
          style={[
            styles.text_footer,
            {
              marginTop: animateMarginTop,
            },
          ]}>
          {translate('account.name')}
        </Animated.Text>
        <View style={styles.action}>
          {/* Custom Icon */}
          <NameIcon />

          <TextInput
            value={driver.generalInfo.username}
            onChangeText={val => setUsername(val)}
            placeholder={translate('placeholder.name')?.toString()}
            placeholderTextColor={COLORS.placeHoldertext}
            style={styles.textInput}
            autoCapitalize="none"
          />
          {!isFieldEmpty(driver.generalInfo.username) ? (
            <VerifiedIcon />
          ) : (
            <RejectIcon />
          )}
        </View>

        {/* Birth Input */}
        <Animated.Text
          style={[
            styles.text_footer,
            {
              marginTop: animateMarginTop,
            },
          ]}>
          {translate('account.birth')}
        </Animated.Text>
        <TouchableOpacity style={styles.action}>
          {/* Custom Icon */}
          <BirthIcon marginTop={8} />
          <Text style={[styles.textInput, {marginTop: 10}]}>
            {translate('account.birth')}
          </Text>
          <DatePicker
            onTimeSelected={time => setBirth(time.toLocaleDateString())}
          />
          {!isFieldEmpty(driver.generalInfo.birth) ? (
            <VerifiedIcon marginTop={10} />
          ) : (
            <RejectIcon marginTop={10} />
          )}
        </TouchableOpacity>
        {/* National Id Input */}
        <Animated.Text
          style={[
            styles.text_footer,
            {
              marginTop: animateMarginTop,
            },
          ]}>
          {translate('account.nationalId')}
        </Animated.Text>
        <View style={styles.action}>
          <NationalIdIcon />
          <TextInput
            value={driver.verificationInfo.nationalID}
            onChangeText={val => setNationalID(val)}
            placeholder={translate('placeholder.nationalId')?.toString()}
            placeholderTextColor={COLORS.placeHoldertext}
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="phone-pad"
            onPressIn={() => changeDimension(windowHeight, 20)}
          />
          {!isFieldEmpty(driver.verificationInfo.nationalID) ? (
            <VerifiedIcon />
          ) : (
            <RejectIcon />
          )}
        </View>
        {/* Vehicle Input */}
        <Animated.Text
          style={[
            styles.text_footer,
            {
              marginTop: animateMarginTop,
            },
          ]}>
          {translate('vehicle.title')}
        </Animated.Text>
        <View style={styles.action}>
          <CarIcon />
          <TextInput
            value={driver.generalInfo.vehicle}
            onChangeText={val => setVehicle(val)}
            placeholder={translate('placeholder.vehicle')?.toString()}
            placeholderTextColor={COLORS.placeHoldertext}
            style={styles.textInput}
            autoCapitalize="none"
          />
          {!isFieldEmpty(driver.generalInfo.vehicle) ? (
            <VerifiedIcon />
          ) : (
            <RejectIcon />
          )}
        </View>
        {/* License Plate input */}
        <Animated.Text
          style={[
            styles.text_footer,
            {
              marginTop: animateMarginTop,
            },
          ]}>
          {translate('vehicle.licensePlate')}
        </Animated.Text>
        <View style={styles.action}>
          <LicensePlateIcon />
          <TextInput
            value={driver.generalInfo.licensePlate}
            onChangeText={val => setLicensePlate(val)}
            placeholder={translate('placeholder.licensePlate')?.toString()}
            placeholderTextColor={COLORS.placeHoldertext}
            style={styles.textInput}
            autoCapitalize="none"
            onEndEditing={() => changeDimension(windowHeight * 0.8, 35)}
          />
          {!isFieldEmpty(driver.generalInfo.licensePlate) ? (
            <VerifiedIcon />
          ) : (
            <RejectIcon />
          )}
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => onSignUp()}
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
              {translate('common.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
};
