import { h } from 'preact';
import { Link } from 'preact-router/match';

const Appbar = () => (
  <div className="appbar">
    <div className="appbar-inner gutter">
      <ul className="menu-items">
        <Link href="/" activeClassName="selected">Home</Link>
        <Link href="/about" activeClassName="selected">About Us</Link>
        <a href="https://www.facebook.com/UoPItSociety/">Facebook</a>
      </ul>
    </div>
  </div>
);

export default Appbar;
