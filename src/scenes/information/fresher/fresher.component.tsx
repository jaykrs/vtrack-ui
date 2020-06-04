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
import { FresherScreenProps } from '../../../navigation/information.navigator';
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
import {LabelConstants} from '../../../constants/LabelConstants'
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


export class FresherScreen extends React.Component<FresherScreenProps & ThemedComponentProps, MyState & any> {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      userType: '',
      token: '',
      isFresher: false,
      isExperience: false,
      qButton: '',
      jobIndustry: '',
      jobSubIndustry: '',
      city: '',
      salaryFrom: '',
      salaryTo: '',
      jobIndustryType: [],
      jobSubIndustryType: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitFresher = this.submitFresher.bind(this);
    this.submitExperienced = this.submitExperienced.bind(this);
    this.submitQButton = this.submitQButton.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  submitFresher() {
    this.setState(
      {
        isFresher: true,
        isExperience: false
      }
    )
  }

  submitExperienced() {
    this.setState(
      {
        isExperience: true,
        isFresher: false
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
        jobIndustryType: response.data.JOB_CATEGORY
      })
    }, (error) => {
      console.log(error);
    });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }

  handleSubmit() {
    const {jobIndustry, city, salaryFrom, salaryTo} = this.state
    if (jobIndustry === '' || jobIndustry.length === 0) {
      alert(LabelConstants.ALERT_COMPANY_INDUSTRY);      
    } else if (city === '' || city.length === 0) {
      alert(LabelConstants.ALERT_PREFERRED_CITY);
    } else if (salaryFrom === '' || salaryFrom.length === 0) {
      alert(LabelConstants.ALERT_EXPECTED_SALARY_FROM);
    } else if (salaryTo === '' || salaryTo.length === 0) {
      alert(LabelConstants.ALERT_EXPECTED_SALARY_TO);
    } else {
      const profileData1 = {
        jobIndustry: jobIndustry,
        city: city,
        salaryFrom: salaryFrom,
        salaryTo: salaryTo
      }
      AsyncStorage.mergeItem('profileData1', JSON.stringify(profileData1), () => {
        AsyncStorage.getItem('profileData1', (err, result) => {
          // console.log('profileData of fresher', result);
        })
        this.props.navigation.navigate(AppRoute.FRESHERTECH)
      })    
  }
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
            <Text style={styles.heading}>What kind of jobs are you looking for?</Text>

          </View>
          <View style={styles.inputText}>
            <Label>Preferred job Industry</Label>
            <Picker
              selectedValue={this.state.jobIndustry}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ jobIndustry: itemValue })
              }>
              {this.state.jobIndustryType.map((item, index) => {
                return (
                  <Picker.Item label = {item.lookUpLabel} value = {item.lookUpId} />
                )
              })}
            </Picker>
          </View>

          {/* <View style={styles.inputText}>
            <Label>Preferred sub job Industry</Label>
            <Picker
              selectedValue={this.state.employmentType}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ subJobIndustry: itemValue })
              }>
              <Picker.Item label="Fresher" value="Fresher" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />

            </Picker>
          </View> */}

          <View>
            <Label>Preferred Job City</Label>
            <TextInput
              style={styles.inputText}
              placeholder='Enter city'
              onChangeText={(city) => { this.setState({ city: city }) }}
            />
            {/* <Text>{this.state.city}</Text> */}
          </View>

          <View>
            <Text style={styles.subHeading}>Salary Expections</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
            <View style={{ width: '40%' }}>
              <Label>From</Label>
              <TextInput
                style={styles.inputText}
                keyboardType='numeric'
                placeholder='From'
                onChangeText={(salaryFrom) => { this.setState({ salaryFrom: salaryFrom }) }}
              />
              {/* <Text>{this.state.salaryFrom}</Text> */}
            </View>
            <View style={{ width: '40%' }}>
              <Label>To</Label>
              <TextInput
                style={styles.inputText}
                keyboardType='numeric'
                placeholder='To'
                onChangeText={(salaryTo) => { this.setState({ salaryTo: salaryTo }) }}
              />
              {/* <Text>{this.state.salaryTo}</Text> */}
            </View>
          </View>


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
    fontSize: 18,
    marginTop: 10
  },

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

