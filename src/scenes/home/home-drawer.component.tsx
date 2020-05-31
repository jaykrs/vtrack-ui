import React, { useEffect,useState} from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,Text,View, PanResponder,TouchableOpacity
} from 'react-native';
import {
  Drawer,
  DrawerElement,
  MenuItemType,
  DrawerHeaderElement,
} from 'react-native-ui-kitten';
import { DrawerHomeScreenProps, ProfileEditScreenProps } from '../../navigation/home.navigator';
import { AsyncStorage } from 'react-native';
import { AppConstants } from '../../constants/AppConstants';
import { FlexStyleProps } from 'react-native-ui-kitten/ui/support/typings';
import axios from 'axios';
import { Item } from 'native-base';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
interface MyState {
  displayName : String,
  dataSource: [],
  userId : String
}

// const DrawerHeader = (): React.ReactElement<ImageBackgroundProps & MyState> => (
 
//   <ImageBackground
//     style={styles.header} 
//     source={{uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + 26 + '_avatar.png'}}
//   />
// );

  
  

export const HomeDrawer = (props: DrawerHomeScreenProps): DrawerElement => {
  const [data,setData]= useState({hits:[]});
  const { navigate } = useNavigation();

     useEffect(()=>{
      const fetchData = async () => {
        const value = await AsyncStorage.getItem('userDetail');
        if (value) {
          const user = JSON.parse(value);
        setData( user );

        console.log('data from async', user)
      
      };
      }     
       fetchData();
     
     },[]);
    
  const DrawerHeader = (): React.ReactElement<ImageBackgroundProps & MyState> => { 

     return (
      <View style={styles.MainView}>
      <View style={styles.NestedView}>
      <View style={styles.ImgBgOne}/>
                <View style={styles.ImgBgTwo}/>
                <TouchableOpacity onPress={() => {
        navigate("Profile",{pid: Number(data.userId)});
      }}>
    <ImageBackground  
    style={styles.header} borderRadius={80}
    source={{uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + data.userId + '_avatar.png'}}
   />
   </TouchableOpacity>
   <Text style={styles.displayName}>{data.displayName}</Text>
   </View>
   </View>
     )    
   };
  const onMenuItemSelect = (index: number): void => {
    const selectedTabRoute: string = props.state.routeNames[index];
    props.navigation.navigate(selectedTabRoute);
    props.navigation.closeDrawer();
  };

  const createNavigationItemForRoute = (route): MenuItemType => {
    const { options } = props.descriptors[route.key];
    return {
      routeName: route.name,
      title: options.title,
      icon: options.drawerIcon,
      
    };
  };

  return (
    <Drawer
      header={DrawerHeader}
      data={props.state.routes.map(createNavigationItemForRoute)}
      onSelect={onMenuItemSelect}
    />   
  )   
  
};

const styles = StyleSheet.create({
  ImgBgTwo:{
    position:'absolute',
    borderRadius:55,
    alignSelf:'center', 
    height:62,width:55,
    transform: [{scaleX:2}],
    backgroundColor:'white',
    marginTop:65
  },
  ImgBgOne:{
    height:40,
    width:40,
    backgroundColor:'white',
    borderRadius:50,
    alignSelf:'center',
    marginTop:18,
    position:'absolute'
  },
  MainView:{
    height:170
  },
  NestedView:{
    height:140,
    width:140,
    backgroundColor:'#D8D8D899',
    borderRadius:80,
    alignSelf:'center',
    marginTop:5
  },
  displayName:{
    alignSelf:'center',
    fontSize:18
  },
  header: {
    height: 130,
    width:130,
    // backgroundColor:'#D8D8D899',
    margin:5,
    alignSelf:'center'
  },
});
