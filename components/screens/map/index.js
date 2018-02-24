import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
} from 'native-base';
import { MapView } from 'expo';
import styles from './styles';

export default class Map extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="md-menu" />
            </Button>
          </Left>
          <Body>
            <Title>MapView Screen</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>4ME305 Assignment 2</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
