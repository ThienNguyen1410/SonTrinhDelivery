import * as React from 'react';

import {View, Text, ScrollView, StatusBar, SafeAreaView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '@colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {translate, useTranslation} from '@component/language';
import {DeliverySumaryInfo} from '@component/delivery/delivery-sumary-info';
import {OrderRepositoryImpl} from '@repository/OrderRepositoryImpl';
import {AvailableDriverOrder} from '@domain/model/AvailableDriverOrder';
import {CustomerOrderParamList} from '@navigation/customer-navigator/order/CustomerOrderNavigator';

const HomeScreen: React.FC<
  StackScreenProps<CustomerOrderParamList, 'home'>
> = ({navigation}) => {
  const {locale} = useTranslation();

  const [orders, setOrders] = React.useState<AvailableDriverOrder[]>([]);

  const onDetailDeliveryPress = (info: AvailableDriverOrder) => {
    navigation.navigate('detail', {order: info});
  };

  React.useEffect(() => {
    const orderRepo = new OrderRepositoryImpl();
    orderRepo
      .getAvaiableOrders()
      .then(availableOrders => {
        console.log('CUSTOMER AvailableOrder : ', availableOrders);
        setOrders(availableOrders);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
          {translate('order.ready')}
        </Text>
      </View>
      <ScrollView style={styles.footer}>
        {orders.map((info, index) => {
          return (
            <Animatable.View key={index} animation="fadeInUpBig">
              <DeliverySumaryInfo
                order={info}
                eventHandler={() => onDetailDeliveryPress(info)}
              />
            </Animatable.View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
