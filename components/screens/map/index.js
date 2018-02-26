import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
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
  Spinner,
} from 'native-base';
import { MapView, Location, Permissions } from 'expo';
import styles from './styles';

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

        <Footer>
          <View style={[styles.bubble, styles.latlng]}>
            <Text style={{ textAlign: 'center' }}>
              {this.state.location.coords.latitude.toPrecision(7)},
              {this.state.location.coords.longitude.toPrecision(7)}
            </Text>
          </View>
          <FooterTab>
            <Button active full>
              <Text>4me305 assignment 2</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
