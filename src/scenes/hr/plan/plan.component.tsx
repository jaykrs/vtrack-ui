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
import { PlanScreenProps } from '../../../navigation/hrNavigation/plans.navigator';
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
import { MenuIcon, CheckCircleIcon } from '../../../assets/icons';
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


export class PlanScreen extends React.Component<PlanScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            isFresher: false,
            isExperience: false,
            qButton: ''
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
                    // title='Home Page'
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
                    <View>
                        <View style = {styles.heading}>
                            <Text style = {styles.headingText}>Explore More Plans</Text>
                        </View>

                        <View style = {styles.card1}>
                            <View style = {styles.card1View1}>
                                <View style = {styles.card1View1_1}>
                                    <View>
                                        <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + this.state.userId + '_avatar.png' }} style={styles.image} />
                                    </View>
                                </View>

                                <View style = {styles.card1View1_2}>
                                    <Text style = {styles.card1View2Data}>Professinal Plan</Text>
                                    <Text style = {styles.card1View2Heading}>Credits: 900</Text>
                                </View>
                            </View>

                            <View style = {styles.card1View2}>
                                <View style = {styles.card1View2_1}>
                                    <Text style = {styles.card1View2Data}>1</Text>
                                    <Text style = {styles.card1View2Heading}>Live Jobs at a time</Text>
                                </View>

                                <View style = {styles.card1View2_1}>
                                    <Text style = {styles.card1View2Data}>1</Text>
                                    <Text style = {styles.card1View2Heading}>Maximum Hires</Text>
                                </View>

                                <View style = {styles.card1View2_1}>
                                    <Text style = {styles.card1View2Data}>90</Text>
                                    <Text style = {styles.card1View2Heading}>Candidate</Text>
                                    <Text style = {styles.card1View2Heading}>unlocking(max)</Text>
                                </View>
                            </View>

                            <View  style = {styles.card1View3}>
                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Credit Validity: 14Days</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> 30/Inbound Application</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> 10/Database Unlock</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Suitable for 1 Hire</Text>
                                </View>
                                
                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> 1 Active Job at a time</Text>
                                </View>

                                <View style = {styles.detailView}>
                                    <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Get in touch with up to 90 candidates</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Note: Intraction with new applications will stop automatically once the ballance is 0.</Text>
                                </View>
                            </View>

                            <View style = {styles.card1View4}>
                                <View>
                                    <Text style = {styles.card1View4Text}>2,499</Text>
                                    <Text style = {styles.card1View4Text}>Rs 899(Inclusive of all taxes)</Text>
                                </View>

                                <View>
                                    <TouchableOpacity style = {styles.button}>
                                        <Text style = {styles.buttonText}>Buy Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style = {styles.card1}>
                            <View style = {styles.card1View1}>
                                <View style = {styles.card1View1_1}>
                                    <View>
                                        <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + this.state.userId + '_avatar.png' }} style={styles.image} />
                                    </View>
                                </View>

                                <View style = {styles.card1View1_2}>
                                    <Text style = {styles.card1View2Data}>Professinal Plan</Text>
                                    <Text style = {styles.card1View2Heading}>Credits: 900</Text>
                                </View>
                            </View>

                            <View style = {styles.card1View2}>
                                <View style = {styles.card1View2_1}>
                                    <Text style = {styles.card1View2Data}>1</Text>
                                    <Text style = {styles.card1View2Heading}>Live Jobs at a time</Text>
                                </View>

                                <View style = {styles.card1View2_1}>
                                    <Text style = {styles.card1View2Data}>1</Text>
                                    <Text style = {styles.card1View2Heading}>Maximum Hires</Text>
                                </View>

                                <View style = {styles.card1View2_1}>
                                    <Text style = {styles.card1View2Data}>90</Text>
                                    <Text style = {styles.card1View2Heading}>Candidate</Text>
                                    <Text style = {styles.card1View2Heading}>unlocking(max)</Text>
                                </View>
                            </View>

                            <View  style = {styles.card1View3}>
                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Credit Validity: 14Days</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> 30/Inbound Application</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> 10/Database Unlock</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Suitable for 1 Hire</Text>
                                </View>
                                
                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> 1 Active Job at a time</Text>
                                </View>

                                <View style = {styles.detailView}>
                                    <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Get in touch with up to 90 candidates</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Note: Intraction with new applications will stop automatically once the ballance is 0.</Text>
                                </View>
                            </View>

                            <View style = {styles.card1View4}>
                                <View>
                                    <Text style = {styles.card1View4Text}>2,499</Text>
                                    <Text style = {styles.card1View4Text}>Rs 899(Inclusive of all taxes)</Text>
                                </View>

                                <View>
                                    <TouchableOpacity style = {styles.button}>
                                        <Text style = {styles.buttonText}>Buy Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style = {styles.card1}>
                            <View style = {styles.card1View1}>
                                <View style = {styles.card1View1_1}>
                                    <View>
                                        <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + this.state.userId + '_avatar.png' }} style={styles.image} />
                                    </View>
                                </View>

                                <View style = {styles.card1View1_2}>
                                    <Text style = {styles.card1View2Data}>Professinal Plan</Text>
                                    <Text style = {styles.card1View2Heading}>Credits: 900</Text>
                                </View>
                            </View>

                            <View style = {styles.card1View2}>
                                <View style = {styles.card1View2_1}>
                                    <Text style = {styles.card1View2Data}>1</Text>
                                    <Text style = {styles.card1View2Heading}>Live Jobs at a time</Text>
                                </View>

                                <View style = {styles.card1View2_1}>
                                    <Text style = {styles.card1View2Data}>1</Text>
                                    <Text style = {styles.card1View2Heading}>Maximum Hires</Text>
                                </View>

                                <View style = {styles.card1View2_1}>
                                    <Text style = {styles.card1View2Data}>90</Text>
                                    <Text style = {styles.card1View2Heading}>Candidate</Text>
                                    <Text style = {styles.card1View2Heading}>unlocking(max)</Text>
                                </View>
                            </View>

                            <View  style = {styles.card1View3}>
                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Credit Validity: 14Days</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> 30/Inbound Application</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> 10/Database Unlock</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Suitable for 1 Hire</Text>
                                </View>
                                
                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> 1 Active Job at a time</Text>
                                </View>

                                <View style = {styles.detailView}>
                                    <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Get in touch with up to 90 candidates</Text>
                                </View>

                                <View style = {styles.detailView}>
                                <Text style = {styles.detailIcon}><CheckCircleIcon/></Text>
                                <Text style = {styles.detailText}> Note: Intraction with new applications will stop automatically once the ballance is 0.</Text>
                                </View>
                            </View>

                            <View style = {styles.card1View4}>
                                <View>
                                    <Text style = {styles.card1View4Text}>2,499</Text>
                                    <Text style = {styles.card1View4Text}>Rs 899(Inclusive of all taxes)</Text>
                                </View>

                                <View>
                                    <TouchableOpacity style = {styles.button}>
                                        <Text style = {styles.buttonText}>Buy Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
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
        backgroundColor: '#eeeeee',
    },

    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: '#BBBBBB',
        borderWidth: 1,
    },

    heading: {
        paddingVertical: 10,
        backgroundColor: '#C5DDFA',
        paddingLeft: 10
    },

    headingText: {
        fontSize: 20,
    },

    card1: {
        borderColor: '#EEEEEE',
        borderWidth: .4,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF'
    },

    card1View1: {
        flexDirection: 'row'
    },

    card1View1_1: {
        width: '18%'
    },

    card1View1_2: {
        width: '82%',
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: .8
    },

    card1View2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    card1View2_1: {
        padding: 5
    },

    card1View2Data: {
        fontSize: 20
    },

    card1View2Heading: {
        fontSize: 12,
        color: '#AAAAAA'
    },

    card1View3: {
        padding: 5
    },

    detailView: {
        flexDirection: 'row',
        alignItems: 'center'

    },

    detailIcon: {
        margin: 1.5,
        marginLeft: 5,
    },

    detailText: {
        margin: 1.5,
    },

    card1View4: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1DA1F2',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10

    },

    card1View4Text: {
        color: '#FFFFFF'
    },

    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 5
    },

    buttonText: {},
});


