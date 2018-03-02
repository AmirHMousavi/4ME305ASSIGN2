import React, { Component } from 'react';
import { View, AsyncStorage, Image } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Form,
  Item,
  Label,
  Toast,
  Input,
  Fab,
  IconNB,
} from 'native-base';
import Expo from 'expo';
import MyFooter from '../../setups/MyFooter';
import MyHeader from '../../setups/MyHeader';

const FACBOOK_APP_ID = '260440777826338';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      response: null,
      image: null,
      active: false,
    };
  }

  componentDidMount() {
    this.getDataFromStorage();
  }

  getDataFromStorage = async () => {
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

  openMenu = () => {
    this.props.navigation.navigate('DrawerOpen');
  };

  pickImage = async () => {
    const result = await Expo.ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  renderFab() {
    return (
      <View style={{ flex: 1 }}>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <IconNB name="md-share" />
          <Button style={{ backgroundColor: '#34A34F' }}>
            <IconNB name="logo-whatsapp" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }}>
            <IconNB name="logo-facebook" />
          </Button>
          <Button disabled style={{ backgroundColor: '#DD5144' }}>
            <IconNB name="ios-mail" />
          </Button>
        </Fab>
      </View>
    );
  }

  render() {
    const { image } = this.state;
    if (this.state.token && this.state.response) {
      return (
        <Container style={{ backgroundColor: '#fff' }}>
          <MyHeader onPress={() => this.openMenu} name="Login Screen" />
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Welcome {this.state.response.name}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'normal' }}>You are logged in as</Text>
              <Text style={{ fontSize: 20, fontWeight: 'normal' }}>
                {this.state.response.email}
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
            </View>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
              <Button block primary onPress={this.pickImage}>
                <Text>Pick Image To Share</Text>
              </Button>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
            <View
              style={{
                alignItems: 'flex-end',
              }}
            >
              {image ? this.renderFab() : <View />}
            </View>
          </View>
          <MyFooter />
        </Container>
      );
    }
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <MyHeader onPress={() => this.openMenu} name="Login Screen" />
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
        <MyFooter />
      </Container>
    );
  }
}
