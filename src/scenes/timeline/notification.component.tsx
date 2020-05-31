import React from 'react';
import { StyleSheet, View,RefreshControl} from 'react-native';
import {
  Divider,
  Text,
  ThemedComponentProps,
  Avatar,
  ListItem,
  ListItemElement,
  List
} from 'react-native-ui-kitten';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { AsyncStorage } from 'react-native';
import { MenuIcon } from '../../assets/icons';
import { AppConstants } from '../../constants/AppConstants';
import {NotificationScreenProps} from '../../navigation/timeline.navigator'

type MyState = {
  Notification: []
}
export class NotificationScreen extends React.Component<NotificationScreenProps & any, MyState & any> {
  constructor(props) {
    super(props)
    this.state = {
    
    }
  }

  render() {
   
    return (
      <SafeAreaLayout
        style={{ flex: 1 }}
        insets={SaveAreaInset.TOP}>       
          <Toolbar
            title= 'Notification Page'
            // backIcon={MenuIcon}
            onBackPress={this.props.navigation.goBack}
            style={{ marginTop: -5, marginLeft: -5 }}
          />
         <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
           <Text style = {{fontSize: 20, fontWeight: 'bold'}}>This is Notification page</Text>
         </View>
      </SafeAreaLayout>
    )
  }

}