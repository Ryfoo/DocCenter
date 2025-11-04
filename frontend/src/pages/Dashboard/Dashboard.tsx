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

    // If user not logged in
    if (!User) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-base-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
                <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Please log in to view your dashboard.
                </p>
                <button
                    className="px-6 py-2 rounded-md text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: "#2f43c8" }}
                >
                    Go to Login
                </button>
            </div>
        );
    }

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

    return (
        <div className="min-h-screen bg-base-200 dark:bg-[#0f1017] text-gray-900 dark:text-gray-100 transition-all duration-300 rounded-md">
            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-transparent mb-8">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-[#2f43c8] ring-offset-base-100 ring-offset-2">
                            <img
                                src={User.avatar || "https://via.placeholder.com/150"}
                                alt={User.username}
                            />
                        </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            {User.username}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {User.role || "Member"}
                        </p>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{User.bio}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-[#1a1b27] dark:bg-[#181a24] rounded-2xl p-6 text-center">
                        <p className="text-gray-400">Articles Published</p>
                        <h3 className="text-2xl font-bold text-[#2f43c8] mt-1">12</h3>
                        <p className="text-sm text-gray-500 mt-1">↗︎ 4 new this month</p>
                    </div>

                    <div className="bg-[#1a1b27] dark:bg-[#181a24] rounded-2xl p-6 text-center">
                        <p className="text-gray-400">Interactions</p>
                        <h3 className="text-2xl font-bold text-[#d44bb7] mt-1">648</h3>
                        <p className="text-sm text-gray-500 mt-1">↗︎ 8% from last week</p>
                    </div>

                    <div className="bg-[#1a1b27] dark:bg-[#181a24] rounded-2xl p-6 text-center">
                        <p className="text-gray-400">Account Reach</p>
                        <h3 className="text-2xl font-bold text-[#2f43c8] mt-1">2.4K</h3>
                        <p className="text-sm text-gray-500 mt-1">↘︎ 3% this month</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Interaction Trends */}
                    <div className="rounded-2xl bg-[#1a1b27] dark:bg-[#181a24] p-6">
                        <h3 className="text-lg font-semibold mb-4">Interaction Trends</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={interactionData}>
                                <Line
                                    type="monotone"
                                    dataKey="interactions"
                                    stroke="#2f43c8"
                                    strokeWidth={2}
                                />
                                <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" />
                                <XAxis dataKey="month" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1f2233",
                                        border: "none",
                                        color: "#fff",
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Reach Overview */}
                    <div className="rounded-2xl bg-[#1a1b27] dark:bg-[#181a24] p-6">
                        <h3 className="text-lg font-semibold mb-4">Reach Overview</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={reachData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1f2233",
                                        border: "none",
                                        color: "#fff",
                                    }}
                                />
                                <Bar dataKey="reach" fill="#d44bb7" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-10">
                    <button
                        className="px-5 py-2 rounded-md text-white transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: "#2f43c8" }}
                    >
                        Edit Profile
                    </button>
                    <button
                        className="px-5 py-2 rounded-md text-white transition-all duration-200 hover:opacity-90"
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
