// @flow

import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../styles';
import i18n from 'pangea-common/i18n';
import AssetsImages from '../assets/AssetsImages';

type Props = {
  /**
   * @desc Name of the Nation of citizenship
   */
  nationName?: string,
};

/**
 * @desc Component that renders the panel indicating the user is Citizen of a Nation
 * @return {React.Component} A component.
 */

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

const PanelViewCitizen = ({ nationName }: Props) => (
  <View style={styles.panelViewCitizen}>
    <Text style={styles.body}>
      {i18n.t('screens.nationDetails.citizen')} {nationName}
    </Text>
    <Image source={AssetsImages.userCitizenIcon} style={styles.panelViewCitizenIcon} />
  </View>
);

PanelViewCitizen.defaultProps = {
  nationName: '',
};

export default PanelViewCitizen;
