import React from 'react';
import { Appbar, Footer } from './partial';

const Layout = ({ children }) => (
  <main className="layout">
    <Appbar />
    {children}
    <Footer />
  </main>
);

export default Layout;
