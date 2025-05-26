import * as React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '@colors';
import {styles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthParamList} from '../../../navigation/AuthStack';
import {translate, useTranslation} from '@component/language';
import SearchBar from '@component/SearchBar';
import {DriverParamList} from '@navigation/DriverStack';
import GooglePlacesInput from '../../components/google-place/PlaceInput';
import {NameIcon} from '@component/icons/general/InfomationIcons';
import {useStoreState} from '@store/store';

const DriverHomeScreen: React.FC<StackScreenProps<DriverParamList, 'home'>> = ({
  navigation,
}) => {
  const {driver} = useStoreState(state => state.driver);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header_container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>
            {translate('HomeScreen.greeting')}
          </Text>
          <Text style={styles.text_header}>{driver.generalInfo.username}</Text>
          <Text style={styles.text_footer}>
            {translate('HomeScreen.slogan')}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <View style={styles.avatar_container}>
            <NameIcon />
          </View>
        </TouchableOpacity>
      </View>
      <SearchBar />
      <ScrollView style={styles.footer}>
        {/*   {deliveryInfo.map(info => { */}
        {/*     return ( */}
        {/*       <Animatable.View animation="fadeInUpBig"> */}
        {/*         <DeliverySumaryInfo */}
        {/*           driver={info.driver} */}
        {/*           from={info.from} */}
        {/*           to={info.to} */}
        {/*           eventHandler={onDetailDeliveryPress} */}
        {/*         /> */}
        {/*       </Animatable.View> */}
        {/*     ); */}
        {/*   })} */}
      </ScrollView>
    </View>
  );
};

export default DriverHomeScreen;
