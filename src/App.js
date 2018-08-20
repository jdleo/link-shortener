import React, { Component } from 'react';
import {Button, Textfield} from 'react-mdl';
import './App.css';

class App extends Component {
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
            'border-radius': '4px',
            'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
          }}>
          <Textfield
              style={{'width':'600px'}}
              onChange={() => {}}
              pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
              error="Input is not a link 😑"
              label="Link to shorten"
              floatingLabel
          />
          <br/><br/>
          <Button raised ripple colored style={{'width':'200px', 'height': '50px', 'font-size':'20px'}}>Short</Button>
          <br/><br/>
        </div>
      </div>
    );
  }
}

export default App;
