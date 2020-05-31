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
import { ResumeScreenProps } from '../../navigation/profile.navigator';
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
import { PlusCircle, Edit } from '../../assets/icons';
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


export class ResumeScreen extends React.Component<ResumeScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            isFresher: false,
            isExperience: false,
            qButton: '',
            profile_Data: [],
            showCV: false
        }
        this.submitFresher = this.submitFresher.bind(this);
        this.submitExperienced = this.submitExperienced.bind(this);
        this.submitQButton = this.submitQButton.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.handleCV = this.handleCV.bind(this);
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
            axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/profile/getprofile/' + user.userId
            }).then((response) => {
                this.setState({
                    profile_Data: response.data
                })
            }, (error) => {
                console.log(error);
            });
        }
    }

    componentDidUpdate() {
        if (this.state.showCV) {
            this.setState({
                showCV: false
            })
        }
    }

    handleCV() {
        // Alert.alert(this.state.profile_Data.profileFile)
        this.setState({
            showCV: !this.state.showCV
        })
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
                    title='Your Resume'
                    // backIcon={MenuIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5, borderBottomColor: '#DDDDDD', borderBottomWidth: 1 }}
                />
                <Content style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    <View style={styles.downloadView}>
                        <TouchableOpacity style={styles.downloadButton} onPress={() => this.handleCV()}>
                            <Text style={styles.downloadText}>Download CV</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.view1}>
                        {this.state.showCV ?
                            <WebView
                                source={{ uri: AppConstants.IMAGE_BASE_URL + '/timeline/' + this.state.profile_Data.profileFile }}
                            />
                            :
                            null
                        }

                        <View style={styles.view1_1}>
                            <View>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + this.state.userId + '_avatar.png' }} style={styles.image} />
                            </View>
                            <Text style={styles.name}>Avinash</Text>
                            <Text style={styles.location}>Bengaluru</Text>
                        </View>
                        <View style={styles.view1_2}>
                            <View>
                                <TouchableOpacity style={styles.editButton} onPress={() => this.props.navigation.navigate(AppRoute.EDITPROFILE)}>
                                    <Text style={styles.editButtonText}><Edit /> Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.view2}>
                        <View style={styles.view2_1}>
                            <Text style={styles.view2Heading}>Experience</Text>
                            <Text style={styles.view2Data}>2 Years</Text>
                            <Text></Text>
                        </View>

                        <View style={styles.view2_1}>
                            <Text style={styles.view2Heading}>qualification</Text>
                            <Text style={styles.view2Data}>Graduate</Text>
                        </View>

                        <View style={styles.view2_1}>
                            <Text style={styles.view2Heading}>Expected Salary</Text>
                            <Text style={styles.view2Data}>10,000 - 50,000</Text>
                        </View>
                    </View>

                    <View style={styles.view3}>
                        <View style={styles.view3_1}>
                            <Text style={styles.view3Heading}>Key Skills</Text>
                            <TouchableOpacity>
                                <PlusCircle />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            {/* <Text></Text> */}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.view3}>
                        <View style={styles.view3_1}>
                            <Text style={styles.view3Heading}>Work Experience</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(AppRoute.ADDEXPERIENCE)}>
                                <PlusCircle />

                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            {/* <Text></Text> */}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.view3}>
                        <View style={styles.view3_1}>
                            <Text style={styles.view3Heading}>Education</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(AppRoute.ADDEDUCATION)}>
                                <PlusCircle />

                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            {/* <Text></Text> */}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.view3}>
                        <View style={styles.view3_1}>
                            <Text style={styles.view3Heading}>Achivements</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(AppRoute.ADDACHIVEMENT)}>
                                <PlusCircle />

                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            <Text></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.view3}>
                        <View style={styles.view3_1}>
                            <Text style={styles.view3Heading}>Certificates</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(AppRoute.ADDCERTIFICATE)}>
                                <PlusCircle />

                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            <Text></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.view3}>
                        <View style={styles.view3_1}>
                            <Text style={styles.view3Heading}>Job preferences</Text>
                            <TouchableOpacity>
                                <PlusCircle />

                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            <Text></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.view3}>
                        <View style={styles.view3_1}>
                            <Text style={styles.view3Heading}>Languages</Text>
                            <TouchableOpacity>
                                <PlusCircle />

                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            <Text></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.view3}>
                        <View style={styles.view3_1}>
                            <Text style={styles.view3Heading}>Personal Info</Text>
                            <TouchableOpacity>
                                <PlusCircle />

                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            <Text></Text>
                        </TouchableOpacity>
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
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingBottom: 10
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
        // marginTop: -10
    },

    downloadText: {
        color: '#FFFFFF'
    },


    view1: {
        flexDirection: 'row',

    },

    view1_1: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    name: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 30

    },

    location: {
        marginTop: 10,
        color: '#AAAAAA',
        marginLeft: 30

    },

    view1_2: {
        width: '10%',

    },

    editButton: {
        backgroundColor: '#1DA1F2',
        borderRadius: 10,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 1,
        marginLeft: -50,
        marginTop: 10
    },

    editButtonText: {
        color: '#FFFFFF'
    },

    image: {
        width: 120,
        height: 120,
        marginLeft: 30,
        marginTop: -20
    },

    view2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    view2_1: {
        flexDirection: 'column',
        alignItems: 'center'
    },

    view2Data: {
        fontSize: 16
    },

    view2Heading: {
        fontSize: 13,
        color: '#AAAAAA'
    },

    view3: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        paddingHorizontal: 10,
        paddingBottom: 10,
        marginVertical: 5
    },

    view3_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10
    },

    view3Heading: {
        fontSize: 18
    }

});


