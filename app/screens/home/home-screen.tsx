import React, { FC, useContext, useEffect, useRef, useState } from 'react';

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
import { COLORS } from '../../theme/colors';
import { styles } from './styles';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabParamList } from '../../navigation/BottomTab';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AccountContext } from '../../state/AccountContext';
import { AccountContextType } from '../../state/@types/account';
import { profile } from '../../assets/profile/profile';
import { AuthParamList } from '../../navigation/AuthStack';

const HomeScreen: FC<StackScreenProps<AuthParamList, 'home'>> = ({
    navigation,
}) => {
    MaterialCommunityIcons.loadFont();
    Feather.loadFont();
    const { account } = useContext(AccountContext) as AccountContextType

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <View style={styles.header_container}>
                <View style={styles.header} >
                    <Text style={styles.text_header}>Xin chào : {account.username} </Text>
                    <Text style={styles.text_footer}>Bạn muốn vận chuyển gì hôm nay nào ?</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                    <View style={styles.avatar_container}>
                        <Image style={styles.profile} source={require("../../assets/profile/profile.png")} />
                    </View>
                </TouchableOpacity>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[
                    styles.footer,
                    {
                        backgroundColor: COLORS.background,
                    },
                ]}>

                <View>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35,
                            },
                        ]}>
                        Nơi Lấy Hàng
                    </Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons
                            name="map-marker"
                            color={COLORS.primary}
                            size={20}
                        />
                        <GooglePlacesAutocomplete
                            placeholder="Địa Điểm"
                            onPress={(data, details = null) => {
                                console.log(data, details);
                            }}
                            query={{
                                key: 'AIzaSyBNkZblbZA8hxxwOJMEs3xft9qUoJ_993A',
                                language: 'vi',
                                components: "country:vn"
                            }}
                        />


                    </View>

                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35,
                            },
                        ]}>
                        Nơi Nhận Hàng
                    </Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons
                            name="archive-marker"
                            color={COLORS.primary}
                            size={20}
                        />
                        <GooglePlacesAutocomplete
                            placeholder='Địa Điểm'
                            onPress={(data, details = null) => {
                                console.log(data, details);
                            }}
                            query={{
                                key: 'AIzaSyBNkZblbZA8hxxwOJMEs3xft9qUoJ_993A',
                                language: 'vi',
                                components: "country:vn"
                            }}
                        />
                    </View>
                </View>
            </Animatable.View>
        </View >
    );
};

export default HomeScreen;
