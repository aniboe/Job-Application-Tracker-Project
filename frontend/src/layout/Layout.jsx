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
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <TopBar />

        {/* Dynamic Route Content - full width & height utilization */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 flex flex-col">
          <div className="w-full h-full flex-1 flex flex-col min-h-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;