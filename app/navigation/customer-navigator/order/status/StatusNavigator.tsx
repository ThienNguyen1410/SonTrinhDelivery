import {IndependentStackNavigator} from '@navigation/IndependentStackNavigator';
import {ApprovedScreen} from '@screens/order/customer/status/ApprovedScreen';
import {PendingScreen} from '@screens/order/customer/status/PendingScreen';

export const PendingNavigator = IndependentStackNavigator(PendingScreen);
export const ApprovedNavigator = IndependentStackNavigator(ApprovedScreen);
