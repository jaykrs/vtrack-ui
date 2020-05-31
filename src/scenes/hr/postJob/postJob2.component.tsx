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
import { PostScreen2Props } from '../../../navigation/hrNavigation/postJob.navigator';
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
import {LabelConstants} from '../../../constants/LabelConstants'
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


export class PostScreen2 extends React.Component<PostScreen2Props & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            qButton: '',
            switchValue: false,
            language: 'Select Job Industry',
            employmentType: 'Select Employment Type',
            min_Qualification: [],
            experience_Required: [],
            salary_Type: [],
            selected: '',
            openings: '',
            location: '',
            experienceRequired: '',
            salaryFrom: '',
            salaryTo: '',
            salaryType: '',
            minQualification: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitQButton = this.submitQButton.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.minQualification = this.minQualification.bind(this);
    }

   
    handleSubmit() {
        const { openings, location, minQualification, experienceRequired, salaryFrom, salaryTo, salaryType } = this.state
        const jobData2 = {
            openings: openings,
            location: location,
            minQualification: minQualification,
            experienceRequired: experienceRequired,
            salaryFrom: salaryFrom,
            salaryTo: salaryTo,
            salaryType: salaryType
        }

        if (openings === '' || openings.length === 0) {
            Alert.alert(LabelConstants.ALERT_JOB_OPENINGS)
        } else if (location === '' || location.length === 0) {
            Alert.alert(LabelConstants.ALERT_JOB_LOCATION)
        } else if (minQualification === '' || minQualification.length === 0) {
            Alert.alert(LabelConstants.ALERT_JOB_MINQUALFICATION)
        } else if (experienceRequired === '' || experienceRequired.length === 0) {
            Alert.alert(LabelConstants.ALERT_JOB_EXPERIENCE_REQUIRED)
        } else if (salaryFrom === '' || salaryFrom.length === 0) {
            Alert.alert(LabelConstants.ALERT_JOB_SALARY_FROM)
        } else if (salaryTo === '' || salaryTo.length === 0) {
            Alert.alert(LabelConstants.ALERT_JOB_SALARY_TO)
        } else if (salaryType === '' || salaryType.length === 0) {
            Alert.alert(LabelConstants.ALERT_JOB_SALARY_TYPE)
        } else {
        AsyncStorage.mergeItem('jobData', JSON.stringify(jobData2), () => {
            AsyncStorage.getItem('jobData', (err, result) => {
                console.log('data',result);
            })
            this.props.navigation.navigate(AppRoute.POSTJOB3)
        }) 
    }      
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

        AsyncStorage.getItem('jobData', (err, result) => {
            console.log('data',result);
        })

        axios({
            method: 'get',
            url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',

        }).then((response) => {
            this.setState({
                ...this.state,
                min_Qualification: response.data.QUALIFICATION,
                experience_Required: response.data.EXPERIENCE,
                salary_Type: response.data.SALARY_TYPE
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

    minQualification(e, selected) {
        this.setState({
            selected: selected,
            minQualification: selected
        })
    }

    toggleSwitch = (value) => {
        //onValueChange of the switch this function will be called
        this.setState({
            switchValue: value
        })
        //state changes according to switch
        //which will result in re-render the text
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
                    title='2/5'
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

                    <Text style={styles.heading}>Tell us whome do you to hire?</Text>
                    <Text style={styles.subHeading}>Add these details to frame your job post!</Text>
                    <View style={styles.selectView}>

                        <Label>Number of openings</Label>
                        <TextInput
                            style={styles.inputText}
                            keyboardType = 'numeric'
                            placeholder='Enter job openings'
                            onChangeText={(openings) => { this.setState({ openings: openings }) }}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Label>Job Location</Label>

                        <TextInput
                            style={styles.inputText}
                            placeholder='Enter job location'
                            onChangeText={(location) => { this.setState({ location: location }) }}
                        />
                    </View>
                    <Label>Minimum educational qualification required</Label>
                    <View style={{ marginTop: -10 }}>
                        <FlatList
                            style={{}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={this.state.min_Qualification}
                            renderItem={({ item, index }) => {
                                return (
                                    <View>
                                        <TouchableOpacity style={this.state.selected == item.lookUpId ? styles.slectedEduButton : styles.eduButton} onPress={e => { this.minQualification(e, item.lookUpId) }}>
                                            <Text style={this.state.selected == item.lookUpId ? styles.selectedEduText : styles.eduText}>{item.lookUpName}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        >
                        </FlatList>
                    </View>
                    <View style={styles.selectView}>
                        <Label>Work experience required</Label>
                        <Picker
                            selectedValue={this.state.experienceRequired}
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ experienceRequired: itemValue })
                            }>
                            {this.state.experience_Required.map((item, index) => {
                                return (
                                    <Picker.Item label={item.lookUpLabel} value={item.lookUpId} />
                                )
                            })}
                        </Picker>
                    </View>
                    <View style={styles.inputView}>
                        <Label>Salary offered</Label>
                        <View style={styles.inputViewSalary}>
                            <TextInput
                                style={styles.salaryItem}
                                keyboardType = 'numeric'
                                placeholder='From'
                                onChangeText={(salaryFrom) => { this.setState({ salaryFrom: salaryFrom }) }}
                            />

                            <TextInput
                                style={styles.salaryItem}
                                keyboardType = 'numeric'
                                placeholder='To'
                                onChangeText={(salaryTo) => { this.setState({ salaryTo: salaryTo }) }}
                            />
                        </View>
                    </View>
                    <View style={styles.selectView}>
                        <Label>Salary Type</Label>
                        <Picker
                            selectedValue={this.state.salaryType}
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ salaryType: itemValue })
                            }>
                            {this.state.salary_Type.map((item, index) => {
                                return (
                                    <Picker.Item label={item.lookUpLabel} value={item.lookUpId} />
                                )
                            })}
                        </Picker>
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

    inputView: {},

    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA'
    },

    inputViewSalary: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    salaryItem: {
        width: '45%',
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA'
    },

    selectView: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: .8
    },

    footer: {
        backgroundColor: '#1DA1F2',
        justifyContent: 'center'
    },

    button: {
        paddingHorizontal: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },

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
        // color: '#1DA1F2'
    },

    eduButton: {
        marginTop: 20,
        paddingVertical: 2,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#1DA1F2',
        borderRadius: 20,
        marginRight: 5,
        marginBottom: 10
    },

    eduText: {
        color: '#1DA1F2'
    },

    slectedEduButton: {
        marginTop: 20,
        borderColor: '#1DA1F2',
        paddingVertical: 2,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#1DA1F2',
        borderRadius: 20,
        marginBottom: 10,
        marginRight: 5
    },

    selectedEduText: {
        color: '#FFFFFF',
    },

    switchView: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 5
    }
});


