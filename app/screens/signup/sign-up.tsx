import React, { useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    KeyboardAvoidingView,
    Alert,
    useColorScheme,
    StyleSheetProperties,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthParamList } from '../../navigation/AuthStack';
import { styles } from './styles';
import { AccountContext } from '../../state/AccountContext';
import { AccountContextType, IAccount } from '../../state/@types/account';
import { database } from '../../service/firebase/database';

type Props = NativeStackScreenProps<AuthParamList, 'signin'>;

export const SignUpScreen = ({ navigation }: Props) => {
    Feather.loadFont().then;
    MaterialCommunityIcons.loadFont().then;
    const { account, updateUsername, updateBirth } = useContext(AccountContext) as AccountContextType
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const handleUsernameChange = (val: string) => {
        updateUsername(val)
    }

    const handleBirthChange = (val: string) => {
        updateBirth(val)
    }


    const handlePasswordChange = (val: string) => {
        setPassword(val);
    };

    const handleConfirmPasswordChange = (val: string) => {
        setConfirmPassword(val);
    };

    const onSignUp = async (user: IAccount) => {
        database.ref("user").set({
            username: user.username,
            phone: user.phone,
            birth: user.birth
        })

    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Tạo Tài Khoản !</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <ScrollView>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35,
                            },
                        ]}>
                        Số Điện Thoại
                    </Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons name="phone" color={COLORS.primary} size={20} />
                        <Text
                            style={styles.textInput}
                        >{account.phone}</Text>
                    </View>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35,
                            },
                        ]}>
                        Quý Danh
                    </Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons name="account-heart" color={COLORS.primary} size={20} />
                        <TextInput
                            onChangeText={val => handleUsernameChange(val)}
                            placeholder="Họ và tên của quý khách"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35,
                            },
                        ]}>
                        Ngày sinh
                    </Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons name="calendar-star" color={COLORS.primary} size={20} />
                        <TextInput
                            onChangeText={val => handleBirthChange(val)}
                            placeholder="Ngày tháng năm sinh của quý khách"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35,
                            },
                        ]}>
                        Mật Khẩu
                    </Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons
                            name="cellphone-lock"
                            color={COLORS.primary}
                            size={20}
                        />
                        <TextInput
                            placeholder="Mật khẩu của bạn"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={val => handlePasswordChange(val)}
                        />
                        {/* <TouchableOpacity>
                            {data.secureTextEntry ? (
                                <MaterialCommunityIcons name="eye-off" color="grey" size={20} />
                            ) : (
                                <MaterialCommunityIcons name="eye" color="grey" size={20} />
                            )}
                        </TouchableOpacity> */}
                    </View>

                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35,
                            },
                        ]}>
                        Xác nhận mật khẩu
                    </Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons
                            name="cellphone-lock"
                            color={COLORS.primary}
                            size={20}
                        />
                        <TextInput
                            placeholder="Mật khẩu của bạn"
                            // secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={val => handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity>
                            {/* {data.secureTextEntry ? (
                                <MaterialCommunityIcons name="eye-off" color="grey" size={20} />
                            ) : (
                                <MaterialCommunityIcons name="eye" color="grey" size={20} />
                            )} */}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => onSignUp(account)}
                            style={[
                                styles.signIn,
                                {
                                    borderColor: COLORS.primary,
                                    borderWidth: 1,
                                    marginTop: 15,
                                },
                            ]}>
                            <Text
                                style={[
                                    styles.textSign,
                                    {
                                        color: COLORS.primary,
                                    },
                                ]}>
                                Ok
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};