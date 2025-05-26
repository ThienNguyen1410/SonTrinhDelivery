import React, {FC, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {translate} from '@component/language';
import {CustomerOrderParamList} from '@navigation/customer-navigator/order/CustomerOrderNavigator';
import {useStoreActions, useStoreState} from '@state/store/store';

export const CreateOrderScreen: FC<
  StackScreenProps<CustomerOrderParamList, 'create'>
> = ({route}) => {
  const {customerOrder} = useStoreState(state => state.customerOrder);
  const {
    setDriverOrderId,
    setCustomerId,
    setFrom,
    setTo,
    setReceiver,
    setReceiverPhone,
    setPackageType,
    setPackageWeight,
    setNote,
  } = useStoreActions(action => action.customerOrder);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
          {translate('order.createOrder')}
        </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
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
                placeholder={translate('delivery.from')}
                placeholderTextColor={COLORS.primary}
                style={styles.textInput}
                onChangeText={from => setFrom(from)}
              />
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="map-marker-check-outline"
                color={COLORS.primary}
                size={20}
              />
              <TextInput
                placeholder={translate('delivery.to')}
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
                placeholder={translate('recipient.name')}
                placeholderTextColor={COLORS.primary}
                style={styles.textInput}
                onChangeText={receiver => setReceiver(receiver)}
              />
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="phone"
                color={COLORS.primary}
                size={20}
              />
              <TextInput
                placeholder={translate('recipient.phone')}
                placeholderTextColor={COLORS.primary}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={phone => setReceiverPhone(phone)}
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
              {translate('package.title')}
            </Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="package"
                color={COLORS.primary}
                size={20}
              />
              <TextInput
                placeholder={translate('package.detail')}
                placeholderTextColor={COLORS.primary}
                style={styles.textInput}
                onChangeText={packageType => setPackageType(packageType)}
              />
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="weight"
                color={COLORS.primary}
                size={20}
              />
              <TextInput
                placeholder={translate('package.weight')}
                placeholderTextColor={COLORS.primary}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={packageWeight => setPackageWeight(packageWeight)}
              />
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
                placeholder={translate('package.note')}
                placeholderTextColor={COLORS.primary}
                style={styles.textInput}
                onChangeText={note => setNote(note)}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.button}>
          <TouchableOpacity
            // disabled={isPasswordMatch()}
            style={[
              styles.signIn,
              {
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text style={[styles.textSign]}>{translate('common.ok')}</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
