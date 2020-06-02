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
import { MyJobsScreenProps } from '../../navigation/myJobs.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { ProgressBar } from '../../components/progress-bar.component';
import { SearchIcon, CancelIcon } from '../../assets/icons';
import { TimeLineData } from '../../data/TimeLineData.model';
import { AppConstants } from '../../constants/AppConstants';
import { Toolbar } from '../../components/toolbar.component';
import {
    SafeAreaLayout,
    SafeAreaLayoutElement,
    SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { MenuIcon, ExperienceIcon, LocationIcon, PublicIcon, PencilIcon } from '../../assets/icons';
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
import { Styles } from '../../assets/styles'
// import axios from 'axios';  
// import Container from '@react-navigation/core/lib/typescript/NavigationContainer';
import DeviceInfo from 'react-native-device-info';

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


export class MyJobsScreen extends React.Component<MyJobsScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            isFresher: false,
            isExperience: false,
            qButton: '',
            my_Jobs: [],
            salary_Type: [],
            job_Industry: [],
            min_Qualification: [],
            experience_Required: [],
            employment_Type: [],
            skill: [],
            deviceId: ''
        }
        this.submitFresher = this.submitFresher.bind(this);
        this.submitExperienced = this.submitExperienced.bind(this);
        this.submitQButton = this.submitQButton.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        // this.getdeviceId = this.getdeviceId.bind(this);
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

    // getdeviceId = () => {
    //     //Getting the Unique Id from here
    //     var id = DeviceInfo.getUniqueId();
    //     this.setState({
    //          deviceId: id,
    //          });
    // };

    async componentDidMount() {
        const value = await AsyncStorage.getItem('userDetail');
        if (value) {
            // console.log('user Details all data', value);
            const user = JSON.parse(value);
            this.setState({               
                userId: user.id,
            })

            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/user/get/' + user.id,    
            }).then((response) => {
                this.setState({
                    ...this.state,
                    my_Jobs: response.data
                })
                console.log("Profile Data", response.data);
            },
                (error) => {
                    console.log(error);
                    if (error) {
                        Alert.alert("Seems you have not created any visitor ! please add.");
                    }
                }
            );

            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/visitor/search/' + user.id + '/' + user.vendorId,
    
            }).then((response) => {
                this.setState({
                    ...this.state,
                    my_Jobs: response.data
                })
                console.log("Profile Data", response.data);
            },
                (error) => {
                    console.log(error);
                    if (error) {
                        Alert.alert("Seems you have not created any visitor ! please add.");
                    }
                }
            );
            // console.log('user data id', this.state.userId);      
        }

       

        // axios({
        //     method: 'get',
        //     url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',
        // }).then((response) => {
        //     this.setState({
        //         ...this.state,
        //         salary_Type: response.data.SALARY_TYPE,
        //         job_Industry: response.data.JOB_CATEGORY,
        //         min_Qualification: response.data.QUALIFICATION,
        //         experience_Required: response.data.EXPERIENCE,
        //         employment_Type: response.data.EMPLOYMENT_TYPE,
        //         skill: response.data.SKILL
        //     })
        //     // console.log("Profile Data", response.data);
        // },
        //     (error) => {
        //         console.log(error);
        //         if (error) {
        //             Alert.alert("UserId or Password is invalid");
        //         }
        //     }
        // );
    }

    handleJobSubmit(e, jobId, jobUserId) {
        const jobData = {
            jobId: jobId,
            jobUserId: jobUserId
        }
        AsyncStorage.setItem('jobId', JSON.stringify(jobData), () => {
            AsyncStorage.getItem('jobId', (err, result) => {
                console.log('Job Id is', result);
            })
            this.props.navigation.navigate(AppRoute.JOBDETAIL);
        })
    }

    search() {

    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    renderMyJob = ({ item }: any): ListItemElement => (
        <ListItem style={{ borderBottomColor: '#fff', borderBottomWidth: 0 }}>
            {item != null ?
                <View>
                    <TouchableOpacity>
                        <View style={styles.card}>
                            <View style={styles.card1}>
                                <Text style={styles.text}>{item.firstName} {item.lastName}</Text>
                                <Text style={styles.textdt}>{item.visitDate.length < 35
              ? `${item.visitDate.substring(0, 16)}`
              : `${item.visitDate}`}
 </Text>
                            </View>

                            <View style={styles.card2}>
                                <Text style={styles.text}>{item.phone}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View> :
                <ActivityIndicator size='large' color='green' />}

        </ListItem>
    )

    render() {
        const { my_Jobs } = this.state
        return (
            <SafeAreaLayout
                style={styles.safeArea}
                insets={SaveAreaInset.TOP}>
                {/* <Toolbar
                    title='All Jobs'
                    // backIcon={MenuIcon}
                    // onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                /> */}
                <View style={{ flexDirection: 'row', backgroundColor: '#eee', paddingTop: 5, marginBottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={Styles.menuButton}>
                        <TouchableOpacity onPress={this.props.navigation.toggleDrawer}>
                            <Text><MenuIcon /></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.searchBox}>
                        <TouchableOpacity style={Styles.searchIcon}>
                            <Text style={styles.searchIcon}><SearchIcon /></Text>
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Search"
                            style={Styles.searchInput}
                        />
                        <TouchableOpacity style={Styles.cancelIcon}>
                            <Text style={styles.cancelIcon}><CancelIcon /></Text>
                        </TouchableOpacity>
                    </View>


                    <View style={Styles.filterButton}>
                        <TouchableOpacity>
                            <Text style={{ color: '#1DA1F2', fontSize: 20 }}>Filter</Text>
                        </TouchableOpacity>
                    </View>


                </View>

                {/* <TouchableOpacity onPress = {this.getdeviceId}>
                    <Text>Device Id</Text>
                </TouchableOpacity>
                <Text>{this.state.deviceId}</Text> */}

                <Content style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    {/* <Header style={styles.header}> */}

                    {/* </Header> */}
                   
                    {/* <View style = {{height: 50, width: '100%', backgroundColor: 'rgba(145,174,225,0.3)'}}></View> */}
                    <List data={my_Jobs}
                        renderItem={this.renderMyJob}
                    />
                    <View style={{ height: 10, width: '100%' }}></View>
                </Content>

            </SafeAreaLayout>
        )
    }

}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },  

    searchBox: {
        width: 375,
        height: 52,
        backgroundColor: "#fff",
        borderColor: "#000000",
        borderWidth: 0,
        borderStyle: "solid"
    },

    content: {
        backgroundColor: '#fff',
        marginTop: 0,
        paddingTop: -10
    },

    header: {
        backgroundColor: '#eee',
        borderRadius: 1,
        marginBottom: 5
    },

    card: {
        backgroundColor: '#eee',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 5,
        marginBottom: -5,
        borderRadius: 2
    },

    card1: {
        width: '50%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    card2: {
        width: '50%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    text: {
        fontSize: 20,
        color: 'rgba(2,15,20,1)'
    },
    textdt: {
        fontSize: 12,
        color: 'rgba(2,15,20,1)'
    },
    searchIcon: {
        color: '#999999',
    },

    cancelIcon: {}
});


