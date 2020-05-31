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
import { ProfileScreenProps } from '../../navigation/home.navigator';
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
import {SignInScreen} from '../auth'

type Mystate = {

}
// const prop = (props: AboutScreenProps):
export class LogoutScreen extends Component<ProfileScreenProps & SafeAreaLayoutElement & any, Mystate & any> {
  constructor(props) {
    super(props)
    this.state = {}
   

  }

  componentDidMount() {
    const data = {};
    AsyncStorage.setItem('userDetail', JSON.stringify(data), () => {
   this.props.navigation.navigate('Auth')
    });

  }
 
  render() {
    return (
      <View>
      
      </View>
    )
  }
}