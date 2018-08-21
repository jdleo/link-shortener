import React, { Component } from 'react';
import '../App.css';

var firebase = require("firebase");
//for local testing
//var serviceAccount = require('../keys/firebaseKey.json');
if (!firebase.apps.length) {
    firebase.initializeApp({
      "apiKey": process.env.apiKey,
    "authDomain": process.env.authDomain,
    "databaseURL": process.env.databaseURL,
    "projectId": process.env.projectId,
    "storageBucket": process.env.storageBucket,
    "messagingSenderId": process.env.messagingSenderId
  });
}

class LinkAnalytics extends Component {

  componentDidMount() {
    var that = this;
    firebase.database().ref('/links/' + this.props.history.location.pathname.split('/')[1]).once('value').then(function(snapshot) {
      if (snapshot.val()) {
        console.log(that.props.history.location.pathname.split('/')[2]);
        if (snapshot.val().password === that.props.history.location.pathname.split('/')[2]) {
          that.setState({
            visits: snapshot.val().visits
          });
        } else {
          that.setState({
            error: 'invalid analytics password'
          })
        }
      } else {
        that.setState({
          error: 'invalid link'
        });
      }
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      visits: 0
    };
  }

  render() {

    return (
      <div style={{
          'margin-left':'40px',
          'margin-right':'40px',
          'marginTop':'60px',
          'textAlign': 'center'
        }}>
        <h5>Total visits:</h5>
        <div style = {{
            'width':'300px',
            'padding-top':'1px',
            'padding-bottom':'4px',
            'margin': '0 auto',
            'border-radius': '50px',
            'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
          }}>
          <h4 style={{'color': 'blue', 'font-weight':'bold'}}>
            {parseInt(this.state.visits).toLocaleString()}
          </h4>
        </div>
        {this.state.error}
      </div>
    );
  }
}

export default LinkAnalytics;
