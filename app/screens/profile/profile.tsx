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
import {AuthParamList} from '../../navigation/AuthStack';
import {AccountContextType} from '../../state/@types/account';
import {AccountContext} from '../../state/AccountContext';
import {COLORS} from '../../theme/colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {translate, useTranslation} from '../../components/language';

export const ProfileScreen: FC<StackScreenProps<AuthParamList, 'profile'>> = ({
  navigation,
}) => {
  MaterialIcons.loadFont();
  const {account} = useContext(AccountContext) as AccountContextType;
  const {changeLocale} = useTranslation();

  const onPressBack = () => {
    navigation.navigate('home');
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
            auth()
              .signOut()
              .then(() => {
                navigation.navigate('signin');
              })
              .catch(error => console.log(error));
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
      <ScrollView>
        <View style={styles.customer_info_container}>
          <Image
            style={styles.profile}
            source={require('../../assets/profile/profile.png')}
          />
          <View style={styles.customer_info}>
            <Text style={styles.text_profile}>{account.username}</Text>
            <Text style={styles.text_profile}>{account.phone}</Text>
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
            Tài Khoản
          </Text>
          <TouchableOpacity
            style={styles.customer_info_container}
            onPress={() => onChangeLanguage()}>
            <MaterialCommunityIcons
              name="account-heart"
              color={COLORS.primary}
              size={30}
            />
            <Text style={styles.textInput}>{translate('language.title')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSignout()}
            style={styles.customer_info_container}>
            <MaterialCommunityIcons
              name="account-heart"
              color={COLORS.primary}
              size={30}
            />
            <Text style={styles.textInput}>{translate('signout.title')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animatable.View>
  );
};

