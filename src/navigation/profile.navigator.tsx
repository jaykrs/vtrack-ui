import React from 'react';
import {
    CompositeNavigationProp,
    RouteProp,
} from '@react-navigation/core';
import {
    createStackNavigator,
    StackNavigationProp,
} from '@react-navigation/stack';
import { ProfileTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { ProfileScreen, EditProfileScreen, ResumeScreen, AddAchivementScreen, AddEducationScreen, AddCertificateScreen, AddExperienceScreen, LogoutScreen } from '../scenes/profile';

type ProfileNavigatorParams = {
    [AppRoute.PROFILE]: undefined;   
    [AppRoute.RESUME]: undefined;   
    [AppRoute.EDITPROFILE]: undefined;   
    [AppRoute.ADDACHIVEMENT]: undefined;   
    [AppRoute.ADDCERTIFICATE]: undefined;   
    [AppRoute.ADDEDUCATION]: undefined;   
    [AppRoute.ADDEXPERIENCE]: undefined;   
    [AppRoute.LOGOUT]: undefined;   
}

export interface ProfileScreenProps {
    navigation: CompositeNavigationProp<
    ProfileTabNavigationProp,
        StackNavigationProp<ProfileNavigatorParams, AppRoute.PROFILE>
    >;
    route: RouteProp<ProfileNavigatorParams, AppRoute.PROFILE>;
}

export interface ResumeScreenProps {
    navigation: CompositeNavigationProp<
    ProfileTabNavigationProp,
        StackNavigationProp<ProfileNavigatorParams, AppRoute.RESUME>
    >;
    route: RouteProp<ProfileNavigatorParams, AppRoute.RESUME>;
}

export interface EditProfileScreenProps {
    navigation: CompositeNavigationProp<
    ProfileTabNavigationProp,
        StackNavigationProp<ProfileNavigatorParams, AppRoute.EDITPROFILE>
    >;
    route: RouteProp<ProfileNavigatorParams, AppRoute.EDITPROFILE>;
}

export interface AddAchivementScreenProps {
    navigation: CompositeNavigationProp<
    ProfileTabNavigationProp,
        StackNavigationProp<ProfileNavigatorParams, AppRoute.ADDACHIVEMENT>
    >;
    route: RouteProp<ProfileNavigatorParams, AppRoute.ADDACHIVEMENT>;
}

export interface  AddCertificateScreenProps {
    navigation: CompositeNavigationProp<
    ProfileTabNavigationProp,
        StackNavigationProp<ProfileNavigatorParams, AppRoute.ADDCERTIFICATE>
    >;
    route: RouteProp<ProfileNavigatorParams, AppRoute.ADDCERTIFICATE>;
}

export interface AddEducationScreenProps {
    navigation: CompositeNavigationProp<
    ProfileTabNavigationProp,
        StackNavigationProp<ProfileNavigatorParams, AppRoute.ADDEDUCATION>
    >;
    route: RouteProp<ProfileNavigatorParams, AppRoute.ADDEDUCATION>;
}

export interface AddExperienceScreenProps {
    navigation: CompositeNavigationProp<
    ProfileTabNavigationProp,
        StackNavigationProp<ProfileNavigatorParams, AppRoute.ADDEXPERIENCE>
    >;
    route: RouteProp<ProfileNavigatorParams, AppRoute.ADDEXPERIENCE>;
}

export interface LogoutScreenProps {
    navigation: CompositeNavigationProp<
    ProfileTabNavigationProp,
        StackNavigationProp<ProfileNavigatorParams, AppRoute.LOGOUT>
    >;
    route: RouteProp<ProfileNavigatorParams, AppRoute.LOGOUT>;
}
const Stack = createStackNavigator<ProfileNavigatorParams>();

export const ProfileNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.PROFILE} component={ProfileScreen} />        
        <Stack.Screen name={AppRoute.RESUME} component={ResumeScreen} />        
        <Stack.Screen name={AppRoute.EDITPROFILE} component={EditProfileScreen} />        
        <Stack.Screen name={AppRoute.ADDACHIVEMENT} component={AddAchivementScreen} />        
        <Stack.Screen name={AppRoute.ADDCERTIFICATE} component={AddCertificateScreen} />        
        <Stack.Screen name={AppRoute.ADDEDUCATION} component={AddEducationScreen} />        
        <Stack.Screen name={AppRoute.ADDEXPERIENCE} component={AddExperienceScreen} />        
        <Stack.Screen name={AppRoute.LOGOUT} component={LogoutScreen} />        
    </Stack.Navigator>
);
