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
import {PostScreen, PostScreen2, PostScreen3, PostScreen4, PostScreen5} from '../../scenes/hr/postJob'
type PostJobNavigatorParams = {
    [AppRoute.POSTJOB]: undefined;   
    [AppRoute.POSTJOB2]: undefined;   
    [AppRoute.POSTJOB3]: undefined;   
    [AppRoute.POSTJOB4]: undefined;   
    [AppRoute.POSTJOB5]: undefined;   
}

export interface PostScreenProps {
    navigation: CompositeNavigationProp<
    CandidateTabNavigationProp,
        StackNavigationProp<PostJobNavigatorParams, AppRoute.POSTJOB>
    >;
    route: RouteProp<PostJobNavigatorParams, AppRoute.POSTJOB>;
}

export interface PostScreen2Props {
    navigation: CompositeNavigationProp<
    CandidateTabNavigationProp,
        StackNavigationProp<PostJobNavigatorParams, AppRoute.POSTJOB2>
    >;
    route: RouteProp<PostJobNavigatorParams, AppRoute.POSTJOB2>;
}

export interface PostScreen3Props {
    navigation: CompositeNavigationProp<
    CandidateTabNavigationProp,
        StackNavigationProp<PostJobNavigatorParams, AppRoute.POSTJOB3>
    >;
    route: RouteProp<PostJobNavigatorParams, AppRoute.POSTJOB3>;
}

export interface PostScreen4Props {
    navigation: CompositeNavigationProp<
    CandidateTabNavigationProp,
        StackNavigationProp<PostJobNavigatorParams, AppRoute.POSTJOB4>
    >;
    route: RouteProp<PostJobNavigatorParams, AppRoute.POSTJOB4>;
}

export interface PostScreen5Props {
    navigation: CompositeNavigationProp<
    CandidateTabNavigationProp,
        StackNavigationProp<PostJobNavigatorParams, AppRoute.POSTJOB5>
    >;
    route: RouteProp<PostJobNavigatorParams, AppRoute.POSTJOB5>;
}
const Stack = createStackNavigator<PostJobNavigatorParams>();

export const PostJobNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.POSTJOB} component={PostScreen} />        
        <Stack.Screen name={AppRoute.POSTJOB2} component={PostScreen2} />        
        <Stack.Screen name={AppRoute.POSTJOB3} component={PostScreen3} />        
        <Stack.Screen name={AppRoute.POSTJOB4} component={PostScreen4} />        
        <Stack.Screen name={AppRoute.POSTJOB5} component={PostScreen5} />        
    </Stack.Navigator>
);
