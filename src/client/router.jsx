// main imports
import { h, render } from 'preact';
import Router from 'preact-router';

import Layout from './layout.jsx';
import { Home, Event, About, Past, Member } from './Pages';


render((
  <Layout>
    <Router>
      <Event path="/event/:id" />
      <Member path="/member/:id" />
      <About path="/about" />
      <Past path="/past-events" />
      <Home path="/" />
    </Router>
  </Layout>), document.getElementById('main'));

