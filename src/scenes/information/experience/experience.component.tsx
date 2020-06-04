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
import DatePicker from 'react-native-datepicker';
import { ScrollableTab, Tab, Item, Container, Content, Tabs, Header, TabHeading, Thumbnail, Input, Label, Footer, FooterTab, Picker, } from 'native-base';
import { ExperienceScreenProps } from '../../../navigation/information.navigator';
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
import { checkServerIdentity } from 'tls';
import { LabelConstants } from '../../../constants/LabelConstants'
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


export class ExperienceScreen extends React.Component<ExperienceScreenProps & ThemedComponentProps, MyState & any> {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      userType: '',
      token: '',
      isFresher: false,
      isExperience: false,
      qButton: '',
      latestCompany: '',
      latestJobRole: '',
      designation: '',
      latestJobFrom: '2020-4-1',
      latestJobTo: '',
      salaryType: '',
      salary: '',
      willJoin: '',
      salary_Type: [],
      will_Join: [],
      selected: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.submitExperienced = this.submitExperienced.bind(this);
    this.submitQButton = this.submitQButton.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  async handleSubmit() {
    const { latestCompany, latestJobRole, designation, latestJobFrom, latestJobTo, salaryType, salary, willJoin } = this.state
    console.log(latestCompany, latestJobRole, designation, latestJobFrom, latestJobTo, salaryType, salary, willJoin)
    if (latestCompany === '' || latestCompany.length === 0) {
      alert(LabelConstants.ALERT_LATEST_COMPANY_NAME);
    } else if (latestJobRole === '' || latestJobRole.length === 0) {
      alert(LabelConstants.ALERT_LATEST_JOB_ROLE);
    } else if (designation === '' || designation.length === 0) {
      alert(LabelConstants.ALERT_LATEST_JOB_DESIGNATION);
    } else if (latestJobFrom === '' || latestJobFrom.length === 0) {
      alert(LabelConstants.ALERT_LATEST_JOB_FROM);
    } else if (latestJobTo === '' || latestJobTo.length === 0) {
      alert(LabelConstants.ALERT_LATEST_JOB_TO);
    } else if (salaryType === '' || salaryType.length === 0) {
      alert(LabelConstants.ALERT_LATEST_JOB_SALARY_TYPE);
    } else if (salary === '' || salary.length === 0) {
      alert(LabelConstants.ALERT_LATEST_JOB_SALARY);
    } else if (willJoin === '' || willJoin.length === 0) {
      alert(LabelConstants.ALERT_WILL_JOIN);
    } else {

      const value = await AsyncStorage.getItem('profileData2');
      if (value) {
        console.log('profile all data', value);
        const profileData = JSON.parse(value);
        axios({
          method: 'POST',
          url: AppConstants.API_BASE_URL + '/api/profile/create',
          data: {
            userId: profileData.userId,
            profileType: profileData.profileType,
            experience: profileData.experience,
            highestQualification: profileData.highestQualification,
            city: profileData.city,
            latestCompany: latestCompany,
            latestJobRole: latestJobRole,
            designation: designation,
            latestJobFrom: latestJobFrom,
            latestJobTo: latestJobTo,
            salaryType: salaryType,
            salary: salary,
            willJoin: willJoin
          }
        }).then((response) => {
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
  }

  submitQButton(e, selected) {
    // console.log(selected)
    this.setState(
      {
        willJoin: selected
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

      axios({
        method: 'GET',
        url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',
      }).then((response) => {
        this.setState({
          salary_Type: response.data.SALARY_TYPE,
          will_Join: response.data.WILL_JOIN
        })
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
    const { willJoin, selected, latestJobFrom, latestJobTo, will_Join } = this.state
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
            <Text style={styles.heading}>Tell us about your latest work experience</Text>

          </View>
          <View style={styles.inputText}>
            <Label>Latest Company Name</Label>
            <TextInput
              style={styles.inputText}
              placeholder='Enter latest company name'
              onChangeText={(latestCompany) => { this.setState({ latestCompany: latestCompany }) }}
            />
          </View>

          <View style={styles.inputText}>
            <Label>Latest Role</Label>
            <TextInput
              style={styles.inputText}
              placeholder='Enter latest role'
              onChangeText={(latestJobRole) => { this.setState({ latestJobRole: latestJobRole }) }}
            />
          </View>

          <View style={styles.inputText}>

            <Label>Designation</Label>
            <TextInput
              style={styles.inputText}
              placeholder='Enter designation'
              onChangeText={(designation) => { this.setState({ designation: designation }) }}
            />
          </View>

          <View>
            <Text>This is my current job</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
            <View style={{ width: '40%' }}>

              <Label>From</Label>
              <DatePicker
                date={latestJobFrom}
                formate='YYYY-MM-DD'
                maxDate = {new Date()}
                onDateChange={(latestJobFrom) => { this.setState({ latestJobFrom: latestJobFrom }) }}
              />
              {/* <Text>{latestJobFrom.toString()}</Text> */}
            </View>
            <View style={{ width: '40%' }}>
              <Label>To</Label>
              <DatePicker
                date={latestJobTo}
                formate='YYYY-MM-DD'
                minDate={latestJobFrom}
                maxDate = {new Date()}
                onDateChange={(latestJobTo) => { this.setState({ latestJobTo: latestJobTo }) }}
              />
              {/* <Text>{latestJobFrom.toString()}</Text> */}
            </View>
          </View>

          <View style={styles.inputText}>
            <Label>Salary Type</Label>
            <Picker
              selectedValue={this.state.salaryType}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ salaryType: itemValue })
              }>
              {this.state.salary_Type.map((item, index) => {
                return (
                  <Picker.Item label={item.lookUpLabel} value={item.lookUpId} />
                )
              })}
            </Picker>
            {/* <Text>{this.state.salaryType}</Text> */}
          </View>

          <View style={styles.inputText}>
            <Label>Salary</Label>
            <TextInput
              style={styles.inputText}
              keyboardType='numeric'
              placeholder='Enter salary'
              onChangeText={(salary) => { this.setState({ salary: salary }) }}
            />
          </View>

          <Text style={styles.subHeading}>How soon can you join if appointed</Text>

          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <FlatList
              style={{}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={will_Join}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <TouchableOpacity style={willJoin == item.lookUpId ? styles.selectedQButton : styles.qButton} onPress={e => { this.submitQButton(e, item.lookUpId) }}>
                      <Text style={willJoin == item.lookUpId ? styles.selectedQButtonText : styles.qButtonText}>{item.lookUpName}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
            >
            </FlatList>
            {/* <Text>{this.state.willJoin}</Text> */}
          </View>

          <View style={{ height: 50, width: '100%' }}></View>
        </Content>
        <Footer>
          <FooterTab style={styles.footerTab}>
            <View>
              <TouchableOpacity style={styles.nextButton} onPress={this.handleSubmit}>
                <Text style={styles.nextButtonText}>Create Profile</Text>
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
    marginTop: 10
  },

  subHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10
  },

  footerTab: {
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  nextButton: {   
    marginRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
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
  },
});

