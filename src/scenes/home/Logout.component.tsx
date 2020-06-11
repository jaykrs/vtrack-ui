import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Avatar,
  Button,
  Input
} from 'react-native-ui-kitten';
import { ProfileScreenProps } from '../../navigation/timeline.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { AppConstants } from '../../constants/AppConstants';
import { Separator, Container, Content, View, Footer, FooterTab, Form, Picker, Icon } from 'native-base';
import Axios from 'axios';
import { LabelConstants } from '../../constants/LabelConstants';
import { AsyncStorage } from 'react-native';
import { AppNavigator } from '../../navigation/app.navigator';
import { AppRoute } from 'src/navigation/app-routes';
import { SignInScreen } from '../auth'


type Mystate = {

}
// const prop = (props: AboutScreenProps):
export class LogoutScreen extends Component<ProfileScreenProps & SafeAreaLayoutElement & any, Mystate & any> {
  constructor(props) {
    super(props)
    this.state = {}


  }

 async componentDidMount() {
    const data = {};
    const value = await AsyncStorage.getItem('userDetail');
    if (value) {
      // console.log('user Details all data', value);
      const user = JSON.parse(value);
      this.setState({
        userId: user.id,
        device_token: user.deviceToken,
        emailId: user.emailId
      })
      
      Axios({
        method: 'get',
        url: AppConstants.API_BASE_URL + '/api/user/logout/' + user.emailId + '/' + user.deviceToken,

      }).then((response) => {
        AsyncStorage.setItem('userDetail', JSON.stringify(data), () => {
          this.props.navigation.navigate('Auth')
           });
           this.props.navigation.navigate('Auth');
      },
        (error) => {
          // console.log(error);
          if (error) {
            alert("Something went wrong");
            this.props.navigation.navigate('Auth');
          }
        }
      );
      // console.log('user data id', this.state.userId);      
    }


  }

  render() {
    return (
      <View>

      </View>
    )
  }
}