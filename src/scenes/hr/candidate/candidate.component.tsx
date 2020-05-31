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
import { CandidateScreenProps } from '../../../navigation/hrNavigation/candiate.navigator';
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
import { ArroCircle, CancelIcon, Edit, ArrowUpIcon } from '../../../assets/icons'
import WebView from 'react-native-webview';

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


export class CandidateScreen extends React.Component<CandidateScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            isFresher: false,
            isExperience: false,
            qButton: '',
            profile_Data: '',
            showCV: ''
        }
        this.submitFresher = this.submitFresher.bind(this);
        this.submitExperienced = this.submitExperienced.bind(this);
        this.submitQButton = this.submitQButton.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.downloadCV = this.downloadCV.bind(this);
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
    componentDidUpdate() {
        if (this.state.showCV) {
            this.setState({
                showCV: false
            })
        }
    }

    downloadCV(e, userId) {
        axios({
            method: 'GET',
            url: AppConstants.API_BASE_URL + '/api/profile/getprofile/' + userId
        }).then((response) => {
            this.setState({
                profile_Data: response.data,
                showCV: !this.state.showCV
            })
        }, (error) => {
            console.log(error)
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
            <SafeAreaLayout
                style={styles.safeArea}
                insets={SaveAreaInset.TOP}>
                {/* <Toolbar
                    title='Home Page'
                    // backIcon={MenuIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                /> */}
                <Content style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >

                    <View style={styles.card1}>
                        {this.state.showCV ?
                            <WebView
                                source={{ uri: AppConstants.IMAGE_BASE_URL + '/timeline/' + this.state.profile_Data.profileFile }}
                            />
                            :
                            null
                        }

                        <View style={styles.downloadView}>
                            <TouchableOpacity style={styles.downloadButton} onPress={(e) => { this.downloadCV(e, 47) }}>
                                <Text style={styles.downloadText}>Download CV</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.card1View2}>
                            <View style={styles.card1View2_1}>
                                <View>
                                    <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/profile.jpeg' }} style={styles.image} />
                                </View>
                            </View>
                            <View style={styles.card1View2_2}>
                                <View>
                                    <Text style={styles.jobType}>Tushar Bansal</Text>
                                    <Text style={styles.location}>Hbr Layout, Bengaluru</Text>
                                    <Text style={styles.experience}>1 Year and 1 Months in Mobile Development</Text>
                                </View>
                                <View>
                                    <View style={styles.card1View2_2_2}>
                                        <View>
                                            <Text style={styles.postDate}>Qualification</Text>
                                            <Text>Masters</Text>
                                        </View>

                                        <View>
                                            <Text style={styles.postDate}>Total Experience</Text>
                                            <Text>1 Year and 1 Months</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.postDate}>Skills: Android, React-Native, Java</Text>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.contactButton}>
                                <Text style={styles.buttonText}>Contact</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.card1}>
                        <View style={styles.downloadView}>
                            <TouchableOpacity style={styles.downloadButton} onPress={(e) => { this.downloadCV(e, 47) }}>
                                <Text style={styles.downloadText}>Download CV</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.card1View2}>
                            <View style={styles.card1View2_1}>
                                <View>
                                    <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + 6 + '_avatar.png' }} style={styles.image} />
                                </View>
                            </View>
                            <View style={styles.card1View2_2}>
                                <View>
                                    <Text style={styles.jobType}>Tushar Bansal</Text>
                                    <Text style={styles.location}>Hbr Layout, Bengaluru</Text>
                                    <Text style={styles.experience}>1 Year and 1 Months in Mobile Development</Text>
                                </View>
                                <View>
                                    <View style={styles.card1View2_2_2}>
                                        <View>
                                            <Text style={styles.postDate}>Qualification</Text>
                                            <Text>Masters</Text>
                                        </View>

                                        <View>
                                            <Text style={styles.postDate}>Total Experience</Text>
                                            <Text>1 Year and 1 Months</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.postDate}>Skills: Android, React-Native, Java</Text>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.contactButton}>
                                <Text style={styles.buttonText}>Contact</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.card1}>
                        <View style={styles.downloadView}>
                            <TouchableOpacity style={styles.downloadButton} onPress={(e) => { this.downloadCV(e, 47) }}>
                                <Text style={styles.downloadText}>Download CV</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.card1View2}>
                            <View style={styles.card1View2_1}>
                                <View>
                                    <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + 47 + '_avatar.png' }} style={styles.image} />
                                </View>
                            </View>
                            <View style={styles.card1View2_2}>
                                <View>
                                    <Text style={styles.jobType}>Tushar Bansal</Text>
                                    <Text style={styles.location}>Hbr Layout, Bengaluru</Text>
                                    <Text style={styles.experience}>1 Year and 1 Months in Mobile Development</Text>
                                </View>
                                <View>
                                    <View style={styles.card1View2_2_2}>
                                        <View>
                                            <Text style={styles.postDate}>Qualification</Text>
                                            <Text>Masters</Text>
                                        </View>

                                        <View>
                                            <Text style={styles.postDate}>Total Experience</Text>
                                            <Text>1 Year and 1 Months</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.postDate}>Skills: Android, React-Native, Java</Text>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.contactButton}>
                                <Text style={styles.buttonText}>Contact</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: 10 }}></View>
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
        backgroundColor: '#EEEEEE',
        padding: 10
    },

    downloadView: {
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    downloadButton: {
        backgroundColor: '#1DA1F2',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: -10
    },

    downloadText: {
        color: '#FFFFFF'
    },

    image: {
        width: 90,
        height: 90,
        marginTop: 5,
        borderRadius: 50,
        borderColor: '#BBBBBB',
        borderWidth: 1
    },

    card1: {
        borderColor: '#DDDDDD',
        borderWidth: .4,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 10
    },

    card1View1: {
        alignSelf: 'flex-end',
        padding: 2,
        marginTop: -10,
        flexDirection: 'row',
        marginBottom: 5
    },

    card1View1Text1: {
        color: '#1DA1F2',
    },

    card1View1Text2: {
        color: '#BBBBBB',
        marginLeft: 5
    },

    card1View2: {
        flexDirection: 'row',
    },

    card1View2_1: {
        width: '30%',
        paddingRight: 10
    },

    card1View2_2: {
        width: '70%',
        marginTop: 5,
        paddingTop: 5
    },

    jobType: {
        fontSize: 20,
        marginBottom: 5,
    },

    location: {
        fontSize: 12,
        marginBottom: 5,
        color: '#AAAAAA'
    },

    postDate: {
        fontSize: 12,
        marginBottom: 5,
        color: '#888888'
    },

    experience: {
        fontSize: 12,
        marginBottom: 5,
        color: '#1Da1F2'
    },

    card1View2_2_2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },

    card1View3: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        borderWidth: .4,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        marginTop: 10

    },

    card1View3_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderRightWidth: 2,
        borderRightColor: '#DDDDDD',
        paddingRight: 20

    },

    card1View3_2: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5
    },


    card1View3Text1: {
        color: '#1DA1F2',
        fontSize: 20,
        marginHorizontal: 5,
    },

    card1View3Text2: {
        fontSize: 15,
        marginHorizontal: 5,
        color: '#1DA1F2'

    },

    card1View3Text3: {
        fontSize: 20,
        marginHorizontal: 5,
        color: '#1DA1F2'

    },

    card1View4: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },

    card1View4Text1: {
        color: '#009900'

    },

    card1View4Text2: {
        color: '#1DA1F2'

    },

    card1View4Text3: {
        color: '#BB0000'

    },

    contactButton: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    buttonText: {
        color: '#FFFFFF'
    }

});


