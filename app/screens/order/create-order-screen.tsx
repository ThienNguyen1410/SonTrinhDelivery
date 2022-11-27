import React, { FC, useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthParamList } from '../../navigation/AuthStack';
import { styles } from './styles';
import { AccountContext } from '../../state/AccountContext';
import { AccountContextType, IAccount } from '../../state/@types/account';
import { database } from '../../service/firebase/database';
import { AppStackList } from '../../navigation/BottomTab';
import HomeScreen from '../home/home-screen';
import { StackScreenProps } from '@react-navigation/stack';
import { translate } from '../../components/language';

type Props = NativeStackScreenProps<AppStackList, 'home'>;

export const CreateOrderScreen: FC<StackScreenProps<AuthParamList, 'createOrder'>> = ({ navigation }) => {

    Feather.loadFont().then;
    MaterialCommunityIcons.loadFont().then;
    const onPressBack = () => {
        navigation.navigate('home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
                <TouchableOpacity onPress={() => onPressBack()}>
                    <MaterialIcons name="arrow-back-ios" size={26} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
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
                            <MaterialCommunityIcons
                                name="map-marker-radius-outline"
                                color={COLORS.primary}
                                size={20}
                            />
                            <TextInput
                                placeholder={translate('delivery.from')}
                                style={styles.textInput} />
                        </View>
                        <View style={styles.action}>
                            <MaterialCommunityIcons
                                name="map-marker-check-outline"
                                color={COLORS.primary}
                                size={20}
                            />
                            <TextInput
                                placeholder={translate('delivery.to')}
                                style={styles.textInput}
                                autoCapitalize="none"
                            />
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
                            {translate('recipient.title')}
                        </Text>
                        <View style={styles.action}>
                            <MaterialCommunityIcons
                                name="face-agent"
                                color={COLORS.primary}
                                size={30}
                            />
                            <TextInput
                                placeholder={translate('recipient.name')}
                                style={styles.textInput} />
                        </View>
                        <View style={styles.action}>
                            <MaterialCommunityIcons
                                name="phone"
                                color={COLORS.primary}
                                size={30}
                            />
                            <TextInput
                                placeholder={translate('recipient.phone')}
                                style={styles.textInput}
                                autoCapitalize="none"
                            />
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
                            {translate('package.title')}
                        </Text>
                        <View style={styles.action}>
                            <MaterialCommunityIcons
                                name="package"
                                color={COLORS.primary}
                                size={30}
                            />
                            <TextInput
                                placeholder={translate('package.detail')}
                                style={styles.textInput} />
                        </View>
                        <View style={styles.action}>
                            <MaterialCommunityIcons
                                name="weight"
                                color={COLORS.primary}
                                size={30}
                            />
                            <TextInput
                                placeholder={translate('package.weight')}
                                style={styles.textInput}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.button}>
                    <TouchableOpacity
                        // disabled={isPasswordMatch()}
                        style={[
                            styles.signIn,
                            {
                                borderWidth: 1,
                                marginTop: 15,
                            },
                        ]}>
                        <Text
                            style={[
                                styles.textSign,
                            ]}>
                            {translate('common.ok')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );

}
