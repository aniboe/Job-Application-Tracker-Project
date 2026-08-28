import React from 'react';
import { useLocation } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { userValue } from '../redux/slices/userData.slice.js';

function TopBar() {
    const location = useLocation();
    const userData = useSelector(userValue);

    const getTitle = (path) => {
        switch (path) {
            case "/dashboard":
                return "Dashboard";
            case "/applications":
                return "Applications";
            case "/kanban":
                return "Kanban Board";
            case "/settings":
                return "Settings";
            default:
                return "Overview";
        }
    };

    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });

    return (
        <header className="h-16 bg-white border-b border-zinc-200 px-6 flex items-center justify-between">
            {/* Page Title & Date */}
            <div>
                <h1 className="text-lg font-semibold text-zinc-900 leading-tight">
                    {getTitle(location.pathname)}
                </h1>
                <p className="text-xs text-zinc-400 font-medium">
                    {formattedDate}
                </p>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
                {/* Notification Icon */}
                <button
                    type="button"
                    className="p-2 rounded-lg text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors relative"
                    title="Notifications"
                >
                    <IoIosNotificationsOutline size={22} />
                </button>

                <div className="h-6 w-px bg-zinc-200" />

                {/* User Profile */}
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center bg-zinc-100 border border-zinc-200 text-sm font-semibold text-zinc-700 select-none">
                        {userData?.avatar ? (
                            <img 
                                src={userData.avatar} 
                                alt={userData?.username || "Avatar"} 
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span>{userData?.username?.charAt(0).toUpperCase() || "U"}</span>
                        )}
                    </div>
                    
                    <span className="text-sm font-medium text-zinc-700 hidden sm:block">
                        {userData?.username || "Guest"}
                    </span>
                </div>
            </div>
        </header>
    );
}

export default TopBar;