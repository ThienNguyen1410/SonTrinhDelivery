import React, { FC, useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthParamList } from '../../navigation/AuthStack';
import { AccountContextType } from '../../state/@types/account';
import { AccountContext } from '../../state/AccountContext';
import { COLORS } from '../../theme/colors';
import { styles } from './styles';
import { StackScreenProps } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { translate, useTranslation } from '../../components/language';

export const DeliveryScreen: FC<StackScreenProps<AuthParamList, 'delivery'>> = ({
    navigation,
}) => {
    MaterialIcons.loadFont();
    const { account } = useContext(AccountContext) as AccountContextType;

    const onPressBack = () => {
        navigation.navigate('home');
    };

    return (
        <Animatable.View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onPressBack()}>
                    <MaterialIcons name="arrow-back-ios" size={26} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {translate('DeliveryScreen.title')}
                </Text>
            </View>
            <ScrollView>
                <Text
                    style={[
                        styles.text_footer,
                    ]}>
                    {translate('DeliveryScreen.driverInfo')}
                </Text>
                <View style={styles.driver_info_container}>
                    <Image
                        style={styles.driver_image}
                        source={require('../../assets/profile/profile.png')}
                    />
                    <View style={styles.driver_info}>
                        <Text style={styles.name}>Nguyễn Hoàng Thiên</Text>
                        <Text style={styles.phone}>0359512974</Text>
                        <Text style={styles.date}>0359512974</Text>
                    </View>
                </View>
                <View style={styles.vehicle_info}>
                    <Text
                        style={[
                            styles.text_footer,
                        ]}>
                        {translate('DeliveryScreen.vehicleInformation')}
                    </Text>
                    <View style={styles.row_container}>
                        <MaterialCommunityIcons
                            name="car"
                            color={COLORS.primary}
                            size={30}
                        />
                        <View style={styles.vertical_container}>
                            <Text style={styles.textInput}>{translate('vehicle.title')}</Text>
                            <Text style={styles.textDetail}>
                                2H 30
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row_container}>
                        <MaterialCommunityIcons
                            name="calendar-range-outline"
                            color={COLORS.primary}
                            size={30}
                        />
                        <View style={styles.vertical_container}>
                            <Text style={styles.textInput}>{translate('vehicle.licensePlate')}</Text>
                            <Text style={styles.textDetail}>
                                2H 30
                            </Text>
                        </View>
                    </View>

                </View>
                <View style={styles.delivery_info}>
                    <Text
                        style={[
                            styles.text_footer,
                        ]}>
                        {translate('DeliveryScreen.title')}
                    </Text>
                    <View style={styles.row_container}>
                        <MaterialCommunityIcons
                            name="list-status"
                            color={COLORS.primary}
                            size={30}
                        />
                        <View style={styles.vertical_container}>
                            <Text style={styles.textInput}>{translate('delivery.status')}</Text>
                            <Text style={styles.textDetail}>
                                2H 30
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row_container}>
                        <MaterialCommunityIcons
                            name="calendar-month"
                            color={COLORS.primary}
                            size={30}
                        />
                        <View style={styles.vertical_container}>
                            <Text style={styles.textInput}>{translate('delivery.date')}</Text>
                            <Text style={styles.textDetail}>
                                2H 30
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row_container}>
                        <MaterialCommunityIcons
                            name="timeline-clock-outline"
                            color={COLORS.primary}
                            size={30}
                        />
                        <View style={styles.vertical_container}>
                            <Text style={styles.textInput}>{translate('delivery.timeStart')}</Text>
                            <Text style={styles.textDetail}>
                                2H 30
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row_container}>
                        <MaterialCommunityIcons
                            name="timeline-check-outline"
                            color={COLORS.primary}
                            size={30}
                        />
                        <View style={styles.vertical_container}>
                            <Text style={styles.textInput}>{translate('delivery.timeArrive')}</Text>
                            <Text style={styles.textDetail}>
                                10H 30
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row_container}>
                        <MaterialCommunityIcons
                            name='map-marker-radius-outline'
                            color={COLORS.primary}
                            size={30}
                        />
                        <View style={styles.vertical_container}>
                            <Text style={styles.textInput}>{translate('delivery.from')}</Text>
                            <Text style={styles.textDetail}>
                                Vũng Tàu
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row_container}>
                        <MaterialCommunityIcons
                            name="map-marker-check-outline"
                            color={COLORS.primary}
                            size={30}
                        />
                        <View style={styles.vertical_container}>
                            <Text style={styles.textInput}>{translate('delivery.to')}</Text>
                            <Text style={styles.textDetail}>
                                TP Hồ Chí Minh
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text_button}>
                        {translate('order.createOrder')}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </Animatable.View >
    );
};

