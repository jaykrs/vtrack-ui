import React from 'react';
import {
  ListRenderItemInfo, View, StyleSheet,
  TouchableOpacity, ActivityIndicator, ScrollView, Alert, 
  TextInput,ImageBackground,KeyboardAvoidingView
} from 'react-native';
import {
  Input,
  Layout,
  Modal,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  Text,
  ThemedComponentProps,
  withStyles, TabBar,
  styled, Divider, Avatar, Icon, Button
} from 'react-native-ui-kitten';
import {
  EyeIcon,
  EyeOffIcon,
} from '../../assets/icons';
// import Modal from "react-native-modal";
import { Separator, Container, Content } from 'native-base';
// import { ChangepasswordScreenProps } from '../../navigation/Accounts.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { AppConstants } from '../../constants/AppConstants';
import { LabelConstants } from '../../constants/LabelConstants';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../assets/icons';
import { any } from 'prop-types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { ChangepasswordScreenProps } from 'src/navigation/home.navigator';

type MyState = {
  displayName: String,
  dataSource: [],
  userId: String,
  likeCount: number,
  dislikeCount: number,
  liked: boolean[],
  disliked: boolean[],
  categories: [],
  selectedIndex: number
  emailId: ''
}


const renderItem = ({ item, index }) => (
  <ListItem title={`${item.title} ${index + 1}`} />
);



export class ChangepasswordScreen extends React.Component<ThemedComponentProps, MyState & any> {
  constructor(props) {
    super(props)
    this.state = {
      emailId: '',
      dob:'',
      password: '',
      confirmpassword:'',
      hidden:true,
      secureTextEntry:true,
      ConfirmPassSecureTextEntry:true 
    }
  }

  onClickListener = (viewId) => {
    if (viewId === 'UpdatePassword') {
      if (this.state.password === '' || this.state.password.length === 0) {
        Alert.alert(LabelConstants.com_alert_enter_password);
      } else if (this.state.confirmpassword === '' || this.state.confirmpassword.length == 0) {
        Alert.alert(LabelConstants.com_alert_enter_confirm_password);
      } else if (this.state.password !== this.state.confirmpassword) {
        Alert.alert(LabelConstants.com_alert_password_mismatch_please_try_again);
      } 
      else {
        axios({
          method: 'post',
          url: AppConstants.API_BASE_URL + '/api/user/update',
          data: {            
            emailId: this.state.emailId,
            pwd: this.state.password,
            dob: this.state.dob,
            userId: this.state.userId
          }
        }).then(() => {

          Alert.alert(LabelConstants.com_alert_password_updated_successfully);
        }, (error) => {
          console.log(error);
        });
      }
    }
  }
  async componentDidMount() {

    const value = await AsyncStorage.getItem('userDetail');
    if (value) {
      console.log('user Details all data', value);
      const user = JSON.parse(value);
      this.setState({
        userType: user.userType,
        token: user.token,
        userId: user.userId,
      })
      // console.log('user data id', this.state.userId)
    }
    if (this.state.userId) {
      axios({
        method: 'get',
        url: AppConstants.API_BASE_URL + '/api/user/get/' + this.state.userId,

      }).then((response) => {
        this.setState({
          emailId: response.data.emailId,
          dob: response.data.dob.substring(0, 10),
          pwd: response.data.pwd,
        })
        console.log("Profile Data", response.data.emailId);
      },
        (error) => {
          console.log(error);
          if (error) {
            Alert.alert("Error");
          }
        });
    }
    axios({
      method: 'get',
      url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',

    }).then((response) => {
      this.setState({
        user_Type: response.data.USER_TYPE

      })
      console.log("Profile Data", this.state.UserType);
    },
      (error) => {
        console.log(error);
        if (error) {
          Alert.alert("UserId or Password is invalid");
        }
      });
  }


  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  renderIcon = (style) => (
    <Icon {...style} name={this.state.secureTextEntry ? 'eye-off' : 'eye'}/>
  );

  onIconPress = () => {
    this.setState({secureTextEntry:!this.state.secureTextEntry});
  };

  ConfirmRenderIcon = (style) => (
    <Icon {...style} name={this.state.ConfirmPassSecureTextEntry ? 'eye-off' : 'eye'}/>
  );

  ConfirmOnIconPress = () => {
    this.setState({ConfirmPassSecureTextEntry:!this.state.ConfirmPassSecureTextEntry});
  };

  render() {
  
    return (
      
      <SafeAreaLayout

        insets={SaveAreaInset.TOP}>
        <Toolbar
           title="Change Password"
          backIcon={MenuIcon}
          onBackPress={this.props.navigation.toggleDrawer}
        />
        <Divider />
         <ImageBackground
          style={[styles.appBar,{width:150,height:150,alignSelf:'center',marginTop:-40,position:'relative',zIndex:-100}]}
          source={require('../../assets/image-background.jpeg')}></ImageBackground>
        
        
        <ScrollView style={{marginTop:-25}}>
       
        {/* <Text style={{fontSize:20,alignSelf:'center',marginTop:20}}>Change Password</Text> */}
          <Input
          padding={0}
            style={styles.Input}
            label='Password'
            placeholder='Enter Password'
            secureTextEntry={this.state.secureTextEntry}
            icon={this.renderIcon}
            onIconPress={this.onIconPress}           
            value={this.state.password}
            onChangeText={(password) => this.setState({ password})}
          />
          <Input
          padding={0}
            style={styles.Input}
            label='Confirm Password'
            placeholder='Enter Confirm Password'
            secureTextEntry={this.state.ConfirmPassSecureTextEntry}
            icon={this.ConfirmRenderIcon}
            onIconPress={this.ConfirmOnIconPress}     
            value={this.state.confirmpassword}
            onChangeText={(confirmpassword) => this.setState({ confirmpassword })}
          />
          <Button style={styles.button} appearance='outline' status='basic' onPress={() => this.onClickListener("UpdatePassword")}>Submit</Button>
         <View style={{backgroundColor:'white',height:300}}></View>
        </ScrollView>
  

      </SafeAreaLayout>
      
    );
  }
}

export const ChangepasswordScreens = withStyles(ChangepasswordScreen, (theme) => ({

  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  filterInput: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  list: {
    flex: 1,
    backgroundColor: theme['background-basic-color-1'],
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
  },
  itemProgressBar: {
    width: '50%',
    marginVertical: 12,
  },
  input: {
    margin: 8,
  },
}));

const styles = StyleSheet.create({
 
  Input: {
    margin: 8
  },
  button: {
    margin: 8,
  },
  wallet: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20
  },
  container: {
    minHeight: 256,
    padding: 16,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
    // backgroundColor:'silver'
  }


});

