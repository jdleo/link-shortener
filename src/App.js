import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';

class App extends Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
