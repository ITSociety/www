import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './pages';

const onUpdate = () => window.scrollTo(0, 0);

const App = () => (
  <Router onUpdate={onUpdate}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
);

const entry = document.getElementById('react');
console.log('entry');

ReactDOM.render(<App />, entry);
