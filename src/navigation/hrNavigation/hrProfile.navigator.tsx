import React from 'react';
import {
    CompositeNavigationProp,
    RouteProp,
} from '@react-navigation/core';
import {
    createStackNavigator,
    StackNavigationProp,
} from '@react-navigation/stack';
import { CandidateTabNavigationProp } from './hrHome.navigator';
import { AppRoute } from '../app-routes';
import {HrProfileScreen, EditHrProfileScreen, LogoutScreen} from '../../scenes/hr/hrProfile'
type HrProfileNavigatorParams = {
    [AppRoute.HRPROFILE]: undefined;   
    [AppRoute.EDITHRPROFILE]: undefined;   
    [AppRoute.LOGOUT]: undefined;   
}

export interface HrProfileScreenProps {
    navigation: CompositeNavigationProp<
    CandidateTabNavigationProp,
        StackNavigationProp<HrProfileNavigatorParams, AppRoute.HRPROFILE>
    >;
    route: RouteProp<HrProfileNavigatorParams, AppRoute.HRPROFILE>;
}

export interface EditHrProfileScreenProps {
    navigation: CompositeNavigationProp<
    CandidateTabNavigationProp,
        StackNavigationProp<HrProfileNavigatorParams, AppRoute.EDITHRPROFILE>
    >;
    route: RouteProp<HrProfileNavigatorParams, AppRoute.EDITHRPROFILE>;
}

export interface LogoutScreenProps {
    navigation: CompositeNavigationProp<
    CandidateTabNavigationProp,
        StackNavigationProp<HrProfileNavigatorParams, AppRoute.LOGOUT>
    >;
    route: RouteProp<HrProfileNavigatorParams, AppRoute.LOGOUT>;
}


const Stack = createStackNavigator<HrProfileNavigatorParams>();

export const HrProfileNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.HRPROFILE} component={HrProfileScreen} />        
        <Stack.Screen name={AppRoute.EDITHRPROFILE} component={EditHrProfileScreen} />        
        <Stack.Screen name={AppRoute.LOGOUT} component={LogoutScreen} />        
    </Stack.Navigator>
);
