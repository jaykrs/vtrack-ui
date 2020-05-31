/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import requestCameraAndAudioPermission from './permission';
import {Toolbar} from '../../components/toolbar.component';
import ProfileScreen from '../home/profile.component'
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      AppID: '2a7c1a6da3754ee1bcbab41b79a3d190',                    //Set your APPID here
      ChannelName: '',                                  //Set a default channel or leave blank
    };
    if (Platform.OS === 'android') {                    //Request required permissions from Android
      requestCameraAndAudioPermission().then(_ => {
        console.log('requested!');
      });
    }
  }
  /**
  * @name handleSubmit
  * @description Helper function to handle data on submit click
  */
  handleSubmit = () => {
    let AppID = this.state.AppID;
    let ChannelName = this.state.ChannelName;
    if (AppID !== '' && ChannelName !== '') {
      Actions.video({ AppID, ChannelName });
    }
  }
  handleBack(){
    this.props.navigation.goBack
}
  render() {
    console.log('inside render under Home',this.props)
    return (
        <View style={styles.container}>
            <Toolbar
                title='Thought PF Video Call'
                onBackPress={this.handleBack}
            />
            <View style={styles.component}>
                {/* <Text style={styles.formLabel}>App ID</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(AppID) => this.setState({ AppID })}
                    value={this.state.AppID}
                /> */}

                <Text style={styles.formLabel}>Channel Name</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(ChannelName) => this.setState({ ChannelName })}
                    value={this.state.ChannelName}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        title="Start Call!"
                        onPress={this.handleSubmit}
                        style={styles.submitButton}
                    >
                        <Text style={{ color: '#ffffff' }}> Start Call </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#ffffff',

},
formLabel: {
    paddingBottom: 10,
    paddingTop: 10,
    color: '#0093E9',
},
buttonContainer: {
    alignItems: 'center',
    paddingTop: 20,
},
submitButton: {
    paddingHorizontal: 60,
    paddingVertical: 10,
    backgroundColor: '#1DA1F2',
    borderRadius: 25,
},
formInput: {
    height: 40,
    width: '95%',
    backgroundColor: '#f5f5f5',
    color: '#0093E9',
    borderRadius: 4,
    paddingLeft: 20,
},

component: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150
}
});

export default Home;
