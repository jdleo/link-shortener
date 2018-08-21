import React, { Component } from 'react';
import {Button, Textfield} from 'react-mdl';
import '../App.css';

var crypto = require('crypto');
var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

var firebase = require("firebase");
var serviceAccount = require('../keys/firebaseKey.json');
firebase.initializeApp(serviceAccount);

class Home extends Component {

  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  componentDidMount() {
    firebase.auth().signInAnonymously().catch(function(error) {
    });

    var that = this;
    firebase.database().ref('/linkCount').on('value', function(snapshot) {
      that.setState({
        linkCount: snapshot.val()
      })
    });
  }

  generateLink() {
    //hash the link with some nonces
    const hash = crypto.createHash('sha256').update(this.state.text + '_' + Date.now() + Math.random()).digest('hex');
    //result link hash
    var res = "";
    //loop by fours
    for (var i = 0; i < 24; i += 4) {
      //take 4-byte chunks of hex digest (sha256 result hash)
      var chunk = hash.substring(i,i+4);
      //convert chunk to decimal
      chunk = parseInt(chunk, 16);
      //take decimal mod 62 for result character for link hash
      res += chars.charAt(chunk % 62);
    }

    this.setState({
      lastLink: res
    })
  }

  renderLink() {
    var analyticsPassword = crypto.createHash('sha256').update(this.state.lastLink).digest('hex');
    analyticsPassword = analyticsPassword.substring(0,8);
    if (this.state.lastLink) {
      return (
        <div>
          <h5>Link:</h5>
          <div style ={{
              'width':'700px',
              'padding-top':'20px',
              'padding-bottom':'20px',
              'margin': '0 auto',
              'marginTop': '5px',
              'border-radius': '10px',
              'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
            }}>
            <a href={`http://sac.cx/${this.state.lastLink}`} style={{'font-size':'30px'}}>{`sac.cx/${this.state.lastLink}`}</a>
          </div>
          <h5>Link analytics:</h5>
          <div style ={{
              'width':'700px',
              'padding-top':'20px',
              'padding-bottom':'20px',
              'margin': '0 auto',
              'marginTop': '5px',
              'border-radius': '10px',
              'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
            }}>
            <a href={`http://sac.cx/${this.state.lastLink}/${analyticsPassword}`} style={{'font-size':'30px'}}>{`sac.cx/${this.state.lastLink}/${analyticsPassword}`}</a>
          </div>
        </div>
      )
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      lastLink: '',
      linkCount: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div style={{
          'margin-left':'40px',
          'margin-right':'40px',
          'marginTop':'60px',
          'textAlign': 'center'
        }}>
        <div style = {{
            'background-color':'blue',
            'width': '350px',
            'margin': '0 auto',
            'border-radius': '50px',
            'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
          }}>
          <h1 style={{'color':'white'}}>sac.cx</h1>
        </div>
        <div style = {{
            'width':'700px',
            'padding-top':'20px',
            'padding-bottom':'20px',
            'margin': '0 auto',
            'marginTop': '50px',
            'border-radius': '10px',
            'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
          }}>
          <Textfield
              style={{'width':'600px'}}
              onChange={this.handleChange}
              pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
              error="Input is not a link 😑"
              label="Link to shorten"
              floatingLabel
          />
          <br/><br/>
          <Button raised ripple colored style={{
              'width':'200px',
              'height': '50px',
              'font-size':'20px',
              'border-radius': '50px',
              'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
            }} onClick={() => {this.generateLink()}}>Short</Button>
        </div>
        {this.renderLink()}
        <h5>Links generated on sac.cx:</h5>
        <div style = {{
            'width':'300px',
            'padding-top':'1px',
            'padding-bottom':'4px',
            'margin': '0 auto',
            'border-radius': '50px',
            'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
          }}>
          <h4 style={{'color': 'blue', 'font-weight':'bold'}}>
            {parseInt(this.state.linkCount).toLocaleString()}
          </h4>
        </div>
      </div>
    );
  }
}

export default Home;
