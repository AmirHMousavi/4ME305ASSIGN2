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
/* const GOOGLE_APP_ID = 'AIzaSyAWoRdwvUuGc-Zkjabk3KfE7jF64XfVcFM'; */
const GOOGLE_ANDROID_CLIENT_ID =
  '670796361568-qfrsse6le8h6ua13clhrfcq32jba4cgm.apps.googleusercontent.com';
const GOOGLE_IOS_CLIENT_ID =
  '670796361568-qtg57jedveiql7t6coo39qf31vflant5.apps.googleusercontent.com';
/* const openssl = 'dd:3d:ae:6b:68:a7:69:ea:ac:36:aa:24:d2:ac:a8:8d:a2:c4:a8:0b'; */

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      image: null,
      active: false,
      email: null,
      name: null,
    };
  }

  componentDidMount() {
    this.getDataFromStorage();
  }

  getDataFromStorage = async () => {
    const keys = ['TOKEN', 'NAME', 'EMAIL'];
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.forEach((result, i, store) => {
        if (store[i][0] === 'TOKEN') {
          this.setState({ token: store[i][1] });
        }
        if (store[i][0] === 'NAME') {
          this.setState({ name: store[i][1] });
        }
        if (store[i][0] === 'EMAIL') {
          this.setState({ email: store[i][1] });
        }
      });
    });
  };

  callGraph = async (token) => {
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`);

    const responceStrJSON = JSON.stringify(await response.json());
    const responceJSON = JSON.parse(responceStrJSON);
    try {
      await AsyncStorage.multiSet([
        ['NAME', responceJSON.name],
        ['EMAIL', responceJSON.email],
        ['TOKEN', token],
      ]);
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
      permissions: ['public_profile', 'email', 'user_friends', 'user_status'],
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

  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        AsyncStorage.multiSet([
          ['TOKEN', result.accessToken],
          ['NAME', result.user.givenName],
          ['EMAIL', result.user.email],
        ]);
        this.getDataFromStorage();
      }
      return { cancelled: true };
    } catch (e) {
      console.log('ERROR:', e);
      return { error: true };
    }
  }

  logOut = async () => {
    const keys = ['TOKEN', 'NAME', 'EMAIL'];
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
          <Button style={{ backgroundColor: '#3B5998' }}>
            <IconNB name="logo-facebook" />
          </Button>
          <Button disabled style={{ backgroundColor: '#DD5144' }}>
            <IconNB name="logo-googleplus" />
          </Button>
        </Fab>
      </View>
    );
  }

  render() {
    const { name, email, image } = this.state;
    if (this.state.token) {
      return (
        <Container style={{ backgroundColor: '#fff' }}>
          <MyHeader onPress={() => this.openMenu} name="Login Screen" />
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome {name}</Text>
              <Text style={{ fontSize: 20, fontWeight: 'normal' }}>You are logged in as</Text>
              <Text style={{ fontSize: 20, fontWeight: 'normal' }}>{email}</Text>
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
            <Button
              iconLeft
              block
              danger
              style={{ margin: 15, marginTop: 0 }}
              onPress={() => this.signInWithGoogleAsync()}
            >
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
