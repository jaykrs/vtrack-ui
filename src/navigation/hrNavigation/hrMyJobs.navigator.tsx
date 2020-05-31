import React from 'react';
import {
    CompositeNavigationProp,
    RouteProp,
} from '@react-navigation/core';
import {
    createStackNavigator,
    StackNavigationProp,
} from '@react-navigation/stack';
import { HrMyJobsTabNavigationProp } from './hrHome.navigator';
import { AppRoute } from '../app-routes';
import {HrMyJobsScreen, HrMyJobDetailScreen, EditJobScreen} from '../../scenes/hr/hrMyJobs'
type MyJobsNavigatorParams = {
    [AppRoute.HRMYJOBS]: undefined;   
    [AppRoute.HRMYJOBDETAIL]: undefined;   
    [AppRoute.EDITJOB]: undefined;   
}

export interface HrMyJobsScreenProps {
    navigation: CompositeNavigationProp<
        HrMyJobsTabNavigationProp,
        StackNavigationProp<MyJobsNavigatorParams, AppRoute.HRMYJOBS>
    >;
    route: RouteProp<MyJobsNavigatorParams, AppRoute.HRMYJOBS>;
}

export interface HrMyJobDetailScreenProps {
    navigation: CompositeNavigationProp<
        HrMyJobsTabNavigationProp,
        StackNavigationProp<MyJobsNavigatorParams, AppRoute.HRMYJOBDETAIL>
    >;
    route: RouteProp<MyJobsNavigatorParams, AppRoute.HRMYJOBDETAIL>;
}

export interface EditJobScreenProps {
    navigation: CompositeNavigationProp<
        HrMyJobsTabNavigationProp,
        StackNavigationProp<MyJobsNavigatorParams, AppRoute.EDITJOB>
    >;
    route: RouteProp<MyJobsNavigatorParams, AppRoute.EDITJOB>;
}


const Stack = createStackNavigator<MyJobsNavigatorParams>();

export const HrMyJobsNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.HRMYJOBS} component={HrMyJobsScreen} />        
        <Stack.Screen name={AppRoute.HRMYJOBDETAIL} component={HrMyJobDetailScreen} />        
        <Stack.Screen name={AppRoute.EDITJOB} component={EditJobScreen} />        
    </Stack.Navigator>
);
