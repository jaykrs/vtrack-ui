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
import { AppliedScreen } from '../scenes/applied';

type AppliedNavigatorParams = {
    [AppRoute.APPLIED]: undefined;
}

export interface AppliedScreenProps {
    navigation: CompositeNavigationProp<
        AppliedTabNavigationProp,
        StackNavigationProp<AppliedNavigatorParams, AppRoute.APPLIED>
    >;
    route: RouteProp<AppliedNavigatorParams, AppRoute.APPLIED>;
}


const Stack = createStackNavigator<AppliedNavigatorParams>();

export const AppliedNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.APPLIED} component={AppliedScreen} />        
    </Stack.Navigator>
);
