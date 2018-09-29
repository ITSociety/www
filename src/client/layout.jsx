import { h } from 'preact';
import { Appbar, Footer } from './partial';

const Layout = ({ children }) => (
  <main className="layout">
    <Appbar />
    {children}
    <Footer />
  </main>
);

export default Layout;
