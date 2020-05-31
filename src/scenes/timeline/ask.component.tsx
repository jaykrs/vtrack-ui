import React from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity, PermissionsAndroid, Image, RefreshControl } from 'react-native';
import {
  Divider,
  Layout,
  Text, ThemedComponentProps, Avatar, Button, Select
} from 'react-native-ui-kitten';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { AppConstants } from '../../constants/AppConstants';
import { AsyncStorage } from 'react-native';
import { Item, Picker, Form, Icon, Thumbnail, Footer, FooterTab, Content } from 'native-base';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
// import FilePickerManager from 'react-native-file-picker';
// import RNFetchBlob from 'react-native-fetch-blob';
// import { VideoIcon } from '../../assets/icons';
import Feather from 'react-native-vector-icons/Feather'
// import VideoPlayer from 'react-native-video-player';
import { ScrollView } from 'react-native-gesture-handler';
import FilePickerManager from 'react-native-file-picker';

type MyState = {
  displayName: String,
  dataSource: [],
  userId: String,
  likeCount: number,
  dislikeCount: number,
  liked: boolean[],
  disliked: boolean[],
  categories: [],
  selectedIndex: number;
}

export class AskScreen extends React.Component<ThemedComponentProps & any, MyState & any> {
  constructor(props) {
    super(props)
    this.state = {
      likeCount: 0,
      dislikeCount: 0,
      liked: [true, false],
      disliked: [true, false],
      catagory: '',
      selectedIndex: 0,
      categoryList: [],
      Ask: '',
      userId: '',
      timelineBody: '',
      timelineType: '',
      imageSource: { uri: 'content://media/external/images/media/46134' },
      imageData: '',
      imageWidth: '',
      imageHeight: '',
      imageTimelineType: '',
      videoTimelineType: '',
      audioTimelineType: '',
      file: null,
      refreshing: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.selectAudio = this.selectAudio.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
  }


  selectPhoto(e, timelineType) {
    // console.log('Select Photo Clicked')
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        const file = { name: 'thoughtPF_image' + response.fileName, uri: response.uri, type: response.type, size: response.fileSize, path: response.path }
        this.setState({
          timelineType: timelineType,
          imageSource: source,
          timelineBody: response,
          imageWidth: response.width,
          imageHeight: response.height,
          file: file,
        });
        // console.log('Image Source', file)
      }
    });
  }

  selectAudio(e, timelineType) {
    // Alert.alert("We are facing some issues, shortly we'll come up with solution");
    // console.log('Video Timeline Type', timelineType)
    FilePickerManager.showFilePicker(audioOptions, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled audio picker');
      } else if (response.error) {
        console.log('audio Picker Error: ', response.error);
      } else {
        // const file = { name: 'video.mp4', uri: response.uri, type: 'video', size: response.fileSize, path: response.path }
        const file = { name: 'thoughtPF_audio' + response.fileName, uri: response.uri, type: response.type, size: response.readableSize, path: response.path }

        this.setState({
          timelineType: timelineType,
          imageSource: response.uri,
          file: file
        });
        // console.log('Video Source', response)
      }
    });
  }

  selectVideo(e, timelineType) {

    // console.log('Video Timeline Type', timelineType)
    ImagePicker.showImagePicker(videoOptions, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('Video Picker Error: ', response.error);
      } else {
        const file = { name: 'thoughtPF_timeline.mp4', uri: response.uri, type: 'video/mp4', path: response.path, size: '' }

        this.setState({
          timelineType: timelineType,
          timelineBody: response.path,
          imageSource: response.path,
          file: file
        });
        // console.log('Video Source', file)
      }
    });
  }

  handleSubmit() {
    // console.log('Timeline')
    const { timelineBody, timelineType, catagory, userId, imageTimelineType, audioTimelineType, videoTimelineType, file } = this.state;

    // console.log("Timeline create data", timelineBody, timelineType, catagory, userId)
    if (catagory) {
      if (timelineType == imageTimelineType || timelineType == videoTimelineType || timelineType == audioTimelineType) {
        console.log("Timeline create data", timelineBody, timelineType, catagory, userId)
        const formData = new FormData();
        formData.append('file', file)

        axios({
          method: 'post',
          url: AppConstants.API_BASE_URL + '/api/timeline/create/file/' + userId + '/' + timelineType + '/' + catagory,
          data: formData
        }).then((response) => {
          Alert.alert("Timeline created successfully");
          this.props.navigation.goBack()
        },
          (error) => {
            // console.log(error);
            if (error) {
              Alert.alert("You are using wrong format");
            }
          });
        // Alert.alert("We are facing some issues, shortly we'll come up with solution");
      }
      else if (timelineBody === '' || timelineBody === null) {
        Alert.alert('Please write something in timeline')
      }
      else if (catagory && timelineType && userId) {
        //this.props.login(username, summeryDetails);
        // console.log(timelineBody, timelineType, userId, catagory)
        axios({
          method: 'post',
          url: AppConstants.API_BASE_URL + '/api/timeline/create',
          data: {
            catagory: catagory,
            timelineBody: timelineBody,
            timelineType: timelineType,
            consultantId: userId,
          }
        }).then((response) => {
          Alert.alert("Timeline created successfully");
          this.props.navigation.goBack()
        },
          (error) => {
            if (error) {
              Alert.alert("You are using wrong format");
            }
          });
      }
    }
    else {
      Alert.alert('Please create profile first')
    }
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem('userDetail');
    if (value) {
      const user = JSON.parse(value);
      this.setState({
        userId: user.userId,
        timelineType: 54
      });

      axios({
        method: 'get',
        url: AppConstants.API_BASE_URL + '/api/profile/getprofile/' + user.userId
      }).then((response) => {
        this.setState({
          ...this.state,
          catagory: response.data.catagory
        })
      },
        (error) => {
          console.log(error);
          if (error) {
            Alert.alert("You are using wrong format");
          }
        })
    }

    const responselook = await fetch(AppConstants.API_BASE_URL + '/api/lookup/getalllookup');
    const response = await responselook.json();
    this.setState({
      categoryList: response.CATAGORY,
      timeline_Type: response.TIMELINE_TYPE
    });
    // console.log(this.state.categoryList);

    this.handleTimelineType()
  }

  handleTimelineType() {
    this.state.timeline_Type.map((item, index) => {
      if (item.lookUpName === 'TEXT') {
        this.setState({
          timelineType: item.lookUpId
        })
        // console.log('Text Timeline Type', this.state.timelineType)
      }

      if (item.lookUpName === 'IMAGE') {
        this.setState({
          imageTimelineType: item.lookUpId
        })
        // console.log('Image Timeline Type', this.state.imageTimelineType)
      }

      if (item.lookUpName === 'VIDEO') {
        this.setState({
          videoTimelineType: item.lookUpId
        })
        // console.log('Video Timeline Type', this.state.videoTimelineType)
      }

      if (item.lookUpName === 'AUDIO') {
        this.setState({
          audioTimelineType: item.lookUpId
        })
        // console.log('Audio Timeline Type', this.state.audioTimelineType)
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

    return (

      <SafeAreaLayout
        style={styles.safeArea}
        insets={SaveAreaInset.TOP}>
        <Content refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <Toolbar
            title='Post Timeline'
            onBackPress={this.props.navigation.goBack}
          />
          <Divider />
          <Layout style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 15,marginLeft:10 }}>
              <View>
                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + this.state.userId + '_avatar.png' }} />
              </View>



              {this.state.timelineType !== '' && this.state.timelineType.length !== 0 && this.state.timelineType == this.state.imageTimelineType ?
                <View style={{ marginLeft: 10, width: 310, height: 210 }}>
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <Avatar style={{ width: 300, height: 200, borderRadius: 0, alignSelf: 'center' }} source={this.state.imageSource} />
                    </ScrollView>
                  </ScrollView>
                </View> :

                (this.state.timelineType !== '' && this.state.timelineType.length !== 0 && this.state.timelineType == this.state.videoTimelineType) ?
                  <View style={{ marginLeft: 10, width: 280, height: 200 }}>
                    <VideoPlayer
                      endWithThumbnail
                      thumbnail={{ uri: this.state.imageSource }}
                      video={{ uri: this.state.imageSource }}
                      fullScreenOnLongPress />

                  </View> :

                  (this.state.timelineType !== '' && this.state.timelineType.length !== 0 && this.state.timelineType == this.state.audioTimelineType) ?
                    <View style={{ marginLeft: 10, width: 280, height: 200 }}>
                      <VideoPlayer
                        videoHeight={319.5}
                        endWithThumbnail
                        thumbnail={ require('../../assets/player.jpg') }
                        video={{ uri: this.state.imageSource }}
                        fullScreenOnLongPress />
                    </View> :

                    <View style={{ width: '80%', marginLeft: 10 }}>
                      <TextInput multiline={true}
                        value={this.state.timelineBody}
                        placeholder={"Write Timeline"}
                        onChangeText={(timelineBody) => this.setState({ timelineBody })} />
                    </View>
              }
            </View>
           
          </Layout>
        </Content>
        <Footer style={{ height: 50 }}>
          <FooterTab style={{ backgroundColor: '#ffffff', paddingHorizontal: 20, paddingTop: 5 }}>
            <View>
              <TouchableOpacity style={{ justifyContent: 'center' }} onPress={e => this.selectPhoto(e, this.state.imageTimelineType)}>
                <Feather size={20} name="image" style={{ textAlign: 'center', color: '#104de8' }} />
                <Text style={{ textAlign: 'center', color: '#104de8' }}>Image</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={{ justifyContent: 'center' }} onPress={e => this.selectAudio(e, this.state.audioTimelineType)}>
                <Feather size={20} name="mic" style={{ textAlign: 'center', color: '#104de8' }} />
                <Text style={{ textAlign: 'center', color: '#104de8' }}>Audio</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={{ width: 50, justifyContent: 'center' }} onPress={e => this.selectVideo(e, this.state.videoTimelineType)}>
                <Feather size={20} name="video" style={{ textAlign: 'center', color: '#104de8' }} />
                <Text style={{ textAlign: 'center', color: '#104de8' }}>Video</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={{ width: 50, justifyContent: 'center' }} onPress={this.handleSubmit}>
                <Feather size={20} name="send" style={{ textAlign: 'center', color: '#104de8', transform: [{ rotate: '45deg' }] }} />
                <Text style={{ textAlign: 'center', color: '#104de8' }}>Post</Text>
              </TouchableOpacity>
            </View>

          </FooterTab>
        </Footer>

      </SafeAreaLayout>
    )
  };
}

const options = {
  title: 'Select a Photo',
  takePhoto: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1,
  // type: ''
}

const audioOptions = {
  title: 'Select a Photo',
  takePhoto: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1,
  type: 'audio/mpeg'
}

const videoOptions = {
  title: 'Select a Video',
  takePhotoButtonTitle: 'Take Video',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1,
  mediaType: 'video'
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',

  },
});
