import React from 'react';
import {
  ListRenderItemInfo, View, StyleSheet, TouchableOpacity,
  ActivityIndicator, Image, Alert, FlatList, ScrollView, RefreshControl
} from 'react-native';
import {
  Input,
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
import { ScrollableTab, Tab, Container, Content, Tabs, Header, TabHeading, Thumbnail } from 'native-base';
import { TodoInProgressScreenProps } from '../../navigation/todo.navigator';
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
import VideoPlayer from 'react-native-video-player';
// import { FlatList } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { pathToFileURL, fileURLToPath } from 'url';
import SwipeHiddenHeader from 'react-native-swipe-hidden-header';
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


export class TimelineScreen extends React.Component<TodoInProgressScreenProps & ThemedComponentProps, MyState & any> {
  constructor(props) {
    super(props)
    this.state = {
      likeCount: 0,
      dislikeCount: 0,
      liked: [true, false],
      disliked: [true, false],
      categories: [],
      selectedIndex: 0,
      getalllookup: [],
      getallStories: [],
      ProfileData: {},
      userId: '',
      getallStoriesUserId: '',
      navProfile: [],
      search: '',
      userType: '',
      user_Type: [],
      timelineType: [],
      selected: 12,
      scrollY: new Animated.Value(0),
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitStories = this.handleSubmitStories.bind(this);
  }

  private onSelect = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
  };

  handleSearch() {
    const { search } = this.state
    // console.log('Search Data', search)
    if (search) {
      axios({
        method: 'get',
        url: AppConstants.API_BASE_URL + '/api/timeline/search/' + search,

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

  likeUpdate(timelineId, e) {

    const { name, value } = e.target;
    this.setState({
      [name]: value,
      timelineId: timelineId
    });

    if (timelineId && this.state.userId) {
      axios({
        method: 'get',
        url: AppConstants.API_BASE_URL + '/api/timeline/like/byuser/' + timelineId + '/' + this.state.userId
      }).then((response) => {
        axios({
          method: 'get',
          url: AppConstants.API_BASE_URL + '/api/timeline/getalltimeline/bycatagory/' + response.data.catagoryId,

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
              // Alert.alert("UserId or Password is invalid");
            }
          });
        this.setState({
          ...this.state,
          updated: true
        })
      },
        (error) => {
          console.log(error)
        });

    }

  }

  dislikeUpdate(timelineId, e) {

    const { name, value } = e.target;
    this.setState({
      [name]: value,
      timelineId: timelineId
    });
    if (timelineId && this.state.userId) {

      axios({
        method: 'get',
        url: AppConstants.API_BASE_URL + '/api/timeline/dislike/byuser/' + timelineId + '/' + this.state.userId
      }).then((response) => {
        axios({
          method: 'get',
          url: AppConstants.API_BASE_URL + '/api/timeline/getalltimeline/bycatagory/' + response.data.catagoryId,

        }).then((response) => {
          this.setState({
            ...this.state,
            timelineList: response.data
          })
          // console.log("Profile Data", response.data);
        },
          (error) => {
            console.log(error);
            if (error) {
              Alert.alert("UserId or Password is invalid");
            }
          });
        this.setState({
          ...this.state,
          updated: true
        })

      },
        (error) => {
          console.log(error)
        });
    }
    // else {
    //     alert("Please Login!")
    //     this.logout();
    // }

  }

  handleSubmit(catagoryId, e) {
    // console.log(catagoryId)
    axios({
      method: 'get',
      url: AppConstants.API_BASE_URL + '/api/timeline/getalltimeline/bycatagory/' + catagoryId,

    }).then((response) => {
      this.setState({
        // ...this.state,
        dataSource: response.data,
        selected: catagoryId
      })
      // console.log("Profile Data", response.data);
    },
      (error) => {
        console.log(error);
        if (error) {


        }
      });


  }

  handleSubmitStories(consultantId, e) {

    const { name, value } = e.target;
    this.setState({ [name]: value });
    // console.log(consultantId);
    this.props.navigation.navigate('Profile', {
      consultantId: consultantId
    });
    // AsyncStorage.setItem('consultantId', JSON.stringify(consultantId), () => {
    //   this.props.navigation.navigate('Profile');
    // })
  }


  // handleSubmitStories(userId,ev) {
  //    console.log("userID is Coming",userId)
  //     axios({
  //       method: 'get',
  //       url: AppConstants.API_BASE_URL + 'api/profile/getprofile/' + userId,

  //   }).then((response) => {
  //       this.setState({
  //           // ...this.state,
  //           ProfileData: response.data
  //       })
  //       // console.log("Profile Data", response.data);
  //       // this.props.navigation.navigate('Profile')
  //   },
  //       (error) => {
  //           console.log(error);
  //           if (error) {


  //           }
  //       });
  //   // this.props.navigation.navigate('Ask')
  //   // this.props.navigation.navigate('Profile')  

  //   }





  async componentDidMount() {
    const responseStories = await fetch(AppConstants.API_BASE_URL + '/api/profile/findProfileOnAvailibility/53/200');
    const responseJsonStories = await responseStories.json();
    this.setState({
      getallStories: responseJsonStories,
      getallStoriesUserId: responseJsonStories.userId
    });
    // console.log("story profile", responseJsonStories);
    AsyncStorage.setItem('UID123', JSON.stringify(responseJsonStories), () => {
      // console.log("all Story Profiles");
    });

    const responselook = await fetch(AppConstants.API_BASE_URL + '/api/lookup/getalllookup');
    const responseJsonlook = await responselook.json();
    this.setState({
      user_Type: responseJsonlook.USER_TYPE,
      timelineType: responseJsonlook.TIMELINE_TYPE
    });
    //  console.log(this.state.getalllookup.lookUpName);
    const responseCat = await fetch(AppConstants.API_BASE_URL + '/api/lookup/getallcatagory');
    const responseJsonCat = await responseCat.json();
    this.setState({
      categories: responseJsonCat
    });
    // console.log(this.state.categories.length);
    const value = await AsyncStorage.getItem('userDetail');
    if (value) {
      const user = JSON.parse(value);
      this.setState({
        displayName: user.displayName,
        userId: user.userId,
        userType: user.userType
      });
    }
    try {
      const response = await fetch(AppConstants.API_BASE_URL + "/api/timeline/getalltimeline/bycatagory/12");
      const responseJson = await response.json();
      // set state
      this.setState({
        //   isLoading: false,
        dataSource: responseJson,
        selected: 12
      });
      //    console.log(this.state.dataSource);
    }
    catch (error) {
      console.log(error.toString());
    }
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }


  renderTimeLine = ({ item }: any): ListItemElement => (

    <ListItem style={{ borderBottomColor: 'silver', borderBottomWidth: .2 }}>

      {this.state.timelineType.map((timelineType, index) => {

        if (item.qType == timelineType.lookUpId && timelineType.lookUpName === 'VIDEO') {
          return (
            <View style={{ width: '100%', flex: 1, flexDirection: 'row' }}>

              <View>
              
                <TouchableOpacity style={{backgroundColor:'#D8D8D899',borderRadius:50,marginLeft:20}} onPress={() => { this.props.navigation.navigate('Profile', { pid: item.consultantId }); }}>
                <View style={styles.ImgBgOne}/>
                <View style={styles.ImgBgTwo}/>
                  <Thumbnail small source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + item.consultantId + '_avatar.png' }} />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'column', width: '79%' }}>
                <Text category='p2' style={styles.name}>{item.consultantName.toUpperCase()}</Text>
                <View style={{ marginLeft: 10,marginTop:2 }}>
                  <TouchableOpacity  onPress={() => { this.props.navigation.navigate('ViewContent', { pid: item.id }); }}>
                  <VideoPlayer
                 
                    style={{borderRadius:10}}                    
                    thumbnail={{ uri: AppConstants.IMAGE_BASE_URL + '/timeline/' + item.qArticle }}
                    video={{ uri: AppConstants.IMAGE_BASE_URL + '/timeline/' + item.qArticle }}
                    />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 5, flexDirection: 'row',marginLeft:10 }}>
                  {item.likeUserId !== null ?
                    (item.likeUserId.includes(this.state.userId) ?
                      <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.likeUpdate(item.id, e); }}>
                        <Icon name={'arrow-upward'} fill='#487AEB' size={18} width={20} height={20} />
                      </TouchableOpacity>

                      : <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.likeUpdate(item.id, e); }}>
                        <Icon name='arrow-upward' fill='#C9C8C8' size={18} width={20} height={20} style={{ color: 'silver' }} />
                      </TouchableOpacity>)
                    : <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.likeUpdate(item.id, e); }}>
                      <Icon name='arrow-upward' size={18} width={20} height={20} fill='#c7c9c8' />
                    </TouchableOpacity>
                  }
                  <Text style={{ marginLeft: 2, marginTop: 2, marginRight: 30 }}>
                    {item.likeCount}
                  </Text>

                  {item.disLikeUserId !== null ? (item.disLikeUserId.includes(this.state.userId) ?
                    <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.dislikeUpdate(item.id, e); }} >
                      <Icon name={'arrow-downward'} fill='#487AEB' size={18} width={20} height={20} />
                    </TouchableOpacity> :
                    <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.dislikeUpdate(item.id, e); }} >
                      <Icon name='arrow-downward' fill='#C9C8C8' size={18} width={20} height={20} style={{ color: 'silver' }} />
                    </TouchableOpacity>) :
                    <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.dislikeUpdate(item.id, e); }} >
                      <Icon name='arrow-downward' size={18} width={20} height={20} fill='#c7c9c8' />
                    </TouchableOpacity>
                  }
                  <View>
                    <Text style={{ marginLeft: 2, marginTop: 2, marginRight: 30 }}>
                      {item.dislikeCount}
                    </Text>
                  </View>
                  <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { shareSingleImage(item.qArticle, e) }}>
                    <Icon name='share-outline' width={20} height={20} fill='#C2C2C2' />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }
        else if (item.qType == timelineType.lookUpId && timelineType.lookUpName === 'IMAGE') {
          return (
            <View style={{ width: '100%', flex: 1, flexDirection: 'row' }}>
              <View>
                <TouchableOpacity style={{backgroundColor:'#D8D8D899',borderRadius:50,marginLeft:20}} onPress={() => { this.props.navigation.navigate('Profile', { pid: item.consultantId }); }}>
                <View style={styles.ImgBgOne}/>
                <View style={styles.ImgBgTwo}/>
                  <Thumbnail small source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + item.consultantId + '_avatar.png' }} />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'column', width: '85%' }}>
              <Text category='s1' style={styles.name}>{item.consultantName.toUpperCase()}</Text>
              <TouchableOpacity  onPress={() => { this.props.navigation.navigate('ViewContent', { pid: item.id }); }}>
              <Avatar style={{ borderRadius: 10,marginTop:2,width:"90%",height: 140,marginLeft:10}} source={{ uri: AppConstants.IMAGE_BASE_URL + '/timeline/' + item.qArticle }} />
              </TouchableOpacity>
                {/* <VideoPlayer
                        endWithThumbnail
                        thumbnail={{ uri: AppConstants.IMAGE_BASE_URL + '/timeline/' + item.qArticle }}
                        video={{ uri: AppConstants.IMAGE_BASE_URL + '/timeline/' + item.qArticle }}
                        fullScreenOnLongPress pauseOnPress /> */}
              

              <View style={{ marginTop: 5, flexDirection: 'row',marginLeft:10 }}>
                {item.likeUserId !== null ?
                  (item.likeUserId.includes(this.state.userId) ?
                    <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.likeUpdate(item.id, e); }}>
                      <Icon name={'arrow-upward'} fill='#487AEB' size={18} width={20} height={20} />
                    </TouchableOpacity>

                    : <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.likeUpdate(item.id, e); }}>
                      <Icon name='arrow-upward' fill='#C9C8C8' size={18} width={20} height={20} style={{ color: 'silver' }} />
                    </TouchableOpacity>)
                  : <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.likeUpdate(item.id, e); }}>
                    <Icon name='arrow-upward' size={18} width={20} height={20} fill='#c7c9c8' />
                  </TouchableOpacity>
                }
                <Text style={{ marginLeft: 2, marginTop: 2, marginRight: 30 }}>
                  {item.likeCount}
                </Text>
                {item.disLikeUserId !== null ? (item.disLikeUserId.includes(this.state.userId) ?
                  <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.dislikeUpdate(item.id, e); }} >
                    <Icon name={'arrow-downward'} fill='#487AEB' size={18} width={20} height={20} />
                  </TouchableOpacity> :
                  <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.dislikeUpdate(item.id, e); }} >
                    <Icon name='arrow-downward' fill='#C9C8C8' size={18} width={20} height={20} style={{ color: 'silver' }} />
                  </TouchableOpacity>) :
                  <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.dislikeUpdate(item.id, e); }} >
                    <Icon name='arrow-downward' size={18} width={20} height={20} fill='#c7c9c8' />
                  </TouchableOpacity>
                }
                <View>
                  <Text style={{ marginLeft: 2, marginTop: 2, marginRight: 30 }}>
                    {item.dislikeCount}
                  </Text>
                </View>
                <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { shareSingleImage(item.qArticle, e) }}>
                    <Icon name='share-outline' width={20} height={20} fill='#C2C2C2' />
                  </TouchableOpacity>
              </View>
              </View>
            </View>
          )
        }

        else if (item.qType == timelineType.lookUpId && timelineType.lookUpName === 'TEXT') {
          return (
            <View style={{ flexDirection: 'row',width:'100%' }}>
              <TouchableOpacity style={{borderRadius:50,backgroundColor:'#D8D8D899',height:35,width:35,marginLeft:20}} onPress={() => { this.props.navigation.navigate('Profile', { pid: item.consultantId }); }}>
                <View style={styles.ImgBgOne}/>
                <View style={styles.ImgBgTwo}/>
                <Thumbnail small style={{borderRadius:50}} source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + item.consultantId + '_avatar.png' }} />
                {/* item.consultantId */}
                </TouchableOpacity>
              <View style={{ flexDirection: 'column', width: '93%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text category='p2' style={styles.name}>{item.consultantName.toUpperCase()}</Text>


                </View>
                <View style={styles.TextView}>
                  <Text appearance='hint' category='p2' style={{fontFamily:'Roboto',color:'#14171A',marginLeft:10}} >{item.qArticle}</Text>
                </View>

                <View style={{ marginTop: 5, flexDirection: 'row',marginLeft:10 }}>
                  {item.likeUserId !== null ?
                    (item.likeUserId.includes(this.state.userId) ?
                      <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.likeUpdate(item.id, e); }}>
                        <Icon name={'arrow-upward'} fill='#487AEB' size={18} width={20} height={20} />
                      </TouchableOpacity>

                      : <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.likeUpdate(item.id, e); }}>
                        <Icon name='arrow-upward' fill='#C9C8C8' size={18} width={20} height={20} style={{ color: 'silver' }} />
                      </TouchableOpacity>)
                    : <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.likeUpdate(item.id, e); }}>
                      <Icon name='arrow-upward' size={18} width={20} height={20} fill='#c7c9c8' />
                    </TouchableOpacity>
                  }
                  <Text style={{ marginLeft: 2, marginTop: 2, marginRight: 30 }}>
                    {item.likeCount}
                  </Text>
                  {item.disLikeUserId !== null ? (item.disLikeUserId.includes(this.state.userId) ?
                    <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.dislikeUpdate(item.id, e); }} >
                      <Icon name={'arrow-downward'} fill='#487AEB' size={18} width={20} height={20} />
                    </TouchableOpacity> :
                    <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.dislikeUpdate(item.id, e); }} >
                      <Icon name='arrow-downward' fill='#C9C8C8' size={18} width={20} height={20} style={{ color: 'silver' }} />
                    </TouchableOpacity>) :
                    <TouchableOpacity style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { this.dislikeUpdate(item.id, e); }} >
                      <Icon name='arrow-downward' size={18} width={20} height={20} fill='#c7c9c8' />
                    </TouchableOpacity>
                  }
                  <View>
                    <Text style={{ marginLeft: 2, marginTop: 2, marginRight: 30 }}>
                      {item.dislikeCount}
                    </Text>
                  </View>
                  <TouchableOpacity style={{  height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 25}} onPress={e => { shareSingleImage(item.qArticle, e) }}>
                    <Icon name='share-outline' width={20} height={20} fill='#C2C2C2' />
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          )
        }
      })}
    </ListItem>

  );

  render() {
    const diffClamp = Animated.diffClamp(this.state.scrollY, 0, HEADER_MAX_HEIGHT)
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    })

    const headerZIndex = Animated.interpolate(diffClamp, {
      inputRange: [0, 1000],
      outputRange: [1000, 0]
    })

    const containtZIndex = Animated.interpolate(diffClamp, {
      inputRange: [1000, 1000],
      outputRange: [1000, 1000]
    })


    // const scrollY = new Animated.Value(0);

    const headerY = Animated.interpolate(diffClamp, {
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [0, -HEADER_MAX_HEIGHT],
    })

    const profileImageMarginTop = Animated.interpolate(diffClamp, {
      inputRange: [0, HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT]
    })
    return (
      <SafeAreaLayout
        style={{ flex: 1 }}
        insets={SaveAreaInset.TOP}>
        {/* <View style={{ flex: 1 }}> */}
        <Animated.View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          // backgroundColor: 'lightskyblue',
          height: HEADER_MIN_HEIGHT,
          zIndex: headerZIndex,
          transform: [{ translateY: headerY }]
        }}>

          <Input
            padding={0}
            placeholder='Search'
            style={styles.Search}
            name='search'
            value={this.state.search}
            onChangeText={(search) => this.setState({ search })}
            onKeyPress={this.handleSearch}
            size='small'
            icon={SearchIcon}
          />
          <Toolbar
            // title= {this.state.displayName}
            backIcon={MenuIcon}
            onBackPress={this.props.navigation.toggleDrawer}
            style={{ marginTop: -5, marginLeft: -5 }}
          />
          <Header style={{ backgroundColor: '#ffffff', height: 30, marginTop: -5 }}>

            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ marginTop: -10 }}>
                <FlatList
                  style={{}}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.categories}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={e => { this.handleSubmit(item.lookUpId, e); }}>
                        <View style={{ padding: 10, marginTop: 5, backgroundColor: '#ffffff' }}>
                          <Text style={this.state.selected == item.lookUpId ? styles.selected : styles.notSelected}>{item.lookUpName}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  }}
                >
                </FlatList>
              </View>
            </View>
          </Header>
        </Animated.View>

        <Animated.ScrollView style={{ flex: 1 }}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}>
          <Animated.View style={{
            height: '100%',
            width: '100%',
            marginTop: profileImageMarginTop
          }}>
            <Content refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }>

              <Header style={{ height: 70, paddingTop: 5, width: '100%', backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: 'silver' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View>
                    <Text category='p2' style = {{alignSelf: 'flex-start',marginTop:5}}> Ask an expert </Text>
                  </View>
                  <View>
                    <FlatList
                      style={{}}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={this.state.getallStories}
                      renderItem={({ item, index }) => {
                        return (
                          <View style = {{marginTop: -8}}>
                            <TouchableOpacity style={{borderRadius:50,backgroundColor:'#D8D8D899',height:36,width:36,marginTop:10,marginLeft:5,marginRight:5}} onPress={() => { this.props.navigation.navigate('Profile', { pid: item.userId }); }}>
                              <View style={styles.ImgBgOne}/>
                              <View style={styles.ImgBgTwo}/>
                              <Thumbnail style={{  }} small source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + item.userId + '_avatar.png' }} />
                            </TouchableOpacity>
                          </View>
                        )
                      }}
                    >

                    </FlatList>
                  </View>
                </View>
              </Header>


              <List data={this.state.dataSource}
                renderItem={this.renderTimeLine}

              />

            </Content>
          </Animated.View>
        </Animated.ScrollView>
        {this.state.user_Type.map((item, index) => {
          // console.log('UserType123', this.state.userType)
          if (item.lookUpId == this.state.userType && item.lookUpName === 'CONSULTANT') {

            return (
              <View style={styles.askButton} >
                <MaterialCommunityIcons name='pen-plus' size={25} style={{ marginRight: 10, marginTop: 10, color: '#0000FF99' }}
                  onPress={() => this.props.navigation.navigate('Ask')} />
              </View>

            )
          }
        }
        )}
      </SafeAreaLayout>
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
export const TimelineScreens = withStyles(TimelineScreen, (theme) => ({
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
  ImgBgTwo:{
    position:'absolute',
    borderRadius:55,
    alignSelf:'center', 
    height:11,width:11,
    transform: [{scaleX:2}],
    backgroundColor:'white',
    marginTop:20
  },
  ImgBgOne:{
    height:9,
    width:9,
    backgroundColor:'white',
    borderRadius:50,
    alignSelf:'center',
    marginTop:9,
    position:'absolute'
  },
  askButton:{
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
    marginRight:5,
    marginTop:-5,
    marginLeft:10,
    fontWeight:'bold',
    marginBottom:2
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

  notSelected: {
    color: 'silver'
  }

});

