import React, {FC, useContext, useEffect, useState} from 'react';
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
import {COLORS} from '../../theme/colors';
import {AuthParamList} from '../../navigation/AuthStack';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {translate} from '../../components/language';
import {createCustomerAccount} from '../../network/FirebaseApis';
import {IAccount} from '../../state/@types/account';
import {useStoreActions, useStoreState} from '../../state/store/store';
import {CUSTOMER} from '../../constant/Account';
import {isFieldEmpty} from '../../utils/Utils';

export const SignUpScreen: FC<
  StackScreenProps<AuthParamList, 'signup'>
> = () => {
  Feather.loadFont().then;
  MaterialCommunityIcons.loadFont().then;

  const {account} = useStoreState(state => state.account);
  const {customer} = useStoreState(state => state.customer);
  const {setLoading} = useStoreActions(action => action.app);
  const {setAuth, setRole} = useStoreActions(action => action.account);
  const {setPhone, setUsername, setBirth} = useStoreActions(
    action => action.customer,
  );

  function isEmptyFields(): boolean {
    if (isFieldEmpty(customer.birth) || isFieldEmpty(customer.username)) {
      setLoading(false);
      Alert.alert(translate('errors.fieldEmpty'), translate('errors.re-input'));
      return false;
    } else {
      return true;
    }
  }

  function onSignUp(customer: IAccount) {
    setLoading(true);
    if (isEmptyFields()) {
      createCustomerAccount(customer)
        .then(() => {
          setRole(CUSTOMER);
          setAuth(true);
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
  }

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
            <Text style={styles.textInput}>{account.phone}</Text>
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
              onChangeText={val => setUsername(val)}
              placeholder={translate('placeholder.name')}
              style={styles.textInput}
              autoCapitalize="none"
            />
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
              onChangeText={val => setBirth(val)}
              placeholder={translate('placeholder.birth')}
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => onSignUp(customer)}
              style={[
                styles.signIn,
                {
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text style={styles.textSign}>{translate('common.ok')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
