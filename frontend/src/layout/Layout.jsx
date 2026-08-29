import React from 'react';
import SideNav from './SideNav.jsx';
import TopBar from './TopBar.jsx';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="h-screen flex bg-zinc-50 overflow-hidden font-sans text-zinc-900">
      {/* Sidebar Navigation */}
      <SideNav />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;