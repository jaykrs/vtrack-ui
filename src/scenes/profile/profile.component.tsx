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
import { ProfileScreenProps } from '../../navigation/profile.navigator';
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
import { EditProfileScreen } from './editProfile.component';
import { userInfo } from 'os';

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


export class ProfileScreen extends React.Component<ProfileScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            userData: [],
            profileData: [],
            qualification: [],
        }

        this._onRefresh = this._onRefresh.bind(this);
    }

    async componentDidMount() {
        // const value = await AsyncStorage.getItem('userDetail');
        // if (value) {
        //     // console.log('user Details all data', value);
        //     const user = JSON.parse(value);
        //     this.setState({
        //         userType: user.userType,
        //         token: user.token,
        //         userId: user.userId,
        //     })
        //     // console.log('user data id', this.state.userId);      

        //     axios({
        //         method: 'get',
        //         url: AppConstants.API_BASE_URL + '/api/user/get/' + user.userId,

        //     }).then((response) => {
        //         this.setState({
        //             ...this.state,
        //             userData: response.data
        //         })
        //         console.log("Profile Data", response.data);
        //     },
        //         (error) => {
        //             console.log(error);
        //             if (error) {
        //                 Alert.alert("UserId or Password is invalid");
        //             }
        //         }
        //     );

        //     axios({
        //         method: 'get',
        //         url: AppConstants.API_BASE_URL + '/api/profile/getprofile/' + user.userId,

        //     }).then((response) => {
        //         this.setState({
        //             ...this.state,
        //             profileData: response.data
        //         })
        //         console.log("Profile Data", response.data);
        //     },
        //         (error) => {
        //             console.log(error);
        //             if (error) {
        //                 Alert.alert("UserId or Password is invalid");
        //             }
        //         }
        //     );
        // }

        // axios({
        //     method: 'get',
        //     url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',

        // }).then((response) => {
        //     this.setState({
        //         ...this.state,
        //         qualification: response.data.QUALIFICATION
        //     })
        //     console.log("Profile Data", response.data);
        // },
        //     (error) => {
        //         console.log(error);
        //         if (error) {
        //             Alert.alert("UserId or Password is invalid");
        //         }
        //     }
        // );
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { userData, profileData, qualification } = this.state
        return (
            <SafeAreaLayout
                style={styles.safeArea}
                insets={SaveAreaInset.TOP}>
                {/* <Toolbar
                    // title='Home Page'
                    // backIcon={MenuIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5, backgroundColor: 'blue'}}
                /> */}
                <Header style={styles.header1}>
                    <Text style={styles.profileText}>My Profile</Text>
                </Header>
                <Header style={styles.header2}>
                </Header>

                <View style={styles.header3}>
                    <View style={styles.headerView1}>
                        <View style={styles.headerView1_1}>
                            <View>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/profile.jpeg' }} style={styles.image} />
                            </View>
                        </View>
                        <View style={styles.headerView1_2}>
                            <Text style={styles.name}>{userData.firstName} {userData.lastName}</Text>
                            {qualification.map((data, index) => {
                                if(data.lookUpId == profileData.highestQualification)
                                return (

                                    <Text style={styles.qualification}>{data.lookUpLabel}</Text>

                                )
                            })}
                        </View>
                    </View>
                    <View style={styles.headerView2}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(AppRoute.RESUME)}>
                            <Text style={styles.editButton}>Go to Resume ></Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Content style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    {/* <View style={styles.card1}>
                        <Text style={styles.cardText1}>Applied</Text>
                        <Text style={styles.cardText2}>0</Text>
                    </View> */}

                    <View style={styles.card2}>
                        {/* <View style={styles.card2_1}>
                            <Text style={styles.cardText3}>Saved</Text>
                            <Text style={styles.cardText4}> > </Text>
                        </View>

                        <View style={styles.card2_1}>
                            <Text style={styles.cardText3}>Help</Text>
                            <Text style={styles.cardText4}> > </Text>
                        </View>

                        <View style={styles.card2_1}>
                            <Text style={styles.cardText3}>Feedback</Text>
                            <Text style={styles.cardText4}> > </Text>
                        </View> */}

                        <TouchableOpacity onPress={() => { this.props.navigation.navigate(AppRoute.LOGOUT) }}>
                            <View style={styles.card2_2}>
                                <Text style={styles.cardText3}>Sign Out</Text>
                                <Text style={styles.cardText4}> > </Text>
                            </View>
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
        padding: 10
    },

    header1: {
        height: 120,
        backgroundColor: '#1DA1F2'
    },

    header2: {
        height: 80,
        backgroundColor: '#FFFFFF',
    },

    header3: {
        alignSelf: 'center',
        borderRadius: 10,
        width: '80%',
        height: 150,
        backgroundColor: '#FFFFFF',
        borderColor: '#DDDDDD',
        borderWidth: .8,
        marginTop: -150
    },

    headerView1: {
        height: 100,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },

    headerView1_1: {
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerView1_2: {
        width: '65%',
        justifyContent: 'center',
    },

    headerView2: {
        height: 50,
        paddingLeft: 15,
        justifyContent: 'center'
    },

    profileText: {
        color: '#FFFFFF',
        marginTop: 15,
        fontSize: 20
    },

    image: {
        width: 73,
        height: 73,
        borderRadius: 50,
        borderColor: '#BBBBBB',
        borderWidth: 1,
    },

    name: {
        fontSize: 20
    },

    qualification: {
        marginTop: 5
    },

    editButton: {
        color: '#1DA1F2',
        fontSize: 17
    },

    card1: {
        borderWidth: .8,
        width: '85%',
        borderColor: '#DDDDDD',
        padding: 10,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    cardText1: {
        color: '#1DA1F2',
        fontSize: 15
    },

    cardText2: {
        color: '#1DA1F2',
        fontSize: 20
    },

    card2: {
        width: '85%',
        alignSelf: 'center',
        borderColor: '#DDDDDD',
        borderWidth: .8,
        borderRadius: 10,
        marginTop: 10,
    },

    card2_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        padding: 10
    },

    card2_2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },

    cardText3: {
        fontSize: 15,
        color: '#1DA1F2'
    },

    cardText4: {
        fontSize: 20,
        color: '#1DA1F2'
    },


});


