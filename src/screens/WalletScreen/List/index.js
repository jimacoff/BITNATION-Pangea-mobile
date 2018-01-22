import React, { Component } from 'react';
import {
  Text, Image, FlatList, Button, ListItem,
  View, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import Images from '../../../global/AssetsImages';
import WalletCard from '../../../components/WalletCard';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import { formatETH } from '../../../utils/formatters/amountFormatter';

export default class WalletList extends Component {

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <View style={styles.flatListStyle}>
          <FlatList
            data={this.props.wallets}
            keyExtractor={item => item.ethAddress}
            renderItem={({ item }) => {
              const balance = formatETH(item.balance, 'Updating');

              return (<WalletCard
                imagePath={Images.ethereumLogo}
                onSendPress={() => this.props.onSendPress(item)}
                onReceivePress={() => this.props.onReceivePress(item)}
                nameHeading={item.name}
                balance={balance}>
              </WalletCard>);
            }
            }
          />
        </View>
      </View>
    );
  }

}

WalletList.PropTypes = {
  onSendPress: PropTypes.func.isRequired,
  onReceivePress: PropTypes.func.isRequired,
};