import React, { Component } from 'react';
import { StyleSheet, Alert,RefreshControl } from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Avatar,
  Button,
  Input
} from 'react-native-ui-kitten';
import { ProfileEditScreenProps } from '../../navigation/timeline.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { AppConstants } from '../../constants/AppConstants';
import { Separator, Container, Content, View, Footer, FooterTab, Form, Picker, Icon } from 'native-base';
import Axios from 'axios';
import { LabelConstants } from '../../constants/LabelConstants';
import { AsyncStorage } from 'react-native';
import { MenuIcon } from '../../assets/icons';
import { Value } from 'react-native-reanimated';

type Mystate = {

}
// const prop = (props: AboutScreenProps):
export class ProfileEditScreen extends Component<ProfileEditScreenProps & SafeAreaLayoutElement, Mystate & any> {
  constructor(props) {
    super(props)
    this.state = {
      profileData: [],
      AvailabilityList: [],
      availability: '',
      languageList: [],
      languagePrimary: '',
      catagoryList: [],
      catagory: '',
      userId: '',
      userType: '',
      displayName: '',
      firstName: '',
      lastName: '',
      city: '',
      WalletBalance: '',
      emailId: '',
      dob: '',
      refreshing: false,
      consultationPrice:''
    }

  }

  onClickListener = (viewId) => {
    if (viewId === 'Update Profile') {
      // console.log("update button pressed",this.state.languagePrimary,this.state.availability,this.state.catagory,this.state.userId);
      if (this.state.availability === '' || this.state.availability.length === 0) {
        Alert.alert(LabelConstants.com_alert_choose_availability);       
      } else if (this.state.catagory === '' || this.state.catagory.length === 0) {
        Alert.alert(LabelConstants.com_alert_choose_category);
      } else if (this.state.languagePrimary === '' || this.state.languagePrimary.length == 0) {
        Alert.alert(LabelConstants.com_alert_choose_language);
      } else if (this.state.consultationPrice === '' || this.state.consultationPrice.length == 0) {
        Alert.alert("Set Consultation Price");
      }else
       {
        Axios({
          method: 'post',
          url: AppConstants.API_BASE_URL + '/api/profile/create',
          data: {
            userId: this.state.userId,
            catagory: this.state.catagory,
            availability: this.state.availability,
            primaryLanguage: this.state.languagePrimary,
            // SubCatagory: null,
            // backgroundExpertise:"IT cloud computing and infrastructure",
            consultationPrice: this.state.consultationPrice,
            // summeryDetails:"5",
            // articleId:'43',
            // secondaryLanguage:'47'
          }

        }).then(() => {
          Alert.alert("Profile Details Updated Successfully");
          //    this.props.navigation.navigate('HomeScreen');

        }, (error) => {
          console.log(error);
        });
      }
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
      url: AppConstants.API_BASE_URL + '/api/user/get/' + this.state.userId
    }).then((response) => {
      this.setState({
        profileData: response.data,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        emailId: response.data.emailId,
        city: response.data.city,
        dob: response.data.dob,
        WalletBalance: response.data.walletBalance
      })
      // console.log("getPorfile",response.data);
    }, (error) => {
      if (error) {
        Alert.alert(error)
      }
    });
    Axios({
      method: 'get',
      url: AppConstants.API_BASE_URL +'/api/profile/getprofile/' + this.state.userId
    }).then((response) => {
      this.setState({
        profileData: response.data,
        backgroundExpertise: response.data.backgroundExpertise,
        summeryDetails: response.data.summeryDetails,
        consultationPrice: response.data.consultationPrice,
        availability: response.data.availability,
        displayName: response.data.displayName,
        catagory: response.data.catagory,
        languagePrimary: response.data.languagePrimary,
        languageSeconday: response.data.languageSeconday
      })
      // console.log("ConsultationPrice",this.state.consultationPrice);
    }, (error) => {
      if (error) {
        Alert.alert(error)
      }
    });

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
        Alert.alert(error)
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
           title="Edit Profile"
           onBackPress={this.props.navigation.goBack}
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

          <View style={styles.dataView}>
          
            <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + this.state.userId + '_avatar.png' }} style={styles.image} />
            {/* this.state.userId  */}
            <View>
              <Text style={styles.data}>{this.state.firstName} {this.state.lastName}</Text>
            </View>
          </View>

      

          {this.state.userType === "28" ?
            <Separator style={styles.seprator} bordered>
              <Text>Statistics</Text>
            </Separator> : null}


          <View style={styles.dataView}>
            {this.state.userType === "28" ?
              <View style={{ flex: -1, flexDirection: 'row' }}>

                <View style={{ flex: -1, flexDirection: 'column', width: '100%' }}>


                  <View style={{ width: "100%", }}>
                    <Text style={styles.data}> {this.state.profileData.consultationPrice} $ </Text>
                  </View>

                  <View>
                    <Text style={styles.dataHeading}> Consultation Price </Text>
                  </View>

                  <View style={{ width: "100%" }}>
                    <Text style={styles.data}> {this.state.profileData.servedConsultation} </Text>
                  </View>

                  <View style={{ width: '100%' }}>
                    <Text style={styles.dataHeading}> Served Consultation </Text>
                  </View>

                  <View style={{ width: "100%" }}>
                    <Text style={styles.data}> {this.state.profileData.averageRating} </Text>
                  </View>

                  <View style={{ width: '100%' }}>
                    <Text style={styles.dataHeading}> Average Rating </Text>
                  </View>

                   <View style={{ width: "100%" }}>
                    <Text style={styles.data}> {this.state.profileData.totalEarning} </Text>
                  </View>

                  <View style={{ width: '100%', }}>
                    <Text style={styles.dataHeading}> Total Earned </Text>
                  </View>

                  <View style={{ width: "100%" }}>
                    <Text style={styles.data}> {this.state.profileData.averageResponseTime} </Text>
                  </View>

                  <View style={{ width: '100%', }}>
                    <Text style={styles.dataHeading}> Average Response Time </Text>
                  </View>


                </View>

              </View> : null}

          </View>
          {this.state.userType === "28" ?
            <Separator style={{ height: 40, marginBottom: 10 }} bordered>
              <Text>Update Details</Text>
            </Separator> : null}
            {this.state.userType === "28" ?          
          <Separator style={{ height: 20, backgroundColor: '#F9F9F9' }} bordered>
  <Text style={{ marginLeft: 10 }}>Set Consultation Price in $</Text>
          </Separator> : null}
          {this.state.userType === "28" ?
        
            <Input
          padding={0}
            style={{width:'50%',alignSelf:'center',marginTop:5}}
            // label='Set Consultation Price'
            placeholder='Enter Consultation Price'         
            value={String(this.state.consultationPrice)}
            onChangeText={(consultationPrice) => this.setState({ consultationPrice })}
            />
             :null}

          {this.state.userType === "28" ?
          
            <Separator style={{ height: 20, backgroundColor: '#F9F9F9' }} bordered>
              <Text style={{ marginLeft: 10 }}>Choose Availability</Text>
            </Separator> : null}
          {this.state.userType === "28" ?
            <Form style={{ width: '70%', alignSelf: 'center', backgroundColor: 'white', marginTop: 10 }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                headerStyle={{ backgroundColor: "#b95dd3" }}
                placeholder="Select Availability"
                headerBackButtonTextStyle={{ color: "#fff" }}
                headerTitleStyle={{ color: "#fff" }}
                selectedValue={this.state.availability}
                onValueChange={(itemValue) => {
                  this.setState({ availability: itemValue })
                }
                }
              >
                {this.state.AvailabilityList.map((item, index) => {
                  return (<Picker.Item label={item.lookUpName} value={item.lookUpId} key={index} />)
                })}

              </Picker>
            </Form> : null}





          <View style={styles.dataView}>
            {this.state.userType === "28" ?
              <View style={{ flex: -1, flexDirection: 'column' }}>

                {/* <View style={{ width: '100%', }}>
                {this.state.allLookUp.map((item, index) => {
                  if (item.lookUpId === this.state.profileData.availability) {
                    return (
                      <Text key={index} style={styles.dataHeading}> Availability : {item.lookUpName} </Text>
                    )
                  }
                })}
              </View> */}

                <Separator style={{ height: 20, backgroundColor: '#F9F9F9' }} bordered>
                  <Text>Choose Category</Text>
                </Separator>


                <Form style={{ width: '70%', alignSelf: 'center', backgroundColor: 'white', marginTop: 10 }}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    headerStyle={{ backgroundColor: "#b95dd3" }}
                    placeholder="Select Category"
                    headerBackButtonTextStyle={{ color: "#fff" }}
                    headerTitleStyle={{ color: "#fff" }}
                    selectedValue={this.state.catagory}
                    onValueChange={(itemValue) => {
                      this.setState({ catagory: itemValue })
                    }
                    }
                  >
                    {this.state.catagoryList.map((item, index) => {
                      return (<Picker.Item label={item.lookUpName} value={item.lookUpId} key={index} />)
                    })}

                  </Picker>
                </Form>
                {/* <View style={{ width: '100%', }}>
                {this.state.catagory.map((item, index) => {
                  if (item.lookUpId === this.state.profileData.catagory) {
                    return (
                      <Text key = {index} style={styles.dataHeading}> Category : {item.lookUpName}</Text>
                    )
                  }
                })
                }
              </View> */}
                <Separator style={{ height: 20, backgroundColor: '#F9F9F9' }} bordered>
                  <Text>Choose Languages</Text>
                </Separator>
                <Form style={{ width: '70%', alignSelf: 'center', backgroundColor: 'white', marginTop: 10 }}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    headerStyle={{ backgroundColor: "#b95dd3" }}
                    placeholder="Select Primary Language"
                    headerBackButtonTextStyle={{ color: "#fff" }}
                    headerTitleStyle={{ color: "#fff" }}
                    selectedValue={this.state.languagePrimary}
                    onValueChange={(itemValue) => {
                      this.setState({ languagePrimary: itemValue })
                    }
                    }
                  >
                    {this.state.languageList.map((item, index) => {
                      return (<Picker.Item label={item.lookUpName} value={item.lookUpId} key={index} />)
                    })}
                  </Picker>
                </Form>
                {/* <View style={{ width: '100%', }}>
              <Text style={styles.dataHeading}> Languages : {
              this.state.language.map((item, index) => {
                  if (item.lookUpId === this.state.profileData.languagePrimary) {
                    return (
                       item.lookUpName
                    )
                  }
                })
              }, { 
                this.state.language.map((item, index) => {
                  if (item.lookUpId === this.state.profileData.languageSeconday) {
                    return (
                       item.lookUpName
                    )
                  }
                })
                }
                </Text>
              </View>

              <View style={{ width: '100%', }}>
                <Text style={styles.dataHeading}> English : Fluent</Text>
              </View> */}
              </View> : null}
            {this.state.userType === "28" ?
              <Button appearance='outline' status='basic' onPress={() => this.onClickListener("UpdateProfile")}>Update</Button>
              : null}
          </View>
          {this.state.userType === "28" ?
            <Separator style={styles.seprator} bordered>
              <Text>Consultation history and feedback</Text>
            </Separator> : null}
          {this.state.userType === "28" ?
            <View style={styles.dataView}>
              <View style={{ width: '100%', }}>
                <Text style={styles.feedBack}> He is very professional in consultation, in depth</Text>
              </View>
            </View> : null}

          {this.state.userType === "29" ?
            <View>
            <Separator style={[{marginBottom:10},styles.seprator]} bordered>
              <Text>User Details</Text>
            </Separator> 
              <Separator style={styles.Seperator} bordered>
                <Text style={styles.text}>Email-ID</Text>
              </Separator>
              <Text style={styles.userDataText}>{this.state.emailId}</Text>
              <Separator style={styles.Seperator} bordered>
                <Text style={styles.text}>City</Text>
              </Separator>
              <Text style={styles.userDataText}>{this.state.city}</Text>
              <Separator style={styles.Seperator} bordered>
                <Text style={styles.text}>Date Of Birth</Text>
              </Separator>
              <Text style={styles.userDataText}>{this.state.dob.length < 35
              ? `${this.state.dob.substring(0, 10)}`
              : `${this.state.dob}`}</Text>
              <Separator style={styles.Seperator} bordered>
                <Text style={styles.text}>Wallet Balance</Text>
              </Separator>
              <Text style={styles.userDataText}>{this.state.WalletBalance}$</Text>
            </View> : null}
          {/* <Button style={styles.button}> Ask free question </Button> */}
        </Content>

        {/* <Content style={styles.footerLayout}> */}
        {/* <Footer style={styles.footer}> */}
        {/* <FooterTab > */}

        {/* </FooterTab> */}
        {/* </Footer> */}

        {/* </Content> */}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
 
  text:{
    marginLeft: 10
  },
  userDataText: {
    marginLeft: 40,
    marginTop:10,
    marginBottom:10
    // alignSelf: 'center'
  },
  Seperator: {
    height: 20,
    backgroundColor: '#F9F9F9'
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: -1,
  },

  footerLayout: {
    flexDirection: 'column-reverse',
  },

  footer: {
    backgroundColor: '#f59c02',
    width: '100%',
    alignSelf: 'center'
  },

  button: {
    backgroundColor: '#f59c02',
    borderColor: '#f59c02'
  },

  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 5,
  },

  seprator: {
    height: 40
  },

  dataView: {
    padding: 5,
    // paddingVertical: 20,
    textAlign: 'center'
  },

  dataHeading: {
    paddingVertical: 5,
    alignSelf:'center'
  },

  data: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },

  feedBack: {
    paddingVertical: 5,
    color: 'green',
    justifyContent: 'flex-start'
  }
});
