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
import { ScrollableTab, Tab, Item, Container, Content, Tabs, Header, TabHeading, Thumbnail, Input, Label, Footer, FooterTab, Picker } from 'native-base';
import { FresherTechScreenProps } from '../../../navigation/information.navigator';
import { AppRoute } from '../../../navigation/app-routes';
import { ProgressBar } from '../../../components/progress-bar.component';
import { SearchIcon } from '../../../assets/icons';
import { TimeLineData } from '../../../data/TimeLineData.model';
import { AppConstants } from '../../../constants/AppConstants';
import { Toolbar } from '../../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../../components/safe-area-layout.component';
import { MenuIcon } from '../../../assets/icons';
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


export class FresherTechScreen extends React.Component<FresherTechScreenProps & ThemedComponentProps, MyState & any> {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      userType: '',
      token: '',
      isFresher: false,
      isExperience: false,
      qButton: '',
      skill: '',
      skillType: [],
    }
    this.submitQButton = this.submitQButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
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
        skillType: response.data.SKILL
      })
    }, (error) => {
      console.log(error);
    });
  }
  
  async handleSubmit() {
    const { skill } = this.state
    const value = await AsyncStorage.getItem('profileData1');
    if (value) {
      console.log('profile all data', value);
      const profileData = JSON.parse(value);
      const {userId, profileType, highestQualification, jobIndustry, city, salaryFrom, salaryTo} = profileData
      console.log('All Data',userId, profileType, highestQualification, jobIndustry, city, salaryFrom, salaryTo)
      axios({
        method: 'POST',
        url: AppConstants.API_BASE_URL + '/api/profile/create',
        data: {
          userId: userId,
          profileType: profileType,
          highestQualification: highestQualification,
          jobIndustry: jobIndustry,
          city: city,
          salaryFrom: salaryFrom,
          salaryTo: salaryTo,
          skill: skill
        }
      }).then((response) => {
        console.log('qualification', response.data)
        const data = {
          profileCreated: 'true'
        }
        AsyncStorage.mergeItem('userDetail', JSON.stringify(data), () => {
          this.props.navigation.navigate(AppRoute.HOME)
        });        
      }, (error) => {
        console.log(error);
      });
    }
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
        style={{ flex: 1 }}
        insets={SaveAreaInset.TOP}>
        <Toolbar
          // title='Home Page'
          // backIcon={MenuIcon}
          onBackPress={this.props.navigation.goBack}
          style={{ marginTop: -5, marginLeft: -5 }}
        />
        <Content style={{ marginTop: 10, padding: 10 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <View>
            <Text style={styles.heading}>What are you known for?</Text>
          </View>

          <View>
            <Text>State out your top skills. The more the skills, the better the job opportunities.</Text>
          </View>

          <View style={styles.inputText}>
            <Label>Select your skill</Label>
            <Picker
              selectedValue={this.state.skill}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ skill: itemValue })
              }>
              {this.state.skillType.map((item, index) => {
                return (
                  <Picker.Item label={item.lookUpLabel} value={item.lookUpId} />
                )
              })}
            </Picker>
            {/* <Text>{this.state.skill}</Text> */}
          </View>

          {/* <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <View>
              <TouchableOpacity style={this.state.qButton === 'Phd' ? styles.selectedQButton : styles.qButton} onPress={e => { this.submitQButton(e, 'Phd') }}>
                <Text style={this.state.qButton === 'Phd' ? styles.selectedQButtonText : styles.qButtonText}>15 days</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={this.state.qButton === 'Masters' ? styles.selectedQButton : styles.qButton} onPress={e => { this.submitQButton(e, 'Masters') }}>
                <Text style={this.state.qButton === 'Masters' ? styles.selectedQButtonText : styles.qButtonText}>30 days</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={this.state.qButton === 'Graduate' ? styles.selectedQButton : styles.qButton} onPress={e => { this.submitQButton(e, 'Graduate') }}>
                <Text style={this.state.qButton === 'Graduate' ? styles.selectedQButtonText : styles.qButtonText}>60 days</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={this.state.qButton === 'Diploma' ? styles.selectedQButton : styles.qButton} onPress={e => { this.submitQButton(e, 'Diploma') }}>
                <Text style={this.state.qButton === 'Diploma' ? styles.selectedQButtonText : styles.qButtonText}>Immediate</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View>
            <TouchableOpacity style={styles.addButton} onPress={() => {}}>
              <Text style={styles.qButtonText}>Add more Skill</Text>
            </TouchableOpacity>
          </View> */}

        </Content>
        <Footer>
          <FooterTab style={styles.footerTab}>
            <TouchableOpacity style={styles.nextButton} onPress={this.handleSubmit}>
              <Text style={styles.nextButtonText}>Create my profile</Text>
            </TouchableOpacity>
          </FooterTab>
        </Footer>
      </SafeAreaLayout>
    )
  }

}


const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DA1F2'
  },

  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA'
  },

  subHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10
  },

  footerTab: {
    backgroundColor: '#fff',
  },

  nextButton: {

    width: '100%',
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextButtonText: {
    color: '#fff'
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

  addButton: {
    marginTop: 10,
    width: 150,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 20,
    borderColor: '#1DA1F2',
    borderWidth: 1,
    marginLeft: 3
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
    fontWeight: 'bold'
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
    fontSize: 16,
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
  }

});

