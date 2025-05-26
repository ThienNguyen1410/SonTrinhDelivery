import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '@colors';
import {styles} from './style';
import {translate} from '@component/language/translate';
import {
  BankCardIcon,
  BankHolderNameIcon,
  CopyIcon,
  OrderIcon,
} from '@component/icons/payment/PaymentIcon';
import {useStoreState} from '@state/store/store';
import {BackIcon} from '@component/icons/CustomIcons';
import {HomeParamList} from '@navigation/customer-navigator/home/HomeNavigator';
import {StackScreenProps} from '@react-navigation/stack';

export const BankInfoScreen: FC<
  StackScreenProps<HomeParamList, 'bankInfo'>
> = ({navigation}) => {
  const {customerOrder} = useStoreState(state => state.customerOrder);
  console.log('CUSTOMER ORDERID : ', customerOrder.orderId);

  const copyBankNumberToClipboard = () => {
    Clipboard.setString('14101999001');
    Alert.alert(
      translate('bankInstruction.banknumberCopied')!,
      translate('bankInstruction.bankNote')!,
    );
  };

  const copyOrderIDToClipboard = () => {
    Clipboard.setString('orderId');
    Alert.alert(
      translate('bankInstruction.order'),
      translate('bankInstruction.orderNote'),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <BackIcon action={() => navigation.goBack()} />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
          {translate('payment.info')}
        </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.roundedImage}
            source={require('@UI/assets/brand-logo/TPBankLogo.png')}
          />
          <Text style={styles.text}>
            Ngân hàng Thương mại Cổ phần Tiên Phong
          </Text>
          <Text style={styles.text}>(TPBank)</Text>
        </View>
        <View style={styles.recipient}>
          <Text
            style={[
              styles.text_sub_header,
              {
                marginTop: 10,
              },
            ]}>
            {translate('payment.name')}
          </Text>
          <View style={styles.action}>
            {/* Set Icon */}
            <BankHolderNameIcon />
            <Text style={styles.time_text}>Nguyễn Hoàng Thiên</Text>
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
            {translate('payment.stk')}
          </Text>
          <View style={styles.action}>
            {/* Set Icon */}
            <BankCardIcon />
            <Text style={styles.time_text}>14101999001</Text>
            <CopyIcon action={() => copyBankNumberToClipboard()} />
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
            Mã đơn hàng
          </Text>
          <View style={styles.action}>
            {/* Set Icon */}
            <OrderIcon />
            <Text style={styles.time_text}>{customerOrder.orderId}</Text>
            <CopyIcon action={() => copyOrderIDToClipboard()} />
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                backgroundColor: COLORS.validIcon,
                borderColor: COLORS.validIcon,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text style={[styles.textButton]}>{translate('payment.pay')}</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
