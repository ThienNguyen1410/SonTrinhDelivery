import React, {FC} from 'react';
import {Steps} from '@component/stepper/Steps';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {COLORS} from '@theme/colors';
import {translate} from '@component/language';
import Clipboard from '@react-native-clipboard/clipboard';
import {CopyIcon} from '@component/icons/payment/PaymentIcon';
import {CheckIcon} from '@component/icons/status/StatusIcons';
import {
  BackIcon,
  BackIconBlack,
  CarCheckIcon,
  DeliveringCarIcon,
  ReceivedPackage,
} from '@component/icons/CustomIcons';
import {ConfirmStep} from '@component/stepper/ConfirmStep';
import {PickupStep} from '@component/stepper/PickUpStep';
import {DeliveringStep} from '@component/stepper/DeliveringStep';
import {ReleaseOrderStep} from '@component/stepper/FinishStep';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeParamList} from '@navigation/customer-navigator/home/HomeNavigator';
import {CopyButton} from '@component/copy/CopyButton';
import {useStoreState} from '@state/store/store';
import {APRROVED, COMPLETED, DELIVERING, PICKUP} from '@constant/order/State';
export const CustomerOrderStep: FC<
  StackScreenProps<HomeParamList, 'orderSteps'>
> = ({navigation, route}) => {
  const copyOrderToClipboard = () => {
    Clipboard.setString('14101999001');
    Alert.alert(
      translate('bankInstruction.copied')!,
      translate('bankInstruction.order')!,
    );
  };
  const {item} = route.params;
  console.log('CURRENT ORDER : ', item.order.orderStatus);

  return (
    <SafeAreaView style={styles.container}>
      {/* Start mark - circle flex-end */}
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BackIconBlack action={() => navigation.goBack()} />
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={styles.titleText}>{translate('order.myOrder')}</Text>
        </View>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.orderText}>{translate('order.id')} : </Text>
        <Text style={styles.orderText}>{item.order.orderId}</Text>
        <CopyButton
          value={item.order.orderId}
          title="bankInstruction.copied"
          subtitle="bankInstruction.order"
        />
      </View>
      {/* Receive Package Steps */}
      <ConfirmStep
        date={item.order.orderStatus.date}
        time={item.order.orderStatus.time}
        circleColor={
          item.order.orderStatus.state === APRROVED
            ? COLORS.primary
            : COLORS.gray
        }
        lineColor={
          item.order.orderStatus.state === APRROVED
            ? COLORS.primary
            : COLORS.gray
        }>
        <CheckIcon />
      </ConfirmStep>
      {/* Receive Package Steps */}
      <PickupStep
        date="date"
        time="time"
        circleColor={
          item.order.orderStatus.state === PICKUP ? COLORS.primary : COLORS.gray
        }
        lineColor={
          item.order.orderStatus.state === PICKUP ? COLORS.primary : COLORS.gray
        }>
        <CarCheckIcon size={15} />
      </PickupStep>
      {/* Delivering Steps */}
      <DeliveringStep
        date="date"
        time="time"
        circleColor={
          item.order.orderStatus.state === DELIVERING
            ? COLORS.primary
            : COLORS.gray
        }
        lineColor={
          item.order.orderStatus.state === DELIVERING
            ? COLORS.primary
            : COLORS.gray
        }>
        <DeliveringCarIcon size={15} />
      </DeliveringStep>
      {/* Finish Steps */}
      <ReleaseOrderStep
        date="date"
        time="time"
        circleColor={
          item.order.orderStatus.state === COMPLETED
            ? COLORS.primary
            : COLORS.gray
        }
        disableLine={true}>
        <ReceivedPackage size={15} />
      </ReleaseOrderStep>
    </SafeAreaView>
  );
};
