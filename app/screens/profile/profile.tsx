import React, { FC, useContext, useState } from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthParamList } from '../../navigation/AuthStack';
import { AccountContextType } from '../../state/@types/account';
import { AccountContext } from '../../state/AccountContext';
import { COLORS } from '../../theme/colors';
import { styles } from "./styles";
import { StackScreenProps } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { useStorage } from '../../utils/storages/storages';
import { useTranslation } from '../../components/language';


const DATA_LANGUAGE = [
    {
        title: "English",
        value: "en",
    },
    {
        title: "Tiếng Việt",
        value: "vi",
    },
]

export const ProfileScreen: FC<StackScreenProps<AuthParamList, 'profile'>> = ({
    navigation,
}) => {


    MaterialIcons.loadFont()
    const { account } = useContext(AccountContext) as AccountContextType

    const { localeProvider, changeLocale } = useTranslation()
    const languageSelect =
        DATA_LANGUAGE.find((item) => item.value === localeProvider) || DATA_LANGUAGE[0]

    const useChangeSelect = async (data) => {
        changeLocale(data.value)
        setChangeLanguage(true)
        // TODO update title
    }

    const onPressBack = () => {
        navigation.navigate('home')
    }





    const onSignout = () => {
        auth().signOut().then(() => {
            navigation.navigate('signin')
        }
        ).catch((error) => console.log(error))
    }
    return (
        <Animatable.View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onPressBack()}>
                    <MaterialIcons name='arrow-back-ios' size={26} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thông tin khách hàng</Text>
            </View>
            <ScrollView>
                <View style={styles.customer_info_container}>
                    <Image style={styles.profile} source={require("../../assets/profile/profile.png")} />
                    <View style={styles.customer_info}>
                        <Text
                            style={styles.text_profile}
                        >{account.username}</Text>
                        <Text
                            style={styles.text_profile}
                        >{account.phone}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35,
                            },
                        ]}>
                        Tài Khoản
                    </Text>
                    <TouchableOpacity style={styles.customer_info_container}>
                        <MaterialCommunityIcons name="account-heart" color={COLORS.primary} size={30} />
                        <Text
                            style={styles.textInput}
                        >Ngôn Ngữ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSignout()} style={styles.customer_info_container}>
                        <MaterialCommunityIcons name="account-heart" color={COLORS.primary} size={30} />
                        <Text
                            style={styles.textInput}
                        >Đăng Xuất</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animatable.View>
    )
}