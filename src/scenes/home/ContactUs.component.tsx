import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import {
  Divider,
  Layout,
  Text,
} from 'react-native-ui-kitten';
import { ContactUsScreenProps } from '../../navigation/home.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { Content } from 'native-base';



export const ContactUsScreen = (props: ContactUsScreenProps): SafeAreaLayoutElement => (
  <SafeAreaLayout
    style={styles.safeArea}
    insets={SaveAreaInset.TOP}>
    <Toolbar
      title='Contact Us'
      onBackPress={props.navigation.goBack}
    />
    <Divider />
    <Content style={styles.container}>
      <Text style = {styles.simpleHeading}>
        For any issues or help you can directly contact us at
      </Text>

      <Text style={styles.link} onPress={() => Linking.openURL('http://vtrack@marksmantech.com')}>vtrack@marksmantech.com</Text>
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

  link: {
    textDecorationLine: 'underline',
    color: 'blue',
  },

  simpleHeading: {
    marginBottom: 20,
    lineHeight: 18,
    fontSize: 16
  },
})
