import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { TbLayoutSidebarRightExpand, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { MdSpaceDashboard, MdListAlt, MdViewKanban, MdLogout } from "react-icons/md";
import { IoMdSettings } from 'react-icons/io';
import axios from 'axios';
import { backendUrl } from '../App';

function SideNav() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`${backendUrl}/user/logout`, {}, { withCredentials: true });
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div 
            className={`bg-[#EDECEC] h-screen border-r border-[#DFDEDE] overflow-y-auto transition-all duration-300 ease-in-out ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className='h-full mx-2 flex flex-col justify-between py-5'>
                <div>
                    {/* Brand / Logo */}
                    <div className='text-3xl font-bold text-center mb-6'>
                        <h1 className='text-blue-600 transition-all'>
                            {isCollapsed ? 'LT' : 'L Tracker'}
                        </h1>
                    </div>

                    {/* Section Header & Toggle Button */}
                    <div className='flex items-center justify-between px-2 mb-2'>
                        {!isCollapsed && (
                            <h2 className='text-[11px] font-semibold text-zinc-500 tracking-wider'>
                                MAIN MENU
                            </h2>
                        )}
                        <button 
                            type="button"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={`p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200 transition-colors ${
                                isCollapsed ? 'mx-auto' : ''
                            }`}
                            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                            {/* Shows expand right when collapsed, expand left when open */}
                            {isCollapsed ? (
                                <TbLayoutSidebarRightExpand className="text-xl" />
                            ) : (
                                <TbLayoutSidebarLeftExpand className="text-xl" />
                            )}
                        </button>
                    </div>

                    <hr className='text-[#B2B1B1] mb-4 border-[1px] rounded-full mx-1'/>

                    {/* Main Nav Links */}
                    <nav>
                        <ul className='flex flex-col gap-1'>
                            <li>
                                <Link 
                                    to="/dashboard" 
                                    title={isCollapsed ? "Dashboard" : ""}
                                    className={`h-11 rounded-xl flex items-center text-zinc-600 hover:bg-blue-100 hover:text-blue-700 transition-colors ${
                                        isCollapsed ? 'justify-center' : 'px-3'
                                    }`}
                                >
                                    <MdSpaceDashboard className="text-xl flex-shrink-0" />
                                    {!isCollapsed && <span className='text-base pl-3 whitespace-nowrap'>Dashboard</span>}
                                </Link>
                            </li>

                            <li>
                                <Link 
                                    to="/applications" 
                                    title={isCollapsed ? "Application" : ""}
                                    className={`h-11 rounded-xl flex items-center text-zinc-600 hover:bg-blue-100 hover:text-blue-700 transition-colors ${
                                        isCollapsed ? 'justify-center' : 'px-3'
                                    }`}
                                >
                                    <MdListAlt className="text-xl flex-shrink-0" />
                                    {!isCollapsed && <span className='text-base pl-3 whitespace-nowrap'>Application</span>}
                                </Link>
                            </li>

                            <li>
                                <Link 
                                    to="/kanban" 
                                    title={isCollapsed ? "Kanban Board" : ""}
                                    className={`h-11 rounded-xl flex items-center text-zinc-600 hover:bg-blue-100 hover:text-blue-700 transition-colors ${
                                        isCollapsed ? 'justify-center' : 'px-3'
                                    }`}
                                >
                                    <MdViewKanban className="text-xl flex-shrink-0" />
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
                                className={`h-11 rounded-xl flex items-center text-zinc-600 hover:bg-blue-100 hover:text-blue-700 transition-colors ${
                                    isCollapsed ? 'justify-center' : 'px-3'
                                }`}
                            >
                                <IoMdSettings className="text-xl flex-shrink-0" />
                                {!isCollapsed && <span className='text-base pl-3 whitespace-nowrap'>Settings</span>}
                            </Link>
                        </li>

                        <li>
                            <button 
                                type="button"
                                onClick={handleLogout}
                                title={isCollapsed ? "Logout" : ""}
                                className={`w-full h-11 rounded-xl flex items-center text-red-600 hover:bg-red-100 transition-colors ${
                                    isCollapsed ? 'justify-center' : 'px-3'
                                }`}
                            >
                                <MdLogout className="text-xl flex-shrink-0" />
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