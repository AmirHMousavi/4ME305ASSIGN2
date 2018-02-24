import React, { Component } from 'react';
// import { View, Text } from 'react-native';
import { Font, AppLoading } from 'expo';
import { StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import variables from '../../native-base-theme/variables/commonColor';
import Drawer from './Drawer';

// the needed fonts path
const RobotoFont = require('native-base/Fonts/Roboto.ttf');
const RobotoMedFont = require('native-base/Fonts/Roboto_medium.ttf');
const IoniconsFont = require('native-base/Fonts/Ionicons.ttf');

export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Font.loadAsync({
      Roboto: RobotoFont,
      Roboto_medium: RobotoMedFont,
      Ionicons: IoniconsFont,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <Drawer />
      </StyleProvider>
    );
  }
}
