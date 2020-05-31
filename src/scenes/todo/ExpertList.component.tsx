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
import { ExpertListScreensProps } from '../../navigation/todo.navigator';
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
import StarRating from 'react-native-star-rating';

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


export class ExpertListScreens extends React.Component<ExpertListScreensProps & ThemedComponentProps, MyState & any> {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  
  }

  render() {
   
    return (
      <SafeAreaLayout
        style={{ flex: 1 }}
        insets={SaveAreaInset.TOP}>       
          <Toolbar
            title= 'To Do Page'
            backIcon={MenuIcon}
            onBackPress={this.props.navigation.toggleDrawer}
            style={{ marginTop: -5, marginLeft: -5 }}
          />
         <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
           <Text style = {{fontSize: 20, fontWeight: 'bold'}}>This is To Do page</Text>
         </View>
      </SafeAreaLayout>
    )
  }

}
