import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';

import MyHeader from '../../setups/MyHeader';
import MyFooter from '../../setups/MyFooter';
import CameraComponent from './cameraComponent';

export default class CameraScreen extends Component {
  openMenu = () => {
    this.props.navigation.navigate('DrawerOpen');
  };
  render() {
    return (
      <Container>
        <MyHeader onPress={() => this.openMenu} name="Camera Screen" />

        <CameraComponent />

        <MyFooter />
      </Container>
    );
  }
}
