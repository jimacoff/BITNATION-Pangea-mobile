// @flow

import React, { Component } from 'react';
import { View, Linking, Image, Text, TouchableOpacity } from 'react-native';
// import ZendeskSupport from 'react-native-zendesk-support';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import facebook from '../../assets/images/icon-facebook.png';
import steemit from '../../assets/images/icon-steemit.png';
import telegram from '../../assets/images/icon-telegram.png';
import github from '../../assets/images/icon-github.png';
import twitter from '../../assets/images/icon-twitter.png';
import discord from '../../assets/images/icon-discord.png';
import Card from '../../components/Card';
import styles from './styles';

type Props = {
}

class InfoScreen extends Component<Props> {
  // componentDidMount() {
  //   const config = {
  //     appId: '73f3e05169e02c9144c2c98be63472e1b1e5123f1e696fe2',
  //     zendeskUrl: 'bitnation.zendesk.com',
  //     clientId: 'mobile_sdk_client_6ce9e85f75a7e5e3c348',
  //   };
  //   // ZendeskSupport.initialize(config);

  //   const customFields = {
  //     name: 'Prameet',
  //     ticket: 'Sample',
  //   };
  //   // ZendeskSupport.callSupport(customFields);
  // }

  openLink = (url: any) => {
    Linking.openURL(url);
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.mainContainer}>
          <Text style={styles.email}>info@bitnation.co</Text>
          <Card style={styles.card}>
            <TouchableOpacity
              onPress={() => this.openLink('https://github.com/Bit-Nation')}
            >
              <Image
                source={github}
                style={{ height: 80, width: 80, marginRight: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openLink('https://steemit.com/@bitnation')}
            >
              <Image source={steemit} style={{ height: 80, width: 80 }} />
            </TouchableOpacity>
          </Card>
          <Card style={styles.card}>
            <TouchableOpacity
              style={{ marginRight: 35 }}
              onPress={() => this.openLink('https://t.me/PangeaBitnation')}
            >
              <Image source={telegram} style={{ height: 80, width: 80 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openLink('https://discordapp.com/invite/whzS4Fr')}
            >
              <Image source={discord} style={{ height: 80, width: 80 }} />
            </TouchableOpacity>
          </Card>
          <Card style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                this.openLink('https://www.facebook.com/MyBitnation')
              }
            >
              <Image
                source={facebook}
                style={{ height: 80, width: 80, marginRight: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openLink('https://twitter.com/@MyBitnation')}
            >
              <Image source={twitter} style={{ height: 80, width: 80 }} />
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    );
  }
}

export default InfoScreen;
