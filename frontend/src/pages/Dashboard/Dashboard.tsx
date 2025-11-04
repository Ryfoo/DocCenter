import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

interface User {
    username: string;
    email?: string;
    bio?: string;
    role?: string;
    joined?: string;
    avatar?: string;
}

interface DashboardProps {
    User?: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ User }) => {
    const [darkMode, setDarkMode] = useState<boolean>(
        () => localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // --- Guest view ---
    if (!User) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-base-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
                <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Please log in to view your dashboard.
                </p>
                <button
                    className="px-6 py-2 rounded-md text-white font-semibold shadow-none border-none hover:opacity-90 transition-all duration-200"
                    style={{ backgroundColor: "#2f43c8" }}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    // --- Data ---
    const interactionData = [
        { month: "Jan", interactions: 120 },
        { month: "Feb", interactions: 190 },
        { month: "Mar", interactions: 160 },
        { month: "Apr", interactions: 220 },
        { month: "May", interactions: 200 },
    ];

    const reachData = [
        { name: "Posts", reach: 80 },
        { name: "Comments", reach: 120 },
        { name: "Shares", reach: 60 },
        { name: "Followers", reach: 320 },
    ];

    // --- UI ---
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1017] text-gray-900 dark:text-gray-100 transition-all duration-300 rounded-md">
            <div className="max-w-6xl mx-auto px-6 py-10">
                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-[#2f43c8] ring-offset-base-100 ring-offset-2">
                            <img
                                src={User.avatar || "https://via.placeholder.com/150"}
                                alt={User.username}
                            />
                        </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-3xl font-bold">{User.username}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {User.role || "Member"}
                        </p>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{User.bio}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    {[
                        {
                            label: "Articles Published",
                            value: "12",
                            trend: "↗︎ 4 new this month",
                            color: "#2f43c8",
                        },
                        {
                            label: "Interactions",
                            value: "648",
                            trend: "↗︎ 8% from last week",
                            color: "#d44bb7",
                        },
                        {
                            label: "Account Reach",
                            value: "2.4K",
                            trend: "↘︎ 3% this month",
                            color: "#2f43c8",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl p-6 text-center bg-white dark:bg-[#181a24] transition-colors"
                        >
                            <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1" style={{ color: stat.color }}>
                                {stat.value}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {stat.trend}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Interaction Trends */}
                    <div className="rounded-2xl bg-white dark:bg-[#181a24] p-6 transition-colors">
                        <h3 className="text-lg font-semibold mb-4">Interaction Trends</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={interactionData}>
                                <Line
                                    type="monotone"
                                    dataKey="interactions"
                                    stroke="#2f43c8"
                                    strokeWidth={2}
                                />
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke={darkMode ? "#2a2d3a" : "#e5e7eb"}
                                />
                                <XAxis dataKey="month" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: darkMode ? "#1f2233" : "#ffffff",
                                        border: "none",
                                        color: darkMode ? "#fff" : "#000",
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Reach Overview */}
                    <div className="rounded-2xl bg-white dark:bg-[#181a24] p-6 transition-colors">
                        <h3 className="text-lg font-semibold mb-4">Reach Overview</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={reachData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke={darkMode ? "#2a2d3a" : "#e5e7eb"}
                                />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: darkMode ? "#1f2233" : "#ffffff",
                                        border: "none",
                                        color: darkMode ? "#fff" : "#000",
                                    }}
                                />
                                <Bar dataKey="reach" fill="#d44bb7" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-10">
                    <button
                        className="px-5 py-2 rounded-md text-white font-semibold shadow-none border-none hover:opacity-90 transition-all duration-200"
                        style={{ backgroundColor: "#2f43c8" }}
                    >
                        Edit Profile
                    </button>
                    <button
                        className="px-5 py-2 rounded-md text-white font-semibold shadow-none border-none hover:opacity-90 transition-all duration-200"
                        style={{ backgroundColor: "#d44bb7" }}
                    >
                        View Publications
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
