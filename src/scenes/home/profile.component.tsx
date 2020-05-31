import React, { Component } from 'react';
import { StyleSheet, Alert, TouchableOpacity, RefreshControl, Dimensions, FlatList } from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Avatar,
  Button,
  Input,
  ListItem,
  ListItemElement,
  List,
  Icon
} from 'react-native-ui-kitten';
import { ProfileScreenProps } from '../../navigation/timeline.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { AppConstants } from '../../constants/AppConstants';
import { Separator, Container, Content, View, Footer, FooterTab, Form, Picker, Thumbnail } from 'native-base';
import Axios from 'axios';
import { LabelConstants } from '../../constants/LabelConstants';
import { AsyncStorage } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchIcon, HomeIcon } from '../../assets/icons';
import VideoPlayer from 'react-native-video-player';
import Share from 'react-native-share';
import { MoreScreen } from '../home/more.component'
import { ArrowDownward, ArrowUpward } from '../../assets/icons';
import RouterComponent from '../components/Router'
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

type Mystate = {

}
// const prop = (props: AboutScreenProps):

export class ProfileScreen extends Component<ProfileScreenProps & SafeAreaLayoutElement & any, Mystate & any> {
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
      user_Type: '',
      firstName: '',
      lastName: '',
      dataSource: [],
      timelineType: [],
      search: '',
      refreshing: false,
      profileUserId: '',
      followedBy: '',
      followCount: '',
      height: 150,
      summeryDetails: '',
      backgroundExpertise: ''

    }
    this.handleSearch = this.handleSearch.bind(this);
    this.followUpdate = this.followUpdate.bind(this);


  }

  followUpdate(userId, e) {

    // if (timelineId && this.state.userId) {
    Axios({
      method: 'get',
      url: AppConstants.API_BASE_URL + '/api/user/follow/byuser/' + this.state.profileUserId + '/' + this.state.userId
    }).then((response) => {
      this.setState({
        ...this.state,
        followCount: response.data.followCount,
        followedBy: response.data.followedBy
      })
      console.log("Profile Data for follow", response.data);
    },
      //     (error) => {
      //       console.log(error);
      //       if (error) {
      //         // Alert.alert("UserId or Password is invalid");
      //       }
      //     });
      //   this.setState({
      //     ...this.state,
      //     updated: true
      //   })
      // },
      (error) => {
        console.log(error)
      });

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

  async UNSAFE_componentWillReceiveProps(nextProps) {

    const value1 = await AsyncStorage.getItem('userDetail');
    if (value1) {
      const user = JSON.parse(value1);
      this.setState({
        // displayName: user.displayName,
        userId: user.userId,
        // userType: user.userType
      });
    }


    const value = JSON.stringify(nextProps.route.params.pid)
    if (value !== this.state.profileUserId) {
      console.log('userID in profile', value);
      this.setState({
        profileUserId: value
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
        url: AppConstants.API_BASE_URL + "/api/timeline/getalltimeline/byconsultant/" + value
      }).then((response) => {
        this.setState({
          dataSource: response.data

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
          lastName: response.data.lastName,
          followedBy: response.data.followedBy,
          followCount: response.data.followCount
        })
      }, (error) => {
        if (error) {
          Alert.alert(error)
        }
      });
    }
  }
  async componentDidMount() {
    const value = JSON.stringify(this.props.route.params.pid)
    if (value !== this.state.profileUserId) {
      console.log('userID in profile', value);
      this.setState({
        profileUserId: value
      })
    }

    const value1 = await AsyncStorage.getItem('userDetail');
    if (value1) {
      const user = JSON.parse(value1);
      this.setState({
        // displayName: user.displayName,
        userId: user.userId,
        // userType: user.userType
      });
    }

    const responselook = await fetch(AppConstants.API_BASE_URL + '/api/lookup/getalllookup');
    const responseJsonlook = await responselook.json();
    this.setState({
      user_Type: responseJsonlook.USER_TYPE,
      timelineType: responseJsonlook.TIMELINE_TYPE
    });
    // console.log("TimeLineTypeHere",this.state.timelineType);

    try {
      const response = await fetch(AppConstants.API_BASE_URL + "/api/timeline/getalltimeline/byconsultant/" + value);
      const responseJson = await response.json();
      // set state
      this.setState({
        //   isLoading: false,
        dataSource: responseJson
      });
      console.log("dataSource", this.state.dataSource);
    }
    catch (error) {
      console.log(error.toString());
    }
    // console.log("timeline",this.state.timelineType);
    // const value = await AsyncStorage.getItem('userDetail');
    // if (value) {
    //   const user = JSON.parse(value);
    //   this.setState({ userId: user.userId });
    // }

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
        lastName: response.data.lastName,
        followCount: response.data.followCount,
        followedBy: response.data.followedBy
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

  handleSearch() {
    const { search } = this.state
    // console.log('Search Data', search)
    if (search === '') {
      this._onRefresh()
    } else if (search) {
      Axios({
        method: 'get',
        url: AppConstants.API_BASE_URL + '/api/timeline/search/consultant' + search,

      }).then((response) => {
        this.setState({
          ...this.state,
          dataSource: response.data
        })

        // console.log("Profile Data", response.data);
      },
        (error) => {
          console.log(error);
          if (error) {
            Alert.alert("Data is invailid");
          }
        }
      );
    }
  }

  toggleNumberOfLines = index => {
    this.setState({
      textShown: this.state.textShown === index ? -1 : index,
    });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }





  render() {
    return (
      <Container
        style={styles.safeArea}
        insets={SaveAreaInset.TOP}>
        <Toolbar
          title='Profile'
          onBackPress={this.props.navigation.goBack}
        />
        <Divider />
        <Content style={styles.container} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.dataView}>
              <View style={styles.ImgBgOne} />
              <View style={styles.ImgBgTwo} />
              <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + this.state.profileUserId + '_avatar.png' }} style={styles.image} />
            </View>
            <View style={{ width: '62%', height: '55%', marginRight: 10, alignContent: 'center', marginTop: '10%' }}>
              <View style={{ alignSelf: 'center' }}>
                <Text style={styles.data}> {this.state.firstName.toUpperCase()} {this.state.lastName.toUpperCase()} </Text>
              </View>

              {this.state.userId == this.state.profileUserId ?
                <View style={{ flexDirection: 'column', marginTop: 5, width: '75%', alignSelf: 'center', height: '25%' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <TouchableOpacity style={styles.askButton} onPress={() => { this.props.navigation.navigate('ProfileEdit') }}>
                        <Text style={{ color: '#ffffff' }}>Edit</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.goLiveButton} onPress={() => { this.props.navigation.navigate('GoLive', {channel: Number(this.state.userId)}) }}>
                        <Text style={{ color: '#ffffff' }}>Go Live</Text>
                      </TouchableOpacity>
                    </View>
                  </View>


                  {this.state.availabilityList.map((item, index) => {
                    // console.log("profile category check", this.state.userId, this.state.catagory);

                    if (item.lookUpId == this.state.availability) {
                      return (
                        <View>
                          {/* <TouchableOpacity style={styles.askButton} onPress={() => { this.props.navigation.navigate('AskFreeQuestion', { conId: Number(this.state.profileUserId), catagory: Number(this.state.catagory) }); }}> */}
                          <Text style={{ color: '#1DA1F2', fontSize: 12, marginLeft: 15 }}>{item.lookUpLabel}</Text>
                          {/* </TouchableOpacity> */}
                        </View>
                      )
                    }
                  })
                  }
                </View>

                : <View style={{ flexDirection: 'row', marginTop: 5, width: '75%', alignSelf: 'center', height: '25%' }}>
                  <View style={{ flexDirection: 'column' }}>
                    {this.state.followCount !== null ? (this.state.followedBy.includes(this.state.userId) ?
                      <TouchableOpacity style={styles.myList} onPress={e => { this.followUpdate(this.state.userId, e); }} >
                        <Text style={{ color: '#ffffff' }}>Added</Text>
                      </TouchableOpacity>
                      : <TouchableOpacity style={styles.myList} onPress={e => { this.followUpdate(this.state.userId, e); }} >
                        <AntDesign size={15} name="plus" style={{ color: '#ffffff' }} />
                        <Text style={{ color: '#ffffff' }}>My List</Text>
                      </TouchableOpacity>)
                      : <TouchableOpacity style={styles.myList} onPress={e => { this.followUpdate(this.state.userId, e); }} >
                        <AntDesign size={15} name="plus" style={{ color: '#ffffff' }} />
                        <Text style={{ color: '#ffffff' }}>My List</Text>
                      </TouchableOpacity>}
                    <Text style={{ fontSize: 12, color: 'black', alignSelf: 'center' }}>{this.state.followCount}</Text>
                  </View>
                  <View>
                    {this.state.availabilityList.map((item, index) => {
                      // console.log("profile category check", this.state.userId, this.state.catagory);

                      if (item.lookUpId == this.state.availability) {
                        if (item.lookUpName == 'FREE') {
                          return (
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ flexDirection: 'column' }}>
                                <View>
                                  <TouchableOpacity style={styles.askButton} onPress={() => { this.props.navigation.navigate('AskFreeQuestion', { conId: Number(this.state.profileUserId), catagory: Number(this.state.catagory) }) }}>
                                    <Text style={{ color: '#ffffff' }}>Ask</Text>
                                  </TouchableOpacity>
                                </View>

                                <View style={styles.buttonContainerSeeLive}>
                                  <TouchableOpacity style={styles.goLiveButton} onPress={() => { this.props.navigation.navigate('SeeLive', {channel: Number(this.state.profileUserId)}) }}>
                                    <Text style={{ color: '#ffffff' }}>See Live</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <View>
                                <TouchableOpacity style={{ marginLeft: 7, backgroundColor: '#ffffff', borderRadius: 20, justifyContent: 'center', alignItems: 'center', }} onPress={() => { this.props.navigation.navigate('VideoHome') }}>
                                  <Icon name='phone-outline' fill='#1DA1F2' height={25} width={25} />
                                </TouchableOpacity>
                              </View>
                            </View>
                          )
                        }
                      }
                    })}
                  </View>
                </View>
              }
            </View>
          </View>

          {/* <Separator style={styles.seprator} bordered>
              <Text>Search Question/Answer</Text>
            </Separator> */}
          {/* <Input
            padding={0}
            placeholder='Search '
            style={{
              width: '88%', alignSelf: 'center',
              borderRadius: 25
            }}
            name='search'
            value={this.state.search}
            onChangeText={(search) => this.setState({ search })}
            onKeyPress={this.handleSearch}
            size='small'
            icon={SearchIcon}
          /> */}
          <Divider />

          <View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5 }}>
              <TouchableOpacity style={{ height: 25, width: 25, borderRadius: 13, justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.state.height < 200 ? this.setState({ height: HEIGHT }) : this.setState({ height: 150 }) }}>
                {this.state.height < 200 ?
                  <ArrowDownward style={{ width: 32, height: 32, }} fill='#1DA1F2' />
                  : <ArrowUpward style={{ width: 32, height: 32, }} fill='#1DA1F2' />}
              </TouchableOpacity>
            </View>
            <View style={{ height: this.state.height }}>
              <MoreScreen id={Number(this.state.profileUserId)} />
            </View>
          </View>
          <Divider />
          {/* ***********Background expertise code here*********** */}
          {/* <View style={styles.TextView}>
            <Text appearance='hint' category='c1' numberOfLines={this.state.textShown === this.state.profileUserId ? undefined : 1}  >{this.state.summeryDetails}  {this.state.backgroundExpertise}</Text>
            <TouchableOpacity style={{ width: '30%' }} onPress={() => this.toggleNumberOfLines(this.state.profileUserId)}>

              <Text style={{ fontSize: 14 }} >{this.state.backgroundExpertise === this.state.profileUserId ? 'read less...' : 'read more...'}</Text>
            </TouchableOpacity>
          </View> */}
          {/* ***********Background expertise code here*********** */}
          {/* <View style={{ height: this.state.height }}>

        </View> */}

          {/* <View style = {{justifyContent: 'center', alignItems: 'center'}}>
            <Text onPress={this.state.height <= 200 ? () => { this.setState({ height: 450 }) } : () => { this.setState({ height: 200 }) }}>
              {this.state.height <= 200 ? 'Show more' : 'Less'}
            </Text>

          </View> */}
        
          {/* <Separator style={styles.seprator} bordered>
            <Text>Statistics</Text>
          </Separator>

          <View style={styles.dataView}>
            <View style={{ flex: -1, flexDirection: 'row' }}>

              <View style={{ flex: -1, flexDirection: 'column', width: '50%' }}>

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

              </View>

              <View style={{ flex: 1, flexDirection: 'column', width: '50%' }}>

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
            </View> */}
          {/* <Button  appearance='outline' status='basic' onPress={() => this.onClickListener("UpdateProfile")}>Update</Button> */}
          {/* </View> */}


        </Content>


      </Container>
    )
  }
}
const shareSingleImage = async (qArticle, e) => {
  const shareOptions = {
    title: 'Share file',
    url: AppConstants.IMAGE_BASE_URL + '/timeline/' + qArticle,
    failOnCancel: false,
  };

  try {
    const ShareResponse = await Share.open(shareOptions);
    // setResult(JSON.stringify(ShareResponse, null, 2));
  } catch (error) {
    console.log('Error =>', error);
    // setResult('error: '.concat(getErrorString(error)));

  }
};
const styles = StyleSheet.create({
  ImgBgTwo: {
    position: 'absolute',
    borderRadius: 55,
    // alignSelf:'center', 
    height: 48, width: 43,
    transform: [{ scaleX: 2 }],
    backgroundColor: 'white',
    marginTop: 50,
    marginLeft: 33
  },
  ImgBgOne: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    // alignSelf:'center',
    // alignContent:'center',
    position: 'absolute',
    marginLeft: 40,
    marginTop: 15
  },
  name: {
    fontSize: 12,
    marginRight: 5,
    marginTop: -5,
    marginLeft: 5,
    fontWeight: 'bold'
  },

  TextView: {
    marginLeft: 5,
    width: '90%'
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

  askButton: {
    height: 25,
    width: 75,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#1DA1F2'
  },

  buttonContainer: {
    alignItems: 'center',
    paddingLeft: 5,
  },

  buttonContainerSeeLive: {
    alignItems: 'center',
    paddingLeft: 5,
    paddingTop: 5
  },

  goLiveButton: {
    paddingHorizontal: 20,
    paddingVertical: 2.5,
    borderRadius: 20,
    backgroundColor: '#1DA1F2'
  },

  image: {
    width: 100,
    height: 100,
    // alignSelf: 'center',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: '5%'
  },

  seprator: {
    height: 40
  },

  dataView: {
    // paddingVertical: 20,
    // textAlign: 'center',
    flexDirection: 'row',
    backgroundColor: '#D8D8D899',
    height: 110,
    width: 110,
    borderRadius: 55,
    margin: 10
  },

  dataHeading: {
    paddingVertical: 5
  },

  data: {

    fontWeight: 'bold',
    // margin: 20,
    // marginLeft:48,
    fontSize: 18,
    // backgroundColor:'red',
    width: '100%'
  },

  feedBack: {
    paddingVertical: 5,
    color: 'green',
    justifyContent: 'flex-start'
  },

  myList: {
    flexDirection: 'row',
    height: 25,
    width: 75,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    // marginLeft: 40,
    padding: 2,
    backgroundColor: '#1DA1F2'
  }
});
