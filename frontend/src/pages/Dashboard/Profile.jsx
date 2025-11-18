import React from "react";
import { useNavigate } from "react-router-dom";
import posts from "../../data/posts";

function Profile({ user, AuthState }) {
    const navigate = useNavigate();

    if (!AuthState) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-base-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
                <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Please log in to view your profile.
                </p>
                <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 rounded-md text-white font-semibold shadow-none border-none hover:opacity-90 transition-all duration-200"
                    style={{ backgroundColor: "#2f43c8" }}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    const topPublications = posts
        .filter((post) => post.author === user.username)
        .slice(0, 3); // top 3 posts

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1017] text-gray-900 dark:text-gray-100 transition-all duration-300">
            <div className="max-w-3xl mx-auto px-6 py-20"> {/* Increased top padding */}
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8">
                    <div className="avatar">
                        <div className="w-24 h-24 rounded-full ring ring-[#d44bb7] ring-offset-base-100 ring-offset-2">
                            <img
                                src={user.avatar || "https://via.placeholder.com/150"}
                                alt={user.username}
                            />
                        </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-2xl font-bold">{user.username}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {user.role || "Member"}
                        </p>
                        {user.bio && (
                            <p className="mt-2 text-gray-700 dark:text-gray-300">{user.bio}</p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mb-8"> {/* Increased bottom margin */}
                    <button
                        onClick={() => navigate("/settings/account")}
                        className="px-4 py-2 rounded-md text-white font-semibold shadow-none border-none hover:opacity-90 transition-all duration-200"
                        style={{ backgroundColor: "#2f43c8" }}
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={() => navigate("/myposts/")}
                        className="px-4 py-2 rounded-md text-white font-semibold shadow-none border-none hover:opacity-90 transition-all duration-200"
                        style={{ backgroundColor: "#d44bb7" }}
                    >
                        View Publications
                    </button>
                </div>

                {/* Top Publications */}
                <div className="mt-6"> {/* Added more margin-top */}
                    <h3 className="text-xl font-semibold mb-3">Top Publications</h3>
                    {topPublications.length ? (
                        <div className="space-y-3">
                            {topPublications.map((post) => (
                                <div
                                    key={post.id}
                                    className="p-3 border rounded-lg hover:shadow-md cursor-pointer dark:border-gray-700 dark:bg-gray-800"
                                    onClick={() => navigate(`/post/${post.id}`)}
                                >
                                    <h4 className="font-bold text-gray-900 dark:text-white">
                                        {post.title}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                            No publications yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
