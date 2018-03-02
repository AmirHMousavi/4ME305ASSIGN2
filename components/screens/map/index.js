import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Container, Text, Spinner, Badge } from 'native-base';
import { MapView, Location, Permissions } from 'expo';
import styles from './styles';
import MyHeader from '../../setups/MyHeader';
import MyFooter from '../../setups/MyFooter';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
    };
  }

  componentWillMount() {
    /*     if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocationAsync();
    } */
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  openMenu = () => {
    this.props.navigation.navigate('DrawerOpen');
  };

  render() {
    let text = 'Waiting..';
    if (this.state.location === null) {
      return (
        <View style={styles.container}>
          <Spinner style={{ alignItems: 'center' }} color="blue" />
        </View>
      );
    } else if (this.state.errorMessage) {
      text = this.state.errorMessage;
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>{text}</Text>
        </View>
      );
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    const { width, height } = Dimensions.get('window');
    const ratio = width / height;
    const LATITUDE_DELTA = 0.001;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ratio;

    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <MyHeader onPress={() => this.openMenu} name="MapView Screen" />

        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
              }}
            >
              <View style={styles.mapMarkerOuter}>
                <View style={styles.mapMarkerInner} />
              </View>
            </MapView.Marker>
          </MapView>
        </View>
        <Badge style={{ backgroundColor: 'black', alignSelf: 'center' }}>
          <Text style={{ textAlign: 'center' }}>
            {this.state.location.coords.latitude.toPrecision(7)},
            {this.state.location.coords.longitude.toPrecision(7)}
          </Text>
        </Badge>
        <MyFooter />
      </Container>
    );
  }
}
