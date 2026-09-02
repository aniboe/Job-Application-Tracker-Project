import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoInvertModeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { userValue } from '../redux/slices/userData.slice.js';

function TopBar() {
    const location = useLocation();
    const userData = useSelector(userValue);

    // Initialize from localStorage or check HTML element
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark' || 
            document.documentElement.classList.contains('dark');
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark((theme) => !theme);
    };

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
        <header className="h-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800/90 px-6 flex items-center justify-between transition-colors">
            {/* Page Title & Date */}
            <div>
                <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                    {getTitle(location.pathname)}
                </h1>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    {formattedDate}
                </p>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Dark Mode Toggle Button */}
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                    <IoInvertModeOutline size={20} />
                </button>

                {/* Notification Icon */}
                <button
                    type="button"
                    className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative cursor-pointer"
                    title="Notifications"
                >
                    <IoIosNotificationsOutline size={22} />
                </button>

                <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-1">
                    <div className="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-200 select-none transition-colors">
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
                    
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 hidden sm:block">
                        {userData?.username || "Guest"}
                    </span>
                </div>
            </div>
        </header>
    );
}

export default TopBar;