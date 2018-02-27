import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
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
  Input,
  Form,
  Item,
  Label,
  Toast,
} from 'native-base';
import Expo from 'expo';

const FACBOOK_APP_ID = '204914923589119';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      response: null,
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('component did mount');
    this.getDataFromStorage();
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  getDataFromStorage = async () => {
    console.log('getDataFromStorage');
    const keys = ['FBToken', 'FBResponse'];
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.forEach((result, i, store) => {
        if (store[i][0] === 'FBToken') {
          this.setState({ token: store[i][1] });
        }
        if (store[i][0] === 'FBResponse') {
          this.setState({ response: JSON.parse(store[i][1]) });
        }
      });
    });
  };

  callGraph = async (token) => {
    console.log('callGraph');
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`);
    const responceJSON = JSON.stringify(await response.json());
    try {
      await AsyncStorage.multiSet([['FBResponse', responceJSON], ['FBToken', token]]);
    } catch (error) {
      Toast.show({
        text: 'Error in saving Facebook token and response',
        buttonText: 'OK',
      });
    }
    this.getDataFromStorage();
  };

  loginWithFacebook = async () => {
    console.log('loginWithFacebook');
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FACBOOK_APP_ID, {
      permissions: ['public_profile', 'email'],
    });

    if (type === 'success') {
      this.callGraph(token);
      /* this.firebaseLogin(token); */
    } else {
      Toast.show({
        text: 'Facebook Login Error',
        buttonText: 'OK',
      });
    }
  };
  logOut = async () => {
    const keys = ['FBToken', 'FBResponse'];
    AsyncStorage.multiRemove(keys);
    this.getDataFromStorage();
  };

  render() {
    console.log('Render......');
    if (this.state.token && this.state.response) {
      console.log('State response', this.state.response);
      console.log('State Token', this.state.token);
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
          <Content>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Welcome {this.state.response.name}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 'normal' }}>
              You are logged in with {this.state.response.email}
            </Text>
            <Button
              iconLeft
              block
              danger
              style={{ margin: 15, marginTop: 0 }}
              onPress={() => this.logOut()}
            >
              <Icon active name="md-log-out" />
              <Text>Log out</Text>
            </Button>
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
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry />
            </Item>
          </Form>
          <Button bordered block info style={{ margin: 15, marginTop: 50 }}>
            <Text>Sign In</Text>
          </Button>
          <Button bordered block success style={{ margin: 15, marginTop: 0 }}>
            <Text>Signup</Text>
          </Button>
          <View>
            <Text>Or You Can ...</Text>
            <Button
              iconLeft
              block
              primary
              style={{ margin: 15, marginTop: 40 }}
              onPress={() => this.loginWithFacebook()}
            >
              <Icon active name="logo-facebook" />
              <Text>Login With Facebook</Text>
            </Button>
            <Button iconLeft block danger style={{ margin: 15, marginTop: 0 }}>
              <Icon active name="logo-googleplus" />
              <Text>Login With Google+</Text>
            </Button>
          </View>
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
