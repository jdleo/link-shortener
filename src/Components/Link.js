import React, { Component } from 'react';
import '../App.css';

var firebase = require("firebase");
var serviceAccount = require('../keys/firebaseKey.json');
if (!firebase.apps.length) {
    firebase.initializeApp(serviceAccount);
}

class Link extends Component {

  componentDidMount() {
    var that = this;
    firebase.database().ref('/links/' + this.props.history.location.pathname.split('/')[1]).once('value').then(function(snapshot) {
      if (snapshot.val()) {
        that.setState({
          redirectLink: snapshot.val().link
        });
        if (snapshot.val().link.startsWith('http://') || snapshot.val().link.startsWith('https://')) {
          window.open(snapshot.val().link, "_self");
        } else {
          window.open("http://" + snapshot.val().link, "_self");
        }
      } else {
        that.setState({
          redirectLink: 'invalid link'
        });
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      redirectLink: ''
    };
  }

  render() {
    return (
      <div>
        redirecting to {this.state.redirectLink}...
      </div>
    );
  }
}

export default Link;
