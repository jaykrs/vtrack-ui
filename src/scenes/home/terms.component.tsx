import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import {
  Divider,
  Layout,
  Text,
} from 'react-native-ui-kitten';
import { TermsScreenProps } from '../../navigation/home.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { Content } from 'native-base';
import { Styles } from '../../assets/styles';



export const TermsScreen = (props: TermsScreenProps): SafeAreaLayoutElement => (
  <SafeAreaLayout
    style={styles.safeArea}
    insets={SaveAreaInset.TOP}>
    <Toolbar
      title='Terms and Conditions'
      onBackPress={props.navigation.goBack}
    />
    <Divider />
    <Content style={styles.container}>
      <View style = {styles.view}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}> Last Revised : 04 June 2020</Text>
      </View>

      <Text style={styles.text}>
        This policy sets out how we will collect, use, disclose and protect your personal information.
      </Text>

      <Text style={styles.text}>
        We may change this policy by uploading a revised policy onto our <Text style = {styles.bold}> vTrack </Text>App on time to time basis. Unless
        stated otherwise, the change will apply from the date that we upload the revised policy.
      </Text>

      <Text style={styles.heading}>
        What personal information do we collect
      </Text>

      <Text style={styles.text}>
        The Account and other Data we collect may include company/personal names, usernames, phone numbers,
        email addresses, your location, billing information, information about how you use our App or the Services
      </Text>

      <Text style={styles.text}>
        Visitor or Employee Data is personal information about a customer’s visitors or employees that is input into
        the<Text style = {styles.bold}> vTrack </Text>Service . Visitor and Employee Data may include visitors’ and employees’ names, phone
        numbers, email addresses, locations and photos, times of visit, visitors’ employers’ names and any other
        information that a customer decides to capture about its visitors and employees.
      </Text>

        <Text style={[styles.text, {fontWeight: 'bold'}]}>
        We will not disclose, move, access, process or use Visitor or Employee Data If possible, we will
        collect personal information from you directly.
      </Text>

        <Text style={styles.heading}>
        How we use your personal information
        </Text>

        <Text style={styles.simpleHeading}>
        We will use your personal information:
        </Text>

        <Text style={styles.simpleHeading}>
        To verify your identity{'\n\n'}
        To provide services and products to you{'\n\n'}
        To market our services and products to you, including contacting you electronically (e.g. by text or email for
        this purpose){'\n\n'}
        To tailor content or advertisements to you{'\n\n'}
        To improve the services and products that we provide to you{'\n\n'}
        To bill you and to collect money that you owe us, including authorising and processing credit card
        transactions{'\n\n'}
        To respond to communications from you, including a complaint{'\n\n'}
        To conduct research and statistical analysis (on an anonymised basis){'\n\n'}
        To protect and/or enforce our legal rights and interests, including defending any claim{'\n\n'}
        for any other purpose authorised by you
        </Text>

        <Text style={styles.heading}>
        Disclosing your personal information
        </Text>

        <Text style={styles.simpleHeading}>
        We may disclose your personal information to:
        </Text>

        <Text style={styles.text}>
        any other company within our group for the purposes described in this policy
        any business that supports our services and products, including any person that hosts or maintains any
        underlying IT system or data centre that we use to provide the app or other services and products or that
        assists us with our marketing and customer care activities described in this policy
        other third parties (for anonymised statistical information)
        a person who can require us to supply your personal information (e.g. a regulatory authority)
        any other person authorised by the Act or another law (e.g. a law enforcement agency)
        any other person authorised by you
        </Text>

        <Text style={styles.heading}>
        Protecting your personal information
        </Text>

        <Text style={styles.text}>
        We will take reasonable steps to keep your personal information safe from loss, unauthorised activity, or
        other misuse.
        </Text>

        <Text style={styles.heading}>
        Annual Subscription Fee
        </Text>

        <Text style={styles.text}>
        Platform charge a annual subscription fee and this will be non refundable , The first three months of the
        services is free.
        </Text>

        <Text style={styles.heading}>
        Contact us
        </Text>

        <Text style={styles.text}>
        If you have any questions about this privacy policy or other terms, you can contact us at        
         <Text style={styles.link}>  vtrack@marksmantech.com</Text>
      </Text>

        <View style = {Styles.bottomSpace}></View>      
    </Content>
  </SafeAreaLayout >
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
    margin:10,
    textAlign: 'justify'
  },

  link: {
    textDecorationLine: 'underline',
    color: 'blue',    
  },

  view: {
    width: '100%',
    alignItems: 'flex-end'
  },

  heading: {
    fontWeight: 'bold',
    marginBottom: 7,
    lineHeight: 18,
    fontSize: 16
  },

  simpleHeading: {
    marginBottom: 7,
    lineHeight: 18,
    fontSize: 16,
    margin:10,
    textAlign: 'justify'
  },

  bold: {
    fontWeight: 'bold'
  }
})
