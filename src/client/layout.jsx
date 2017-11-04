import React from 'react';
import { Appbar } from './partial';

const Layout = ({ children }) => (
  <main className="layout">
    <Appbar />
    {children}
  </main>
);

export default Layout;
