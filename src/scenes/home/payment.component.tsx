import React from 'react';
import {
    View, StyleSheet, TouchableOpacity,
    ActivityIndicator, Image, Alert, FlatList, ScrollView, RefreshControl
} from 'react-native';
import {
    Input,
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
import { ScrollableTab, Tab, Container, Content, Tabs, Header, TabHeading, Thumbnail, Footer, FooterTab } from 'native-base';
import { PaymentScreenProps } from '../../navigation/home.navigator';
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
//import VideoPlayer from 'react-native-video-player';
// import { FlatList } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { pathToFileURL, fileURLToPath } from 'url';
import { Styles } from '../../assets/styles';
import moment from "moment";
import RazorpayCheckout from 'react-native-razorpay';
type MyState = {
}




export class PaymentScreen extends React.Component<PaymentScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props);

        this.state = {
            emailId: '',
            id: '',
            phone: '',
            f_name: '',
            l_name: '',
            payment_Data: [],
            validity: ''
        }

        this.handlePayment = this.handlePayment.bind(this);
    }

    async componentDidMount() {
        const value = await AsyncStorage.getItem('userDetail');
        if (value) {
            // console.log('user Details all data', value);
            const user = JSON.parse(value);
            this.setState({
                emailId: user.emailId,
                phone: user.phone,
                f_name: user.firstName,
                l_name: user.lastName
            })

            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/user/getallpayment/' + user.emailId + '/' + user.deviceToken,
            }).then((response) => {
                this.setState({
                    ...this.state,
                    payment_Data: response.data,
                })
                console.log("Profile Data", response.data);
            },
                (error) => {
                    console.log(error);
                    if (error) {
                        alert("Seems You have not recharged yet ! Please Recharge");
                    }
                }
            );

            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/user/get/' + user.id,
            }).then((response) => {
                this.setState({
                    ...this.state,
                    validity: moment(response.data.validationDate).format("D MMMM YYYY"),
                })
                console.log("Profile Data", response.data);
            },
                (error) => {
                    console.log(error);
                    if (error) {
                        alert("Something went wrong contact vtrack");
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

    handlePayment() {
        const { emailId, f_name, l_name, phone, id } = this.state
        axios({
            method: 'POST',
            url: AppConstants.API_BASE_URL + '/api/user/startpayment',
            data: {
                emailId: emailId
            }

        }).then((response) => {
            this.setState({
                id: response.data.id
            })
            const tId = response.data.id
            const options = {
                description: AppConstants.RAZOR_DESCRIPTION,
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: response.data.currency,
                key: AppConstants.RAZOR_KEY,
                amount: response.data.amount,
                name: AppConstants.RAZOR_NAME,
                prefill: {
                    email: emailId,
                    contact: phone,
                    name: f_name + " " + l_name
                },
                theme: { color: '#53a20e' }
            }
            RazorpayCheckout.open(options).then((data) => {
                // handle success
                axios({
                    method: 'POST',
                    url: AppConstants.API_BASE_URL + '/api/user/completepayment',
                    data: {
                        emailId: emailId,
                        transectionId: data.razorpay_payment_id,
                        id: tId
                    }

                }).then((response) => {
                    this._onRefresh()
                    alert(`Success: ${data.razorpay_payment_id}`);
                },
                    (error) => {
                        console.log(error);
                        if (error) {
                            alert("Something went wrong please contact vtrack");
                        }
                    }
                );
            }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
            });
        },
            (error) => {
                console.log(error);
                if (error) {
                    alert("Something went wrong please contact vtrack");
                }
            }
        );
    }

    renderMyJob = ({ item }: any): ListItemElement => (
        <ListItem style={{ borderBottomColor: '#fff', borderBottomWidth: 0 }}>
            {item != null ?                
                    <View style={styles.history}>
                        <Text category='h6' style={styles.validity}>Payment {item.amount} Received on {moment(item.transectionDate).format("D MMMM YYYY")}</Text>
                    </View> :                   
                null}
        </ListItem>
    )


    render() {
        const { payment_Data, validity } = this.state
        return (
            <SafeAreaLayout
                style={styles.safeArea}
                insets={SaveAreaInset.TOP}>

                <Toolbar
                    title='Payment'
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Divider />
                <View style={styles.content}>
                    <Text style={styles.text}>Plan Valid up to</Text>
                    <Text category='h2' style={styles.validity}>{validity}</Text>
                    <Text style={styles.transaction}>Transaction Payment Details</Text>
                </View>

                <Content
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    <List data={payment_Data} renderItem={this.renderMyJob} />
                    <View style={{ height: 10, width: '100%' }}></View>
                </Content>

                <Footer>
                    <TouchableOpacity onPress={this.handlePayment}>
                        <FooterTab style={styles.footer}>
                            <Text category='h5' style={styles.buttonText}>Pay Now</Text>
                        </FooterTab>
                    </TouchableOpacity>
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
        width: '100%',
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 20,
        color: '#666666'
    },

    validity: {
        color: '#666666'
    },

    transaction: {
        marginVertical: 25
    },

    history: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c5defc',
        paddingVertical: 10,
        marginBottom: -10
    },

    footer: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },

    buttonText: {
        color: '#fff'
    }
})