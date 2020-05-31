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
    styled, Divider, Avatar, Icon, Button, Card
} from 'react-native-ui-kitten';
import { ScrollableTab, Tab, Item, Container, Content, Tabs, Header, TabHeading, Thumbnail, Input, Label, Footer, FooterTab } from 'native-base';
import { AppliedDetailScreenProps } from '../../navigation/applied.navigator';
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


export class AppliedDetailScreen extends React.Component<AppliedDetailScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            isFresher: false,
            isExperience: false,
            qButton: ''
        }
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
                    // title='Home Page'
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
                    <View style={styles.view1}>
                        <View style={styles.view1_1}>
                            <View>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg'}} style={styles.image} />
                            </View>
                        </View>
                        <View style={styles.view1_2}>
                            <View>
                                <Text style={styles.jobType}>Android Application Dveloper</Text>
                                <Text style={styles.companyName}>Teq To System</Text>
                                <Text style={styles.location}>Hennur, Bengaluru</Text>
                                <Text style={styles.subData}>IT & Software</Text>

                            </View>
                        </View>
                    </View>


                    <View style={styles.view2}>
                        <Text style={styles.subHeading}>30 Applicants</Text>
                        <Text style={styles.subHeading}>30 days ago</Text>
                    </View>

                    <View style={styles.view3}>
                        <View style={styles.view3_1}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.subHeading}>Monthly Salary</Text>
                                <Text style={styles.subData}>10,000 - 20,000</Text>
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.subHeading}>Experience</Text>
                                <Text style={styles.subData}>1 - 3 Years</Text>
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.subHeading}>Employment</Text>
                                <Text style={styles.subData}>Full Time</Text>
                            </View>
                        </View>

                        <View style={styles.view3_2}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.subHeading}>Min Qualification</Text>
                                <Text style={styles.subData}>10+2</Text>
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.subHeading}>Language</Text>
                                <Text style={styles.subData}>Hindi, English</Text>
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.subHeading}>N0. of openings</Text>
                                <Text style={styles.subData}>2 - 5</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.view4}>
                        <Text style={styles.discriptionHeading}>Job Description</Text>
                        <Text style={styles.discriptionText}>Android App Developer</Text>
                    </View>


                    <View style={styles.view5}>
                        <View>
                            <Text>Skills:</Text>
                            <Text style={styles.skill}> Android, Mobile development, Java, React-Native, Firebase, Ionic, Flutter, Xml...</Text>
                        </View>

                        <Card>
                            <View style={styles.card}>
                                <Text style={styles.cardHeading}>Working Days:</Text>
                                <Text>6 days working</Text>
                            </View>

                            <View style={styles.card}>
                                <Text style={styles.cardHeading}>Working Shifts:</Text>
                                <Text>Day Shift</Text>
                            </View>
                        </Card>
                        <View>
                            <Text>Perks & Benefits</Text>
                            <Text style={styles.benifitText}>Free Meals</Text>
                            <Text style={styles.benifitText}>Performance-based appraisals</Text>
                        </View>
                        <View style={styles.card1}>
                            <View style={styles.card1_1}>
                                <Text>Job Posted By</Text>
                                <View style = {{paddingRight: 20, paddingBottom: 10}}>
                                    <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + 1 + '_avatar.png' }} style={styles.image} />
                                </View>
                            </View>

                            <View style={styles.card1_2}>
                                <Text style={styles.cardHeading}>Name</Text>
                                <Text>Designation</Text>
                            </View>
                        </View>

                        <View style={styles.card1}>
                            <View style={styles.card1_1}>
                                <Text>Company</Text>
                                <View style = {{paddingRight: 20, paddingBottom: 10}}>
                                    <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/Company.jpg' }} style={styles.image} />
                                </View>
                            </View>

                            <View style={styles.card1_2}>
                                <Text style={styles.cardHeading}>Name</Text>
                                <Text>Work</Text>
                            </View>
                        </View>                       
                    </View>

                   

                </Content>

            </SafeAreaLayout>
        )
    }

}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },

    content: {
        backgroundColor: '#ffffff',
        padding: 10
    },

    view1: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#aaaaaa',
        paddingBottom: 5,

    },

    view1_1: {
        width: '30%',
    },

    view1_2: {
        width: '70%',
        padding: 5
    },

    view2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#aaaaaa',
        paddingBottom: 5
    },

    view3: {
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#aaaaaa',
        paddingBottom: 5
    },

    view3_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },

    view3_2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },

    view4: {
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#aaaaaa',
        paddingBottom: 5
    },

    discriptionHeading: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    discriptionText: {
        color: '#aaa'
    },

    view5: {
        paddingHorizontal: 10,
        paddingBottom: 5
    },

    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    cardHeading: {
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10
    },
    footerTab: {
        backgroundColor: '#fff'
    },
    applyButton: {
        width: '100%',
        backgroundColor: '#1DA1F2',
        justifyContent: 'center',
        alignItems: 'center',
    },

    applyButtonText: {
        color: '#fff'
    },

    image: {
        width: '100%',
        height: 90,
        marginTop: 5,
        borderRadius: 10,
        borderColor: '#bbbbbb',
        borderWidth: 1
    },

    jobType: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    companyName: {
        fontSize: 16,
    },

    location: {
        fontSize: 14,
        marginTop: 10
    },

    subHeading: {
        fontSize: 12,
        color: '#888888',
        marginTop: 5
    },

    subData: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5
    },

    skill: {
        fontSize: 13,
        color: '#666666',
        marginTop: 5,
        marginBottom: 10
    },

    benifitText: {
        marginLeft: 20,
    },

    card1: {
        marginTop: 10,
        flexDirection: 'row',
        borderColor: '#dddddd',
        borderWidth: .5,
        borderRadius: 5        
    },

    card1_1: {
        width: '40%',
        paddingHorizontal: 5

    },

    card1_2: {
        width: '60%',
        justifyContent: 'center',
    },

});


