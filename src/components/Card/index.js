// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CardSquare from './Square';
import styles from './styles';

type Props = {
  /**
   * @desc Style to be applied on top of default styles.
   */
  style?: any,

  /**
   * @desc Children Component to be rendered.
   */
  children?: any
}

export default class Card extends Component<Props> {
  static Square = CardSquare;

  render() {
    const { style, children } = this.props;
    return <View style={[styles.card, style]}>{children}</View>;
  }
}

Card.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
