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
import { EditHrProfileScreenProps } from '../../../navigation/hrNavigation/hrProfile.navigator';
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
import { MenuIcon, Edit, BagIcon, WalletIcon, CompanyIcon, HelpIcon, FeedbackIcon, LogOutIcon } from '../../../assets/icons';
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


export class EditHrProfileScreen extends React.Component<EditHrProfileScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            isFresher: false,
            isExperience: false,
            qButton: '',
            name:'',
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
                <Toolbar
                    title='Edit Profile'
                    // backIcon={MenuIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5, borderBottomWidth: .8, borderBottomColor: '#DDDDDD' }}
                />


                <Content style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    <View style={styles.mainView}> 
                        <View style={styles.textView}>
                            <Text style={styles.textHead}>name</Text>
                            <Text style={styles.textData}>Akash{this.state.name}</Text>
                        </View>

                        <View style={styles.textView}>
                            <Text style={styles.textHead}>Fathers name</Text>
                            <Text style={styles.textData}>Sanjay pathak</Text>
                        </View>

                        <View style={styles.textView}>
                            <Text style={styles.textHead}>Village</Text>
                            <Text style={styles.textData}> Sirkohiya</Text>
                        </View>

                        <View style={styles.textView}>
                            <Text style={styles.textHead}>Post office</Text>
                            <Text style={styles.textData}>Jaitpur</Text>
                        </View>


                        <View style={styles.textView}>
                            <Text style={styles.textHead}>Police station</Text>
                            <Text style={styles.textData}>Saraiya</Text>
                        </View>

                        <View style={styles.textView}>
                            <Text style={styles.textHead}>Pin code</Text>
                            <Text style={styles.textData}>843123</Text>
                        </View>


                    </View>

                    <View>
                        <TextInput
                        placeholder='Enter your name here'
                        onChangeText={(name)=>{this.setState({name:name})}}
                        />
                    </View>

<View>
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Akash</Text>
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

    textView: {
        flexDirection: 'row'
    },

    textHead:{
        fontSize: 20,
        color:'blue'
    },
    textData:{
        marginLeft:25,
        fontSize:15,
        color:'red'
    
    },
    mainView:{
        borderColor: 'green',
        borderWidth:2,
        margin:12,
        padding:10,
        borderRadius:12,
    },
    button: {
        borderColor:'green',
        borderWidth:2,
        borderRadius:25,
        padding:6,
        width:100,
        justifyContent: 'center',
        alignItems:'center',
    backgroundColor:'green'
    },
    buttonText:{
        color:'#ffffff'
    }


});


