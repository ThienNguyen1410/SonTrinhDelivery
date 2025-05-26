import React, {FC, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {translate} from '@component/language';
import {useStoreActions, useStoreState} from '@state/store/store';
import {
  isValidPhoneNumber,
  isFieldEmpty,
  getCurrentTime,
  getCurrentDate,
} from '@util/Utils';
import {RejectIcon, VerifiedIcon} from '@component/icons/status/StatusIcons';
import {BackIcon} from '@component/icons/CustomIcons';
import {FromToIcon} from '@component/icons/places/PlacesIcons';
import DropdownMenu from '@component/dropdown/DropDownMenu';
import {MOMO, STATUS} from '@constant/Payment';
import {MomoRepositoryImpl} from '@repository/customer/payments/MomoRepoImpl';
import {CustomerOrderParamList} from '@navigation/customer-navigator/order/CustomerOrderNavigator';
import {OrderState} from '@domain/model/customer/order/State';
import {PENDING} from '@constant/order/State';

export const ConfirmScreen: FC<
  StackScreenProps<CustomerOrderParamList, 'confirm'>
> = ({navigation}) => {
  const {setLoading} = useStoreActions(action => action.app);
  const {customerOrder} = useStoreState(state => state.customerOrder);
  const {setOrderState, setPaymentMethod, setOrderId} = useStoreActions(
    action => action.customerOrder,
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedPaymentTag, setSelectedPaymentTag] = useState('');

  const onConfirmOrder = async (price: string) => {
    console.log('Current Time : ', getCurrentTime());
    console.log('Current Date : ', getCurrentDate());
    setLoading(true);
    if (customerOrder.paymentMethod === MOMO) {
      console.log(
        'CUSTOMER ORDER : ',
        JSON.stringify(customerOrder, undefined, 2),
      );
      const momoRepo = new MomoRepositoryImpl();
      try {
        const order = await momoRepo.requestPayment(price);
        console.log('ORDER MOMO : ', order);
        console.log('Current Time : ', getCurrentTime());
        console.log('Current Date : ', getCurrentDate());

        if (order.status === STATUS.SUCCESS) {
          setLoading(false);
          setOrderId(order.data.orderId);
          await Linking.openURL(order.data.deeplink);
          setOrderState(PENDING);
        } else {
          setLoading(false);
          Alert.alert(
            'Không thể kết nối tới Momo',
            'Vui lòng chọn phương thức thanh toán khác hoặc thử lại sau',
          );
        }
      } catch (error) {
        console.log('Paymnet API error', error);
        setLoading(false);
        Alert.alert(
          'Cổng kết nối Momo đang bị lỗi',
          'Vui lòng chọn phương thức thanh toán khác hoặc thử lại sau',
        );
      }
    } else {
      setLoading(false);
      navigation.navigate('bankInfo');
    }
  };

  const handlePaymentMethodSelect = (
    paymentMethod: string,
    paymentTag: string,
  ) => {
    setSelectedPaymentMethod(paymentMethod);
    setSelectedPaymentTag(paymentTag);
    setPaymentMethod(paymentTag);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackIcon action={() => navigation.goBack()} />
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
          {translate('order.confirmOrder')}
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
              {translate('package.title')}
            </Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="map-marker-radius-outline"
                color={COLORS.primary}
                size={20}
              />
              <Text style={styles.textInput}>{customerOrder.from}</Text>
            </View>
            <FromToIcon />
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="map-marker-check-outline"
                color={COLORS.primary}
                size={20}
              />
              <Text style={styles.textInput}>{customerOrder.from}</Text>
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="face-agent"
                color={COLORS.primary}
                size={20}
              />
              <Text style={styles.textInput}>{customerOrder.receiver}</Text>
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
              <Text style={styles.textInput}>
                {customerOrder.receiverPhone}
              </Text>
              {isValidPhoneNumber(customerOrder.receiverPhone) ? (
                <VerifiedIcon />
              ) : (
                <RejectIcon />
              )}
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="package"
                color={COLORS.primary}
                size={20}
              />
              <Text style={styles.textInput}>{customerOrder.packageType}</Text>
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
              <Text style={styles.textInput}>
                {customerOrder.packageWeight}
              </Text>
              {isFieldEmpty(customerOrder.packageWeight) ? (
                <RejectIcon />
              ) : (
                <VerifiedIcon />
              )}
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="note-edit"
                color={COLORS.primary}
                size={20}
              />
              <Text style={styles.textInput}>{customerOrder.note}</Text>
            </View>
          </View>
          <View style={styles.location}>
            <View style={styles.action}>
              {customerOrder.paymentMethod === MOMO ? (
                <Animatable.Image
                  style={styles.logo}
                  source={require('@UI/assets/brand-logo/momoLogo.png')}
                />
              ) : (
                <MaterialCommunityIcons
                  name="bank-outline"
                  color={COLORS.primary}
                  size={20}
                />
              )}
              <DropdownMenu onSelect={handlePaymentMethodSelect} />
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="account-cash-outline"
                color={COLORS.primary}
                size={20}
              />
              <Text style={styles.textInput}>10.000 VND</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => onConfirmOrder('10000')}
            style={[
              styles.signIn,
              {
                borderWidth: 1,
                marginTop: 15,
                backgroundColor:
                  customerOrder.paymentMethod === MOMO
                    ? COLORS.momo
                    : COLORS.bank,
              },
            ]}>
            <Text style={[styles.textSign]}>{translate('payment.pay')}</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
