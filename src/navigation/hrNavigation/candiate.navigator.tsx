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
import { CandidateScreen } from '../../scenes/hr/candidate'
type CandidateNavigatorParams = {
    [AppRoute.CANDIDATE]: undefined;
}

export interface CandidateScreenProps {
    navigation: CompositeNavigationProp<
        CandidateTabNavigationProp,
        StackNavigationProp<CandidateNavigatorParams, AppRoute.CANDIDATE>
    >;
    route: RouteProp<CandidateNavigatorParams, AppRoute.CANDIDATE>;
}


const Stack = createStackNavigator<CandidateNavigatorParams>();

export const CandidateNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.CANDIDATE} component={CandidateScreen} />
    </Stack.Navigator>
);
