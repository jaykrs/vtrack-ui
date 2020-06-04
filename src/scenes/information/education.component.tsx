import React from 'react';
import {
  ListRenderItemInfo, View, StyleSheet, TouchableOpacity,
  ActivityIndicator, Image, Alert, FlatList, ScrollView, RefreshControl, TextInput
} from 'react-native';
import {
  // Input,
  Layout,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  Text,
  ThemedComponentProps,
  withStyles, TabBar,
  styled, Divider, Avatar, Icon, Button
} from 'react-native-ui-kitten';
import { ScrollableTab, Tab, Item, Container, Content, Tabs, Header, TabHeading, Thumbnail, Input, Label, Footer, FooterTab } from 'native-base';
import { EducationScreenProps } from '../../navigation/information.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { ProgressBar } from '../../components/progress-bar.component';
import { SearchIcon } from '../../assets/icons';
import { TimeLineData } from '../../data/TimeLineData.model';
import { AppConstants } from '../../constants/AppConstants';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { any } from 'prop-types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { truncate, open } from 'fs';
// import VideoPlayer from 'react-native-video-player';
// import { FlatList } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { pathToFileURL, fileURLToPath } from 'url';
// import SwipeHiddenHeader from 'react-native-swipe-hidden-header';
import Animated from 'react-native-reanimated';

// import axios from 'axios';  
// import Container from '@react-navigation/core/lib/typescript/NavigationContainer';

const allTodos: TimeLineData[] = [
  TimeLineData.getAllTimelineData()
];

type MyState = {
  displayName: String,
  dataSource: [],
  userId: String,
  likeCount: number,
  dislikeCount: number,
  liked: boolean[],
  disliked: boolean[],
  categories: [],
  textShown: -1,
  selectedIndex: number;
}


const renderItem = ({ item, index }) => (
  <ListItem title={`${item.title} ${index + 1}`} />
);

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;


export class EducationScreen extends React.Component<EducationScreenProps & ThemedComponentProps, MyState & any> {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      userType: '',
      profileType: '',
      token: '',
      isFresher: false,
      isExperience: false,
      qButton: '',
      lookUp: [],
      experience: '',
      highestQualification: '',
      city: '',
      qualification: [],
      selected: '',
    }
    this.submitFresher = this.submitFresher.bind(this);
    this.submitExperienced = this.submitExperienced.bind(this);
    this.submitQButton = this.submitQButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.highestQualification = this.highestQualification.bind(this);
  }

  submitFresher() {
    this.setState(
      {
        isFresher: true,
        isExperience: false,
        profileType: 230
      }
    )

  }

  submitExperienced() {
    this.setState(
      {
        isExperience: true,
        isFresher: false,
        profileType: 231
      }
    )
  }

  submitQButton(e, selected) {
    // console.log(selected)
    this.setState(
      {
        qButton: selected
      }
    )
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

    axios({
      method: 'GET',
      url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup'
    }).then((response) => {
      // console.log('qualification', response.data.QUALIFICATION)
      this.setState({
        lookUp: response.data,
        qualification: response.data.QUALIFICATION
      })
    }, (error) => {
      console.log(error);
    });
  }

  highestQualification(e, selected) {
    this.setState({
      selected: selected,
      highestQualification: selected
    })
  }

  handleSubmit() {
    const { isFresher, isExperience, userId, highestQualification, profileType, experience, city } = this.state;
    const profileData2 = {
      userId: userId,
      profileType: profileType,
      experience: experience,
      highestQualification: highestQualification,
      city: city
    }
    const profileData1 = {
      userId: userId,
      profileType: profileType,
      highestQualification: highestQualification,
    }
    if (isFresher) {
      if (userId === '' || userId.length === 0) {
        alert('Please Enter Your User Id');
      } else if (profileType === '' || profileType.length === 0) {
        alert('Please Enter Your Profile Type')
      } else if (highestQualification === '' || highestQualification.length === 0) {
        alert('Please Select Your Highest Qualification')
      } else {
        AsyncStorage.setItem('profileData1', JSON.stringify(profileData1), () => {
          AsyncStorage.getItem('profileData1', (err, result) => {
            // console.log('profileData of fresher', result);
          })
          this.props.navigation.navigate(AppRoute.FRESHER)
        })
      }
    } else if (isExperience) {
      if (userId === '' || userId.length === 0) {
        alert('Please Enter Your User Id')
      } else if (profileType === '' || profileType.length === 0) {
        alert('Please Enter Your Profile Type')
      } else if (experience === '' || experience.length === 0) {
        alert('Please Enter Your Experience')
      } else if (highestQualification === '' || highestQualification.length === 0) {
        alert('Please Select Your Highest Qualification')
      } else if (city === '' || city.length === 0) {
        alert('Please Enter Your location')
      } else {
        AsyncStorage.setItem('profileData2', JSON.stringify(profileData2), () => {
          AsyncStorage.getItem('profileData2', (err, result) => {
            // console.log('profileData of experience', result);
          })
          this.props.navigation.navigate(AppRoute.EXPERIENCE)
        })
      }
    }
  }

  render() {
    return (
      <SafeAreaLayout
        style={{ flex: 1 }}
        insets={SaveAreaInset.TOP}>
        <Toolbar
          title='Home Page'
          // backIcon={MenuIcon}
          // onBackPress={this.props.navigation.toggleDrawer}
          style={{ marginTop: -5, marginLeft: -5 }}
        />
        <Content style={{ marginTop: 10, padding: 10 }}>
          <View>
            <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/profile.jpeg' }} style={styles.image} />
          </View>

          <View>
            <Text>Choose work status</Text>
          </View>

          <View style={styles.buttonOuter}>
            <View style={styles.buttonInner}>
              <TouchableOpacity style={this.state.isFresher ? styles.selectedButton : styles.button} onPress={this.submitFresher}>
                <Text style={this.state.isFresher ? styles.selectedButtonText : styles.buttonText}>Fresher</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonInner}>
              <TouchableOpacity style={this.state.isExperience ? styles.selectedButton : styles.button} onPress={this.submitExperienced}>
                <Text style={this.state.isExperience ? styles.selectedButtonText : styles.buttonText}>Experienced</Text>
              </TouchableOpacity>
            </View>
          </View>

          {this.state.isFresher ?
            <View style={{ marginTop: 10, }}>
              <Text style={{ marginTop: 10, fontSize: 16 }}>Your highest qualification</Text>
              <FlatList
                style={{}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.qualification}
                renderItem={({ item, index }) => {
                  return (
                    <View>
                      <TouchableOpacity style={this.state.selected == item.lookUpId ? styles.slectedEduButton : styles.eduButton} onPress={e => { this.highestQualification(e, item.lookUpId) }}>
                        <Text style={this.state.selected == item.lookUpId ? styles.selectedEduText : styles.eduText}>{item.lookUpName}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }}
              >
              </FlatList>
              {/* <Text>{this.state.highestQualification}</Text> */}
            </View> :
            this.state.isExperience ?
              <View style={{ marginTop: 10, }}>
                <Label>Total work experience</Label>
                <TextInput
                  style={styles.inputText}
                  keyboardType='numeric'
                  placeholder='Enter work experience'
                  onChangeText={(experience) => { this.setState({ experience: experience }) }}
                />

                {/* <Text>{this.state.experience}</Text> */}
                <Text style={{ marginTop: 10, fontSize: 16 }}>Your highest qualification</Text>
                <FlatList
                  style={{}}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.qualification}
                  renderItem={({ item, index }) => {
                    return (
                      <View>
                        <TouchableOpacity style={this.state.selected == item.lookUpId ? styles.slectedEduButton : styles.eduButton} onPress={e => { this.highestQualification(e, item.lookUpId) }}>
                          <Text style={this.state.selected == item.lookUpId ? styles.selectedEduText : styles.eduText}>{item.lookUpName}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }}
                >
                </FlatList>

                {/* <Text style = {{marginTop: 10, fontSize: 18}}>Your preferred job location</Text> */}

                <Label>Your preferred job location</Label>
                <TextInput
                  style={styles.inputText}
                  placeholder='Enter job location'
                  onChangeText={(city) => { this.setState({ city: city }) }}
                />

              </View> :
              null
          }


        </Content>
        <Footer>
          <FooterTab style={styles.footerTab}>
            <View>
              <TouchableOpacity style={styles.nextButton} onPress={this.handleSubmit}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </FooterTab>
        </Footer>
      </SafeAreaLayout>
    )
  }

}


const styles = StyleSheet.create({
  footerTab: {
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  nextButton: {
    height: 40,
    width: 100,
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 20,
    borderColor: '#1DA1F2',
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 3
  },

  nextButtonText: {
    color: '#fff'
  },

  eduButton: {
    marginTop: 20,
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#1DA1F2',
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 10
  },

  eduText: {
    color: '#1DA1F2'
  },

  slectedEduButton: {
    marginTop: 20,
    borderColor: '#1DA1F2',
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    marginBottom: 10,
    marginRight: 5
  },

  selectedEduText: {
    color: '#FFFFFF',
  },

  selectedQButton: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 20,
    borderColor: '#1DA1F2',
    backgroundColor: '#1DA1F2',
    borderWidth: 1,
    marginLeft: 3
  },

  selectedQButtonText: {
    color: '#fff'
  },

  qButton: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 20,
    borderColor: '#1DA1F2',
    borderWidth: 1,
    marginLeft: 3
  },

  qButtonText: {
    color: '#1DA1F2'
  },

  selectedButton: {
    backgroundColor: '#1DA1F2',
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  },

  buttonOuter: {
    marginTop: 10,
    height: 130,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  buttonInner: {
    height: '100%',
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    height: '100%',
    width: '100%',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 20,
  },

  ImgBgTwo: {
    position: 'absolute',
    borderRadius: 55,
    alignSelf: 'center',
    height: 11, width: 11,
    transform: [{ scaleX: 2 }],
    backgroundColor: 'white',
    marginTop: 20
  },
  ImgBgOne: {
    height: 9,
    width: 9,
    backgroundColor: 'white',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 9,
    position: 'absolute'
  },
  askButton: {
    backgroundColor: '#D8D8D899',
    width: 50,
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 100,
    bottom: 0,
    right: 0,
    marginBottom: 2,
    marginRight: 2
  },
  Search: {
    width: '88%', alignSelf: 'flex-end',
    position: 'absolute', zIndex: 100, marginTop: 5, borderRadius: 25
  },

  name: {
    fontSize: 12,
    marginRight: 5,
    marginTop: -5,
    marginLeft: 10,
    fontWeight: 'bold',
    marginBottom: 2
  },

  TextView: {
    width: '85%'
  },
  text: {
    textAlign: 'justify',
    fontSize: 15,
    color: 'black',
    marginRight: 5
  },
  safeArea: {
    flex: 1,
    paddingBottom: 0,
    // paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },

  selected: {
    color: 'blue',
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
    fontSize: 14,
    fontWeight: 'bold'
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
    marginTop: 5,
  },

  notSelected: {
    color: 'silver'
  },

  inputText: {
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 1
  }

});

