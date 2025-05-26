import React, {FC, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '@theme/colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {translate, useTranslation} from '@component/language';
import {CustomerParamlist} from '@navigation/CustomerStack';
import {useStoreState, useStoreActions} from '@state/store/store';

export const DriverProfileScreen: FC<
  StackScreenProps<CustomerParamlist, 'profile'>
> = ({navigation}) => {
  const {driver} = useStoreState(state => state.driver);
  const {logout} = useStoreActions(action => action.account);
  const {resetState} = useStoreActions(action => action.driver);
  const {changeLocale} = useTranslation();

  const onPressBack = () => {
    navigation.goBack();
  };

  const onChangeLanguage = () => {
    Alert.alert(
      translate('language.changeLanguage'),
      translate('language.languageChoice'),
      [
        {
          text: 'Tiếng Việt',
          style: 'default',
          onPress: () => {
            changeLocale('vi');
          },
        },
        {
          text: 'English',
          style: 'default',
          onPress: () => changeLocale('en'),
        },
      ],
    );
  };

  const onSignout = () => {
    Alert.alert(
      translate('signout.title'),
      translate('signout.comfirmSignout'),
      [
        {
          text: translate('common.ok'),
          style: 'default',
          onPress: () => {
            logout();
            resetState();
          },
        },
        {
          text: translate('common.cancel'),
          style: 'default',
        },
      ],
    );
  };
  return (
    <Animatable.View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onPressBack()}>
          <MaterialIcons name="arrow-back-ios" size={26} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {translate('SettingScreen.profile')}
        </Text>
      </View>
      <View style={styles.customer_info_container}>
        {driver.generalInfo.avatarUri != undefined ? (
          <Image
            style={styles.profile}
            source={{uri: driver.generalInfo.avatarUri}}
          />
        ) : (
          <Image
            style={styles.profile}
            source={require('../../../assets/profile/profile.png')}
          />
        )}
        <View style={styles.customer_info}>
          <Text style={styles.text_profile}>{driver.generalInfo.username}</Text>
          <Text style={styles.text_profile}>{driver.generalInfo.phone}</Text>
          <Text style={styles.text_profile}>{driver.generalInfo.vehicle}</Text>
          <Text style={styles.text_profile}>
            {driver.generalInfo.licensePlate}
          </Text>
        </View>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}>
          {translate('account.title')}
        </Text>
        <TouchableOpacity style={styles.customer_info_container}>
          <MaterialCommunityIcons
            name="newspaper-variant"
            color={COLORS.primary}
            size={30}
          />
          <Text style={styles.textInput}>{translate('order.myOrder')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customer_info_container}
          onPress={() => onChangeLanguage()}>
          <MaterialCommunityIcons
            name="earth"
            color={COLORS.primary}
            size={30}
          />
          <Text style={styles.textInput}>{translate('language.title')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignout()}
          style={styles.customer_info_container}>
          <MaterialCommunityIcons
            name="logout"
            color={COLORS.primary}
            size={30}
          />
          <Text style={styles.textInput}>{translate('signout.title')}</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};
