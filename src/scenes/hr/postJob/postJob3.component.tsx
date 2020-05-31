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
import { PostScreen3Props } from '../../../navigation/hrNavigation/postJob.navigator';
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


export class PostScreen3 extends React.Component<PostScreen3Props & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            qButton: '',
            selected: '',
            skillType: [],
            skill: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitQButton = this.submitQButton.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.minQualification = this.minQualification.bind(this);
    }

    handleSubmit() {
        const { skill } = this.state
        const jobData3 = { skill: skill }

        if (skill === '' || skill.length === 0) {
            Alert.alert(LabelConstants.ALERT_JOB_SKILL)
        } else {
            AsyncStorage.mergeItem('jobData', JSON.stringify(jobData3), () => {
                AsyncStorage.getItem('jobData', (err, result) => {
                    console.log('data', result);
                })
                this.props.navigation.navigate(AppRoute.POSTJOB4)
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

        axios({
            method: 'GET',
            url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup'
        }).then((response) => {
            // console.log('qualification', response.data.QUALIFICATION)
            this.setState({
                lookUp: response.data,
                skillType: response.data.SKILL
            })
        }, (error) => {
            console.log(error);
        });
    }

    minQualification(e, selected) {
        this.setState({
            selected: selected
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
                    title='3/5'
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

                    <Text style={styles.heading}>What are the skills you want to see in your employee?</Text>
                    <Text style={styles.subHeading}>Select the top 5 skills. The more specific skills you select, the better candidate suggestions you get.</Text>

                    <View style={styles.inputText}>
                        <Label>Select your skill</Label>
                        <Picker
                            selectedValue={this.state.skill}
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ skill: itemValue })
                            }>
                            {this.state.skillType.map((item, index) => {
                                return (
                                    <Picker.Item label={item.lookUpLabel} value={item.lookUpId} />
                                )
                            })}
                        </Picker>
                        {/* <Text>{this.state.skill}</Text> */}
                    </View>
                    {/*                     
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <View>
                            <TouchableOpacity style={this.state.qButton === 'Phd' ? styles.selectedQButton : styles.qButton} onPress={e => { this.submitQButton(e, 'Phd') }}>
                                <Text style={this.state.qButton === 'Phd' ? styles.selectedQButtonText : styles.qButtonText}>Java</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style={this.state.qButton === 'Masters' ? styles.selectedQButton : styles.qButton} onPress={e => { this.submitQButton(e, 'Masters') }}>
                                <Text style={this.state.qButton === 'Masters' ? styles.selectedQButtonText : styles.qButtonText}>Python</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style={this.state.qButton === 'Graduate' ? styles.selectedQButton : styles.qButton} onPress={e => { this.submitQButton(e, 'Graduate') }}>
                                <Text style={this.state.qButton === 'Graduate' ? styles.selectedQButtonText : styles.qButtonText}>Sql</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style={this.state.qButton === 'Diploma' ? styles.selectedQButton : styles.qButton} onPress={e => { this.submitQButton(e, 'Diploma') }}>
                                <Text style={this.state.qButton === 'Diploma' ? styles.selectedQButtonText : styles.qButtonText}>React</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style={this.state.qButton === 'Php' ? styles.selectedQButton : styles.qButton} onPress={e => { this.submitQButton(e, 'Php') }}>
                                <Text style={this.state.qButton === 'Php' ? styles.selectedQButtonText : styles.qButtonText}>Php</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style={this.state.qButton === 'Dot' ? styles.selectedQButton : styles.qButton} onPress={e => { this.submitQButton(e, 'Dot') }}>
                                <Text style={this.state.qButton === 'Dot' ? styles.selectedQButtonText : styles.qButtonText}>Dot Net</Text>
                            </TouchableOpacity>
                        </View>

                    </View> */}


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
        color: '#AAAAAA'
    },

    selectedQButton: {
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 20,
        borderColor: '#1DA1F2',
        backgroundColor: '#1DA1F2',
        borderWidth: 1,
        marginLeft: 3
    },

    selectedQButtonText: {
        color: '#fff'
    },

    qButton: {
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 20,
        borderColor: '#1DA1F2',
        borderWidth: 1,
        marginLeft: 3
    },

    qButtonText: {
        color: '#1DA1F2'
    },

});


