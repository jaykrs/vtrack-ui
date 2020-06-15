import React from 'react';
import { StyleSheet, View } from 'react-native';
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
import { Content, Footer, FooterTab } from 'native-base';



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
        <Text style = {styles.bold}>Marksman Technologies</Text> create a Visitor tracking app <Text style = {styles.bold}>– vTrack. vTrack</Text> is the Visitor tracing for
        workplaces, business places , hotels , hospitals , restaurant . vTrack a platform which help us to track of
        visitors in the same time and same place visited in your place.
      </Text>

     
      <Text style={styles.text}>
      <Text style = {styles.bold}>vTrack can be used at –</Text> Residential Sociaty, Restaurant, Hotels , Shops , Hospitals , Industries , Apartments, Government Offices and
        Educational Institutions.
      </Text>
    </Content>
    
    <Footer style={styles.footer}>
      <FooterTab style={styles.footerTab}>
        <View style={styles.footerView}>
          <Text style = {styles.bold}>
            FROM
        </Text>
          <Text style = {styles.bold}>
            marksman
        </Text>
        </View>
      </FooterTab>
    </Footer>
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
    fontSize: 16,
    margin: 10,
    textAlign: 'justify'
  },
  bold: {
    fontWeight: 'bold'
  },

  footer: {
    height: 70,
    backgroundColor: '#fff',
    borderTopColor: '#fff',
    borderTopWidth: 1,
    opacity: 1
  },

  footerTab: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  footerView: {
    alignItems: 'center'
  },
})
