import React from 'react';
import { Root } from 'native-base';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/login/index';
import MapScreen from '../screens/map/index';
import SideBarScreen from '../screens/sidebar/index';

const Drawer = DrawerNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    MapScreen: { screen: MapScreen },
  },
  {
    initialRouteName: 'MapScreen',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    contentComponent: props => <SideBarScreen {...props} />,
  },
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  },
);

export default () => (
  <Root>
    <AppNavigator />
  </Root>
);