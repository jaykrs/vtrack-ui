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
import { TodoNavigator } from '../todo.navigator';
import { ProfileNavigator } from '../profile.navigator';
import { TimelineNavigator } from '../timeline.navigator';
import { MyJobsNavigator } from '../myJobs.navigator';
import { HrMyJobsNavigator } from '../hrNavigation/hrMyJobs.navigator'
import { CandidateNavigator } from '../hrNavigation/candiate.navigator';
import { AppliedNavigator } from '../applied.navigator';
import { HrProfileNavigator } from './hrProfile.navigator';
import { PlanNavigator } from '../hrNavigation/plans.navigator';
import { PostJobNavigator } from '../hrNavigation/postJob.navigator';
import { AppRoute } from '../app-routes';
import {
  ContactUsScreen,
  AccountsScreen,
  HomeDrawer,
  HomeTabBar,
  ChangepasswordScreen,
  // ProfileScreen,
  // ProfileEditScreen,
  WalletScreen,
  LogoutScreen,
  // AskFreeQuestionScreen,
  TransactionHistoryScreen,
  MoreScreen,
  SettingScreen
} from '../../scenes/home';
import {
  TimeLineIcon,
  HomeIcon,
  PlanIcon,
  CandidateIcon,
  PostJobIcon,
  ProfileIcon,
  InfoIcon,
  LayoutIcon,
  PersonIcon,
  BellIcon,
  WalletIcon,
  AccountsIcon,
  ChangePasswordIcon,
  LogoutIcon,
  TransactionHistoryIcon
} from '../../assets/icons';
import { AuthNavigator } from '../auth.navigator';
//import { AccountsScreen } from 'src/scenes/home/Accounts.component';

type HomeDrawerNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.CONTACT]: undefined;
  [AppRoute.ACCOUNTS]: undefined;
  [AppRoute.CHANGEPASSWORD]: undefined;
  [AppRoute.WALLET]: undefined;
  [AppRoute.IMAGEUPLOAD]: undefined;
  [AppRoute.LOGOUT]: undefined;
  [AppRoute.AUTH]: undefined;
  [AppRoute.TRANSACTIONHISTORY]: undefined;
  [AppRoute.MORE]: undefined;
  [AppRoute.SETTING]: undefined;
  [AppRoute.INFORMATION]: undefined;


}

type HomeBottomTabsNavigatorParams = {
  [AppRoute.CANDIDATE]: undefined;
  [AppRoute.HRMYJOBS]: undefined;
  [AppRoute.HRPROFILE]: undefined;
  [AppRoute.POSTJOB]: undefined;
  [AppRoute.PLAN]: undefined;
}

export type CandidateTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.CANDIDATE>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;

export type PostJobTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.POSTJOB>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;

export type HrProfileTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.HRPROFILE>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;
export type PlanTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.PLAN>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;

export type HrMyJobsTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.HRMYJOBS>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;

export interface AboutScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.CONTACT>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.CONTACT>;
}

// export interface ProfileScreenProps {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.PROFILE>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.PROFILE>;
// }

// export interface ProfileEditScreenProps {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.PROFILEEDIT>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.PROFILEEDIT>;
// }

export interface ImageUploadScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.IMAGEUPLOAD>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.IMAGEUPLOAD>;
}


export interface WalletScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.WALLET>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.WALLET>;
}

export interface SettingScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.SETTING>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.SETTING>;
}

export interface TransactionHistoryScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.TRANSACTIONHISTORY>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.TRANSACTIONHISTORY>;
}

export interface ChangepasswordScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.CHANGEPASSWORD>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.CHANGEPASSWORD>;
}

export interface AuthNavigatorScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.AUTH>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.AUTH>;
}

export interface InformaionNavigatorScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.INFORMATION>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.INFORMATION>;
}

// export interface AskFreeQuestionScreenprops {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.ASKFREEQUESTION>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.ASKFREEQUESTION>;
// }

export interface MoreScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.MORE>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.MORE>;
}


export interface AccountsScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.ACCOUNTS>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.ACCOUNTS>;
}

// export type BottomHomeScreenProps = BottomTabBarProps & {
//   navigation: TodoTabNavigationProp;
// };

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

const HomeBottomNavigator = (): React.ReactElement => (
  // @ts-ignore: `tabBar` also contains a DrawerNavigationProp
  <BottomTab.Navigator tabBar={props => <HomeTabBar{...props} />}>

    <BottomTab.Screen
      name={AppRoute.HRMYJOBS}
      component={HrMyJobsNavigator}
      options={{ title: 'Home', tabBarIcon: HomeIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.CANDIDATE}
      component={CandidateNavigator}
      options={{ title: 'Candidate', tabBarIcon: CandidateIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.POSTJOB}
      component={PostJobNavigator}
      options={{ title: 'Post Job', tabBarIcon: PostJobIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.HRPROFILE}
      component={HrProfileNavigator}
      options={{ title: 'Profile', tabBarIcon: ProfileIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.PLAN}
      component={PlanNavigator}
      options={{ title: 'Plan', tabBarIcon: PlanIcon }}
    />

    {/* <BottomTab.Screen
      name={AppRoute.LIST}
      component={AppliedNavigator}
      options={{ title: 'Applied', tabBarIcon: LayoutIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.PROFILE}
      component={ProfileNavigator}
      options={{ title: 'Profile', tabBarIcon: BellIcon }}
    /> */}

  </BottomTab.Navigator>
);

export const HrHomeNavigator = (): React.ReactElement => (
  HomeBottomNavigator()
  // @ts-ignore: `drawerContent` also contains a DrawerNavigationProp
  // <Drawer.Navigator drawerContent={props => <HomeDrawer{...props} />}>
  //   <Drawer.Screen
  //     name={AppRoute.HOME}
  //     component={HomeBottomNavigator}
  //     options={{ title: 'Home', drawerIcon: HomeIcon }}
  //   />

  //   <Drawer.Screen
  //     name={AppRoute.ACCOUNTS}
  //     component={AccountsScreen}
  //     options={{ title: 'Accounts', drawerIcon: AccountsIcon }}
  //   />

  //   <Drawer.Screen
  //     name={AppRoute.SETTING}
  //     component={SettingScreen}
  //     options={{ title: 'Setting', drawerIcon: AccountsIcon }}
  //   />

  //   {/* <Drawer.Screen
  //     name={AppRoute.PROFILEEDIT}
  //     component={ProfileEditScreen}
  //     options={{ title: 'Profile', drawerIcon: PersonIcon }}
  //   />      */}


  //   {/*     
  //    <Drawer.Screen
  //     name={AppRoute.WALLET}
  //     component={WalletScreen}
  //     options={{ title: 'Wallet', drawerIcon: WalletIcon }}
  //   /> */}

  //   {/* <Drawer.Screen
  //     name={AppRoute.TRANSACTIONHISTORY}
  //     component={TransactionHistoryScreen}
  //     options={{ title: 'All Transactions', drawerIcon: TransactionHistoryIcon }}
  //   />
  //    */}


  //   <Drawer.Screen
  //     name={AppRoute.CHANGEPASSWORD}
  //     component={ChangepasswordScreen}
  //     options={{ title: 'Change password', drawerIcon: ChangePasswordIcon }}
  //   />

  //   <Drawer.Screen
  //     name={AppRoute.CONTACT}
  //     component={ContactUsScreen}
  //     options={{ title: 'Contact Us', drawerIcon: InfoIcon }}
  //   />
  //   <Drawer.Screen
  //     name={AppRoute.LOGOUT}
  //     component={LogoutScreen}
  //     options={{ title: 'Logout', drawerIcon: LogoutIcon }}
  //   />
  //   {/* <Drawer.Screen
  //     name={AppRoute.IMAGEUPLOAD}
  //     component={ImageUploadScreen}
  //     options={{ title: 'ImageUpload', drawerIcon: InfoIcon}}
  //   /> */}



  //   {/* <Drawer.Screen
  //     name={AppRoute.PROFILE}
  //     component={ProfileScreen}
  //     // options={{ }}
  //   /> */}

  //   {/* <Drawer.Screen
  //     name={AppRoute.ASKFREEQUESTION}
  //     component={AskFreeQuestionScreen}
  //     // options={{ }}
  //   /> */}

  //   {/* <Drawer.Screen
  //     name={AppRoute.MORE}
  //     component={MoreScreen}
  //     // options={{ }}
  //   /> */}

  // </Drawer.Navigator>
);

