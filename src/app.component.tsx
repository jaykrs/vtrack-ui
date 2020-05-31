import React from 'react';
import { YellowBox, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  light,
  mapping,
  dark,
} from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
} from 'react-native-ui-kitten';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/app.navigator';
import { AppRoute } from './navigation/app-routes';

export default (): React.ReactFragment => {

  // This value is used to determine the initial screen
  // const isAuthorized: boolean = false;
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
  const [isUser, setIsUser] = React.useState<boolean>(false);
  const [isProfile, setIsProfile] = React.useState<boolean>(true);

  const check = async () => {
    const value = await AsyncStorage.getItem('userDetail');
    if (value) {
      const user = JSON.parse(value);
      if (user) {
        const userType = user.userType;
        const token = user.token;
        const profileCreated = user.profileCreated;
        if (token !== '' && token.length !== null) {
          if (token.length > 30 && isAuthorized !== true) {
            setIsAuthorized(!isAuthorized);
            if(profileCreated === 'false') {
              setIsProfile(!isProfile);
            }
            if(userType == 28 && isUser !== true) {
              setIsUser(!isUser);
            }
          }
        }
      }
    }
  }

  check();

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator initialRouteName={isAuthorized ? isUser ? isProfile ? AppRoute.HRHOME : AppRoute.HRINFORMATION : isProfile ? AppRoute.HOME : AppRoute.INFORMATION : AppRoute.AUTH} />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </React.Fragment>
  );
};

// For some reason, starting from 0.61, react-native-gesture-handler throws this warning
// https://github.com/facebook/react-native/issues/26226
YellowBox.ignoreWarnings([
  'RCTRootView cancelTouches',
]);