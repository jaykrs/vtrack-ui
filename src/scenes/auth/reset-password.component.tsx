import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Modal,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {
  EdgeInsets,
  useSafeArea,
} from 'react-native-safe-area-context';
import {
  Button,
  Layout,
  LayoutElement,
} from 'react-native-ui-kitten';
import {
  Formik,
  FormikProps,
} from 'formik';
import { ResetPasswordScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { FormInput } from '../../components/form-input.component';
import { Toolbar } from '../../components/toolbar.component';
import {
  ResetPasswordData,
  ResetPasswordSchema,
} from '../../data/reset-password.model';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { Content } from 'native-base';
import { Styles } from '../../assets/styles';
import { AppConstants } from '../../constants/AppConstants';
import axios from 'axios';


export class ResetPasswordScreen extends Component<ResetPasswordScreenProps & any, any>{
  constructor(props) {
    super(props);

    this.state = {
      emailId: '',
      isVisible: true
    }

    this.handlePassword = this.handlePassword.bind(this);
  }

  handlePassword() {
    const { isVisible, emailId } = this.state
    console.log("vendorId", emailId)
    axios({
      method: 'GET',
      url: AppConstants.API_BASE_URL + '/api/user/resetpwd/' + emailId,

    }).then((response) => {
      this.setState({
        ...this.state,
        isVisible: !isVisible,
        visitor_list: response.data
      })
      console.log("Profile Data", response.data);
    },
      (error) => {
        console.log(error);
        if (error) {
          alert("Seems Your Email Id is not Valid");
        }
      }
    );
  }

  render() {
    const {isVisible} = this.state;
    return (
      <SafeAreaLayout>
        <Content>

          <Modal
            animationType={"fade"}
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => { console.log("Modal has been closed.") }}>
            {/*All views of Modal*/}
            <View style={styles.modal}>
              <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                {/* <Text style={Styles.inputBoxLabel}>UserName</Text> */}
                <TextInput
                  style={styles.inputBoxStyle}
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  placeholder='Enter Email Id'
                  onChangeText={(emailId) => { this.setState({ emailId: emailId }) }}
                />
              </View>
              <TouchableOpacity onPress={() => { Alert.alert('pressed') }}>
                <Text>Check</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={[Styles.buttonContainer, styles.button1]} onPress={() => { this.setState({ isVisible: !isVisible }) }}>
                  <Text style={Styles.buttonCaption}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[Styles.buttonContainer, styles.button2]} onPress={() => this.handlePassword()}>
                  <Text style={Styles.buttonCaption}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Content>
      </SafeAreaLayout>
    )
  }


}

const styles = StyleSheet.create({
  button1: {
    width: '74%',
    height: 52,
    marginTop: 35,
    marginRight: 15,
    // alignSelf: 'center'
  },

  button2: {
    width: '74%',
    height: 52,
    marginTop: 35,
    marginLeft: 15,
    // alignSelf: 'center'
  },

  emailBox: {
    // width: '74%',
    height: 43,
    marginTop: 35,
    alignSelf: 'center'
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#eee",
    height: 300,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    marginTop: 80,
    marginLeft: 40,
  },

  inputBoxStyle: {
    flex: 1,
    color: "#000",
    backgroundColor: '#fff',
    alignSelf: "stretch",
    paddingTop: 14,
    paddingRight: 5,
    paddingBottom: 8,
    paddingLeft: 5,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },
});
