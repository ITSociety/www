import Typography from 'material-ui/Typography';
import React from 'react';

import { listToLink } from '../util.jsx';

const heroLinks = [
  { link: 'https://membership.upsu.net/group/it-society#join', title: 'Sign Up' },
  { link: '/about', title: 'About' },
  { link: '/past-events', title: 'Past Events' },
];


export default () => (
  <div className="hero-main gutter">
    <div className="hero-banner">
      <img className="hero-image banner-item" src="/public/favicon.png" alt="IT Society Logo" />
      <Typography type="display4" className="banner-item">The IT Society</Typography>
    </div>
    <div className="hero-link-wrapper">
      <ul className="hero-links">
        {listToLink(heroLinks)}
      </ul>
    </div>
  </div>
);
