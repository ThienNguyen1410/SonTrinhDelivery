import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  Animated,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {translate} from '@component/language';
import {useStoreActions, useStoreState} from '@state/store/store';
import {isValidPhoneNumber, isFieldEmpty, getCurrentDate} from '@util/Utils';
import {RejectIcon, VerifiedIcon} from '@component/icons/status/StatusIcons';
import {BackIcon} from '@component/icons/CustomIcons';
import {FromToIcon} from '@component/icons/places/PlacesIcons';
import {CustomerOrderParamList} from '@navigation/customer-navigator/order/CustomerOrderNavigator';

export const CreateOrderScreen: FC<
  StackScreenProps<CustomerOrderParamList, 'create'>
> = ({route, navigation}) => {
  const {customerOrder} = useStoreState(state => state.customerOrder);
  const {availableOrder} = route.params;
  const {customer} = useStoreState(state => state.customer);
  const {
    setOrderId,
    setDriverOrderId,
    setCustomerId,
    setDriverId,
    setFrom,
    setTo,
    setReceiver,
    setReceiverPhone,
    setPackageType,
    setPackageWeight,
    setNote,
    setDate,
    setSender,
  } = useStoreActions(action => action.customerOrder);

  function isFullField(): boolean {
    if (!isValidPhoneNumber(customerOrder.receiverPhone)) {
      Alert.alert(
        translate('errors.invalidPhone')!,
        translate('errors.re-input')!,
      );
      return false;
    }
    if (
      isFieldEmpty(customerOrder.from) ||
      isFieldEmpty(customerOrder.to) ||
      isFieldEmpty(customerOrder.receiver) ||
      isFieldEmpty(customerOrder.packageType) ||
      isFieldEmpty(customerOrder.packageWeight)
    ) {
      Alert.alert(
        translate('errors.fieldEmpty')!,
        translate('errors.re-input')!,
      );
      return false;
    }
    return true;
  }

  async function onCreateOrder() {
    // changeDimension(windowHeight * 0.8, 35);
    if (isFullField()) {
      let currentDate = getCurrentDate();
      let time = new Date().getTime();
      let orderID = customer.userId + time;
      setDate(currentDate);
      setOrderId(orderID);
      setSender(customer.username);
      navigation.navigate('confirm');
    }
  }

  useEffect(() => {
    if (availableOrder.orderId != undefined) {
      setDriverOrderId(availableOrder.orderId);
      setFrom(availableOrder.from);
      setTo(availableOrder.to);
      const customerId = customer.userId;
      setCustomerId(customerId);
      setDriverId(availableOrder.driverId);

      console.log('CreateOrderScreen |  Order : ', customerOrder);
    }
  }, [customerOrder]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <BackIcon action={() => navigation.goBack()} />
          <StatusBar
            backgroundColor={COLORS.primary}
            barStyle="light-content"
          />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
            {translate('order.createOrder')}
          </Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Animated.ScrollView>
            <View style={styles.location}>
              <Text
                style={[
                  styles.text_sub_header,
                  {
                    marginTop: 10,
                  },
                ]}>
                {translate('delivery.location')}
              </Text>
              <View style={styles.action}>
                <MaterialCommunityIcons
                  name="map-marker-radius-outline"
                  color={COLORS.primary}
                  size={20}
                />
                <TextInput
                  value={customerOrder.from}
                  placeholder={translate('delivery.from')!}
                  placeholderTextColor={COLORS.primary}
                  style={styles.textInput}
                  onChangeText={from => setFrom(from)}
                />
              </View>
              <FromToIcon />
              <View style={styles.action}>
                <MaterialCommunityIcons
                  name="map-marker-check-outline"
                  color={COLORS.primary}
                  size={20}
                />
                <TextInput
                  value={customerOrder.to}
                  placeholder={translate('delivery.to')!}
                  placeholderTextColor={COLORS.primary}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={newText => setTo(newText)}
                />
              </View>
            </View>
            <View style={styles.recipient}>
              <Text
                style={[
                  styles.text_sub_header,
                  {
                    marginTop: 10,
                  },
                ]}>
                {translate('recipient.title')}
              </Text>
              <View style={styles.action}>
                <MaterialCommunityIcons
                  name="face-agent"
                  color={COLORS.primary}
                  size={20}
                />
                <TextInput
                  value={customerOrder.receiver}
                  placeholder={translate('recipient.name')!}
                  placeholderTextColor={COLORS.primary}
                  style={styles.textInput}
                  onChangeText={receiver => setReceiver(receiver)}
                />
                {isFieldEmpty(customerOrder.receiver) ? (
                  <RejectIcon />
                ) : (
                  <VerifiedIcon />
                )}
              </View>
              <View style={styles.action}>
                <MaterialCommunityIcons
                  name="phone"
                  color={COLORS.primary}
                  size={20}
                />
                <TextInput
                  value={customerOrder.receiverPhone}
                  placeholder={translate('recipient.phone')!}
                  placeholderTextColor={COLORS.primary}
                  style={styles.textInput}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  onChangeText={phone => setReceiverPhone(phone)}
                />
                {isValidPhoneNumber(customerOrder.receiverPhone) ? (
                  <VerifiedIcon />
                ) : (
                  <RejectIcon />
                )}
              </View>
            </View>
            <View style={styles.recipient}>
              <Text
                style={[
                  styles.text_sub_header,
                  {
                    marginTop: 10,
                  },
                ]}>
                {translate('package.title')}
              </Text>
              <View style={styles.action}>
                <MaterialCommunityIcons
                  name="package"
                  color={COLORS.primary}
                  size={20}
                />
                <TextInput
                  value={customerOrder.packageType}
                  placeholder={translate('package.detail')!}
                  placeholderTextColor={COLORS.primary}
                  style={styles.textInput}
                  onChangeText={packageType => setPackageType(packageType)}
                  // onPressIn={() => changeDimension(windowHeight / 2, 1)}
                />
                {isFieldEmpty(customerOrder.packageType) ? (
                  <RejectIcon />
                ) : (
                  <VerifiedIcon />
                )}
              </View>
              <View style={styles.action}>
                <MaterialCommunityIcons
                  name="weight"
                  color={COLORS.primary}
                  size={20}
                />
                <TextInput
                  value={customerOrder.packageWeight}
                  keyboardType="number-pad"
                  placeholder={translate('package.weight')!}
                  placeholderTextColor={COLORS.primary}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={packageWeight =>
                    setPackageWeight(packageWeight)
                  }
                />
                {isFieldEmpty(customerOrder.packageWeight) ? (
                  <RejectIcon />
                ) : (
                  <VerifiedIcon />
                )}
              </View>
            </View>
            <View style={styles.note}>
              <View style={styles.action}>
                <MaterialCommunityIcons
                  name="note-edit"
                  color={COLORS.primary}
                  size={20}
                />
                <TextInput
                  value={customerOrder.note}
                  placeholder={translate('package.note')!}
                  placeholderTextColor={COLORS.primary}
                  style={styles.textInput}
                  onChangeText={note => setNote(note)}
                />
              </View>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => onCreateOrder()}
                style={[
                  styles.signIn,
                  {
                    borderWidth: 1,
                    marginTop: 15,
                    borderColor: COLORS.primary,
                  },
                ]}>
                <Text style={[styles.textSign]}>
                  {translate('order.confirmOrder')!}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.ScrollView>
        </Animatable.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
