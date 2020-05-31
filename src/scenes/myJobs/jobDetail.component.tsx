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
import { JobDetailScreenProps } from '../../navigation/myJobs.navigator';
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


export class JobDetailScreen extends React.Component<JobDetailScreenProps & ThemedComponentProps, MyState & any> {
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
            language: [],
            perks_Benefit: [],
            profile_Data: [],
            company_Data: [],
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

        const value1 = await AsyncStorage.getItem('jobId');
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
                url: AppConstants.API_BASE_URL + '/api/company/getcompany/' + jobData.jobUserId,
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
                url: AppConstants.API_BASE_URL + '/api/profile/getprofile/' + jobData.jobUserId,
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
                    working_Shift: response.data.WORKING_SHIFT,
                    language: response.data.LANGUAGE,
                    perks_Benefit: response.data.PERKS_BENEFIT,
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
        const { my_Job, salary_Type, job_Industry, min_Qualification, experience_Required, employment_Type, language, skill, working_Days, working_Shift, perks_Benefit, profile_Data, company_Data } = this.state
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
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                            </View>
                        </View>
                        <View style={styles.view1_2}>
                            <View>
                                <Text style={styles.jobType}>{my_Job.jobTitle}</Text>
                                <Text style={styles.companyName}>{my_Job.companyName}</Text>
                                <Text style={styles.location}>{my_Job.location}</Text>
                                {job_Industry.map((data, index) => {
                                    if (data.lookUpId == my_Job.jobIndustry)
                                        return (
                                            <Text style={styles.subData}>{data.lookUpLabel}</Text>
                                        )
                                })}
                            </View>
                        </View>
                    </View>


                    <View style={styles.view2}>
                        <Text style={styles.subHeading}>30 Applicants</Text>
                        <Text style={styles.subHeading}>30 days ago</Text>
                    </View>

                    <View style={styles.view3}>
                        <View style={styles.view3_1}>
                            {salary_Type.map((data, index) => {
                                if (data.lookUpId == my_Job.salaryType)
                                    return (
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.subHeading}>Salary {data.lookUpLabel}</Text>
                                            <Text style={styles.subData}>{my_Job.salaryFrom} - {my_Job.salaryTo}</Text>
                                        </View>
                                    )
                            })}

                            {experience_Required.map((data, index) => {
                                if (data.lookUpId == my_Job.experienceRequired)
                                    return (
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.subHeading}>Experience</Text>
                                            <Text style={styles.subData}>{data.lookUpLabel}</Text>
                                        </View>
                                    )
                            })}

                            {employment_Type.map((data, index) => {
                                if (data.lookUpId == my_Job.employmentType)
                                    return (
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.subHeading}>Employment</Text>
                                            <Text style={styles.subData}>{data.lookUpLabel}</Text>
                                        </View>
                                    )
                            })}

                        </View>

                        <View style={styles.view3_2}>
                            {min_Qualification.map((data, index) => {
                                if (data.lookUpId == my_Job.minQualification)
                                    return (
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.subHeading}>Min Qualification</Text>
                                            <Text style={styles.subData}>{data.lookUpLabel}</Text>
                                        </View>
                                    )
                            })}

                            {language.map((data, index) => {
                                if (data.lookUpId == my_Job.languageRequired)
                                    return (
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.subHeading}>Language</Text>
                                            <Text style={styles.subData}>{data.lookUpLabel}</Text>
                                        </View>
                                    )
                            })}


                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.subHeading}>N0. of openings</Text>
                                <Text style={styles.subData}>{my_Job.openings}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.view4}>
                        <Text style={styles.discriptionHeading}>Job Description</Text>
                        <Text style={styles.discriptionText}>{my_Job.jobDescription}</Text>
                    </View>


                    <View style={styles.view5}>
                        {skill.map((data, index) => {
                            if (data.lookUpId == my_Job.skill)
                                return (
                                    <View>
                                        <Text>Skills:</Text>
                                        <Text style={styles.skill}>{data.lookUpLabel}</Text>
                                    </View>
                                )
                        })}

                        <Card>
                            {working_Days.map((data, index) => {
                                if (data.lookUpId == my_Job.workingDays)
                                    return (
                                        <View style={styles.card}>
                                            <Text style={styles.cardHeading}>Working Days:</Text>
                                            <Text>{data.lookUpLabel}</Text>
                                        </View>
                                    )
                            })}

                            {working_Shift.map((data, index) => {
                                if (data.lookUpId == my_Job.workingShift)
                                    return (
                                        <View style={styles.card}>
                                            <Text style={styles.cardHeading}>Working Shifts:</Text>
                                            <Text>{data.lookUpLabel}</Text>
                                        </View>
                                    )
                            })}
                        </Card>
                        <View>
                            <Text>Perks & Benefits</Text>
                            {perks_Benefit.map((data, index) => {
                                if (data.lookUpId == my_Job.perksBenefit)
                                    return (
                                        <Text style={styles.benifitText}>{data.lookUpLabel}</Text>
                                    )
                            })}
                        </View>
                        <View style={styles.card1}>
                            <View style={styles.card1_1}>
                                <Text>Job Posted By</Text>
                                <View style={{ paddingRight: 20, paddingBottom: 10 }}>
                                    <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + 1 + '_avatar.png' }} style={styles.image} />
                                </View>
                            </View>

                            <View style={styles.card1_2}>
                                <Text style={styles.cardHeading}>{profile_Data.displayName}</Text>
                                <Text>{profile_Data.designation}</Text>
                            </View>
                        </View>

                        <View style={styles.card1}>
                            <View style={styles.card1_1}>
                                <Text>Company</Text>
                                <View style={{ paddingRight: 20, paddingBottom: 10 }}>
                                    <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/Company.jpg' }} style={styles.image} />
                                </View>
                            </View>

                            <View style={styles.card1_2}>
                                <Text style={styles.cardHeading}>{company_Data.name}</Text>
                                {job_Industry.map((data, index) => {
                                    if (data.lookUpId == company_Data.industry)
                                        return (
                                            <Text>{data.lookUpLabel}</Text>
                                        )
                                })}

                            </View>
                        </View>
                    </View>

                    <Footer>
                        <FooterTab style={styles.footerTab}>
                            <TouchableOpacity style={styles.applyButton} onPress={() => this.props.navigation.navigate(AppRoute.HOME)}>
                                <Text style={styles.applyButtonText}>Apply Now</Text>
                            </TouchableOpacity>
                        </FooterTab>
                    </Footer>

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


