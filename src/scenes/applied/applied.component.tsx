import React from 'react';
import {
    ListRenderItemInfo, View, StyleSheet, TouchableOpacity,
    ActivityIndicator, Image, Alert, FlatList, ScrollView, RefreshControl, TextInput, Picker
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
import { LabelConstants } from '../../constants/LabelConstants';
import { country_data } from '../../assets/country';

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
            userId: '',
            l_name: '',
            initial: 'Mr.',
            city: '',
            country: '',
            phone_country_code: '',
            phone_number: '',
            address: '',
            pincode: '',
            vendor_id: '',
            vendor_name: '',
            profession: '',
            device_token: '',
            vendor_location: '',
            emailId: '',
            dob: '2004-11-11',
            countryCode: 'IN',
            country_data: country_data
        }

        this._onRefresh = this._onRefresh.bind(this);
        this.handleJobSubmit = this.handleJobSubmit.bind(this);
    }



    async componentDidMount() {

        this.handleCountry(1,this.state.countryCode);
        const value = await AsyncStorage.getItem('userDetail');
        if (value) {
            // console.log('user Details all data', value);
            const user = JSON.parse(value);
            this.setState({
                userId: user.id,
                device_token: user.deviceToken,
                emailId: user.emailId
            })
            console.log("User Id", user)
            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/user/get/' + user.id,

            }).then((response) => {
                this.setState({
                    ...this.state,
                    vendor_id: response.data.vendorId,
                    vendor_name: response.data.vendorName,
                    vendor_location: response.data.address,
                })
                console.log("Profile Data", response.data);
            },
                (error) => {
                    console.log(error);
                    if (error) {
                        alert("UserId or Password is invalid");
                    }
                }
            );
            // console.log('user data id', this.state.userId);      
        }

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
        //             alert("UserId or Password is invalid");
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
        //             alert("UserId or Password is invalid");
        //         }
        //     }
        // );
    }

    handleJobSubmit() {
        const { dob, emailId, remarks, f_name, l_name, initial, city, country, phone_country_code, phone_number, address, pincode, vendor_id, vendor_name, vendor_location, profession, device_token } = this.state
        console.log('User All Data', 'dob', dob, emailId, remarks, f_name, l_name, initial, city, country, phone_country_code, phone_number, address, pincode, 'vendor_id', vendor_id, 'vendor_name', vendor_name, 'vendor_location', vendor_location, profession, 'device_token', device_token);
        if (f_name === " " || f_name.length === 0) {
            alert("Please First Name");
        } else if (l_name === "" || l_name.length === 0) {
            alert("Please Last Name");
        } else if (country === "" || country.length === 0) {
            alert("Please Select Country");
        } else if (phone_country_code === "" || phone_country_code.length === 0) {
            alert("Please Phone Country Code");
        } else if (phone_number === "" || phone_number.length === 0) {
            alert("Please Phone Number");
        } else if (vendor_id === "" || vendor_id.length === 0) {
            alert("Something Went Wrong");
        } else if (vendor_location == null || vendor_location === "" || vendor_location.length === 0) {
            alert("Seems you have not added your address");
        } else if (vendor_name === "" || vendor_name.length === 0) {
            alert("Something Went Wrong");
        } else if (device_token === "" || device_token.length === 0) {
            alert("Something Went Wrong");
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
                    remarks: remarks
                }
            }).then((response) => {
                console.log("Visitor Data", response.data);

                alert('Visitor Created Successfuly');
                this.props.navigation.navigate(AppRoute.MYJOBS);
            },
                (error) => {
                    console.log(error);
                    if (error) {
                        alert(LabelConstants.com_alert_visitor_create_error);
                    }
                }
            );
        }
    }

    handleCountry(e, code) {
        // Alert.alert("", code)
        this.setState({
            countryCode: code
        })

        this.state.country_data.map((item, index) => {
            if (code === item.code) {
                // Alert.alert("adadad", item.dial_code)
                this.setState({
                    country: item.name,
                    phone_country_code: item.dial_code
                })
            }
        })
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
                    {/* <TouchableOpacity >
                        <Text>Device Id</Text>
                    </TouchableOpacity>
                    <Text>{this.state.device_token}</Text> */}

                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>Name</Text> */}
                            <TextInput
                                style={Styles.inputBoxStyle}
                                // keyboardType = 'email-address'
                                // textContentType='emailAddress'
                                placeholder='First Name'
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
                                placeholder='Last Name'
                                onChangeText={(l_name) => { this.setState({ l_name: l_name }) }}
                            />
                        </View>
                    </View>

                    <View style = {styles.picker}>
                        {/* <Label>Country</Label> */}
                        <Picker
                            selectedValue={this.state.countryCode}
                            style={{ height: 50, width: '100%', color: '#000', opacity: 0.5 }}
                            onValueChange={(itemValue, itemIndex) => { this.handleCountry(itemIndex, itemValue) }
                            }>
                            {this.state.country_data.map((item, index) => {
                                return (
                                    <Picker.Item label={item.name} value={item.code} />
                                )
                            })}
                        </Picker>
                        {/* <Text>{this.state.countryCode} {this.state.country} {this.state.phone_country_code}</Text> */}
                    </View>


                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>Phone</Text> */}
                            <TextInput
                                value={this.state.phone_country_code}
                                style={Styles.inputBoxStyle}
                                editable={false}
                                // textContentType='emailAddress'
                                placeholder='Phone Country Code'
                                onChangeText={(phone_country_code) => { this.setState({ phone_country_code: phone_country_code }) }}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[Styles.inputBoxContainer, styles.emailBox]}>
                            {/* <Text style={Styles.inputBoxLabel}>Phone</Text> */}
                            <TextInput
                                style={Styles.inputBoxStyle}
                                keyboardType='numeric'
                                // textContentType='emailAddress'
                                placeholder='Phone Number'
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
                                placeholder='Profession'
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
                                placeholder='Email'
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
                                placeholder='Address'
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
                                placeholder='Locality'
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
                                placeholder='City'
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
                                placeholder='Pin Code'
                                onChangeText={(pincode) => { this.setState({ pincode: pincode }) }}
                            />
                        </View>
                    </View>                   

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
        height: 150,
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

    picker: {
        backgroundColor: "transparent",
        paddingLeft: 7,
        borderColor: "#D9D5DC",
        borderBottomWidth: 1,
        color: '#779900',
        width: '100%',
        height: 43,
        marginTop: 25,
        alignSelf: 'center'
    }
});


