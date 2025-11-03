import { Link, NavLink } from "react-router-dom";
import ThemeToggle from './ui/ThemeToggle';
import SearchBar from "./ui/SearchBar";
import RegisterButtons from "./ui/RegisterButtons";
import { useState } from "react";

function Header({ user, searchQuery, setSearchQuery }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const notificationsList = [
        { id: 1, message: "New comment on your post", time: "5 minutes ago" },
        { id: 2, message: "Your password was changed successfully", time: "1 hour ago" },
        { id: 3, message: "New follower: John Doe", time: "3 hours ago" },
        { id: 4, message: "Your post has been liked by Jane", time: "6 hours ago" },
    ];

    const menuItems = [
        { id: 1, label: "Profile", to: "/profile" },
        { id: 2, label: "Notifications", to: "/notifications" },
        { id: 3, label: "Settings", to: "/settings" },
        { id: 4, label: "Saved Posts", to: "/saved" },
        { id: 5, label: "Logout", to: "/logout" },
    ];

    const menuItemsOut = [
        { id: 1, label: "Login", to: "/login" },
        { id: 2, label: "Signup", to: "/signup" },
    ];

    const handleCloseNotif = () => setNotifOpen(false);
    return (
        <div className="navbar bg-base-100 shadow-sm dark:bg-gray-900 px-4 relative">

            {/* Left: ThemeToggle + Search */}
            <div className="flex items-center space-x-2 absolute left-4">
                <ThemeToggle />

                {/* Large screens: full search bar */}
                <div className="hidden lg:block">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>

                {/* Medium/small: search icon */}
                <div className="lg:hidden dropdown dropdown-end">
                    <button
                        className="btn btn-ghost btn-circle hover:bg-transparent hover:shadow-none"
                        onClick={() => setSearchOpen(!searchOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 stroke-gray-800 dark:stroke-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.7" y2="16.7" />
                        </svg>
                    </button>
                    {searchOpen && (
                        <div className="dropdown-content mt-2 p-2 w-64 bg-base-200 dark:bg-gray-700 rounded-box shadow absolute left-0">
                            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        </div>
                    )}
                </div>
            </div>

            {/* Center: Logo */}
            <div className="navbar-center absolute left-1/2 transform -translate-x-1/2">
                <Link to="/">
                    <img src="/assets/logo.png" alt="Logo" className="w-42 h-28" />
                </Link>
            </div>

            {/* Right side */}
            <div className="navbar-end absolute right-4 flex items-center space-x-3">

                {/* Desktop / large screens */}
                <div className="hidden lg:flex items-center space-x-3">
                    {user ? (
                        <>
                            {/* Notifications dropdown */}
                            <div className="dropdown dropdown-end relative">
                                <button
                                    className="btn btn-ghost btn-circle"
                                    onClick={() => setNotifOpen(!notifOpen)}
                                >
                                    <div className="indicator">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-7 w-7 stroke-gray-800 dark:stroke-gray-200"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            />
                                        </svg>
                                        <span className="badge badge-xs badge-primary indicator-item"></span>
                                    </div>
                                </button>

                                {notifOpen && (
                                    <ul className="dropdown-content menu p-2 shadow-lg mt-2 w-80 bg-base-200 dark:bg-gray-700 rounded-box absolute right-0 z-50">
                                        {notificationsList.map((notif) => (
                                            <li
                                                key={notif.id}
                                                className="mb-2 p-2 bg-gray-100 dark:bg-gray-600 rounded-md"
                                            >
                                                <span className="text-gray-800 dark:text-gray-100 text-sm">
                                                    {notif.message}
                                                </span>
                                                <span className="text-gray-500 dark:text-gray-300 text-xs block">
                                                    {notif.time}
                                                </span>
                                            </li>
                                        ))}

                                        <div className="mt-2 flex justify-between">
                                            <Link
                                                to="/notifications"
                                                className="btn btn-xs text-white"
                                                style={{ backgroundColor: "#2f43c8" }}
                                                onClick={handleCloseNotif}
                                            >
                                                See All
                                            </Link>
                                            <Link
                                                to="/settings"
                                                className="btn btn-xs text-white"
                                                style={{ backgroundColor: "#d44bb7" }}
                                                onClick={handleCloseNotif}
                                            >
                                                Settings
                                            </Link>
                                        </div>
                                    </ul>
                                )}
                            </div>

                            {/* Avatar + menu */}
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.avatarUrl || "/assets/default-avatar.png"} alt="User Avatar" />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu dropdown-content bg-base-200 dark:bg-gray-700 rounded-box w-52 p-2 shadow mt-2"
                                >
                                    {menuItems.map((item) => (
                                        <li key={item.id}>
                                            <NavLink to={item.to} className="dark:text-base-200">
                                                {item.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <RegisterButtons />
                    )}
                </div>

                {/* Mobile / medium menu */}
                <div className="lg:hidden dropdown dropdown-end">
                    {user ? (
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.avatarUrl || "/assets/default-avatar.png"} alt="User Avatar" />
                            </div>
                        </label>
                    ) : (
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 stroke-gray-800 dark:stroke-gray-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                    )}

                    <ul tabIndex={0} className="menu dropdown-content mt-2 p-2 shadow bg-base-200 dark:bg-gray-700 rounded-box w-52">
                        {user
                            ? menuItems.map((item) => (
                                <li key={item.id}>
                                    <NavLink to={item.to} className="dark:text-base-200">
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))
                            : menuItemsOut.map((item) => (
                                <li key={item.id}>
                                    <NavLink to={item.to} className="dark:text-white">
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
