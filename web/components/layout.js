import React from 'react';
import Footer from '../components/utility/site/Footer'

const Layout = ({ user, loading = false, children }) => (
  <div className="bg-global min-h-screen">
    {children}
    <Footer />
  </div>
);

export default Layout;
