import React from 'react';
import {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/core';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {
  BottomTabBarProps,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { ProfileNavigator } from './profile.navigator';
import { MyJobsNavigator } from './myJobs.navigator';
import { AppliedNavigator } from './applied.navigator';
import { AppRoute } from './app-routes';
import {
  HomeDrawer,
  HomeTabBar,
  TermsScreen,
  AboutScreen,
  LogoutScreen,
  PaymentScreen,
  ContactUsScreen
} from '../scenes/home';
import {
  TimeLineIcon,
  ProfileIcon,
  PostJobIcon,
  HomeIcon,
  WalletIcon,
  AccountsIcon,
  TermsIcon,
  ContactUsIcon,
  LogoutIcon,
} from '../assets/icons';

type HomeDrawerNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.ABOUT]: undefined;
  [AppRoute.CONTACTUS]: undefined;
  [AppRoute.TERMS]: undefined;
  [AppRoute.LOGOUT]: undefined;
  [AppRoute.AUTH]: undefined;
  [AppRoute.PAYMENT]: undefined;
}

type HomeBottomTabsNavigatorParams = {
  [AppRoute.APPLIED]: undefined;
  [AppRoute.PROFILE]: undefined;
  [AppRoute.MYJOBS]: undefined;
}

export type AppliedTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.APPLIED>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;

export type ProfileTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.PROFILE>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;

export type MyJobsTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.MYJOBS>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;

export interface AboutScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.ABOUT>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.ABOUT>;
}

export interface ContactUsScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.CONTACTUS>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.CONTACTUS>;
}

export interface TermsScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.TERMS>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.TERMS>;
}

export interface PaymentScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.PAYMENT>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.PAYMENT>;
}

export interface AuthNavigatorScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.AUTH>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.AUTH>;
}

export type BottomHomeScreenProps = BottomTabBarProps & {
  navigation: MyJobsTabNavigationProp;
};

export type DrawerHomeScreenProps = DrawerContentComponentProps & {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>;
};



const Drawer = createDrawerNavigator<HomeDrawerNavigatorParams>();
const BottomTab = createBottomTabNavigator<HomeBottomTabsNavigatorParams>();

// FIXME(REACT-NAVIGATION-5): Not able to disable a pan gesture.
//
// In v4, it was possible with `navigationOptions: { gesturesEnabled: false }`
// Basically, I want to do this to disable `back` navigation from home screen to auth
// For Android, it can be covered with custom BackHandler.
//
// I'm not sure if it is a "true way", but I find it better
// rather than hard-coding business logic in navigators
// like it is described in https://reactnavigation.org/docs/en/next/auth-flow.html

export const HomeBottomNavigator = (): React.ReactElement => (
  // @ts-ignore: `tabBar` also contains a DrawerNavigationProp
  <BottomTab.Navigator tabBar={props => <HomeTabBar{...props} />}>

    <BottomTab.Screen
      name={AppRoute.MYJOBS}
      component={HomeNavigator}
      options={{ title: 'Visitors', tabBarIcon: TimeLineIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.APPLIED}
      component={AppliedNavigator}
      options={{ title: 'Add', tabBarIcon: PostJobIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.PROFILE}
      component={ProfileNavigator}
      options={{ title: 'Profile', tabBarIcon: ProfileIcon }}
    />

  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  // @ts-ignore: `drawerContent` also contains a DrawerNavigationProp
  <Drawer.Navigator drawerContent={props => <HomeDrawer{...props} />}>
    <Drawer.Screen
      name={AppRoute.HOME}
      component={MyJobsNavigator}
      options={{ title: 'Home', drawerIcon: HomeIcon }}
    />
   
    <Drawer.Screen
      name={AppRoute.PAYMENT}
      component={PaymentScreen}
      options={{ title: 'Payments', drawerIcon: WalletIcon }}
    />

    <Drawer.Screen
      name={AppRoute.CONTACTUS}
      component={ContactUsScreen}
      options={{ title: 'Contact Us', drawerIcon: ContactUsIcon }}
    />

    <Drawer.Screen
      name={AppRoute.ABOUT}
      component={AboutScreen}
      options={{ title: 'About Us', drawerIcon: AccountsIcon }}
    />

    <Drawer.Screen
      name={AppRoute.TERMS}
      component={TermsScreen}
      options={{ title: 'Terms and Conditions', drawerIcon: TermsIcon }}
    />
    <Drawer.Screen
      name={AppRoute.LOGOUT}
      component={LogoutScreen}
      options={{ title: 'Logout', drawerIcon: LogoutIcon }}
    />

  </Drawer.Navigator>
);

