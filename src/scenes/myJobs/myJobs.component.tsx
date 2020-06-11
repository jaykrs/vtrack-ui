import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput, Modal} from 'react-native';
import {
    List,
    ListItem,
    ListItemElement,
    Text,
    ThemedComponentProps,
} from 'react-native-ui-kitten';
import { Content, Label, } from 'native-base';
import { MyJobsScreenProps } from '../../navigation/myJobs.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { SearchIcon, CancelIcon,FilterIcon } from '../../assets/icons';
import { AppConstants } from '../../constants/AppConstants';
import {
    SafeAreaLayout,
    SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../assets/icons';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { Styles } from '../../assets/styles'
import DeviceInfo from 'react-native-device-info';
import DatePicker from 'react-native-datepicker';

type MyState = {
  
}

export class MyJobsScreen extends React.Component<MyJobsScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            isVisible: false,
            userType: '',
            token: '',
            isFresher: false,
            isExperience: false,
            qButton: '',
            visitor_list: [],
            salary_Type: [],
            job_Industry: [],
            min_Qualification: [],
            experience_Required: [],
            employment_Type: [],
            skill: [],
            deviceId: '',
            visitEndDate: '',
            visitStartDate: '',
            createdAt: '',
            vendorId: '',
            search: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.getdeviceId = this.getdeviceId.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

       getdeviceId = () => {
        //Getting the Unique Id from here
        var id = DeviceInfo.getUniqueId();
        this.setState({
            deviceId: id,
        });
    };

    async componentDidMount() {
        const value = await AsyncStorage.getItem('userDetail');
        if (value) {
            const user = JSON.parse(value);
            this.setState({
                id: user.id,
            })

            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/user/get/' + user.id,
            }).then((response) => {
                this.setState({
                    ...this.state,
                    vendorId: response.data.vendorId,
                    createdAt: response.data.createdAt.length < 35
                        ? `${response.data.createdAt.substring(0, 10)}`
                        : `${response.data.createdAt}`
                })
                // console.log("Profile Data", response.data);
            },
                (error) => {
                    // console.log(error);
                    if (error) {
                        alert("Seems you have not created any visitor ! please add.");
                    }
                }
            );

            axios({
                method: 'get',
                url: AppConstants.API_BASE_URL + '/api/visitor/search/' + user.id + '/' + user.vendorId,

            }).then((response) => {
                this.setState({
                    ...this.state,
                    visitor_list: response.data,
                })
                // console.log("Profile Data", response.data);
            },
                (error) => {
                    // console.log(error);
                    if (error) {
                        alert("Seems you have not created any visitor ! please add.");
                    }
                }
            );
        }      
    }

    handleJobSubmit(e, jobId) {
        const jobData = {
            jobId: jobId,
        }
        AsyncStorage.setItem('visitorId', JSON.stringify(jobData), () => {
            AsyncStorage.getItem('visitorId', (err, result) => {
                // console.log('Visitor Id is', result);
            })
            this.props.navigation.navigate(AppRoute.JOBDETAIL);
        })
    }

    handleFilter() {
        const { isVisible, vendorId, visitStartDate, visitEndDate } = this.state
        const visit1 = visitStartDate.substring(8, 10) + '-' + visitStartDate.substring(5, 7) + '-' + visitStartDate.substring(0, 4)
        const visit2 = visitEndDate.substring(8, 10) + '-' + visitEndDate.substring(5, 7) + '-' + visitEndDate.substring(0, 4)
        // console.log("vendorId", vendorId, visit1, visit2)
        axios({
            method: 'get',
            url: AppConstants.API_BASE_URL + '/api/visitor/searchDate/' + vendorId + '/' + visit1 + '/' + visit2,

        }).then((response) => {
            this.setState({
                ...this.state,
                isVisible: !isVisible,
                visitor_list: response.data
            })
            // console.log("Profile Data", response.data);
        },
            (error) => {
                // console.log(error);
                if (error) {
                    alert("Seems you have not created any visitor in this period ! please select another Date.");
                }
            }
        );


    }

    handleSearch() {
        const { search, vendorId, id, } = this.state
        axios({
            method: 'get',
            url: AppConstants.API_BASE_URL + '/api/visitor/searchByName/' + search + '/' + id + '/' + vendorId
        }).then((response) => {
            this.setState({
                ...this.state,
                visitor_list: response.data,
            })
            // console.log("Profile Data", response.data);
        },
            (error) => {
                // console.log(error);
                if (error) {
                    alert("Seems you have not created any visitor by this name !");
                }
            }
        );

    }

    handleCancel() {
        this.setState({
            search: ''
        })
        this._onRefresh()
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    renderMyJob = ({ item }: any): ListItemElement => (
        <ListItem style={{ borderBottomColor: '#fff', borderBottomWidth: 0 }}>
            {item != null ?
                <View>
                    <TouchableOpacity onPress={(e) => { this.handleJobSubmit(e, item.id) }}>
                        <View style={styles.card}>
                            <View style={styles.card1}>
                                <Text style={styles.text}>{item.firstName} {item.lastName}</Text>
                                <Text style={styles.textdt}>{item.visitDate.length < 35
                                    ? `${item.visitDate.substring(0, 16)}`
                                    : `${item.visitDate}`}
                                </Text>
                            </View>

                            <View style={styles.card2}>
                                <Text style={styles.text}>{item.phone}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View> :
                <ActivityIndicator size='large' color='green' />}

        </ListItem>
    )

    render() {
        const { visitor_list, visitStartDate, search, visitEndDate, isVisible, createdAt } = this.state
        return (
            <SafeAreaLayout
                style={styles.safeArea}
                insets={SaveAreaInset.TOP}>
               
                <View style={{ flexDirection: 'row', backgroundColor: '#eee', paddingTop: 5, marginBottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={Styles.menuButton}>
                        <TouchableOpacity onPress={this.props.navigation.toggleDrawer}>
                            <Text><MenuIcon /></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.searchBox}>
                        <TouchableOpacity style={Styles.searchIcon} onPress={this.handleSearch}>
                            <Text style={styles.searchIcon}><SearchIcon /></Text>
                        </TouchableOpacity>
                        <TextInput
                            value={search}
                            placeholder="Search"
                            style={Styles.searchInput}
                            onChangeText={(search) => { this.setState({ search: search }) }}
                        />
                        {search !== '' ?
                            <TouchableOpacity style={Styles.cancelIcon} onPress={this.handleCancel}>
                                <Text style={styles.cancelIcon}><CancelIcon /></Text>
                            </TouchableOpacity> :
                            null
                        }

                    </View>


                    <View style={Styles.filterButton}>
                        <TouchableOpacity onPress={() => { this.setState({ isVisible: !isVisible }) }}>
                            <Text style={{ color: '#3F51B5' }}><FilterIcon /></Text>
                        </TouchableOpacity>
                    </View>


                </View>              

                <Content style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    <List data={visitor_list}
                        renderItem={this.renderMyJob}
                    />


                    <Modal
                        animationType={"fade"}
                        transparent={false}
                        visible={this.state.isVisible}
                        onRequestClose={() => { console.log("Modal has been closed.") }}>
                        {/*All views of Modal*/}
                        <View style={styles.modal}>
                            <Text>Select Date</Text>
                            <View style={{ width: '40%' }}>
                                <Label>From</Label>
                                <DatePicker
                                    date={createdAt}
                                    format="YYYY-MM-DD"
                                    minDate={createdAt}
                                    maxDate={new Date()}
                                    onDateChange={(visitStartDate) => { this.setState({ visitStartDate: visitStartDate }) }}
                                />
                            </View>

                            <View style={{ width: '40%' }}>
                                <Label>To</Label>
                                <DatePicker
                                    date={new Date()}
                                    format='YYYY-MM-DD'
                                    minDate={visitStartDate}
                                    maxDate={new Date()}
                                    onDateChange={(visitEndDate) => { this.setState({ visitEndDate: visitEndDate }) }}
                                />
                            </View>
                            <TouchableOpacity style={[Styles.buttonContainer, styles.button]} onPress={() => this.setState({ isVisible: !isVisible })}>
                                <Text style={Styles.buttonCaption}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[Styles.buttonContainer, styles.button]} onPress={() => this.handleFilter()}>
                                <Text style={Styles.buttonCaption}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <View style={{ height: 10, width: '100%' }}></View>
                </Content>

            </SafeAreaLayout>
        )
    }

}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    searchBox: {
        width: 375,
        height: 52,
        backgroundColor: "#fff",
        borderColor: "#000000",
        borderWidth: 0,
        borderStyle: "solid"
    },

    content: {
        backgroundColor: '#fff',
        marginTop: 0,
        paddingTop: -10
    },
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

    header: {
        backgroundColor: '#eee',
        borderRadius: 1,
        marginBottom: 5
    },

    card: {
        backgroundColor: '#eee',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 5,
        marginBottom: -5,
        borderRadius: 2
    },

    card1: {
        width: '50%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    card2: {
        width: '50%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    text: {
        fontSize: 20,
        color: 'rgba(2,15,20,1)'
    },
    textdt: {
        fontSize: 12,
        color: 'rgba(2,15,20,1)'
    },
    searchIcon: {
        color: '#999999',
    },

    cancelIcon: {},

    button: {
        width: '44%',
        height: 35,
        marginTop: 20,
        alignSelf: 'center'
    },
});


