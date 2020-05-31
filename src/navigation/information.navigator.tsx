import React from 'react';
import { RouteProp } from '@react-navigation/core';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import {
    EducationScreen,
    ExperienceScreen,
    FresherScreen,
    FresherTechScreen,
} from '../scenes/information';

type InformaionNavigatorParams = AppNavigatorParams & {
  [AppRoute.EDUCATION]: undefined;
  [AppRoute.EXPERIENCE]: undefined;
  [AppRoute.FRESHER]: undefined;
  [AppRoute.FRESHERTECH]: undefined;
}

export interface EducationScreenProps {
  navigation: StackNavigationProp<InformaionNavigatorParams, AppRoute.EDUCATION>;
  route: RouteProp<InformaionNavigatorParams, AppRoute.EDUCATION>;
}

export interface ExperienceScreenProps {
  navigation: StackNavigationProp<InformaionNavigatorParams, AppRoute.EXPERIENCE>;
  route: RouteProp<InformaionNavigatorParams, AppRoute.EXPERIENCE>;
}

export interface FresherScreenProps {
  navigation: StackNavigationProp<InformaionNavigatorParams, AppRoute.FRESHER>;
  route: RouteProp<InformaionNavigatorParams, AppRoute.FRESHER>;
}

export interface FresherTechScreenProps {
  navigation: StackNavigationProp<InformaionNavigatorParams, AppRoute.FRESHERTECH>;
  route: RouteProp<InformaionNavigatorParams, AppRoute.FRESHERTECH>;
}

const Stack = createStackNavigator<InformaionNavigatorParams>();

export const InformaionNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.EDUCATION} component={EducationScreen}/>
    <Stack.Screen name={AppRoute.EXPERIENCE} component={ExperienceScreen}/>
    <Stack.Screen name={AppRoute.FRESHER} component={FresherScreen}/>
    <Stack.Screen name={AppRoute.FRESHERTECH} component={FresherTechScreen}/>
  </Stack.Navigator>
);
