import React from 'react';
import {
    CompositeNavigationProp,
    RouteProp,
} from '@react-navigation/core';
import {
    createStackNavigator,
    StackNavigationProp,
} from '@react-navigation/stack';
import { MyJobsTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { MyJobsScreen, JobDetailScreen } from '../scenes/myJobs';

type MyJobsNavigatorParams = {
    [AppRoute.MYJOBS]: undefined;   
    [AppRoute.JOBDETAIL]: undefined;   
}

export interface MyJobsScreenProps {
    navigation: CompositeNavigationProp<
        MyJobsTabNavigationProp,
        StackNavigationProp<MyJobsNavigatorParams, AppRoute.MYJOBS>
    >;
    route: RouteProp<MyJobsNavigatorParams, AppRoute.MYJOBS>;
}

export interface JobDetailScreenProps {
    navigation: CompositeNavigationProp<
        MyJobsTabNavigationProp,
        StackNavigationProp<MyJobsNavigatorParams, AppRoute.JOBDETAIL>
    >;
    route: RouteProp<MyJobsNavigatorParams, AppRoute.JOBDETAIL>;
}


const Stack = createStackNavigator<MyJobsNavigatorParams>();

export const MyJobsNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.MYJOBS} component={MyJobsScreen} />        
        <Stack.Screen name={AppRoute.JOBDETAIL} component={JobDetailScreen} />        
    </Stack.Navigator>
);
