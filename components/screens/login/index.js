import React, { Component } from 'react';
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
