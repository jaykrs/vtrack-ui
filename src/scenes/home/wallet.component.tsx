import React from 'react';
import {
  ListRenderItemInfo, View, StyleSheet,
  TouchableOpacity, ActivityIndicator, ScrollView, Alert, TextInput,RefreshControl
} from 'react-native';
import {
  Input,
  Layout,
  // Modal,
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
import { Separator, Container, Content } from 'native-base';
import { AppRoute } from '../../navigation/app-routes';
import { AppConstants } from '../../constants/AppConstants';
import { LabelConstants } from '../../constants/LabelConstants';
import { Toolbar } from '../../components/toolbar.component';
import { WalletScreenProps } from '../../navigation/home.navigator';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../assets/icons';
import { any } from 'prop-types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Modal from "react-native-modal";
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
  emailId: '',
  isModalVisible: false,
  walletBalance: '',
  refreshing: false,

}


const renderItem = ({ item, index }) => (
  <ListItem title={`${item.title} ${index + 1}`} />
);



export class WalletScreen extends React.Component<WalletScreenProps & ThemedComponentProps, MyState & any> {
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
      visible:false,
       setVisible: false,
       userId:'',
       isModalVisible:false,
       amount:''
    }

  }


// can use this for bank details
  // onClickListener = (viewId) => {
  //   if (viewId === 'UpdateDetails') {
  //       if (this.state.firstName === '' || this.state.firstName.length === 0) {
  //        Alert.alert(LabelConstants.com_alert_enter_first_name);
  //     } else if (this.state.lastName === '' || this.state.lastName.length === 0) {
  //       Alert.alert(LabelConstants.com_alert_enter_last_name);
  //     }else if (this.state.emailId === '' || this.state.emailId.length === 0) {
  //       Alert.alert(LabelConstants.com_alert_enter_email_id);
  //     } else if (this.state.dob === '' || this.state.dob.length === 0) {
  //       Alert.alert(LabelConstants.com_alert_enter_date_of_birth);
  //     } else if (this.state.city === '' || this.state.city.length == 0) {
  //       Alert.alert(LabelConstants.com_alert_enter_city);
  //     } else if (this.state.phoneNo === '' || this.state.phoneNo.length == 0) {
  //       Alert.alert(LabelConstants.com_alert_enter_phone_number);
  //     } else {
  //       axios({
  //         method: 'post',
  //         url: AppConstants.API_BASE_URL + '/api/user/update',
  //         data: {
  //           firstName: this.state.firstName,
  //           lastName: this.state.lastName,
  //           pwd: this.state.pwd,
  //           emailId: this.state.emailId,
  //           dob: this.state.dob,
  //           city: this.state.city,
  //           phone: this.state.phoneNo,
  //           userId: this.state.userId
  //         }
  //       }).then(() => {

  //         Alert.alert("Personal Details Updated Successfully");
  //       }, (error) => {
  //         console.log('Data is invailid',error);
  //       });
  //     }
  //   }
  // }
//   can use above code for bank details update

onClickListener = (viewId) => {
  if (viewId === 'UpdateFund') {
      if (this.state.amount === '' || this.state.amount.length === 0) {
       Alert.alert("Add amount");
    } else {
      axios({
        method: 'post',
        url: AppConstants.API_BASE_URL + '/api/user/updateWalletBalance',
        data: {
          
          amount: this.state.amount,
          userId: this.state.userId,
          
        }
      }).then(() => {
        Alert.alert(this.state.amount+"$"+"  Added To Your Wallet");
        axios({
          method: 'get',
          url: AppConstants.API_BASE_URL + '/api/user/get/' + this.state.userId,
  
        }).then((response) => {
          this.setState({
              ...this.state,
            walletBalance: response.data.walletBalance,
          })
          console.log("Profile Data", this.state.dob);
        },
          (error) => {
            console.log(error);
            if (error) {
              Alert.alert("UserId or Password is invalid");
            }
          });
        this.toggleModal();
      }, (error) => {
        console.log('Data is invailid',error);
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
      console.log('user data id', this.state.userId)
      
    }
    if (this.state.userId) {
      axios({
        method: 'get',
        url: AppConstants.API_BASE_URL + '/api/user/get/' + this.state.userId,

      }).then((response) => {
        this.setState({
            ...this.state,
          walletBalance: response.data.walletBalance,
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


  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible,
      isModalVisible: !this.state.isModalVisible});
  };

  _onRefresh() {
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
    });
  }


  render() {
  
    return (

      <SafeAreaLayout
        style={styles.safeArea}
        insets={SaveAreaInset.TOP}>
        <Toolbar
           title="Wallet"
          backIcon={MenuIcon}
          onBackPress={this.props.navigation.toggleDrawer}

        />
        <Divider />


        <ScrollView 
         refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>

          <Separator style={{ height: 40 }} bordered>
            <Text>View Transaction History</Text>
          </Separator>

          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={styles.wallet} onPress={() => this.props.navigation.navigate('Transactions')}>Wallet Balance
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 20, marginTop: 10 }}> {this.state.walletBalance} $</Text>
            </Text>
          </View>

          <Separator style={{ height: 40 }} bordered>
            <Text>Add Fund</Text>
          </Separator>

          <Button onPress={this.toggleModal} style={styles.button} appearance='outline' status='basic'>Add Fund</Button>
          <Modal  style = {styles.modal} isVisible={this.state.isModalVisible}>
         
         <Text style = {styles.text}>Add Fund</Text> 
         <TextInput style={ styles.modelTextInput}
             placeholder=' Enter Amount In Dollars'
             onChangeText={(amount) => this.setState({ amount })}
             placeholderTextColor='black'></TextInput>           
       
         <View style={styles.ViewinModel}>
             <Button bordered 
             style={styles.modelButton} 
             onPress={this.toggleModal} >
            NO
             </Button>  
             <Button bordered light
             style={styles.modelButton} 
            //  onPress={this.toggleModal}
             onPress={() => this.onClickListener("UpdateFund")} >
             YES</Button>
           </View>
          
      </Modal>
          {/* <Separator style={{ height: 40 }} bordered>
            <Text>Withdrawells</Text>
          </Separator>

          <Button style={styles.button} appearance='outline' status='basic'>Fund Withdrawells</Button>
 */}

          <Separator style={{ height: 40 }} bordered>
            <Text>Bank Details</Text>
          </Separator>

          <Input
          padding={0}
            style={styles.Input}
            label='Name'
            placeholder='Enter name of acount holder'
            value={this.state.Name}
            onChangeText={(Name) => this.setState({ Name })}
          />

          <Input
          padding={0}
            style={styles.Input}
            label='Account Number'
            placeholder='Enter account number'
            value={this.state.AccountNumber}
            onChangeText={(AccountNumber) => this.setState({ AccountNumber })}
          />

          <Input
          padding={0}
            style={styles.Input}
            label='Bank Name'
            placeholder='Enter bank name'
            value={this.state.BankName}
            onChangeText={(BankName) => this.setState({ BankName })}
          />

          <Input
          padding={0}
            style={styles.Input}
            label='IFSC Code'
            placeholder='Enter IFSC code'
            value={this.state.BankName}
            onChangeText={(BankName) => this.setState({ BankName })}
          />

          <Button style={styles.button} appearance='outline' status='basic'>Update</Button>
          <Separator style={{ height: 40 }} bordered />
          <Button style={styles.button} appearance='outline' status='basic'>SignOut</Button>


        </ScrollView>


      </SafeAreaLayout>

    );
  }
}

export const WalletScreens = withStyles(WalletScreen, (theme) => ({

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
  ViewinModel:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'    
    },    
  modelButton:{
    width:'49.9%',
    borderBottomLeftRadius:10,
    justifyContent:'center'
  }, 
 modelTextInput:{
   backgroundColor:'white',
   height:'20%',
   width:'80%',
   marginTop:20,
   marginBottom:20
   },
  modal: {  
  justifyContent: 'center',  
  alignItems: 'center',   
  backgroundColor : "#fafafa",
  height:'50%',      
  width: '90%',  
  borderRadius:10,  
  borderWidth: 1,  
  borderColor: '#fafafa',    
  marginTop: 80    
   },  
   text: {  
      color: '#3f2949',  
      marginTop: 10,
      fontWeight:'800', 
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

