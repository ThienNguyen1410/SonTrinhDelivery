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
import {COLORS} from '@colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {translate, useTranslation} from '@component/language';
import {
  BackIcon,
  CarIcon,
  LicensePlateIcon,
  PhoneIcon,
} from '@component/icons/CustomIcons';
import {useStoreActions, useStoreState} from '@store/store';
import TimePicker from '@component/time/TimePicker';
import {POIFromIcon, POIToIcon} from '@component/icons/places/PlacesIcons';
import {
  ArrivalTimeIcon,
  DepartureTimeIcon,
} from '@component/icons/times/TimeIcons';
import {RejectIcon, VerifiedIcon} from '@component/icons/status/StatusIcons';
import {OrderParamList} from '@navigation/driver-navigator/order/OrderNavigator';
import {ORDER_INITAL_STATE} from '@state/store/driver/OrderStore';

export const CreateOrderScreen: FC<
  StackScreenProps<OrderParamList, 'createOrder'>
> = ({navigation}) => {
  const {setLoading} = useStoreActions(state => state.app);
  const {driver} = useStoreState(state => state.driver);
  const {order} = useStoreState(state => state.driverOrder);
  const {
    setOrder,
    setFrom,
    setTo,
    setArrivalTime,
    setDepartureTime,
    setDriverId,
    setDriverName,
    setDriverAvatarUrl,
  } = useStoreActions(actions => actions.driverOrder);

  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
  const {locale} = useTranslation();

  async function handlePress() {
    setDriverId(driver.userId);
    setDriverName(driver.generalInfo.username);
    setDriverAvatarUrl(driver.generalInfo.avatarUri);
    navigation.navigate('confirmOrder');
  }

  useEffect(() => {
    if (order !== undefined) {
      if (
        order.arrivalTime != '' &&
        order.departureTime != '' &&
        order.departureTime >= order.arrivalTime
      ) {
        Alert.alert(translate('common.re_check'), translate('errors.time'), {
          text: 'OK',
          onPress: setArrivalTime(''),
        });
      }
    } else {
      setOrder(ORDER_INITAL_STATE);
    }
  }, [order.departureTime, order.arrivalTime]);

  useEffect(() => {
    if (order !== undefined) {
      if (order.from && order.to && order.arrivalTime && order.departureTime) {
        setButtonDisable(false);
      } else {
        setButtonDisable(true);
      }
    } else {
      setOrder(ORDER_INITAL_STATE);
    }
  }, [order.from, order.to, order.departureTime, order.arrivalTime]);

  useEffect(() => {
    if (order === undefined) {
      setOrder(ORDER_INITAL_STATE);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <BackIcon action={() => navigation.goBack()} />
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
              <POIFromIcon />
              {/* Google Place Input */}
              <TextInput
                placeholder={translate('delivery.from')?.toString()}
                placeholderTextColor={COLORS.primary}
                style={styles.textInput}
                value={order.from}
                autoCapitalize="none"
                onChangeText={from => setFrom(from)}
              />
              {order.from ? <VerifiedIcon /> : <RejectIcon />}
            </View>
            <View style={styles.action}>
              <POIToIcon />
              {/* Google Place Input */}
              <TextInput
                placeholder={translate('delivery.to')?.toString()}
                placeholderTextColor={COLORS.primary}
                style={styles.textInput}
                value={order.to}
                autoCapitalize="sentences"
                onChangeText={to => setTo(to)}
              />
              {order.to ? <VerifiedIcon /> : <RejectIcon />}
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
              {translate('time.title')}
            </Text>
            <View style={styles.action}>
              {/* Set Icon */}
              <DepartureTimeIcon />
              <View
                style={[
                  styles.time_action,
                  {width: locale == 'vi' ? '78%' : '55%'},
                ]}>
                <TimePicker
                  onTimeSelected={time =>
                    setDepartureTime(time.toLocaleString())
                  }
                />
                <Text style={styles.time_text}>
                  {translate('time.departure_time')}
                </Text>
              </View>
            </View>

            <View style={styles.action}>
              {/* Set Icon */}
              <ArrivalTimeIcon />
              <View
                style={[
                  styles.time_action,
                  {width: locale == 'vi' ? '78%' : '55%'},
                ]}>
                <TimePicker
                  onTimeSelected={time => setArrivalTime(time.toLocaleString())}
                />
                <Text style={styles.time_text}>
                  {translate('time.arrival_time')}
                </Text>
              </View>
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
              {translate('DeliveryScreen.title')}
            </Text>
            <View style={styles.action}>
              {/* Set Icon */}
              <CarIcon />
              <Text style={styles.text_info}>{driver.generalInfo.vehicle}</Text>
            </View>
            <View style={styles.action}>
              {/* Custome Icons */}
              <LicensePlateIcon />
              <Text style={styles.text_info}>
                {driver.generalInfo.licensePlate}
              </Text>
            </View>
            <View style={styles.action}>
              {/* Custome Icons */}
              <PhoneIcon />
              <Text style={styles.text_info}>{driver.generalInfo.phone}</Text>
            </View>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => handlePress()}
              disabled={buttonDisable}
              style={[
                styles.signIn,
                {
                  borderColor: !buttonDisable ? COLORS.primary : COLORS.gray,
                  backgroundColor: !buttonDisable
                    ? COLORS.primary
                    : COLORS.white,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: !buttonDisable ? COLORS.white : COLORS.gray,
                  },
                ]}>
                {translate('common.confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
