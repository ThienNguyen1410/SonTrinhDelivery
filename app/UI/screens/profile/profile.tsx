import React, {FC, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '@theme/colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation, translate} from '@component/language';
import {CustomerParamlist} from '@navigation/CustomerStack';
import {useStoreState, useStoreActions} from '@state/store/store';
import {getSize} from '@util/responsive';

export const ProfileScreen: FC<
  StackScreenProps<CustomerParamlist, 'profile'>
> = ({navigation}) => {
  const {customer} = useStoreState(state => state.customer);
  const {logout} = useStoreActions(action => action.account);
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
    <SafeAreaView style={styles.container}>
      <Animatable.View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onPressBack()}>
            <MaterialIcons name="arrow-back-ios" size={26} />
          </TouchableOpacity>
          <Text style={styles.text_header}>
            {translate('SettingScreen.profile')}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.customer_info_container}>
            <Image
              style={styles.profile}
              source={require('@UI/assets/profile/profile.png')}
            />
            <View style={styles.customer_info}>
              <Text style={styles.text_profile}>{customer.username}</Text>
              <Text style={styles.text_profile}>{customer.phone}</Text>
            </View>
          </View>
          <View style={styles.features_container}>
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: getSize.m(20),
                },
              ]}>
              {translate('account.title')}
            </Text>
            <TouchableOpacity
              style={styles.customer_info_container}
              onPress={() => onChangeLanguage()}>
              <MaterialCommunityIcons
                name="google-translate"
                color={COLORS.primary}
                size={30}
              />
              <Text style={styles.textInput}>
                {translate('language.title')}
              </Text>
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
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};
