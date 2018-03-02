import React, { Component } from 'react';
import { View, Text, CameraRoll, Alert } from 'react-native';
import { Camera, Permissions, ImagePicker } from 'expo';
import { Icon } from 'native-base';

export default class CameraComponent extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    console.log('snap pressed');
    if (this.camera) {
      await this.camera.takePictureAsync({ base64: true, quality: 0.5 }).then((result) => {
        console.log(result);
        CameraRoll.saveToCameraRoll(result.uri)
          .then(Alert.alert('photo added to camera roll/DCIM'))
          .catch(err => Alert.alert(err));
      });
    }
  };

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    alert(result.uri);
    console.log(result);
  };

  render() {
    console.log('render');
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginBottom: 15,
              alignItems: 'flex-end',
            }}
          >
            <Icon
              name="ios-reverse-camera"
              style={{ color: 'white', fontSize: 36 }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}
            />

            <View style={{ alignItems: 'center' }}>
              <Icon name="camera" style={{ color: 'white', fontSize: 80 }} onPress={this.snap} />
            </View>
            <Icon
              name="images"
              style={{ color: 'white', fontSize: 36 }}
              onPress={this.pickImagel}
            />
          </View>
        </Camera>
      </View>
    );
  }
}
