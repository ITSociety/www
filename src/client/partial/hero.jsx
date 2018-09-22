import { h } from 'preact';
import { Link } from 'preact-router/match';

const Hero = () => (
  <div className="hero-main">
    <div className="hero-banner gutter">
      <img className="hero-image banner-item" src="/public/favicon.png" alt="IT Society Logo" />
      <h1 className="hero-text banner-item">The IT Society</h1>
    </div>
    <div className="hero-link-wrapper gutter">
      <ul className="hero-links">
        <Link href="https://membership.upsu.net/group/it-society#join" key="sign-up">Sign Up</Link>
        <Link href="/about" key="about">About</Link>
        <Link href="/grade-calc" key="past">Grade Calc</Link>
      </ul>
    </div>
  </div>
);

export default Hero;
