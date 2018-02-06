var React = require('react-native')
var {
  Dimensions
} = React

var deviceHeight = Dimensions.get('window').height;

/**
 * Funtion to normalize Font sizes depending on screen size
 * @param size The Font Size
 * @returns {integer} The new font size depending the current screen
 */
export function normalizer (size) {
  if(deviceHeight === 568) {
    return size / 0.65
  } else if(deviceHeight === 667) {
    return size
  } else if(deviceHeight === 736) {
    return size * 1.4
  }
  return size
}