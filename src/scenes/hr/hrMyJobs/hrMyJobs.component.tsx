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
import { HrMyJobsScreenProps } from '../../../navigation/hrNavigation/hrMyJobs.navigator';
import { AppRoute } from '../../../navigation/app-routes';
import { ProgressBar } from '../../../components/progress-bar.component';
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

import { ArroCircle, CancelIcon, Edit, ArrowUpIcon } from '../../../assets/icons';
import { WebView } from 'react-native-webview';
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


export class HrMyJobsScreen extends React.Component<HrMyJobsScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            jobIndustry: '',
            jobTitle: '',
            location: '',
            minQualification: '',
            experienceRequired: '',
            salaryFrom: '',
            salaryTo: '',
            salaryType: '',
            my_Jobs: [],
            salary_Type: [],
            job_Industry: [],
            min_Qualification: [],
            experience_Required: [],           
        }
        this.submitFresher = this.submitFresher.bind(this);
        this.submitExperienced = this.submitExperienced.bind(this);
        this.submitQButton = this.submitQButton.bind(this);
        this.handleJobSubmit = this.handleJobSubmit.bind(this);
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
            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/job/getalljobbyuser/' + user.userId,

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
                        alert("UserId or Password is invalid");
                    }
                }
            );

        }


        axios({
            method: 'get',
            url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',
        }).then((response) => {
            this.setState({
                ...this.state,
                salary_Type: response.data.SALARY_TYPE,
                job_Industry: response.data.JOB_CATEGORY,
                min_Qualification: response.data.QUALIFICATION,
                experience_Required: response.data.EXPERIENCE
            })
            // console.log("Profile Data", response.data);
        },
            (error) => {
                console.log(error);
                if (error) {
                    alert("UserId or Password is invalid");
                }
            }
        );
    }

    handleJobSubmit(e, jobId) {
        const jobData = { jobId: jobId }
        AsyncStorage.setItem('hrJobId', JSON.stringify(jobData), () => {
            AsyncStorage.getItem('hrJobId', (err, result) => {
                console.log('Job Id is', result);
            })
            this.props.navigation.navigate(AppRoute.HRMYJOBDETAIL);
        })
    }
    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    renderMyJob = ({ item }: any): ListItemElement => (
        <ListItem style={{}}>
            {item != null ?
                <View style={styles.card1}>
                    <TouchableOpacity onPress={(e) => this.handleJobSubmit(e, item.id)}>
                        <View style={styles.card1View1}>
                            <Text style={styles.card1View1Text}>Pause</Text>
                        </View>
                        <View style={styles.card1View2}>
                            <View style={styles.card1View2_1}>
                                <View>
                                    <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                                </View>
                            </View>
                            <View style={styles.card1View2_2}>
                                <View style={styles.card1View2_2_1}>
                                    <Text style={styles.jobType}>{item.jobTitle}</Text>
                                    <Text style={styles.location}>{item.location}</Text>
                                    <Text style={styles.postDate}>Posted on 20/03/2020</Text>
                                </View>
                                <View style={styles.card1View2_2_1}>
                                    <View style={styles.card1View2_2_2}>
                                        {this.state.salary_Type.map((data, index) => {
                                            console.log('salary type', item)
                                            console.log('salary type', item.salaryType)
                                            if (data.lookUpId == item.salaryType) {
                                                return (
                                                    <View>
                                                        <Text>Salary {data.lookUpLabel}</Text>
                                                        <Text>{item.salaryFrom} - {item.salaryTo}</Text>
                                                    </View>
                                                )
                                            }
                                        })
                                        }

                                        {this.state.job_Industry.map((data, index) => {
                                            // console.log('salary type', item)
                                            // console.log('salary type', salaryType)
                                            if (data.lookUpId == item.jobIndustry) {
                                                return (
                                                    <View>
                                                        <Text>Job Category</Text>
                                                        <Text>{data.lookUpLabel}</Text>
                                                    </View>
                                                )
                                            }
                                        })
                                        }

                                    </View>
                                    <View style={styles.card1View2_2_2}>

                                        {this.state.min_Qualification.map((data, index) => {
                                            // console.log('salary type', item)
                                            // console.log('salary type', salaryType)
                                            if (data.lookUpId == item.minQualification) {
                                                return (
                                                    <View>
                                                        <Text>Education</Text>
                                                        <Text>{data.lookUpLabel}</Text>
                                                    </View>

                                                )
                                            }
                                        })
                                        }

                                        {this.state.experience_Required.map((data, index) => {
                                            // console.log('salary type', item)
                                            // console.log('salary type', salaryType)
                                            if (data.lookUpId == item.experienceRequired) {
                                                return (
                                                    <View>
                                                        <Text>Experience</Text>
                                                        <Text>{data.lookUpLabel}</Text>
                                                    </View>
                                                )
                                            }
                                        })
                                        }


                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.card1View3}>
                        <View style={styles.card1View3_1}>
                            <Text style={styles.card1View3Text1}>99+</Text>
                            <View>
                                <Text style={styles.card1View3Text2}>Suggested</Text>
                                <Text style={styles.card1View3Text2}>Candidates</Text>
                            </View>
                            <ArroCircle />
                        </View>
                        <View style={styles.card1View3_2}>
                            <Text style={styles.card1View3Text1}>0</Text>
                            <View>
                                <Text style={styles.card1View3Text2}>Contacted</Text>
                                <Text style={styles.card1View3Text2}>Candidates</Text>
                            </View>
                            <ArroCircle />
                        </View>
                    </View>

                    <View style={styles.card1View4}>
                        <Text style={styles.card1View4Text1}><ArrowUpIcon />Take Job Live</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(AppRoute.EDITJOB)}>
                            <Text style={styles.card1View4Text2}><Edit /> Edit Job</Text>
                        </TouchableOpacity>
                        <Text style={styles.card1View4Text3}><CancelIcon />Close Job</Text>
                    </View>
                </View>
                :
                <ActivityIndicator size='large' color='green' />}

        </ListItem>

    )

    render() {
        const { my_Jobs, salaryType, jobIndustry, minQualification, experienceRequired, jobTitle, location } = this.state
        return (
            <SafeAreaLayout
                style={styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='All Jobs'
                    // backIcon={MenuIcon}
                    // onBackPress={this.props.navigation.goBack}
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

                    <List data={this.state.my_Jobs}
                        renderItem={this.renderMyJob}
                    />

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

    image: {
        width: '100%',
        height: 90,
        marginTop: 5,
        borderRadius: 10,
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
        backgroundColor: '#888888',
        alignSelf: 'flex-end',
        padding: 2,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginTop: -10
    },

    card1View1Text: {
        color: '#FFFFFF'
    },

    card1View2: {
        flexDirection: 'row'
    },

    card1View2_1: {
        width: '30%',
        paddingRight: 10
    },

    card1View2_2: {
        width: '70%'
    },

    card1View2_2_1: {
        borderBottomWidth: .8,
        borderBottomColor: '#DDDDDD',
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

    }

});


