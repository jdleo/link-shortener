import React, { Component } from 'react';
import {Button, Textfield} from 'react-mdl';
import '../App.css';

class Link extends Component {

  render() {
    return (
      <div>
        {this.props.history.location.pathname}
      </div>
    );
  }
}

export default Link;
