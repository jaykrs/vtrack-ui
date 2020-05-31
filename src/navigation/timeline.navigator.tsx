import React from 'react';
import {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/core';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { TimelineTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { TimelineScreen } from '../scenes/timeline/timeline.component';
import { ProfileScreen, ProfileEditScreen,} from '../scenes/home';
import {NotificationScreen} from '../scenes/timeline/notification.component'

type TimelineNavigatorParams = {
  [AppRoute.TIMELINE]: undefined;
  [AppRoute.PROFILE]: ProfileScreen;
  [AppRoute.PROFILEEDIT]: ProfileEditScreen;
  [AppRoute.NOTIFICATION]: NotificationScreen;
}

export interface TimelineScreenProps {
  navigation: CompositeNavigationProp<
    TimelineTabNavigationProp,
    StackNavigationProp<TimelineNavigatorParams, AppRoute.TIMELINE>
  >;
  route: RouteProp<TimelineNavigatorParams, AppRoute.TIMELINE>;
}

export interface ProfileScreenProps {
  navigation: CompositeNavigationProp<
    TimelineTabNavigationProp,
    StackNavigationProp<TimelineNavigatorParams, AppRoute.PROFILE>
  >;
  route: RouteProp<TimelineNavigatorParams, AppRoute.PROFILE>;
}


export interface ProfileEditScreenProps {
  navigation: CompositeNavigationProp<
    TimelineTabNavigationProp,
    StackNavigationProp<TimelineNavigatorParams, AppRoute.PROFILEEDIT>
  >;
  route: RouteProp<TimelineNavigatorParams, AppRoute.PROFILEEDIT>;
}

export interface NotificationScreenProps {
  navigation: CompositeNavigationProp<
    TimelineTabNavigationProp,
    StackNavigationProp<TimelineNavigatorParams, AppRoute.NOTIFICATION>
  >;
  route: RouteProp<TimelineNavigatorParams, AppRoute.NOTIFICATION>;
}



const Stack = createStackNavigator<TimelineNavigatorParams>();

export const TimelineNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.TIMELINE} component={TimelineScreen} />
    <Stack.Screen name={AppRoute.PROFILE} component={ProfileScreen} />
    <Stack.Screen name={AppRoute.PROFILEEDIT} component={ProfileEditScreen} />
    <Stack.Screen name={AppRoute.NOTIFICATION} component={NotificationScreen} />
  </Stack.Navigator>
);
