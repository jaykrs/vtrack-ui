import React from 'react';
import {
  ListRenderItemInfo, View, StyleSheet,
  TouchableOpacity, ActivityIndicator, ScrollView, Alert, TextInput,RefreshControl
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
// import Modal from "react-native-modal";
import { TodoInProgressScreenProps } from '../../navigation/todo.navigator';
import { Separator, Container, Content } from 'native-base';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
// import console = require('console');

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



export class AccountsScreen extends React.Component<TodoInProgressScreenProps & ThemedComponentProps, MyState & any> {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      emailId: '',
      dob: '',
      city: '',
      phoneNo: '',
      pwd: '',
      walletBalance: '',
      lastLoginDate: '',
      visible: false,
      setVisible: false,
      userId: '',
      user_Type: [],
      userType: '',
      imageData: '',
      imageWidth: '',
      imageHeight: '',
      imageTimelineType: '',
      imageSource: null,
      refreshing: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
  }



  onClickListener = (viewId) => {
    if (viewId === 'UpdateDetails') {
      if (this.state.firstName === '' || this.state.firstName.length === 0) {
        Alert.alert(LabelConstants.com_alert_enter_first_name);
      } else if (this.state.lastName === '' || this.state.lastName.length === 0) {
        Alert.alert(LabelConstants.com_alert_enter_last_name);
      } else if (this.state.emailId === '' || this.state.emailId.length === 0) {
        Alert.alert(LabelConstants.com_alert_enter_email_id);
      } else if (this.state.dob === '' || this.state.dob.length === 0) {
        Alert.alert(LabelConstants.com_alert_enter_date_of_birth);
      } else if (this.state.city === '' || this.state.city.length == 0) {
        Alert.alert(LabelConstants.com_alert_enter_city);
      } else if (this.state.phoneNo === '' || this.state.phoneNo.length == 0) {
        Alert.alert(LabelConstants.com_alert_enter_phone_number);
      } else {
        axios({
          method: 'post',
          url: AppConstants.API_BASE_URL + '/api/user/update',
          data: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            pwd: this.state.pwd,
            emailId: this.state.emailId,
            dob: this.state.dob,
            city: this.state.city,
            phone: this.state.phoneNo,
            userId: this.state.userId
          }
        }).then(() => {

          Alert.alert("Personal Details Updated Successfully");
        }, (error) => {
          console.log('Data is invailid', error);
        });
      }
    }
  }

  selectPhoto(e, timelineType) {
    // console.log('Select Photo Clicked')
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        // console.log("image",response.uri);
        const file = { name: 'thoughtPF_image' + response.fileName, uri: response.uri, type: response.type, size: response.fileSize, path: response.path }
        this.setState({
          timelineType: timelineType,
          imageSource: source,
          timelineBody: response,
          imageWidth: response.width,
          imageHeight: response.height,
          file: file        
        });
        // console.log('Image Source', file)
      // this.handleSubmit();
      }
    });
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
      console.log('user data id', this.state.userId)

    }
    if (this.state.userId) {
      axios({
        method: 'get',
        url: AppConstants.API_BASE_URL + '/api/user/get/' + this.state.userId,

      }).then((response) => {
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          emailId: response.data.emailId,
          phoneNo: response.data.phoneNo,
          dob: response.data.dob.substring(0, 10),
          city: response.data.city,
          pwd: response.data.pwd,
          walletBalance: response.data.walletBalance,
          lastLoginDate: response.data.lastLoginDate
        })
        console.log("Profile Data", this.state.dob);
      },
        (error) => {
          console.log(error);
          if (error) {
            Alert.alert("UserId or Password is invalid");
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

  handleSubmit() {
    const { timelineBody, timelineType, catagory, userId, imageTimelineType, file } = this.state;
    const formData = new FormData();
        formData.append('file', file)
  axios({
    method: 'post',
    url: AppConstants.API_BASE_URL + '/api/file/upload/avatar/' + this.state.userId,
    data: formData
  }).then((response) => {
    Alert.alert("Profile Image Uploaded successfully");
    // this.props.navigation.goBack()
  },
    (error) => {
      if (error) {
        Alert.alert("You are using wrong format");
      }
    });
}

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }


  render() {

    return (

      <SafeAreaLayout
        style={styles.safeArea}
        insets={SaveAreaInset.TOP}>
        {/* <Toolbar
           title="Accounts"
          backIcon={MenuIcon}
          onBackPress={this.props.navigation.toggleDrawer}
        /> */}
        <Toolbar
          title='Accounts'
          onBackPress={this.props.navigation.goBack}
        />
        <Divider />


        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
              
             <View style={{backgroundColor:'#D8D8D899',width:110,alignSelf:'center',borderRadius:55}}> 
             <TouchableOpacity style={{ justifyContent: 'center',backgroundColor:'#D8D8D899',width:30,height:30,borderRadius:20,position:'absolute',zIndex:100,marginLeft:80,marginTop:78 }} onPress={e => this.selectPhoto(e, this.state.imageTimelineType)}>
                <MaterialCommunityIcons size={20} name="camera" style={{ textAlign: 'center', color: '#104de8'}}/>
 
              </TouchableOpacity>
            
              {this.state.imageSource === null ?
              <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + this.state.userId + '_avatar.png' }} style={styles.image} />
             :
              <Avatar  source={this.state.imageSource}  style={[styles.image]} />}
                </View> 
              <TouchableOpacity onPress={this.handleSubmit} style={{backgroundColor:'white',justifyContent:'center',width:100,height:30,borderRadius:20,alignSelf:'center',marginBottom:5}}>
                <Text  style={{ textAlign: 'center', color: '#104de8',alignSelf:'center'}}>Upload</Text>
              </TouchableOpacity> 
             
              {/* <Button onPress={this.handleSubmit} style={{width:100,height:2,alignSelf:'center',borderRadius:20}}  >Upload</Button> */}
          <Text style={{ fontSize: 18, alignSelf: 'center', marginBottom: 10 }}>{this.state.firstName} {this.state.lastName}</Text>
          <Text style={{ alignSelf: 'center', fontSize: 12 }}>LastSeen:{this.state.lastLoginDate.length < 35
            ? `${this.state.lastLoginDate.substring(0, 10)}`
            : `${this.state.lastLoginDate}`}</Text>
          <Separator style={{ height: 40 }} bordered>
            <Text>Personal Details </Text>
          </Separator>
          <Input
          padding={0}
            style={styles.Input}
            label='First Name'
            placeholder='Enter First Name'
            value={this.state.firstName}
            onChangeText={(firstName) => this.setState({ firstName })}
          />
          <Input
          padding={0}
            style={styles.Input}
            label='Last Name'
            placeholder='Enter Last Name'
            value={this.state.lastName}
            onChangeText={(lastName) => this.setState({ lastName })}
          />
          <Input
          padding={0}
            style={styles.Input}
            label='Email Address'
            placeholder='Enter Email Address'
            value={this.state.emailId}
            onChangeText={(emailId) => this.setState({ emailId })}
          />
          <Input
          padding={0}
            style={styles.Input}
            label='Date Of Birth'
            placeholder='Enter Date Of Birth'
            value={this.state.dob.length < 35
              ? `${this.state.dob.substring(0, 10)}`
              : `${this.state.dob}`}
            onChangeText={(dob) => this.setState({ dob })}
          />


          <Input
          padding={0}
            style={styles.Input}
            label='City'
            placeholder='Enter City Name'
            value={this.state.city}
            onChangeText={(city) => this.setState({ city })}
          />
          <Input
          padding={0}
            style={styles.Input}
            label='Phone Number'
            placeholder='Enter Phone Number'
            value={this.state.phoneNo}
            onChangeText={(phoneNo) => this.setState({ phoneNo })}
          />

          {/* <Input
            style={styles.Input}
            label='Password'
            value={this.state.Password}
            placeholder='Enter Password'
            //icon={renderIcon}
            secureTextEntry={true}
            // onIconPress={onIconPress}
            onChangeText={(Password) => { this.setState({ Password }) }}
          /> */}

          <Button style={styles.button} appearance='outline' status='basic' onPress={() => this.onClickListener("UpdateDetails")}>Update</Button>
          <Separator style={{ height: 40 }} bordered>
            <Text>View Transaction History</Text>
          </Separator>

          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={styles.wallet} onPress={() => this.props.navigation.navigate('Transactions')}>Wallet Balance
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 20, marginTop: 10 }}> {this.state.walletBalance} $</Text>
            </Text>
          </View>

          <Separator style={{ height: 40 }} bordered />
          {this.state.user_Type.map((item, index) => {
            if (item.lookUpId == this.state.userType && item.lookUpName == 'CONSULTANT') {
                return (
                  <Button style={styles.button} appearance='outline' status='basic'>Profile</Button>

                )
            }
          })}



        </ScrollView>


      </SafeAreaLayout>

    );
  }
}

const options = {
  title: 'Select a Photo',
  takePhoto: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1,
  // type: ''
}

export const AccountsScreens = withStyles(AccountsScreen, (theme) => ({

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
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
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

