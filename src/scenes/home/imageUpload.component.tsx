import React from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity, PermissionsAndroid, Image } from 'react-native';
import {
  Divider,
  Layout,
  Text, ThemedComponentProps, Avatar, Button, Select,Input
} from 'react-native-ui-kitten';
import { ImageUploadScreenProps } from '../../navigation/home.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { AppConstants } from '../../constants/AppConstants';
import { AsyncStorage } from 'react-native';
import { Item, Picker, Form, Icon, Thumbnail } from 'native-base';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';


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



export class ImageUploadScreen extends React.Component<ThemedComponentProps & any, MyState & any> {
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
   
      timelineBody: '',
      timelineType: '54',
      selectedFile:null,
      userId: '',
   

    }

  }



  fileSelectedHandler = (e) =>{
    this.setState({
      selectedFile: e.target.files[0]
  });
    console.log("picture",e.target.files[0]);
   }
   async componentWillMount() {
    const value = await AsyncStorage.getItem('userDetail');
    if (value) {
        const user = JSON.parse(value);
        this.setState({userId : user.userId});
    } 
  }
     onFileChangeHandler = (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append('file', this.state.selectedFile);
console.log(this.state.userId);
      fetch(AppConstants.API_BASE_URL +'/api/file/upload/avatar/'+this.state.userId, {
          method: 'post',
          body: formData
      }).then(res => {
          if(res.ok) {
            //   console.log(res.data);
              alert("File uploaded successfully.");
            //   window.location.reload(false);
          }
      });
    
  };






 
  render() {

    return (
        <View >
             <Input
          padding={0}
          type='file' 
            style={styles.Input}
            label='Email Address'
            placeholder='Email Address'
            value={this.state.emailId}
            onChangeText={(emailId) => this.setState({ emailId })}
            onChange={this.fileSelectedHandler}
            // ref={fileInput=>this.fileInput = fileInput}
            />
            <Button 
            // onPress={()=>this.FileInput.click()}
            >camera Icon here</Button>
            <Text style={{borderRadius:20}} onPress={this.onFileChangeHandler} >
               Upload</Text>
        
        
    </View>
    
    );
  };
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
