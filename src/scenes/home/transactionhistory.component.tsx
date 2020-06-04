import React, { Component } from 'react';
import { StyleSheet, Alert,RefreshControl,ScrollView } from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Avatar,
  Button,
  Input
} from 'react-native-ui-kitten';
import { TransactionHistoryScreenProps } from '../../navigation/home.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { AppConstants } from '../../constants/AppConstants';
import { Separator, Container, Content, View, Footer, FooterTab, Form, Picker, Icon,ListItem} from 'native-base';
import Axios from 'axios';
import { LabelConstants } from '../../constants/LabelConstants';
import { AsyncStorage } from 'react-native';
import { MenuIcon } from '../../assets/icons';
import { Value } from 'react-native-reanimated';

type Mystate = {

}
// const prop = (props: AboutScreenProps):
export class TransactionHistoryScreen extends Component<TransactionHistoryScreenProps & SafeAreaLayoutElement, Mystate & any> {
  constructor(props) {
    super(props)
    this.state = {

    }

  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem('userDetail');
    if (value) {
      // console.log('user Details all data', value);
      const user = JSON.parse(value);
      this.setState({
        userType: user.userType,
        token: user.token,
        userId: user.userId,
      })
      // console.log('user data id', this.state.userId);      
    }
    Axios({
      method: 'get',
      url: AppConstants.API_BASE_URL +'/api/lookup/getalllookup'
    }).then((response) => {
      this.setState({
        AvailabilityList: response.data.AVAILABILITY,
        catagoryList: response.data.CATAGORY,
        languageList: response.data.LANGUAGE,
        // userId: response.data.userId
      })
    }, (error) => {
      if (error) {
        alert(error)
      }
    })
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
    });
  }


  render() {


    return (
      <Container
        style={styles.safeArea}
        insets={SaveAreaInset.TOP}>
        {/* <Toolbar
          title='Profile'
          onBackPress={this.props.navigation.goBack}
        /> */}
          <Toolbar
           title="Transaction History"
          backIcon={MenuIcon}
          onBackPress={this.props.navigation.toggleDrawer}
        />
         
        <Divider />
        <Content
           refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
           style={styles.container}>

<ScrollView style={{marginLeft:5,marginRight:5,marginBottom:10}}>
<View style={styles.TransactionView}>
<Text style={styles.Date}>2018-11-02</Text>
   <Text style={styles.TransactionText}>Paid To Sallah Uddin</Text>
     <Text style={styles.TransactionAmnt}>-$4</Text>
     
</View> 

<ListItem></ListItem>
<View style={styles.TransactionView}>
<Text style={styles.Date}>2018-11-02</Text>
   <Text style={styles.TransactionText}>Cash Recieved From Vinod</Text>
     <Text style={styles.TransactionAmnt}>+$5</Text>
   
</View> 

<ListItem></ListItem>
<View style={styles.TransactionView}>
<Text style={styles.Date}>2018-11-02</Text>
   <Text style={styles.TransactionText}>Added to Wallet </Text>
     <Text style={styles.TransactionAmnt}>+$5</Text>
   
</View> 

<ListItem></ListItem>
<View style={styles.TransactionView}>
<Text style={styles.Date}>2018-11-02</Text>
   <Text style={styles.TransactionText}>Paid To Binod </Text>
     <Text style={styles.TransactionAmnt}>-$7</Text>
  
</View> 


<ListItem></ListItem>
<View style={styles.TransactionView}>
<Text style={styles.Date}>2018-11-02</Text>
   <Text style={styles.TransactionText}>Cash Recieved Wallet Karan  </Text>
     <Text style={styles.TransactionAmnt}>+$5</Text>
  
</View> 

<ListItem></ListItem>
<View style={styles
    .TransactionView}>
<Text style={styles.Date}>2018-11-02</Text>
   <Text style={styles.TransactionText}>Paid To Komal</Text>
     <Text style={styles.TransactionAmnt}>-$5</Text>
   
</View> 

<ListItem></ListItem>
<View style={styles.TransactionView}>
<Text style={styles.Date}>2018-11-02</Text>
   <Text style={styles.TransactionText}>Cash Recieved From Vaishnav</Text>
     <Text style={styles.TransactionAmnt}>+$5</Text>
   
</View> 

<ListItem></ListItem>
<View style={styles.TransactionView}>
<Text style={styles.Date}>2018-11-02</Text>
   <Text style={styles.TransactionText}>Paid To Samrat </Text>
     <Text style={styles.TransactionAmnt}>-$4</Text>
  
</View> 

</ScrollView>

         
        </Content>

  
      </Container>
    )
  }
}

const styles = StyleSheet.create({
    Date:{
        color:'silver',
        marginLeft:5,
        fontSize:14,
        width:80,
       // alignSelf:'flex-start'
       flexDirection:'row'

    },
    Transaction:{
        color:'silver',
             marginLeft:5,
        fontWeight:'400',
        marginBottom:10
    },
    TransactionView:{
       flex:1,
          flexDirection:'row',
         // justifyContent:'space-between'

       // alignSelf:'center'
        },
        TransactionText:{
         //  fontSize:18,
           marginLeft:10,
         //  marginTop:20,
          //flexDirection:'row',
         // alignSelf:'flex-start'
         // alignSelf:'baseline'
       
        },
        TransactionAmnt:{
        // alignContent:'flex-end',
         //  fontWeight:'bold',
         //  fontSize:22,
         //  marginLeft:20,
         //  marginTop:-20,
          //alignSelf:'flex-end',
         marginRight:10,
         //flex: 1,
         // flexDirection: 'row',
          //alignSelf:'flex-end'
         position:'absolute',
         right:0
         
        }
});
