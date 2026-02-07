import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function MyPosts({ user, AuthState }) {
    const navigate = useNavigate();

    if (!AuthState) {
        return (
            <div className="text-center mt-20 text-gray-500 dark:text-gray-300">
                You must be logged in to view your posts.
            </div>
        );
    }

    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getPosts();
                const all = res.data || [];
                const mine = all.filter((p) => p.author && p.author.username === user.username);
                setMyPosts(mine);
            } catch (err) {
                setMyPosts([]);
            }
        };
        if (user && user.username) fetch();
    }, [user]);

    if (!myPosts.length) {
        return (
            <div className="text-center mt-20 text-gray-500 dark:text-gray-300">
                You haven't published any posts yet.
            </div>
        );
    }

    const handleEdit = (postId) => {
        navigate(`/edit/${postId}`);
    };

    const handleDelete = async (postId) => {
        if (!confirm("Delete this post?")) return;
        try {
            await deletePost(postId);
            setMyPosts((prev) => prev.filter((p) => p.id !== postId));
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
                My Publications
            </h1>

            {myPosts.map((post) => (
                <div
                    key={post.id}
                    className="p-4 border rounded-lg hover:shadow-md cursor-pointer flex justify-between items-center dark:border-gray-700 dark:bg-gray-800"
                >
                    <div onClick={() => navigate(`/post/${post.id}`)} className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {post.title}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
                    </div>

                    <div className="flex gap-3 ml-4">
                        <button
                            onClick={() => handleEdit(post.id)}
                            className="btn btn-ghost text-gray-400 hover:text-green-500"
                        >
                            <FaEdit className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleDelete(post.id)}
                            className="btn btn-ghost text-gray-400 hover:text-red-500"
                        >
                            <FaTrash className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyPosts;
