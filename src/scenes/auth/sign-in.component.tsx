import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Alert,
  RefreshControl,
  Image,
  Text,
} from 'react-native';
import {
  Button,
  CheckBox,
  Layout,
} from 'react-native-ui-kitten';
import {
  Formik,
  FormikProps,
} from 'formik';
import { SignInScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { FormInput } from '../../components/form-input.component';
import { AppConstants } from '../../constants/AppConstants';
import { LabelConstants } from '../../constants/LabelConstants';
import {
  EyeIcon,
  EyeOffIcon,
} from '../../assets/icons';
import {
  SignInData,
  SignInSchema,
} from '../../data/sign-in.model';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { Toolbar } from 'src/components/toolbar.component';
import { Content } from 'native-base';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Styles } from '../../assets/styles';
import DeviceInfo from 'react-native-device-info';
import base64 from 'react-native-base64';
interface State {
  email: string | undefined;
  password: string | undefined;
  token: string | undefined;
}
// const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
// const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

export class SignInScreen extends Component<SignInScreenProps, any & State & any> {
  constructor(props) {
    super(props);

    this.state = {
      emailId: '',
      pwd: '',
      passwordVisible: true,
      device_token: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPasswordIconPress = this.onPasswordIconPress.bind(this);   
    this.navigateHome = this.navigateHome.bind(this);   
    this.navigateResetPassword = this.navigateResetPassword.bind(this);
    this.navigateSignUp = this.navigateSignUp.bind(this);
  }

  componentDidMount() {
    const id = DeviceInfo.getUniqueId();
    this.setState({
      device_token: id,
    });
  }

  onFormSubmit() {
    const { emailId, pwd, device_token } = this.state
    axios({
      method: 'post', url: AppConstants.API_BASE_URL + '/api/user/devicevalidate',
      data: {
        emailId: emailId,
        device_token: device_token,
        pwd: base64.encode(this.state.pwd)
      }
    }).then((response) => {
      // AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
      //   this.navigateHome();
      //  });
      // console.log(response);
      if (response) {
        if (response.data.isActive) {
          console.log('User Data', response.data);
          AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
            this.navigateHome();
          });
        } else {
          Alert.alert(LabelConstants.com_alert_NOT_ACTIVATED);
        }
      } else {
        Alert.alert(LabelConstants.com_alert_invalid_email_or_password);
      }
    }, (error) => {
      Alert.alert(LabelConstants.com_alert_invalid_email_or_password);
      // console.log(error);
    });

  };

  navigateHome() {
    this.props.navigation.navigate(AppRoute.HOME);
  };

 

  navigateSignUp() {
    this.props.navigation.navigate(AppRoute.SIGN_UP);
  };

  navigateResetPassword() {
    this.props.navigation.navigate(AppRoute.RESET_PASSWORD);
  };

  onPasswordIconPress() {
    this.setState({ passwordVisible: !this.state.passwordVisible })
  };


  // const renderForm = (props: FormikProps<SignInData>): React.ReactFragment => (
  //   <React.Fragment>
  //     <FormInput
  //       padding={0}
  //       id='email'
  //       style={styles.formControl}
  //       placeholder='Email'
  //       keyboardType='email-address'
  //     />
  //     <FormInput
  //       padding={0}
  //       id='password'
  //       style={styles.formControl}
  //       placeholder='Password'
  //       secureTextEntry={!passwordVisible}
  //       icon={passwordVisible ? EyeIcon : EyeOffIcon}
  //       onIconPress={onPasswordIconPress}
  //     />
  //     <View style={styles.resetPasswordContainer}>
  //       <CheckBox
  //         style={styles.formControl}
  //         checked={shouldRemember}
  //         onChange={setShouldRemember}
  //         text='Remember Me'
  //       />
  //       <Button
  //         appearance='ghost'
  //         status='basic'
  //         onPress={navigateResetPassword}>
  //         Forgot password?
  //       </Button>
  //     </View>
  //     <Button
  //       style={styles.submitButton}
  //       onPress={props.handleSubmit}>
  //       SIGN IN
  //     </Button>
  //   </React.Fragment>
  // );

  render() {
    return (
      <SafeAreaLayout
        style={styles.safeArea}
        insets={SaveAreaInset.TOP} >
        {/* <Toolbar
        title='All Jobs'
        // backIcon={MenuIcon}
        // onBackPress={this.props.navigation.goBack}
        style={{ marginTop: -5, marginLeft: -5 }}
      /> */}
        < Content style={styles.content} >
          <View>
            <Image
              source={require('../../assets/logo.png')}
              resizeMode="contain"
              style={Styles.loginImage}
            />
            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              {/* <Text style={Styles.inputBoxLabel}>UserName</Text> */}
              <TextInput
                style={Styles.inputBoxStyle}
                keyboardType='email-address'
                textContentType='emailAddress'
                placeholder='Enter User Name'
                onChangeText={(emailId) => { this.setState({ emailId: emailId }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.password]}>
              {/* <Text style={Styles.inputBoxLabel}>Password</Text> */}
              <TextInput
                style={Styles.inputBoxStyle}
                secureTextEntry={this.state.passwordVisible}
                placeholder='Enter Password'
                onChangeText={(pwd) => { this.setState({ pwd: pwd }) }}
              />
              <View style={{ marginTop: 14 }}>
                {this.state.passwordVisible ?
                  <TouchableOpacity onPress={this.onPasswordIconPress}>
                    <Text style={{ color: "#D9D5DC" }}> <EyeOffIcon /></Text>
                  </TouchableOpacity> :
                  <TouchableOpacity onPress={this.onPasswordIconPress}>
                    <EyeIcon />
                  </TouchableOpacity>
                }
              </View>
            </View>

            <View>
              <TouchableOpacity style={[Styles.buttonContainer, styles.button]} onPress={this.onFormSubmit}>
                <Text style={Styles.buttonCaption}>Sign In</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate(AppRoute.SIGN_UP) }}>
              <Text style={styles.loremIpsum}>Don&#39;t Have an Account</Text>
            </TouchableOpacity>

          </View>
          <View style={Styles.bottomSpace}></View>
        </Content>

      </SafeAreaLayout >
    );
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },

  content: {
    backgroundColor: 'transparent',
    padding: 10
  },

  emailBox: {
    // width: '74%',
    height: 43,
    marginTop: 35,
    alignSelf: 'center'
  },

  password: {
    // width: '74%',
    height: 43,
    marginTop: 35,
    alignSelf: 'center'
  },

  button: {
    width: '74%',
    height: 52,
    marginTop: 35,
    alignSelf: 'center'
  },

  loremIpsum: {
    color: "rgba(92,100,127,1)",
    fontSize: 18,
    fontFamily: "roboto-regular",
    marginTop: 35,
    alignSelf: 'center'
  },

  forgotPassword: {
    color: "rgba(92,100,127,1)",
    fontSize: 18,
    fontFamily: "roboto-regular",
    marginTop: 35,
    alignSelf: 'center'
  },
});
