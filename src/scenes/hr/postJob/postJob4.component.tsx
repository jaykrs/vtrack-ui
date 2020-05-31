import React from 'react';
import {
    ListRenderItemInfo, View, StyleSheet, TouchableOpacity,
    ActivityIndicator, Image, Alert, FlatList, ScrollView, RefreshControl, TextInput, Switch, Picker, Slider
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
import { PostScreen4Props } from '../../../navigation/hrNavigation/postJob.navigator';
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
import { LabelConstants } from '../../../constants/LabelConstants';

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


export class PostScreen4 extends React.Component<PostScreen4Props & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            jobDescription: ''
        }

        this._onRefresh = this._onRefresh.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { jobDescription } = this.state
        const jobData4 = {jobDescription: jobDescription}
        if (jobDescription === '' || jobDescription.length === 0) {
            Alert.alert(LabelConstants.ALERT_JOB_DESCRIPTION)
        } else {
        AsyncStorage.mergeItem('jobData', JSON.stringify(jobData4), () => {
            AsyncStorage.getItem('jobData', (err, result) => {
                console.log('data', result);
            })
            this.props.navigation.navigate(AppRoute.POSTJOB5)
        })
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

        axios({
            method: 'get',
            url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',

        }).then((response) => {
            this.setState({
                ...this.state,
                minQualification: response.data.CATAGORY
            })
            // console.log("Profile Data", response.data);
        },
            (error) => {
                console.log(error);
                if (error) {
                    Alert.alert("UserId or Password is invalid");
                }
            }
        );


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
                style={styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='4/5'
                    // backIcon={MenuIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Content style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >

                    <Text style={styles.heading}>Write your way to Hire the Best!</Text>
                    <Text style={styles.subHeading}>Add a job Description to specify your hiring requirements in details.</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            multiline={true}
                            style={styles.inputText}
                            placeholder='Enter job description'
                            onChangeText={(jobDescription) => { this.setState({ jobDescription: jobDescription }) }}
                        />
                    </View>


                </Content>
                <Footer>
                    <FooterTab style={styles.footer}>
                        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </FooterTab>
                </Footer>
            </SafeAreaLayout>
        )
    }

}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },

    content: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        paddingBottom: 20,
        borderTopColor: '#DDDDDD',
        borderTopWidth: .8
    },

    footer: {
        backgroundColor: '#1DA1F2',
        justifyContent: 'center'
    },

    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA'
    },

    button: {
        paddingHorizontal: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputView: {},

    buttonText: {
        color: '#FFFFFF'
    },

    heading: {
        fontSize: 20,
        marginTop: 10,
        color: '#1DA1F2'
    },

    subHeading: {
        fontSize: 14,
        color: '#AAAAAA'
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

});


