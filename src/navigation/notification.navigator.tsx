import React from 'react';
import {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/core';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { NotificationTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { NotificationScreen } from '../scenes/Notification';

type NotificationNavigatorParams = {
  [AppRoute.NOTIFICATION]: undefined;
}

export interface NotificationScreenProps {
  navigation: CompositeNavigationProp<
    NotificationTabNavigationProp,
    StackNavigationProp<NotificationNavigatorParams, AppRoute.NOTIFICATION>
  >;
  route: RouteProp<NotificationNavigatorParams, AppRoute.NOTIFICATION>;
}

const Stack = createStackNavigator<NotificationNavigatorParams>();

export const NotificationNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.NOTIFICATION} component={NotificationScreen}/>
  </Stack.Navigator>
);
