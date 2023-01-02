import * as React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../theme/colors';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabParamList} from '../../navigation/BottomTab';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {AccountContext} from '../../state/AccountContext';
import {AccountContextType} from '../../state/@types/account';
import {profile} from '../../assets/profile/profile';
import {AuthParamList} from '../../navigation/AuthStack';
import {translate, useTranslation} from '../../components/language';
import SearchBar from '../../components/SearchBar';
import {DeliverySumaryInfo} from '../../components/delivery/delivery-sumary-info';

const HomeScreen: React.FC<StackScreenProps<AuthParamList, 'home'>> = ({
  navigation,
}) => {
  MaterialCommunityIcons.loadFont();
  Feather.loadFont();
  const {locale} = useTranslation();

  const onDetailDeliveryPress = () => {
    navigation.navigate('delivery');
  };

  const deliveryInfo = [
    {
      from: 'TP Hồ Chí Minh',
      to: 'Vũng Tàu',
      driver: 'Tài xế',
    },
    {
      from: 'Vũng Tàu',
      to: 'TP Hồ Chí Minh',

      driver: 'Tài xế',
    },
    {
      from: 'Cà Mau',
      to: 'Vũng Tàu',

      driver: 'Tài xế',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header_container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>
            {translate('HomeScreen.greeting')} : {account.username}{' '}
          </Text>
          <Text style={styles.text_footer}>
            {translate('HomeScreen.slogan')}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <View style={styles.avatar_container}>
            <Image
              style={styles.profile}
              source={require('../../assets/profile/profile.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <SearchBar />
      <ScrollView style={styles.footer}>
        {deliveryInfo.map(info => {
          return (
            <Animatable.View animation="fadeInUpBig">
              <DeliverySumaryInfo
                driver={info.driver}
                from={info.from}
                to={info.to}
                eventHandler={onDetailDeliveryPress}
              />
            </Animatable.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
