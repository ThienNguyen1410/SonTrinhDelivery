import * as React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
  ViewToken,
} from 'react-native';
import {COLORS} from '@colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {translate, useTranslation} from '@component/language';
import SearchBar from '@component/SearchBar';
import {useStoreActions, useStoreState} from '@store/store';
import {HomeParamList} from '@navigation/customer-navigator/home/HomeNavigator';
import {useSharedValue} from 'react-native-reanimated';
import {ListItem} from '@component/history-orders/HistoryOrderItem';
import {CarIcon} from '@component/icons/CustomIcons';
import {OrderStatus} from '@component/order/status/OrderStatus';
import {OrderRepositoryImpl} from '@repository/customer/OrderRepositoryImpl';
import {CustomerOrder} from '@state/store/customer/OrderStore';

const HomeScreen: React.FC<StackScreenProps<HomeParamList, 'home'>> = ({
  navigation,
}) => {
  const {locale} = useTranslation();
  const {customer} = useStoreState(state => state.customer);
  const [customerOrders, setCustomerOrders] = React.useState<CustomerOrder[]>(
    [],
  );

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const onViewableItemsChanged = ({viewableItems: vItems}) => {
    viewableItems.value = vItems;
  };
  const viewabilityConfigCallbackPairs = React.useRef([
    {onViewableItemsChanged},
  ]);

  const handleListItemsPress = (item: CustomerOrder) => {
    navigation.navigate('orderSteps', {item});
  };

  React.useEffect(() => {
    const orderRepo = new OrderRepositoryImpl();
    orderRepo.getOrderState(orders => {
      console.log('ORDERS : ', orders);
      setCustomerOrders(orders);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header_container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>
            {translate('HomeScreen.greeting')}
          </Text>
          <Text style={styles.text_header}>{customer.username}</Text>
          <Text style={styles.text_footer}>
            {translate('HomeScreen.slogan')}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <View style={styles.avatar_container}>
            <Image
              style={styles.profile}
              source={require('@UI/assets/profile/profile.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <SearchBar />
      <View style={styles.list}>
        <FlatList
          data={customerOrders}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          renderItem={({item}) => {
            return (
              <ListItem
                item={item}
                viewableItems={viewableItems}
                handlePress={() => handleListItemsPress(item)}>
                <OrderStatus
                  orderId={item.order.orderId}
                  status={item.order.orderStatus.state}
                />
              </ListItem>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
