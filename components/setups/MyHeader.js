import React, { Component } from 'react';
import { Header, Left, Button, Body, Right, Icon, Title } from 'native-base';
import PropTypes from 'prop-types';

class MyHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={this.props.onPress()}>
            <Icon name="md-menu" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.name}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

MyHeader.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default MyHeader;
