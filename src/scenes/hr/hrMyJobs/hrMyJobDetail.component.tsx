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
import { HrMyJobDetailScreenProps } from '../../../navigation/hrNavigation/hrMyJobs.navigator';
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

import { ArroCircle, CancelIcon, Edit, ArrowUpIcon } from '../../../assets/icons'
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


export class HrMyJobDetailScreen extends React.Component<HrMyJobDetailScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            isFresher: false,
            isExperience: false,
            qButton: '',
            my_Job: [],
            salary_Type: [],
            job_Industry: [],
            min_Qualification: [],
            experience_Required: [],
            employment_Type: [],
            skill: [],
            working_Days: [],
            working_Shift: [],
            company_Data: [],
            profile_Data: [],
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
            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/company/getcompany/' + user.userId,
            }).then((response) => {
                this.setState({
                    ...this.state,
                    company_Data: response.data
                })
                console.log("Job Data", response.data);
            },
                (error) => {
                    console.log(error);
                    if (error) {
                        Alert.alert("UserId or Password is invalid");
                    }
                }
            );

            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/profile/getprofile/' + user.userId,
            }).then((response) => {
                this.setState({
                    ...this.state,
                    profile_Data: response.data
                })
                console.log("Job Data", response.data);
            },
                (error) => {
                    console.log(error);
                    if (error) {
                        Alert.alert("UserId or Password is invalid");
                    }
                }
            );     
        }

        const value1 = await AsyncStorage.getItem('hrJobId');
        if (value1) {
            const jobData = JSON.parse(value1);
            console.log('user Details all data', jobData);

            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/job/getjobbyid/' + jobData.jobId,
            }).then((response) => {
                this.setState({
                    ...this.state,
                    my_Job: response.data
                })
                console.log("Job Data", response.data);
            },
                (error) => {
                    console.log(error);
                    if (error) {
                        Alert.alert("UserId or Password is invalid");
                    }
                }
            );

            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',
            }).then((response) => {
                this.setState({
                    ...this.state,
                    salary_Type: response.data.SALARY_TYPE,
                    job_Industry: response.data.JOB_CATEGORY,
                    min_Qualification: response.data.QUALIFICATION,
                    experience_Required: response.data.EXPERIENCE,
                    employment_Type: response.data.EMPLOYMENT_TYPE,
                    skill: response.data.SKILL,
                    working_Days: response.data.WORKING_DAYS,
                    working_Shift: response.data.WORKING_SHIFT
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
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { profile_Data, company_Data, my_Job, salary_Type, min_Qualification, employment_Type, job_Industry, experience_Required, skill, working_Days, working_Shift } = this.state
        return (
            <SafeAreaLayout
                style={styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Your Job Detail'
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
                            <Text style={styles.heading}>{my_Job.jobTitle}</Text>
                            <Text style={styles.company}>{my_Job.companyName}</Text>
                            <Text style={styles.city}>{my_Job.location}</Text>
                            {job_Industry.map((data, index) => {
                                if (data.lookUpId == my_Job.jobIndustry)
                                    return (
                                        <Text style={styles.jobType}>{data.lookUpLabel}</Text>
                                    )
                            })}
                        </View>
                    </View>

                    <View style={styles.view2}>
                        <View style={styles.view2_1}>
                            {salary_Type.map((data, index) => {
                                if (data.lookUpId == my_Job.salaryType)
                                    return (
                                        <View>
                                            <Text style={styles.subHeading}>Salary {data.lookUpLabel}</Text>
                                            <Text style={styles.data}>{my_Job.salaryFrom} - {my_Job.salaryTo}</Text>
                                        </View>
                                    )
                            })}

                            {experience_Required.map((data, index) => {
                                if (data.lookUpId == my_Job.experienceRequired)
                                    return (
                                        <View>
                                            <Text style={styles.subHeading}>Experience</Text>
                                            <Text style={styles.data}>{data.lookUpLabel}</Text>
                                        </View>
                                    )
                            })}

                            {employment_Type.map((data, index) => {
                                if (data.lookUpId == my_Job.employmentType)
                                    return (
                                        <View>
                                            <Text style={styles.subHeading}>Employment</Text>
                                            <Text style={styles.data}>{data.lookUpLabel}</Text>
                                        </View>
                                    )
                            })}
                        </View>

                        {min_Qualification.map((data, index) => {
                            if (data.lookUpId == my_Job.minQualification)
                                return (
                                    <View style={styles.view2_2}>
                                        <Text style={styles.subHeading}>Min Qualification</Text>
                                        <Text style={styles.data}>{data.lookUpLabel}</Text>
                                    </View>
                                )
                        })}
                    </View>

                    <View style={styles.view3}>
                        <Text style={styles.heading1}>Job Description</Text>
                        <Text style={styles.data1}>{my_Job.jobDescription}</Text>
                    </View>

                    <Text style={styles.heading1}>Skills</Text>

                    <View style={styles.view4}>
                        {skill.map((data, index) => {
                            if (data.lookUpId == my_Job.skill)
                                return (
                                    <View style={styles.skill}>
                                        <Text style={styles.skillText}>{data.lookUpLabel}</Text>
                                    </View>
                                )
                        })}


                        {/* <View style={styles.skill}>
                            <Text style={styles.skillText}>React Native</Text>
                        </View>

                        <View style={styles.skill}>
                            <Text style={styles.skillText}>Firebase</Text>
                        </View>

                        <View style={styles.skill}>
                            <Text style={styles.skillText}>Xml</Text>
                        </View> */}
                    </View>

                    <View style={styles.card}>
                        {working_Days.map((data, index) => {
                            if (data.lookUpId == my_Job.workingDays)
                                return (
                                    <View style={styles.view5_1}>
                                        <Text style={styles.subHeading1}>Working Days</Text>
                                        <Text style={styles.subData}>{data.lookUpLabel}</Text>
                                    </View>
                                )
                        })}

                        {working_Shift.map((data, index) => {
                            if (data.lookUpId == my_Job.workingShift)
                                return (
                                    <View style={styles.view5_1}>
                                        <Text style={styles.subHeading1}>Working Shift</Text>
                                        <Text style={styles.subData}>{data.lookUpLabel}</Text>
                                    </View>
                                )
                        })}
                        <View style={styles.view5_1}>
                            <Text style={styles.subHeading1}>No. of openings</Text>
                            <Text style={styles.subData}>{my_Job.openings}</Text>
                        </View>
                    </View>

                    <View style={styles.card1}>
                        <View style={styles.view6_1}>
                            <View>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + 1 + '_avatar.png' }} style={styles.image1} />
                            </View>
                        </View>
                        <View style={styles.view6_2}>
                            <Text style={styles.subData}>{profile_Data.displayName}</Text>
                            <Text style={styles.subHeading}>{profile_Data.designation}</Text>
                        </View>
                    </View>

                    <View style={styles.card1}>
                        <View style={styles.view6_1}>
                            <View>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/Company.jpg' }} style={styles.image} />
                            </View>
                        </View>
                        <View style={styles.view6_2}>
                            <Text style={styles.subData}>{company_Data.name}</Text>
                            <Text style={styles.subHeading}>{company_Data.strength} peaple</Text>
                        </View>
                    </View>
                    <View style={{ height: 20 }}></View>
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



    image: {
        width: '100%',
        height: 90,
        marginTop: 5,
        borderRadius: 10,
        borderColor: '#BBBBBB',
        borderWidth: 1,
    },

    view1: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingBottom: 10
    },

    view1_1: {
        width: '30%',
        padding: 5
    },

    view1_2: {
        width: '70%',
        padding: 8
    },

    heading: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    company: {
        fontSize: 13,
        color: '#999999'
    },

    city: {
        fontSize: 13,
        color: '#999999'
    },

    jobType: {
        fontSize: 13,
        color: '#777777'
    },

    view2: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },

    view2_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        padding: 5
    },

    subHeading: {
        fontSize: 12,
        color: '#999999'
    },

    data: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    data1: {
        fontSize: 16,
        color: '#999999'
    },

    heading1: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 10
    },

    view2_2: {
        marginTop: 5,
        padding: 5
    },

    view3: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        paddingBottom: 10
    },

    view4: {
        flexDirection: 'row'
    },

    skill: {
        paddingHorizontal: 15,
        paddingVertical: 2,
        backgroundColor: '#C3E3F7',
        borderRadius: 20,
        marginHorizontal: 2
    },

    skillText: {
        fontSize: 12,
        alignSelf: 'center'
    },

    card: {
        borderWidth: .4,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        padding: 10,
        marginTop: 20
    },

    card1: {
        borderWidth: .4,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        flexDirection: 'row'
    },

    view5_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 5
    },

    subHeading1: {
        fontSize: 16
    },

    subData: {
        fontWeight: 'bold',
        fontSize: 16
    },

    view6_1: {
        width: '30%',
        padding: 5
    },

    view6_2: {
        justifyContent: 'center',
        marginLeft: 20
    },

    image1: {
        width: 90,
        height: 90,
        marginTop: 5,
        borderRadius: 50,
        borderColor: '#BBBBBB',
        borderWidth: 1,
    }
});


