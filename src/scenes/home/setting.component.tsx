import React from 'react';
import {
    ListRenderItemInfo, View, StyleSheet, TouchableOpacity,
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
import { ScrollableTab, Tab, Container, Content, Tabs, Header, TabHeading, Thumbnail } from 'native-base';
import { SettingScreenProps } from '../../navigation/home.navigator';
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
import RazorpayCheckout from 'react-native-razorpay';
type MyState = {
}




export class SettingScreen extends React.Component<SettingScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <SafeAreaLayout
                style={styles.safeArea}
                insets={SaveAreaInset.TOP}>

                <Toolbar
                    title='About Us'
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <View style = {styles.content}>
                    <Text style = {styles.text}> Work of this page is in progress. </Text>
                
              <TouchableOpacity style={[Styles.buttonContainer, styles.button]} 
                            onPress={() => {
                                var options = {
                                description: 'Credits towards vtrack',
                                image: 'https://i.imgur.com/3g7nmJC.png',
                                currency: 'INR',
                                key: 'rzp_test_10eSP45VJvsTV4',
                                amount: '500',
                                name: 'marksman Technology P Ltd',
                                prefill: {
                                  email: 'jayant.kumar@marksman.com',
                                  contact: '9716529094',
                                  name: 'Jayant Kumar'
                                },
                                theme: {color: '#53a20e'}
                              }
                              RazorpayCheckout.open(options).then((data) => {
                                // handle success
                                alert(`Success: ${data.razorpay_payment_id}`);
                              }).catch((error) => {
                                // handle failure
                                alert(`Error: ${error.code} | ${error.description}`);
                              });
                            }}
                            >
                                <Text style={Styles.buttonCaption}>Pay Now</Text>
                            </TouchableOpacity>
                        </View>
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
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 20
    },
    button: {
        width: '44%',
        height: 52,
        marginTop: 35,
        alignSelf: 'center'
    }
})