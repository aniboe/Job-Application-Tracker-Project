import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { TbLayoutSidebarRightExpand, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { MdSpaceDashboard, MdListAlt, MdViewKanban, MdLogout } from "react-icons/md";
import { IoMdSettings } from 'react-icons/io';
import { api } from '../main';

function SideNav() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post(`/user/logout`);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div 
      className={`bg-[#EDECEC] dark:bg-zinc-950 h-screen border-r border-[#DFDEDE] dark:border-zinc-850 overflow-y-auto transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className='h-full mx-2 flex flex-col justify-between py-5'>
        <div>
          {/* Brand / Logo */}
          <div className='text-3xl font-bold text-center mb-6'>
            <h1 className='text-blue-600 dark:text-blue-500 transition-all'>
              {isCollapsed ? 'LT' : 'L Tracker'}
            </h1>
          </div>

          {/* Section Header & Toggle Button */}
          <div className='flex items-center justify-between px-2 mb-2'>
            {!isCollapsed && (
              <h2 className='text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider'>
                MAIN MENU
              </h2>
            )}
            <button 
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer ${
                isCollapsed ? 'mx-auto' : ''
              }`}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <TbLayoutSidebarLeftExpand className="text-xl" />
              ) : (
                <TbLayoutSidebarRightExpand className="text-xl" />
              )}
            </button>
          </div>

          <hr className='text-[#B2B1B1] dark:border-zinc-800 mb-4 border rounded-full mx-1' />

          {/* Main Nav Links */}
          <nav>
            <ul className='flex flex-col gap-1'>
              <li>
                <Link 
                  to="/dashboard" 
                  title={isCollapsed ? "Dashboard" : ""}
                  className={`h-11 rounded-xl flex items-center text-zinc-600 dark:text-zinc-300 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-zinc-900 dark:hover:text-blue-400 transition-colors ${
                    isCollapsed ? 'justify-center' : 'px-3'
                  }`}
                >
                  <MdSpaceDashboard className="text-xl shrink-0" />
                  {!isCollapsed && <span className='text-base pl-3 whitespace-nowrap'>Dashboard</span>}
                </Link>
              </li>

              <li>
                <Link 
                  to="/applications" 
                  title={isCollapsed ? "Application" : ""}
                  className={`h-11 rounded-xl flex items-center text-zinc-600 dark:text-zinc-300 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-zinc-900 dark:hover:text-blue-400 transition-colors ${
                    isCollapsed ? 'justify-center' : 'px-3'
                  }`}
                >
                  <MdListAlt className="text-xl shrink-0" />
                  {!isCollapsed && <span className='text-base pl-3 whitespace-nowrap'>Application</span>}
                </Link>
              </li>

              <li>
                <Link 
                  to="/kanban" 
                  title={isCollapsed ? "Kanban Board" : ""}
                  className={`h-11 rounded-xl flex items-center text-zinc-600 dark:text-zinc-300 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-zinc-900 dark:hover:text-blue-400 transition-colors ${
                    isCollapsed ? 'justify-center' : 'px-3'
                  }`}
                >
                  <MdViewKanban className="text-xl shrink-0" />
                  {!isCollapsed && <span className='text-base pl-3 whitespace-nowrap'>Kanban Board</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className='mt-auto'>
          <ul className='flex flex-col gap-1'>
            <li>
              <Link 
                to="/settings" 
                title={isCollapsed ? "Settings" : ""}
                className={`h-11 rounded-xl flex items-center text-zinc-600 dark:text-zinc-300 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-zinc-900 dark:hover:text-blue-400 transition-colors ${
                  isCollapsed ? 'justify-center' : 'px-3'
                }`}
              >
                <IoMdSettings className="text-xl shrink-0" />
                {!isCollapsed && <span className='text-base pl-3 whitespace-nowrap'>Settings</span>}
              </Link>
            </li>

            <li>
              <button 
                type="button"
                onClick={handleLogout}
                title={isCollapsed ? "Logout" : ""}
                className={`w-full h-11 rounded-xl flex items-center text-red-600 dark:text-rose-400 hover:bg-red-100 dark:hover:bg-rose-950/40 dark:hover:text-rose-300 transition-colors cursor-pointer ${
                  isCollapsed ? 'justify-center' : 'px-3'
                }`}
              >
                <MdLogout className="text-xl shrink-0" />
                {!isCollapsed && <span className='text-base pl-3 whitespace-nowrap'>Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNav;