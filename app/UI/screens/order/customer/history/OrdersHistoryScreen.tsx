import {ListItem} from '@component/history-orders/HistoryOrderItem';
import React, {useRef} from 'react';
import {FlatList, Text, View, ViewToken} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {styles} from './styles';

const data = new Array(10).fill(0).map((_, index) => ({id: index + 1}));

console.log('DATA', data);

export const OrderHistoryScreen = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const onViewableItemsChanged = ({viewableItems: vItems}) => {
    viewableItems.value = vItems;
  };
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Order History</Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={data}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          renderItem={({item}) => {
            return <ListItem item={item} viewableItems={viewableItems} />;
          }}
        />
      </View>
    </View>
  );
};
