import React from 'react';
import {
    ListRenderItemInfo, View, StyleSheet, TouchableOpacity,
    ActivityIndicator, Image, Alert, FlatList, ScrollView, RefreshControl, StatusBar, Dimensions
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
    styled, Divider, Avatar, Icon, Button, BottomNavigationTab
} from 'react-native-ui-kitten';
import { ScrollableTab, Tab, Container, Content, Tabs, Header, TabHeading, Thumbnail } from 'native-base';
import { ViewContentScreenProps } from '../../navigation/timeline.navigator';
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
import { closeicon } from '../../assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { any } from 'prop-types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { truncate, open, close } from 'fs';
import VideoPlayer from 'react-native-video-player';
// import { FlatList } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { pathToFileURL, fileURLToPath } from 'url';

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
type MyState = {
    timelineId: Number,
    timelineData: []
}






export class ViewContentScreen extends React.Component<ViewContentScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props);

        this.state = {
            timelineId: '',
            timelineData: [],
            timelineType: []
        }
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {

        const value = JSON.stringify(nextProps.route.params.pid)
        if (value !== this.state.qArticle) {
            console.log('userID in profile', value);
            this.setState({
                timelineId: value
            })

            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/timeline/gettimeline/' + value,
              }).then((response) => {
                this.setState({
                  ...this.state,
                  timelineData: response.data,                 
                })
            });
        }
    }

    async componentDidMount() {
        StatusBar.setHidden(true);

        console.log("Viewcontent check", JSON.stringify(this.props.route.params.pid))
        const value = JSON.stringify(this.props.route.params.pid)
        if (value !== this.state.qArticle) {
            console.log('userID in profile', value);
            this.setState({
                qArticle: value
            })
            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/timeline/gettimeline/' + value,
              }).then((response) => {
                this.setState({
                  ...this.state,
                  timelineData: response.data,                 
                })
                console.log("Image View Type Check", this.state.timelineData);
            });

            const responselook = await fetch(AppConstants.API_BASE_URL + '/api/lookup/getalllookup');
            const responseJsonlook = await responselook.json();
            this.setState({
                //   user_Type: responseJsonlook.USER_TYPE,
                timelineType: responseJsonlook.TIMELINE_TYPE
            });

            
        }
    }

    render() {
        return (
            <ScrollView

                style={styles.safeArea}
                >

                <Toolbar
                    // title='Setting'
                    backIcon={closeicon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -15, marginLeft: -5, right: 0, justifyContent: 'flex-end', position: 'absolute', zIndex: 100, backgroundColor: 'rgba(52, 52, 52, 0.0)' }}
                />
                {this.state.timelineType.map((item, index) => {
                    if (this.state.timelineData.qType === item.lookUpId && item.lookUpName === 'IMAGE') {
                    console.log('View dataaaaa',item.lookUpId,item.lookUpName,this.state.timelineData.qType)

                        return (
                            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center' }}>
                                <Avatar style={{ borderRadius: 0, width: "100%", height: '50%' }} source={{ uri: AppConstants.IMAGE_BASE_URL + '/timeline/' + this.state.timelineData.qArticle }} />
                            </View>
                        );
                    } else  if (this.state.timelineData.qType === item.lookUpId && item.lookUpName === 'VIDEO') { 
                        return(
                            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center',backgroundColor:'black'}}>

                        <VideoPlayer
                            style={styles.content}
                            endWithThumbnail
                            thumbnail={{ uri: AppConstants.IMAGE_BASE_URL + '/timeline/' + this.state.timelineData.qArticle }}
                            video={{ uri: AppConstants.IMAGE_BASE_URL + '/timeline/' + this.state.timelineData.qArticle }}
                            fullScreenOnLongPress={true} />
                            </View>
                        );
                    }
                })}



            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },

    content: {
        width: WIDTH,
        // height: HEIGHT - 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },

    text: {
        fontSize: 20
    }
})