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
import { MoreScreenProps } from '../../navigation/home.navigator';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchIcon } from '../../assets/icons';

type Mystate = {

}
// const prop = (props: AboutScreenProps):
export class MoreScreen extends Component<MoreScreenProps & SafeAreaLayoutElement & any, Mystate & any> {
  constructor(props) {
    super(props)
    this.state = {
      profileData: [],
      availabilityList: [],
      availability: '',
      languageList: [],
      language: '',
      primaryLanguage: '',
      catagoryList: [],
      catagory: '',
      userId: '',
      firstName: '',
      lastName: '',
      refreshing: false
    }

  }

  // componentDidUpdate() {
  //   const value = JSON.stringify(this.props.route.params.pid)
  //   if(value !== this.state.userId){
  //   console.log('userID in profile', value);
  //   this.setState({
  //     userId: value
  //   })
  // }
  // }

//  async componentDidUpdate() {

//     const value = await AsyncStorage.getItem('userId');
//     // console.log('userID in profile', value);
    
//     if (value) {
//       console.log('Data from async',value)
      
//       if( value !== this.state.userId) {
//         const userId = JSON.parse(value);
//         console.log('userID in profile', userId);

//         this.setState({
//           userId : userId
//         }) ;
//       }     
//     }
//   }

UNSAFE_componentWillReceiveProps(nextProps) {
  const value = JSON.stringify(this.props.id)
  if(value !== this.state.userId){
  console.log('userID in More', value);
  this.setState({
    userId: value
  })
  Axios({
    method: 'get',
    url: AppConstants.API_BASE_URL + '/api/profile/getprofile/' + value
  }).then((response) => {
    this.setState({
      profileData: response.data,
      backgroundExpertise: response.data.backgroundExpertise,
      summeryDetails: response.data.summeryDetails,
      consultationPrice: response.data.consultationPrice,
      availability: response.data.availability,
      displayName: response.data.displayName,
      catagory: response.data.catagory,
      language: response.data.languagePrimary,
      languageSeconday: response.data.languageSeconday
    })
  }, (error) => {
    if (error) {
      Alert.alert(error)
    }
  });

  Axios({
    method: 'get',
    url: AppConstants.API_BASE_URL + "/api/user/get/" + value
  }).then((response) => {
    this.setState({
     firstName: response.data.firstName,
     lastName: response.data.lastName
    })
  }, (error) => {
    if (error) {
      Alert.alert(error)
    }
  });
}
}
 componentDidMount(){
  const value = JSON.stringify(this.props.id)
//   console.log('userid in more out of if',this.props)
  if(value !== this.state.userId){
  console.log('userID in More', value);
  this.setState({
    userId: value
  })
}
   
  //   const value = JSON.stringify(this.props.route.params.pid)
  //   if(value !== this.state.userId){
  //   console.log('userID in profile', value);
  //   this.setState({
  //     userId: value
  //   })
  // }

    // if (value) {
    //   console.log('user Details all data', value);
    //   const user = JSON.parse(value);
    //   this.setState({
    //     userType: user.userType,
    //     token: user.token,
    //     userId: user.userId,
    //   })
    //   console.log('user data id', this.state.userId);      
    // }
    Axios({
      method: 'get',
      url: AppConstants.API_BASE_URL + "/api/profile/getprofile/" + value
    }).then((response) => {
      this.setState({
        profileData: response.data,
        backgroundExpertise: response.data.backgroundExpertise,
        summeryDetails: response.data.summeryDetails,
        consultationPrice: response.data.consultationPrice,
        availability: response.data.availability,
        displayName: response.data.displayName,
        catagory: response.data.catagory,
        language: response.data.languagePrimary,
        languageSeconday: response.data.languageSeconday
      })
    }, (error) => {
      if (error) {
        Alert.alert(error)
      }
    });

    Axios({
      method: 'get',
      url: AppConstants.API_BASE_URL + "/api/user/get/" + value
    }).then((response) => {
      this.setState({
       firstName: response.data.firstName,
       lastName: response.data.lastName
      })
    }, (error) => {
      if (error) {
        Alert.alert(error)
      }
    });

    Axios({
      method: 'get',
      url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup'
    }).then((response) => {
      this.setState({
        availabilityList: response.data.AVAILABILITY,
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
    this.setState({ refreshing: true });
    this.componentDidMount() 
      this.setState({ refreshing: false });
  }

  render() {
    return (
      <Container
        style={styles.safeArea}
        insets={SaveAreaInset.TOP}>
        {/* <Toolbar
          title='More Information'
          onBackPress={this.props.navigation.goBack}
        /> */}
        <Divider />
        <Content 
        // refreshControl={
        //                 <RefreshControl
        //                   refreshing={this.state.refreshing}
        //                   onRefresh={this._onRefresh.bind(this)}
        //                 />
        //               }
        style={styles.container}>
       
          <Separator style={styles.seprator} bordered>
            <Text>Statistics</Text>
          </Separator>

          <View style={styles.dataView}>
            <View style={{ flex: -1, flexDirection: 'column',alignItems:'center' }}>

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

             

              {/* <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}> */}

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

              {/* </View> */}
            </View>
          </View>
          <Separator style={{ height: 40, marginBottom: 10 }} bordered>
            <Text>Details</Text>
          </Separator>
          <Separator style={{ height: 20, backgroundColor: '#F9F9F9' }} bordered>
            <Text style={{ marginLeft: 10 }}>Availability</Text>
          </Separator>
          <Form style={{ width: '70%', alignSelf: 'center', backgroundColor: 'white', marginTop: 10 }}>

          </Form>
          <View style={styles.dataView}>

            <View style={{ flex: -1, flexDirection: 'column' }}>

              {this.state.availabilityList.map((item, index) => {
                if (item.lookUpId === this.state.profileData.availability) {
                  return (
                    <Text style={{ alignSelf: 'center', marginBottom: 10 }}>{item.lookUpLabel}</Text>
                  )
                }
              })}

              <Separator style={{ height: 20, backgroundColor: '#F9F9F9' }} bordered>
                <Text>Category</Text>
              </Separator>


              <Form style={{ width: '70%', alignSelf: 'center', backgroundColor: 'white', marginTop: 10, marginBottom: 10 }}>

                {this.state.catagoryList.map((item, index) => {
                  if (item.lookUpId === this.state.profileData.catagory) {
                    return (
                      <Text style={{ alignSelf: 'center' }}>{item.lookUpName}</Text>
                    )
                  }
                })}
              </Form>
            
              <Separator style={{ height: 20, backgroundColor: '#F9F9F9' }} bordered>
                <Text>Language</Text>
              </Separator>
              <Form style={{ width: '70%', alignSelf: 'center', backgroundColor: 'white', marginTop: 10 }}>
                {this.state.languageList.map((item, index) => {
                  if (item.lookUpId === this.state.profileData.languagePrimary) {
                    return (
                      <Text style={{ alignSelf: 'center' }}>{item.lookUpName}</Text>
                    )
                  }
                })}
              </Form>
            </View>
            {/* <Button  appearance='outline' status='basic' onPress={() => this.onClickListener("UpdateProfile")}>Update</Button> */}
          </View>
           {/* {this.state.availabilityList.map((item, index) => {
            

                  if (item.lookUpId == this.state.availability){
                    if(item.lookUpName == 'FREE') {
                    return (
                      <Button style={styles.button} appearance='outline' status='basic'  onPress={() => { this.props.navigation.navigate('AskFreeQuestion', {conId: Number(this.state.userId), catagory: Number(this.state.catagory)} ); }}> Ask free question </Button>
                    )
                    }
                  }
                })}  */}
         
        </Content>


      </Container>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
  },
  container: {
    // flex: -1,
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
    // backgroundColor: '#f59c02',
    // borderColor: '#f59c02',
    marginLeft:5,
    marginRight:5,
    marginBottom:10
  },

  image: {
    width: 100,
    height: 100,
    // alignSelf: 'center',
    marginBottom: 5,
    marginTop: 5,
    marginLeft:'5%'
  },

  seprator: {
    height: 40
  },

  dataView: {
    padding: 5
  },

  dataHeading: {
    alignSelf: 'center'
  },

  data: {
    alignSelf: 'center',
    fontWeight: 'bold',
    margin:20,
    fontSize:18
  },

  feedBack: {
    paddingVertical: 5,
    color: 'green',
    justifyContent: 'flex-start'
  }
});
