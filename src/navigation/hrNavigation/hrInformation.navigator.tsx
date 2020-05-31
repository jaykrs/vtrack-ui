import React from 'react';
import { RouteProp } from '@react-navigation/core';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { AppRoute } from '../app-routes';
import { AppNavigatorParams } from '../app.navigator';
import {   
    CompanyScreen
} from '../../scenes/information';

type HrInformaionNavigatorParams = AppNavigatorParams & { 
  [AppRoute.COMPANY]: undefined;
}

export interface CompanyScreenProps {
  navigation: StackNavigationProp<HrInformaionNavigatorParams, AppRoute.COMPANY>;
  route: RouteProp<HrInformaionNavigatorParams, AppRoute.COMPANY>;
}

const Stack = createStackNavigator<HrInformaionNavigatorParams>();

export const HrInformaionNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.COMPANY} component={CompanyScreen}/>    
  </Stack.Navigator>
);
