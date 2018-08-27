import { h } from 'preact';

const Footer = () => (
  <div className="footer-main">
    <div className="footer-content gutter">
      <div className="connect">
        <h2>Connect</h2>
        <ul>
          <li> <a href="https://www.facebook.com/UoPItSociety/">Facebook</a></li>
          <li> <a href="https://twitter.com/theitsoc">Twitter</a></li>
          <li> <a href="https://membership.upsu.net/group/it-society">UPSU</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-tagline gutter">
      <p>&copy; IT Society, 2018</p>
    </div>
  </div>
);

export default Footer;
