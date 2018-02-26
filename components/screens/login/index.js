import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
} from 'native-base';

const FACBOOK_APP_ID = 260440777826338;

login = async () => {};

renderButton = () => (
  <TouchableOpacity onPress={() => this.login()}>
    <View
      style={{
        width: '50%',
        alignSelf: 'center',
        borderRadius: 4,
        padding: 24,
        backgroundColor: '#3B5998',
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Login to Facebook</Text>
    </View>
  </TouchableOpacity>
);

export default class Login extends Component {
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
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>This is Login Screen</Text>
        </Content>

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
