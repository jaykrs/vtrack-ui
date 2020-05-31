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
import { ScrollableTab, Tab, Item, Container, Content, Tabs, Header, TabHeading, Thumbnail, Input, Label, Footer, FooterTab, Textarea } from 'native-base';
import { AppliedScreenProps } from '../../navigation/applied.navigator';
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
import { MenuIcon, ExperienceIcon, LocationIcon, PublicIcon, PencilIcon } from '../../assets/icons';
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
import { Styles } from '../../assets/styles'
import Animated from 'react-native-reanimated';
import { debuglog } from 'util';

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

export class AppliedScreen extends React.Component<AppliedScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            f_name: '',
            l_name: '',
            initial: 'Mr.',
            city: '',
            country: '',
            phone_country_code: '91',
            phone_number: '',
            address: '',
            pincode: '',
            vendor_id: '123',
            vendor_name: 'Avinash',
            profession: '',
            device_token: '123',
            vendor_location: 'Hoodi',
            emailId: '',
            dob: '2004-11-11'
        }

        this._onRefresh = this._onRefresh.bind(this);
        this.handleJobSubmit = this.handleJobSubmit.bind(this);
    }



    async componentDidMount() {

        // const value = await AsyncStorage.getItem('userDetail');
        // if (value) {
        //     // console.log('user Details all data', value);
        //     const user = JSON.parse(value);
        //     this.setState({
        //         userType: user.userType,
        //         token: user.token,
        //         userId: user.userId,
        //     })
        //     // console.log('user data id', this.state.userId);      
        // }

        // axios({
        //     method: 'get',
        //     url: AppConstants.API_BASE_URL + '/api/job/getalljob',

        // }).then((response) => {
        //     this.setState({
        //         ...this.state,
        //         my_Jobs: response.data
        //     })
        //     console.log("Profile Data", response.data);
        // },
        //     (error) => {
        //         console.log(error);
        //         if (error) {
        //             Alert.alert("UserId or Password is invalid");
        //         }
        //     }
        // );

        // axios({
        //     method: 'get',
        //     url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',
        // }).then((response) => {
        //     this.setState({
        //         ...this.state,
        //         salary_Type: response.data.SALARY_TYPE,
        //         job_Industry: response.data.JOB_CATEGORY,
        //         min_Qualification: response.data.QUALIFICATION,
        //         experience_Required: response.data.EXPERIENCE,
        //         employment_Type: response.data.EMPLOYMENT_TYPE,
        //         skill: response.data.SKILL
        //     })
        //     // console.log("Profile Data", response.data);
        // },
        //     (error) => {
        //         console.log(error);
        //         if (error) {
        //             Alert.alert("UserId or Password is invalid");
        //         }
        //     }
        // );
    }

    handleJobSubmit() {
        const { dob, emailId, remarks, f_name, l_name, initial, city, country, phone_country_code, phone_number, address, pincode, vendor_id, vendor_name, vendor_location, profession, device_token } = this.state
        if (f_name === " " || f_name.length === 0) {
            Alert.alert("Please Enter First Name");
        } else if (l_name === "" || l_name.length === 0) {
            Alert.alert("Please Enter Last Name");
        } else if (phone_number === "" || phone_number.length === 0) {
            Alert.alert("Please Enter Phone Number");
        } else if (profession === "" || profession.length === 0) {
            Alert.alert("Please Enter Profession");
        } else if (emailId === "" || emailId.length === 0) {
            Alert.alert("Please Enter Email Id");
        } else if (address === "" || address.length === 0) {
            Alert.alert("Please Enter Address");
        } else if (city === "" || city.length === 0) {
            Alert.alert("Please Enter City");
        } else if (country === "" || country.length === 0) {
            Alert.alert("Please Enter Country");
        } else if (pincode === "" || pincode.length === 0) {
            Alert.alert("Please Enter Pin Code");
        } else if (remarks === "" || remarks.length === 0) {
            Alert.alert("Please Enter Address");
        } else {
            axios({
                method: 'post',
                url: AppConstants.API_BASE_URL + '/api/visitor/add',
                data: {
                    emailId: emailId,
                    f_name: f_name,
                    l_name: l_name,
                    initial: initial,
                    city: city,
                    country: country,
                    phone_country_code: phone_country_code,
                    phone_number: phone_number,
                    address: address,
                    pincode: pincode,
                    vendor_id: vendor_id,
                    vendor_name: vendor_name,
                    profession: profession,
                    device_token: device_token,
                    vendor_location: vendor_location,
                    dob: dob,
                    remarks: remarks
                }
            }).then((response) => {
                console.log("Visitor Data", response.data);
                this.setState({
                    f_name: '',
                    l_name: '',
                    initial: 'Mr.',
                    city: '',
                    country: '',
                    phone_country_code: '91',
                    phone_number: '',
                    address: '',
                    pincode: '',
                    vendor_id: '123',
                    vendor_name: 'Avinash',
                    profession: '',
                    device_token: '123',
                    vendor_location: 'Hoodi',
                    emailId: '',
                    dob: '2004-11-11'
                })
                Alert.alert('Visitor Created Successfuly');

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
        const { my_Jobs } = this.state
        return (
            <SafeAreaLayout
                style={styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Add Visitor'
                    // backIcon={MenuIcon}
                    // onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5, borderBottomColor: '#eee', borderBottomWidth: 1 }}
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
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>Name</Text> */}
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='Enter First Name'
                                onChangeText={(f_name) => { this.setState({ f_name: f_name }) }}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>Name</Text> */}
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='Enter Last Name'
                                onChangeText={(l_name) => { this.setState({ l_name: l_name }) }}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>Phone</Text> */}
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='Enter Phone Number'
                                onChangeText={(phone_number) => { this.setState({ phone_number: phone_number }) }}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>UserName</Text> */}
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='Enter Profession'
                                onChangeText={(profession) => { this.setState({ profession: profession }) }}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>Email</Text> */}
                            <TextInput
                                style={Styles.inputBoxStyle}
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                placeholder='Enter Email'
                                onChangeText={(emailId) => { this.setState({ emailId: emailId }) }}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>Address</Text> */}
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='Enter Address'
                                onChangeText={(address) => { this.setState({ address: address }) }}
                            />
                        </View>
                    </View>

                    {/* <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            <Text style={Styles.inputBoxLabel}>Locality</Text>
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='Enter Locality'
                                onChangeText={(Locality) => { this.setState({ Locality: Locality }) }}
                            />
                        </View>
                    </View> */}

                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>UserName</Text> */}
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='Enter City'
                                onChangeText={(city) => { this.setState({ city: city }) }}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>UserName</Text> */}
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='Enter Country'
                                onChangeText={(country) => { this.setState({ country: country }) }}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>UserName</Text> */}
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='Enter Pin Code'
                                onChangeText={(pincode) => { this.setState({ pincode: pincode }) }}
                            />
                        </View>
                    </View>

                    {/* <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            <Text style={Styles.inputBoxLabel}>UserName</Text>
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='Enter Vendor Name'
                                onChangeText={(vendor_name) => { this.setState({ vendor_name: vendor_name }) }}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            <Text style={Styles.inputBoxLabel}>UserName</Text>
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='Enter Vendor Id'
                                onChangeText={(vendor_id) => { this.setState({ vendor_id: vendor_id }) }}
                            />
                        </View>
                    </View> */}

                    <View style={styles.textAreaBox}>
                        <Textarea
                            style={styles.textArea}
                            placeholder='Remarks'
                            onChangeText={(remarks) => { this.setState({ remarks: remarks }) }}
                        ></Textarea>
                    </View>

                    <View>
                        <TouchableOpacity style={[Styles.buttonContainer, styles.button]} onPress={this.handleJobSubmit}>
                            <Text style={Styles.buttonCaption}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 50, width: '100%' }}></View>
                </Content>

            </SafeAreaLayout>
        )
    }

}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    margin: {
        marginTop: 10
    },

    emailBox: {
        // width: '74%',
        height: 43,
        marginTop: 25,
        alignSelf: 'center'
    },

    content: {
        backgroundColor: '#fff',
        padding: 10
    },

    textArea: {
        width: '100%',
        height: 100,
        backgroundColor: '#eee',

    },

    textAreaBox: {
        marginTop: 25
    },

    button: {
        width: '44%',
        height: 52,
        marginTop: 35,
        alignSelf: 'center'
    },
});


