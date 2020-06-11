import React, { Component } from 'react';
import {
  StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Alert
} from 'react-native';

import {
  SafeAreaLayout 
} from '../../components/safe-area-layout.component';
import {  Picker, Content } from 'native-base';
import { SignUpScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import {
  EyeIcon,
  EyeOffIcon,
} from '../../assets/icons';
import axios from 'axios';
import { Styles } from '../../assets/styles'
import { AppConstants } from '../../constants/AppConstants';
import { LabelConstants } from '../../constants/LabelConstants';
import DeviceInfo from 'react-native-device-info';
import { country_data } from '../../assets/country';

type State = {}

export class SignUpScreen extends Component<SignUpScreenProps, any & State, any> {
  constructor(props) {
    super(props);

    this.state = {
      emailId: '',
      f_name: '',
      l_name: '',
      phone_number: '',
      phone_country_code: '',
      vendor_id: '',
      vendor_name: '',
      pwd: '',
      passwordVisible: true,
      device_token: '',
      address: '',
      country: '',
      country_data: country_data,
      countryCode: 'IN'
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPasswordIconPress = this.onPasswordIconPress.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
  }

  componentDidMount() {
    this.handleCountry(1,this.state.countryCode);
    const id = DeviceInfo.getUniqueId();
    this.setState({
      device_token: id,
    });
  }

  onFormSubmit() {
    const { emailId, f_name, l_name, address, country, phone_country_code, phone_number, vendor_id, vendor_name, pwd, device_token } = this.state
    if (emailId === " " || emailId.length === 0) {
      Alert.alert("Please Enter EmailId");
    } else if (f_name === "" || f_name.length === 0) {
      Alert.alert("Please Enter First Name");
    } else if (l_name === "" || l_name.length === 0) {
      Alert.alert("Please Enter Last Name");
    } else if (address === "" || address.length === 0) {
      Alert.alert("Please Enter Address");
    } else if (country === "" || country.length === 0) {
      Alert.alert("Please Enter Select Country");
    } else if (phone_country_code === "" || phone_country_code.length === 0) {
      Alert.alert("Please Enter Country Code");
    } else if (phone_number === "" || phone_number.length === 0) {
      Alert.alert("Please Enter Phone Number");
    } else if (vendor_id === "" || vendor_id.length === 0) {
      Alert.alert("Please Enter GSTIN/TIN");
    } else if (vendor_name === "" || vendor_name.length === 0) {
      Alert.alert("Please Enter Premise Name");
    } else if (pwd === "" || pwd.length === 0) {
      Alert.alert("Please Enter Password");
    } else {
      axios({
        method: 'post',
        url: AppConstants.API_BASE_URL + '/api/user/add',
        data: {
          device_token: device_token,
          emailId: emailId,
          f_name: f_name,
          l_name: l_name,
          address: address,
          country: country,
          phone_country_code: phone_country_code,
          phone_number: phone_number,
          vendor_id: vendor_id,
          vendor_name: vendor_name,
          pwd: pwd
        }
      }).then((response) => {
        if (response.data.status === "false") {
          alert(response.data.description + " : " + response.data.emailId);
        } else {
          alert(LabelConstants.com_alert_signup_user);
          this.props.navigation.navigate(AppRoute.SIGN_IN);
        }


      }, (error) => {
        console.log(error);
      });
    }
  };

  onPasswordIconPress() {
    this.setState({ passwordVisible: !this.state.passwordVisible })
  };


  navigateSignIn() {
    this.props.navigation.navigate(AppRoute.SIGN_IN);
  };

  handleCountry(e, code) {
    this.setState({
      countryCode: code
    })

    this.state.country_data.map((item, index) => {
      if(code === item.code) {
        this.setState({
          country: item.name,
          phone_country_code: item.dial_code
        })
      }
    })
  }



  render() {
    return (
      <SafeAreaLayout
        style={styles.safeArea}
      >
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
              <TextInput
                style={Styles.inputBoxStyle}
                keyboardType='email-address'
                textContentType='emailAddress'
                placeholder='Email Id'
                onChangeText={(emailId) => { this.setState({ emailId: emailId }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              <TextInput
                style={Styles.inputBoxStyle}
                placeholder='First Name'
                onChangeText={(f_name) => { this.setState({ f_name: f_name }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              <TextInput
                style={Styles.inputBoxStyle}
                placeholder='Last Name'
                onChangeText={(l_name) => { this.setState({ l_name: l_name }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              <TextInput
                style={Styles.inputBoxStyle}
                placeholder='Address'
                onChangeText={(address) => { this.setState({ address: address }) }}
              />
            </View>

            <View style={styles.picker}>
              <Picker
                selectedValue={this.state.countryCode}
                style={{ height: 50, width: '100%', color: '#000', opacity: 0.5 }}
                onValueChange={(itemValue, itemIndex) => 
                  {this.handleCountry(itemIndex, itemValue)}                  
                }>
                {this.state.country_data.map((item, index) => {
                  return (
                    <Picker.Item label={item.name} value={item.code} />
                  )
                })}
              </Picker> 
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              <TextInput
                value={this.state.phone_country_code}
                style={Styles.inputBoxStyle}
                placeholder='Country Code'
                editable={false}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              <TextInput
                keyboardType='numeric'
                style={Styles.inputBoxStyle}
                placeholder='Phone Number'
                onChangeText={(phone_number) => { this.setState({ phone_number: phone_number }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              <TextInput
                style={Styles.inputBoxStyle}
                placeholder='GSTIN/TIN'
                onChangeText={(vendor_id) => { this.setState({ vendor_id: vendor_id }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              <TextInput
                style={Styles.inputBoxStyle}
                placeholder='Premise Name'
                onChangeText={(vendor_name) => { this.setState({ vendor_name: vendor_name }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.password]}>
              <TextInput
                style={Styles.inputBoxStyle}
                secureTextEntry={this.state.passwordVisible}
                placeholder='Password'
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
                <Text style={Styles.buttonCaption}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => { this.props.navigation.navigate(AppRoute.SIGN_IN) }}>
              <Text style={styles.loremIpsum}>Already Have an Account</Text>
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
    height: 43,
    marginTop: 35,
    alignSelf: 'center'
  },

  password: {
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

  picker: {
    backgroundColor: "transparent",
    paddingLeft: 7,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    color: '#779900',
    width: '100%',
    height: 43,
    marginTop: 30,
    alignSelf: 'center'
  }
});
