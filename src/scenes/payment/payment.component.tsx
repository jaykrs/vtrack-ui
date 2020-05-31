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
import { PaymentScreenProps } from '../../navigation/applied.navigator';
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
import base64 from 'react-native-base64';
interface State {
  email: string | undefined;
  password: string | undefined;
  token: string | undefined;
}
// const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
// const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

export class PaymentScreen extends Component<PaymentScreenProps, any & State & any> {
  constructor(props) {
    super(props);

    this.state = {
      emailId: '',
      pwd: '',
      passwordVisible: true
    }
  }

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
         <Text>This is payment Screen</Text>
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

 
});
