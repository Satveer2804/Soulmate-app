import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 lg:ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;