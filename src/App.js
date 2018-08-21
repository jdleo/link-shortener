import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Link from './Components/Link';
import LinkAnalytics from './Components/LinkAnalytics';

class App extends Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/:linkhash/:linkpassword' component={LinkAnalytics}/>
            <Route path='/:linkhash' component={Link}/>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
