import { h } from 'preact';

import { listToLink } from '../util';

const heroLinks = [
  { link: 'https://membership.upsu.net/group/it-society#join', title: 'Sign Up' },
  { link: '/about', title: 'About' },
  { link: '/past-events', title: 'Past Events' },
];


const Hero = () => (
  <div className="hero-main">
    <div className="hero-banner gutter">
      <img className="hero-image banner-item" src="/public/favicon.png" alt="IT Society Logo" />
      <h1 className="hero-text banner-item">The IT Society</h1>
    </div>
    <div className="hero-link-wrapper gutter">
      <ul className="hero-links">
        {listToLink(heroLinks)}
      </ul>
    </div>
  </div>
);

export default Hero;
