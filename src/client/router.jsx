// main imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './layout.jsx';
import { Home, EventPage, AboutPage, PastEventsPage } from './pages';

const onUpdate = () => window.scrollTo(0, 0);

const App = () => (
  <Router onUpdate={onUpdate}>
    <Switch>
      <Layout>
        <Route path="/event/:id" component={EventPage} />
        <Route path="/member/:id" component={MemberPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/past-events" component={PastEventsPage} />
        <Route exact path="/" component={Home} />
      </Layout>
    </Switch>
  </Router>
);

const entry = document.getElementById('react');

ReactDOM.render(<App />, entry);
