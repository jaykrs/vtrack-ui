import React from 'react';
import {
    ListRenderItemInfo, View, StyleSheet, TouchableOpacity,
    ActivityIndicator, Image, Alert, FlatList, ScrollView, RefreshControl, TextInput, Modal, Button
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
    styled, Divider, Avatar, Icon,
} from 'react-native-ui-kitten';
import { ScrollableTab, Tab, Item, Container, Content, Tabs, Header, TabHeading, Thumbnail, Input, Label, Footer, FooterTab } from 'native-base';
import { EditProfileScreenProps } from '../../navigation/profile.navigator';
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
import { PlusCircle } from '../../assets/icons';

import FilePickerManager from 'react-native-file-picker';
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


export class EditProfileScreen extends React.Component<EditProfileScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userType: '',
            token: '',
            isFresher: false,
            isExperience: false,
            qButton: '',
            fileSource: '',
            file: [],
            isVisible: false,
        }
        this.submitFresher = this.submitFresher.bind(this);
        this.submitExperienced = this.submitExperienced.bind(this);
        this.submitQButton = this.submitQButton.bind(this);
        this.handleUploadCv = this.handleUploadCv.bind(this);
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

    selectAudio(e, timelineType) {
        // alert("We are facing some issues, shortly we'll come up with solution");
        // console.log('Video Timeline Type', timelineType)
        FilePickerManager.showFilePicker(audioOptions, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled audio picker');
            } else if (response.error) {
                console.log('audio Picker Error: ', response.error);
            } else {
                // const file = { name: 'video.mp4', uri: response.uri, type: 'video', size: response.fileSize, path: response.path }
                const file = { name: '' + response.fileName, uri: response.uri, type: response.type, size: response.readableSize, path: response.path }

                this.setState({
                    //   timelineType: timelineType,
                    fileSource: response.uri,
                    file: file,
                    isVisible: true
                });
                console.log('Video Source', response)
            }
        });
    }

    handleUploadCv() {
        const { isVisible, file, userId } = this.state
        const formData = new FormData();
        formData.append('file', file)

        axios({
          method: 'post',
          url: AppConstants.API_BASE_URL + '/api/file/upload/profile/' + userId,
          data: formData
        }).then((response) => {
            this.setState({
                isVisible: !isVisible
            })
          alert("Your CV uploaded successfully");         
        },
          (error) => {
            // console.log(error);
            if (error) {
              alert("You are using wrong format");
            }
          });       
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { isVisible } = this.state
        return (
            <SafeAreaLayout
                style={styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Edit Profile'
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
                    <Modal
                        animationType={"fade"}
                        transparent={false}
                        visible={this.state.isVisible}
                        onRequestClose={() => { console.log("Modal has been closed.") }}>
                        {/*All views of Modal*/}
                        <View style={styles.modal}>
                            <Text>Do you want to upload this file!</Text>
                            <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({ isVisible: !isVisible })}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton} onPress={() => this.handleUploadCv()}>
                                <Text style={styles.modalButtonText}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    {/*Button will change state to true and view will re-render*/}


                    <View style={styles.view1}>
                        <View style={styles.view1_1}>
                            <View>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + this.state.userId + '_avatar.png' }} style={styles.image} />
                            </View>
                            <Text style={styles.name}>Avinash</Text>
                            <Text style={styles.location}>Bengaluru</Text>
                        </View>
                    </View>

                    <View >
                        <View style={styles.textInput}>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <TextInput></TextInput>
                            </Item>
                        </View>

                        <View style={styles.textInput}>
                            <Item floatingLabel>
                                <Label>Headline</Label>
                                <TextInput></TextInput>
                            </Item>
                        </View>

                        <View style={styles.textInput}>
                            <Item floatingLabel>
                                <Label>Current Location</Label>
                                <TextInput></TextInput>
                            </Item>
                        </View>

                        <View style={styles.textInput}>
                            <Item floatingLabel>
                                <Label>About</Label>
                                <TextInput></TextInput>
                            </Item>
                        </View>

                        <View style={styles.textInput}>
                            <Item floatingLabel>
                                <Label>Date of birth</Label>
                                <TextInput></TextInput>
                            </Item>
                        </View>

                        <View style={styles.textInput}>
                            <Item floatingLabel>
                                <Label>Total work Experience</Label>
                                <TextInput></TextInput>
                            </Item>
                        </View>

                        <View style={styles.textInput}>
                            <Item floatingLabel>
                                <Label>Current Salary (Per Month)</Label>
                                <TextInput></TextInput>
                            </Item>
                        </View>

                        <View style={styles.textInput}>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <TextInput></TextInput>
                            </Item>
                        </View>
                    </View>

                    <View style={{ marginTop: 10, backgroundColor: '#DDDDDD' }}>
                        <View style={styles.view3}>
                            <View style={styles.view3_1}>
                                <Text style={styles.view3Heading}>Upload Your CV</Text>
                                <TouchableOpacity onPress={(e) => { this.selectAudio(e, 56) }}>
                                    <PlusCircle />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                {/* <Text></Text> */}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view3}>
                            <View style={styles.view3_1}>
                                <Text style={styles.view3Heading}>Key Skills</Text>
                                <TouchableOpacity>
                                    <PlusCircle />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                {/* <Text></Text> */}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view3}>
                            <View style={styles.view3_1}>
                                <Text style={styles.view3Heading}>Work Experience</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(AppRoute.ADDEXPERIENCE)}>
                                    <PlusCircle />

                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                {/* <Text></Text> */}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view3}>
                            <View style={styles.view3_1}>
                                <Text style={styles.view3Heading}>Education</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(AppRoute.ADDEDUCATION)}>
                                    <PlusCircle />

                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                {/* <Text></Text> */}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view3}>
                            <View style={styles.view3_1}>
                                <Text style={styles.view3Heading}>Achivements</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(AppRoute.ADDACHIVEMENT)}>
                                    <PlusCircle />

                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                <Text></Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view3}>
                            <View style={styles.view3_1}>
                                <Text style={styles.view3Heading}>Certificates</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(AppRoute.ADDCERTIFICATE)}>
                                    <PlusCircle />

                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                <Text></Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.view3}>
                            <View style={styles.view3_1}>
                                <Text style={styles.view3Heading}>Job preferences</Text>
                                <TouchableOpacity>
                                    <PlusCircle />

                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                <Text></Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view3}>
                            <View style={styles.view3_1}>
                                <Text style={styles.view3Heading}>Languages</Text>
                                <TouchableOpacity>
                                    <PlusCircle />

                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                <Text></Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view3}>
                            <View style={styles.view3_1}>
                                <Text style={styles.view3Heading}>Personal Info</Text>
                                <TouchableOpacity>
                                    <PlusCircle />

                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                <Text></Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Content>

            </SafeAreaLayout>
        )
    }

}

const audioOptions = {
    title: 'Select a Photo',
    takePhoto: 'Take Photo',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
    quality: 1,
    // type: 'image'
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#DDDDDD",
        height: 300,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        marginTop: 80,
        marginLeft: 40,
    },

    modalText: {
        color: '#FFFFFF'
    },

    modalButton: {
        marginTop: 10,
        backgroundColor: '#1DA1F2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 50
    },

    modalButtonText: {
        color: '#FFFFFF'
    },

    safeArea: {
        flex: 1
    },

    content: {
        backgroundColor: '#FFFFFF',
    },

    view1: {
        flexDirection: 'row',

    },

    view1_1: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    name: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 30

    },

    location: {
        marginTop: 10,
        color: '#AAAAAA',
        marginLeft: 30

    },

    view1_2: {
        width: '10%',

    },

    editButton: {
        backgroundColor: '#1DA1F2',
        borderRadius: 10,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 1,
        marginLeft: -50,
        marginTop: 10
    },

    editButtonText: {
        color: '#FFFFFF'
    },

    image: {
        width: 120,
        height: 120,
        marginLeft: 30,

    },

    view2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    view2_1: {
        flexDirection: 'column',
        alignItems: 'center'
    },

    view2Data: {
        fontSize: 16
    },

    view2Heading: {
        fontSize: 13,
        color: '#AAAAAA'
    },

    view3: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        marginVertical: 5,
        backgroundColor: '#FFFFFF',
        padding: 10
    },

    view3_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10
    },

    view3Heading: {
        fontSize: 18
    },

    textInput: {
        marginTop: 10,
        marginHorizontal: 10
    }

});


