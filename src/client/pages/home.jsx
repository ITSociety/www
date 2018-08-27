import { h } from 'preact';
import { Events, Hero } from '../partial';

const Home = () => (
  <div className="home page">
    <Hero />
    <Events />
  </div>
);

export default Home;
