import React, {FC, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '@colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {translate} from '@component/language';
import {DriverReposityImpl} from '@repository/DriverReposityImpl';
import {CustomerOrderParamList} from '@navigation/customer-navigator/order/CustomerOrderNavigator';
import {BackIcon} from '@component/icons/CustomIcons';

const initalState = {
  avatarUri: '',
  username: '',
  phone: '',
  birth: '',
  vehicle: '',
  licensePlate: '',
};

export const OrderDetailScreen: FC<
  StackScreenProps<CustomerOrderParamList, 'detail'>
> = ({route, navigation}) => {
  const {order} = route.params;
  const [driverInfo, setDriverInfo] = useState<any>(initalState);
  const onPressBack = () => {
    navigation.goBack();
  };

  const onCreateOrder = () => {
    navigation.navigate('create', {availableOrder: order});
  };

  console.log('OrderDetailScreen', order);

  useEffect(() => {
    const driverRepo = new DriverReposityImpl();
    driverRepo
      .getDriverGeneralInfo(order.driverId)
      .then(generalInfo => {
        console.log('GENERAL INFO : ', generalInfo);
        setDriverInfo(generalInfo);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <BackIcon action={() => navigation.goBack()} />
          <StatusBar
            backgroundColor={COLORS.primary}
            barStyle="light-content"
          />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
            {translate('DeliveryScreen.title')}
          </Text>
        </View>
        <Animatable.View animation="fadeInUpBig">
          <ScrollView style={styles.footer}>
            <Text style={[styles.text_footer]}>
              {translate('DeliveryScreen.driverInfo')}
            </Text>
            <View style={styles.driver_info_container}>
              <Image
                style={styles.driver_image}
                source={{uri: order.driver_avatarUrl}}
              />
              <View style={styles.driver_info}>
                <Text style={styles.name}>{driverInfo.username}</Text>
                <Text style={styles.phone}>{driverInfo.phone}</Text>
                <Text style={styles.date}>{driverInfo.birth}</Text>
              </View>
            </View>
            <View style={styles.vehicle_info}>
              <Text style={[styles.text_footer]}>
                {translate('DeliveryScreen.vehicleInformation')}
              </Text>
              <View style={styles.row_container}>
                <MaterialCommunityIcons
                  name="car"
                  color={COLORS.primary}
                  size={30}
                />
                <View style={styles.vertical_container}>
                  <Text style={styles.textInput}>
                    {translate('vehicle.title')}
                  </Text>
                  <Text style={styles.textDetail}>{driverInfo.vehicle}</Text>
                </View>
              </View>
              <View style={styles.row_container}>
                <MaterialCommunityIcons
                  name="calendar-range-outline"
                  color={COLORS.primary}
                  size={30}
                />
                <View style={styles.vertical_container}>
                  <Text style={styles.textInput}>
                    {translate('vehicle.licensePlate')}
                  </Text>
                  <Text style={styles.textDetail}>
                    {driverInfo.licensePlate}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.delivery_info}>
              <Text style={[styles.text_footer]}>
                {translate('DeliveryScreen.title')}
              </Text>
              <View style={styles.row_container}>
                <MaterialCommunityIcons
                  name="timeline-clock-outline"
                  color={COLORS.primary}
                  size={30}
                />
                <View style={styles.vertical_container}>
                  <Text style={styles.textInput}>
                    {translate('delivery.timeStart')}
                  </Text>
                  <Text style={styles.textDetail}>{order.departureTime}</Text>
                </View>
              </View>
              <View style={styles.row_container}>
                <MaterialCommunityIcons
                  name="timeline-check-outline"
                  color={COLORS.primary}
                  size={30}
                />
                <View style={styles.vertical_container}>
                  <Text style={styles.textInput}>
                    {translate('delivery.timeArrive')}
                  </Text>
                  <Text style={styles.textDetail}>{order.arrivalTime}</Text>
                </View>
              </View>
              <View style={styles.row_container}>
                <MaterialCommunityIcons
                  name="map-marker-radius-outline"
                  color={COLORS.primary}
                  size={30}
                />
                <View style={styles.vertical_container}>
                  <Text style={styles.textInput}>
                    {translate('delivery.from')}
                  </Text>
                  <Text style={styles.textDetail}>{order.from}</Text>
                </View>
              </View>
              <View style={styles.row_container}>
                <MaterialCommunityIcons
                  name="map-marker-check-outline"
                  color={COLORS.primary}
                  size={30}
                />
                <View style={styles.vertical_container}>
                  <Text style={styles.textInput}>
                    {translate('delivery.to')}
                  </Text>
                  <Text style={styles.textDetail}>{order.to}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => onCreateOrder()}
              style={styles.button}>
              <Text style={styles.text_button}>
                {translate('order.createOrder')}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Animatable.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
