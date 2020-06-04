import React from 'react';
import {
    ListRenderItemInfo, View, StyleSheet, TouchableOpacity,
    ActivityIndicator, Image, Alert, FlatList, ScrollView, RefreshControl, TextInput, Switch, Picker
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
import { PostScreenProps } from '../../../navigation/hrNavigation/postJob.navigator';
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


export class PostScreen extends React.Component<PostScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            switchValue: false,
            employmentType: '',
            jobIndustry: '',
            jobTitle: '',
            companyName: '',
            jobIndustryType: [],
            lookUp: [],
            employment_Type: [],
            jobData: [],
        }

        this._onRefresh = this._onRefresh.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                url: AppConstants.API_BASE_URL + '/api/company/getcompany/' + user.userId
            }).then((response) => {
                // console.log('qualification', response.data.QUALIFICATION)
                this.setState({
                    companyName: response.data.name
                })
            }, (error) => {
                console.log(error);
            });
        }

        axios({
            method: 'GET',
            url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup'
        }).then((response) => {
            // console.log('qualification', response.data.QUALIFICATION)
            this.setState({
                lookUp: response.data,
                jobIndustryType: response.data.JOB_CATEGORY,
                employment_Type: response.data.EMPLOYMENT_TYPE
            })
        }, (error) => {
            console.log(error);
        });
    }

    handleSubmit() {
        const { switchValue, userId, jobIndustry, jobTitle, employmentType, companyName, jobData } = this.state
        // console.log(jobIndustry, jobTitle, employmentType, companyName, jobData)

        const jobData1 = {
            userId: userId,
            jobIndustry: jobIndustry,
            jobTitle: jobTitle,
            employmentType: employmentType,
            companyName: companyName
        }
        if (userId === '' || userId.length === 0) {
            alert('Please Enter Your User Id')
        } else if (jobIndustry === '' || jobIndustry.length === 0) {
            alert('Please Enter Your Profile Type')
        } else if (jobTitle === '' || jobTitle.length === 0) {
            alert('Please Enter Your Job Title')
        } else if (employmentType === '' || employmentType.length === 0) {
            alert('Please Selest Your Employment Type')
        } else if (companyName === '' || companyName.length === 0) {
            alert('Please Enter Your Company Name')
    } else {
    AsyncStorage.setItem('jobData', JSON.stringify(jobData1), () => {
        AsyncStorage.getItem('jobData', (err, result) => {
            console.log('data', result);
        })
        this.props.navigation.navigate(AppRoute.POSTJOB2)
    })
}
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
                title='1/5'
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

                <Text style={styles.heading}>Tell us whome do you to hire?</Text>
                <Text style={styles.subHeading}>Add these details to frame your job post!</Text>
                <View style={styles.selectView}>

                    <Label>Job Industry</Label>
                    <Picker
                        selectedValue={this.state.jobIndustry}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ jobIndustry: itemValue })
                        }>
                        {this.state.jobIndustryType.map((item, index) => {
                            return (
                                <Picker.Item label={item.lookUpLabel} value={item.lookUpId} />
                            )
                        })}
                    </Picker>

                </View>

                <View style={styles.inputView}>
                    <Label>Job Title</Label>


                    <TextInput
                        style={styles.inputText}
                        placeholder='Enter job title'
                        onChangeText={(jobTitle) => { this.setState({ jobTitle: jobTitle }) }}
                    />

                </View>
                <View style={styles.selectView}>
                    <Label>Employment type</Label>
                    <Picker
                        selectedValue={this.state.employmentType}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ employmentType: itemValue })
                        }>
                        {this.state.employment_Type.map((item, index) => {
                            return (
                                <Picker.Item label={item.lookUpLabel} value={item.lookUpId} />
                            )
                        })}
                    </Picker>
                    {/* <Text>{this.state.employmentType}</Text> */}
                </View>
                <View style={styles.switchView}>
                    <Text>Are you posting this job for your company?</Text>

                    <Switch
                        // disabled = {true} 
                        onValueChange={this.toggleSwitch}
                        value={this.state.switchValue}
                        thumbColor='#1DA1F2'
                        onTintColor='#1DA1F2'
                    />
                    {this.state.switchValue == false ?
                        <Text>No</Text> :
                        <Text>Yes</Text>
                    }

                </View>

                {this.state.switchValue == false ?
                    <View style={styles.inputView}>
                        <Label>Enter the hiring company's name</Label>
                        <TextInput
                            style={styles.inputText}
                            placeholder='Enter company name'
                            onChangeText={(companyName) => { this.setState({ companyName: companyName }) }}
                        />
                    </View> : null
                }

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

    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA'
    },

    inputView: {
        // marginTop: 10
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

    switchView: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 5
    }
});


