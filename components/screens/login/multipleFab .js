import React, { Component } from 'react';
import { Fab, Button, IconNB, View } from 'native-base';

class MultipleFab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  render() {
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
}

export default MultipleFab;
