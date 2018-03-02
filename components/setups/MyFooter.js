import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';

export default class MyFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button active full>
            <Text>4ME305 Assignment 2</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
