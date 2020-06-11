import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet, Alert,
  KeyboardAvoidingView, View, Image, TextInput, TouchableOpacity
} from 'react-native';
import {
  EdgeInsets,
  useSafeArea,
} from 'react-native-safe-area-context';
import {
  Formik,
  FormikProps,
} from 'formik';
import {
  Button,
  Layout, Select,
  LayoutElement,
  Text,
} from 'react-native-ui-kitten';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { Item, Picker, Form, Icon, Content } from 'native-base';
import { SignUpScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { Toolbar } from '../../components/toolbar.component';
import { FormInput } from '../../components/form-input.component';
import {
  SignUpData,
  SignUpSchema,
} from '../../data/sign-up.model';
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
const data = [
  { text: 'Candidate' },
  { text: 'HR' },
];

// const useSelectChanges = (initialSelection = null) => {
//   const [selectedOption, setSelectedOption] = React.useState(initialSelection);
//   return {
//     selectedOption,
//     onSelect: setSelectedOption,
//   };
// };

// const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
// const insets: EdgeInsets = useSafeArea();
// const largeSelectChanges = useSelectChanges();

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
    // let userName = values.username.split(" ", 2);
    // let userRole = largeSelectChanges.selectedOption != undefined && largeSelectChanges.selectedOption.text === 'HR' ? 28 :  29;
    //  console.log('User Role',userRole)
    if (emailId === " " || emailId.length === 0) {
      alert("Please EmailId");
    } else if (f_name === "" || f_name.length === 0) {
      alert("Please First Name");
    } else if (l_name === "" || l_name.length === 0) {
      alert("Please Last Name");
    } else if (address === "" || address.length === 0) {
      alert("Please Address");
    } else if (country === "" || country.length === 0) {
      alert("Please Select Country");
    } else if (phone_country_code === "" || phone_country_code.length === 0) {
      alert("Please Country Code");
    } else if (phone_number === "" || phone_number.length === 0) {
      alert("Please Phone Number");
    } else if (vendor_id === "" || vendor_id.length === 0) {
      alert("Please GSTIN/TIN");
    } else if (vendor_name === "" || vendor_name.length === 0) {
      alert("Please Premise Name");
    } else if (pwd === "" || pwd.length === 0) {
      alert("Please Password");
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
          // console.log("from signup",response.data.status);
          alert(response.data.description + " : " + response.data.emailId);
        } else {
          alert(LabelConstants.com_alert_signup_user);
          this.props.navigation.navigate(AppRoute.SIGN_IN);
        }

        //   this.props.navigation.navigate('Login');
        //  alert("SignUp Successfull \n"+"\nLogin With Your Credential");

      }, (error) => {
        console.log(error);
      });
      // alert("SignUp Successfull Login With Your Credential");
      // navigateHome();
    }
  };

  onPasswordIconPress() {
    this.setState({ passwordVisible: !this.state.passwordVisible })
  };

  // const navigateHome = (): void => {
  //   props.navigation.navigate(AppRoute.HOME);
  // };

  navigateSignIn() {
    this.props.navigation.navigate(AppRoute.SIGN_IN);
  };

  handleCountry(e, code) {
    // Alert.alert("", code)
    this.setState({
      countryCode: code
    })

    this.state.country_data.map((item, index) => {
      if(code === item.code) {
    // Alert.alert("adadad", item.dial_code)
        this.setState({
          country: item.name,
          phone_country_code: item.dial_code
        })
      }
    })
  }

  // const onPasswordIconPress = (): void => {
  //   setPasswordVisible(!passwordVisible);
  // };


  // const renderForm = (props: FormikProps<SignUpData>): React.ReactFragment => (
  //   <KeyboardAvoidingView style={styles.container} enabled>
  //     <React.Fragment>
  //       <ImageBackground
  //         style={[styles.appBar, { paddingTop: insets.top }]}
  //         source={require('../../assets/image-background.jpeg')}>

  //       </ImageBackground>
  //       <FormInput
  //         padding={0}
  //         id='email'
  //         style={styles.formControl}
  //         placeholder='Email'
  //         keyboardType='email-address'
  //       />
  //       <FormInput
  //         padding={0}
  //         id='password'
  //         style={styles.formControl}
  //         placeholder='Password'
  //         secureTextEntry={!passwordVisible}
  //         icon={passwordVisible ? EyeIcon : EyeOffIcon}
  //         onIconPress={onPasswordIconPress}
  //       />
  //       <FormInput
  //         padding={0}
  //         id='firstName'
  //         style={styles.formControl}
  //         placeholder='First Name'
  //       />
  //       <FormInput
  //         padding={0}
  //         id='lastName'
  //         style={styles.formControl}
  //         placeholder='Last Name'
  //       />
  //       <Select
  //         style={styles.select}
  //         data={data}
  //         size='large'
  //         placeholder='Candidate'
  //         {...largeSelectChanges}
  //       />
  //       <Button
  //         style={styles.submitButton}
  //         onPress={props.handleSubmit}>
  //         SIGN UP
  //     </Button><Button
  //         style={styles.haveAccountButton}
  //         appearance='ghost'
  //         status='basic'
  //         onPress={navigateSignIn}>
  //         Already have an account?
  //       </Button>
  //       <View style={{ height: 100 }}></View>

  //     </React.Fragment>
  //   </KeyboardAvoidingView>
  // );

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
              {/* <Text style={Styles.inputBoxLabel}>Email</Text> */}
              <TextInput
                style={Styles.inputBoxStyle}
                keyboardType='email-address'
                textContentType='emailAddress'
                placeholder='Email Id'
                onChangeText={(emailId) => { this.setState({ emailId: emailId }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              {/* <Text style={Styles.inputBoxLabel}>Email</Text> */}
              <TextInput
                style={Styles.inputBoxStyle}
                placeholder='First Name'
                onChangeText={(f_name) => { this.setState({ f_name: f_name }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              {/* <Text style={Styles.inputBoxLabel}>Email</Text> */}
              <TextInput
                style={Styles.inputBoxStyle}
                placeholder='Last Name'
                onChangeText={(l_name) => { this.setState({ l_name: l_name }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              {/* <Text style={Styles.inputBoxLabel}>Email</Text> */}
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
              {/* <Text>{this.state.countryCode} {this.state.country} {this.state.phone_country_code}</Text> */}
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              {/* <Text style={Styles.inputBoxLabel}>Email</Text> */}
              <TextInput
                value={this.state.phone_country_code}
                style={Styles.inputBoxStyle}
                placeholder='Country Code'
                editable={false}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              {/* <Text style={Styles.inputBoxLabel}>Email</Text> */}
              <TextInput
                keyboardType='numeric'
                style={Styles.inputBoxStyle}
                placeholder='Phone Number'
                onChangeText={(phone_number) => { this.setState({ phone_number: phone_number }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              {/* <Text style={Styles.inputBoxLabel}>Email</Text> */}
              <TextInput
                style={Styles.inputBoxStyle}
                placeholder='GSTIN/TIN'
                onChangeText={(vendor_id) => { this.setState({ vendor_id: vendor_id }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.emailBox]}>
              {/* <Text style={Styles.inputBoxLabel}>Email</Text> */}
              <TextInput
                style={Styles.inputBoxStyle}
                placeholder='Premise Name'
                onChangeText={(vendor_name) => { this.setState({ vendor_name: vendor_name }) }}
              />
            </View>

            <View style={[Styles.inputBoxContainer, styles.password]}>
              {/* <Text style={Styles.inputBoxLabel}>Password</Text> */}
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
