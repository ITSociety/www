import React from 'react';
import { Appbar, Footer } from './partial';

export default ({ children }) => (
  <main className="layout">
    <Appbar />
    {children}
    <Footer />
  </main>
);
