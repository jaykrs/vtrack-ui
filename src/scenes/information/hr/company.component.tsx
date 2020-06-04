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
import { ScrollableTab, Tab, Item, Container, Content, Tabs, Header, TabHeading, Thumbnail, Input, Label, Footer, FooterTab, Picker } from 'native-base';
import { CompanyScreenProps } from '../../../navigation/hrNavigation/hrInformation.navigator';
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
import { LabelConstants } from '../../../constants/LabelConstants';
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


export class CompanyScreen extends React.Component<CompanyScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            jobIndustry_Type: [],
            industry: '',
            name: '',
            strength: '',
            location: '',
            designation: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
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

        axios({
            method: 'GET',
            url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup'
        }).then((response) => {
            // console.log('qualification', response.data.QUALIFICATION)
            this.setState({
                lookUp: response.data,
                jobIndustry_Type: response.data.JOB_CATEGORY
            })
        }, (error) => {
            console.log(error);
        });
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    handleSubmit() {
        const { userId, industry, name, strength, location, designation } = this.state
        if (userId === '' || userId.length === 0) {
            alert(LabelConstants.ALERT_USER_ID);
        } else if (designation === '' || designation.length === 0) {
            alert(LabelConstants.ALERT_DESIGNATION);
        } else if (name === '' || name.length === 0) {
            alert(LabelConstants.ALERT_COMPANY_NAME);
        } else if (industry === '' || industry.length === 0) {
            alert(LabelConstants.ALERT_COMPANY_INDUSTRY);
        } else if (location === '' || location.length === 0) {
            alert(LabelConstants.ALERT_COMPANY_LOCATION);
        } else if (strength === '' || strength.length === 0) {
            alert(LabelConstants.ALERT_COMPANY_STRENGTH);
        } else {
            axios({
                method: 'POST',
                url: AppConstants.API_BASE_URL + '/api/profile/create',
                data: {
                    userId: userId,
                    designation: designation
                }
            }).then((response) => {
            }, (error) => {
                console.log(error);
            });

            axios({
                method: 'POST',
                url: AppConstants.API_BASE_URL + '/api/company/create',
                data: {
                    userId: userId,
                    industry: industry,
                    name: name,
                    location: location,
                    strength: strength
                }
            }).then((response) => {
                const data = {
                    profileCreated: 'true'
                  }
                  AsyncStorage.mergeItem('userDetail', JSON.stringify(data), () => {
                    this.props.navigation.navigate(AppRoute.HRHOME)
                  });  
            }, (error) => {
                console.log(error);
            });
        }
    }

    render() {

        return (
            <SafeAreaLayout
                style={{ flex: 1 }}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Company Information'
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
                    <View>
                        <Text style={styles.heading}>Let's set up your profile</Text>
                    </View>

                    <View>
                        <Label>Your Designation in your company</Label>
                        <TextInput
                            style={styles.inputText}
                            placeholder='Enter your designation'
                            onChangeText={(designation) => { this.setState({ designation: designation }) }}
                        />
                        {/* <Text>{this.state.salaryTo}</Text> */}
                    </View>

                    <View>
                        <Label>Company Name</Label>
                        <TextInput
                            style={styles.inputText}
                            placeholder='Enter your company name'
                            onChangeText={(name) => { this.setState({ name: name }) }}
                        />
                        {/* <Text>{this.state.salaryTo}</Text> */}
                    </View>

                    <View style={styles.inputText}>
                        <Label>Industry</Label>
                        <Picker
                            selectedValue={this.state.industry}
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ industry: itemValue })
                            }>
                            {this.state.jobIndustry_Type.map((item, index) => {
                                return (
                                    <Picker.Item label={item.lookUpLabel} value={item.lookUpId} />
                                )
                            })}
                        </Picker>
                    </View>

                    <View>
                        <Label>Company location</Label>
                        <TextInput
                            style={styles.inputText}
                            placeholder='Enter Company location'
                            onChangeText={(location) => { this.setState({ location: location }) }}
                        />
                        {/* <Text>{this.state.salaryTo}</Text> */}
                    </View>

                    <View>
                        <Label>Company Strength</Label>
                        <TextInput
                            style={styles.inputText}
                            placeholder='Enter Company strength'
                            onChangeText={(strength) => { this.setState({ strength: strength }) }}
                        />
                        {/* <Text>{this.state.salaryTo}</Text> */}
                    </View>
                </Content>
                <Footer>
                    <FooterTab style={styles.footerTab}>
                        <View>
                            <TouchableOpacity style={styles.nextButton} onPress={this.handleSubmit}>
                                <Text style={styles.nextButtonText}>Create Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </FooterTab>
                </Footer>
            </SafeAreaLayout>
        )
    }

}


const styles = StyleSheet.create({
    content: {
        marginTop: 10,
        padding: 10
    },

    footerTab: {
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    heading: {
        fontSize: 20
    },

    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA'
    },

    nextButton: {      
        marginRight: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderColor: '#1DA1F2',
        backgroundColor: '#1DA1F2',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginLeft: 3
    },

    nextButtonText: {
        color: '#fff'
    },
});

