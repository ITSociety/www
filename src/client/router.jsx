// main imports
import { h, render } from 'preact';
import Router from 'preact-router';
import 'materialize-css/sass/materialize.scss';

import Layout from './layout';
import { Home, Event, About, Member, Calc, Leaderboard } from './Pages';

import './styles/style.scss';

const main = document.getElementById('main');

const router = (
  <Layout>
    <Router>
      <Member path="/member/:name" />
      <Event path="/event/:slug" />
      <About path="/about" />
      <Calc path="/grade-calc" />
      <Leaderboard path="/leaderboard" />
      <Home path="/" />
    </Router>
  </Layout>
);

render(router, main);
