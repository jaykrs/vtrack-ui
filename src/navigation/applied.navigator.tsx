import React from 'react';
import {
    CompositeNavigationProp,
    RouteProp,
} from '@react-navigation/core';
import {
    createStackNavigator,
    StackNavigationProp,
} from '@react-navigation/stack';
import { AppliedTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { AppliedScreen, AppliedDetailScreen } from '../scenes/applied';
import { PaymentScreen } from '../scenes/payment';

type AppliedNavigatorParams = {
    [AppRoute.APPLIED]: undefined;
    [AppRoute.APPLIEDDETAIL]: undefined;
    [AppRoute.PAYMENT]: undefined;
}

export interface AppliedScreenProps {
    navigation: CompositeNavigationProp<
        AppliedTabNavigationProp,
        StackNavigationProp<AppliedNavigatorParams, AppRoute.APPLIED>
    >;
    route: RouteProp<AppliedNavigatorParams, AppRoute.APPLIED>;
}

export interface AppliedDetailScreenProps {
    navigation: CompositeNavigationProp<
        AppliedTabNavigationProp,
        StackNavigationProp<AppliedNavigatorParams, AppRoute.APPLIEDDETAIL>
    >;
    route: RouteProp<AppliedNavigatorParams, AppRoute.APPLIEDDETAIL>;
}

export interface PaymentScreenProps {
    navigation: CompositeNavigationProp<
        AppliedTabNavigationProp,
        StackNavigationProp<AppliedNavigatorParams, AppRoute.PAYMENT>
    >;
    route: RouteProp<AppliedNavigatorParams, AppRoute.PAYMENT>;
}


const Stack = createStackNavigator<AppliedNavigatorParams>();

export const AppliedNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.APPLIED} component={AppliedScreen} />
        <Stack.Screen name={AppRoute.APPLIEDDETAIL} component={AppliedDetailScreen} />
        <Stack.Screen name={AppRoute.PAYMENT} component={PaymentScreen} />
    </Stack.Navigator>
);
