import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { YellowBox, AsyncStorage } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  light,
  mapping,
  dark,
} from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Text,
} from 'react-native-ui-kitten';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/app.navigator';
import { AppRoute } from './navigation/app-routes';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component<any,any>{
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: false
    }

    this.check = this.check.bind(this);
  }
  // This value is used to determine the initial screen
  // const isAuthorized: boolean = false;
  // const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
  // const [isUser, setIsUser] = React.useState<boolean>(false);
  // const [isProfile, setIsProfile] = React.useState<boolean>(true);
  componentDidMount() {
    this.check()
    SplashScreen.hide();
  }

  async check() {
    const { isAuthorized } = this.state
    const value = await AsyncStorage.getItem('userDetail');
    if (value) {
      const user = JSON.parse(value);
      if (user) {
        if (user.isActive && isAuthorized != true) {
          this.setState({ isAuthorized: true });
        }
      }
    }
  }

  render() {
    const {isAuthorized} = this.state
    return (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          mapping={mapping}
          theme={light}>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigator initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.AUTH} />
            </NavigationContainer>
          </SafeAreaProvider>
        </ApplicationProvider>
      </React.Fragment>
    );
  }
}

// For some reason, starting from 0.61, react-native-gesture-handler throws this warning
// https://github.com/facebook/react-native/issues/26226
YellowBox.ignoreWarnings([
  'RCTRootView cancelTouches',
]);