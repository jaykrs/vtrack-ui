import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Divider,
  Layout,
  Text,
} from 'react-native-ui-kitten';
import { AboutScreenProps } from '../../navigation/home.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { Content } from 'native-base';



export const AboutScreen = (props: AboutScreenProps): SafeAreaLayoutElement => (
  <SafeAreaLayout
    style={styles.safeArea}
    insets={SaveAreaInset.TOP}>
    <Toolbar
      title='About Us'
      onBackPress={props.navigation.goBack}
    />
    <Divider />
    <Content style={styles.container}>
      <Text style = {styles.text}>
        <Text style = {styles.bold}>Marksman Technologies</Text> create a Contact tracing app <Text style = {styles.bold}>– vTrack. vTrack</Text> is the Contact tracing for
        workplaces, business places , hotels , hospitals , restaurant . vTrack a platform which help us to track of
        visitors in the same time and same place visited in your place.
      </Text>

      <Text style={styles.text}>
      <Text style = {styles.bold}>Now at the Covid –</Text> 19 time it will help a lot to trace and track people and help to all of us to fight against this
        big problem.
      </Text>

      <Text style={styles.text}>
      <Text style = {styles.bold}>vTrack can use –</Text> Restaurant, Hotels , Shops , Hospitals , Industries , Apartments, Government Offices and
        Educational Institutions.
      </Text>
    </Content>
  </SafeAreaLayout>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    padding: 10
  },

  text: {
    marginBottom: 20,
    lineHeight: 18,
    fontSize: 16
  },

  bold: {
    fontWeight: 'bold'
  }
})
