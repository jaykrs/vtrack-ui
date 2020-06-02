import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './auth.navigator';
import { HomeNavigator, HomeBottomNavigator } from './home.navigator';
import { HrHomeNavigator } from './hrNavigation/hrHome.navigator';
import { InformaionNavigator } from './information.navigator';
import { HrInformaionNavigator } from './hrNavigation/hrInformation.navigator';
import { AppRoute } from './app-routes';

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export type AppNavigatorParams = {
  [AppRoute.AUTH]: undefined;
  [AppRoute.HRINFORMATION]: undefined;
  [AppRoute.INFORMATION]: undefined;
  [AppRoute.HOME]: undefined;
  [AppRoute.HRHOME]: undefined;
}

const Stack = createStackNavigator<AppNavigatorParams>();

export const AppNavigator = (props: Partial<StackNavigatorProps>): React.ReactElement => (
  <Stack.Navigator {...props} headerMode='none'>
    <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator}/>   
    <Stack.Screen name={AppRoute.HOME} component={HomeBottomNavigator}/>       
  </Stack.Navigator>
);
