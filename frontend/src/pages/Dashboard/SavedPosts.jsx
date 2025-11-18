import React from "react";
import posts from "../../data/posts";
import { useNavigate } from "react-router-dom";

function SavedPosts({ user, AuthState }) {
    const navigate = useNavigate();

    if (!AuthState) {
        return (
            <div className="text-center mt-20 text-gray-500 dark:text-gray-300">
                You must be logged in to view saved posts.
            </div>
        );
    }

    const savedPosts = posts.filter((post) => user.savedPosts?.includes(post.id));

    if (!savedPosts.length) {
        return (
            <div className="text-center mt-20 text-gray-500 dark:text-gray-300">
                You have no saved posts yet.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
                Saved Posts
            </h1>

            {savedPosts.map((post) => (
                <div
                    key={post.id}
                    className="p-4 border rounded-lg hover:shadow-md cursor-pointer dark:border-gray-700 dark:bg-gray-800"
                    onClick={() => navigate(`/post/${post.id}`)}
                >
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {post.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
                </div>
            ))}
        </div>
    );
}

export default SavedPosts;
