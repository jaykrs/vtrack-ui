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
import {PlanScreen} from '../../scenes/hr/plan'
type PlanNavigatorParams = {
    [AppRoute.PLAN]: undefined;   
}

export interface PlanScreenProps {
    navigation: CompositeNavigationProp<
    CandidateTabNavigationProp,
        StackNavigationProp<PlanNavigatorParams, AppRoute.PLAN>
    >;
    route: RouteProp<PlanNavigatorParams, AppRoute.PLAN>;
}


const Stack = createStackNavigator<PlanNavigatorParams>();

export const PlanNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.PLAN} component={PlanScreen} />        
    </Stack.Navigator>
);
