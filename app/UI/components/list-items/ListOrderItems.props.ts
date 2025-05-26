import {AvailableCustomerOrder} from '@domain/model/AvaiableCustomerOrder';
import {ViewToken} from 'react-native';
import Animated from 'react-native-reanimated';

export interface ListOrderItemsProps {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  items: {
    item: AvailableCustomerOrder;
  };
  action: any;
}
