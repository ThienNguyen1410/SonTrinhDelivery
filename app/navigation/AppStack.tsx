import React from 'react';
import { createStackNavigator } from "@react-navigation/stack"
import { ProfileScreen } from "../screens/profile/profile"
import { BottomTab, BottomTabParamList } from "./BottomTab"
import { NavigatorScreenParams } from '@react-navigation/native';

const Stack = createStackNavigator<AppParamList>()

export type AppParamList = {
    home: NavigatorScreenParams<BottomTabParamList>,
    profile: undefined
}

export const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={BottomTab} />
            <Stack.Screen name="profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}