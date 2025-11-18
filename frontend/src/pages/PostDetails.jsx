import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import posts from "../data/posts";
import {
    FaHeart,
    FaRegHeart,
    FaBookmark,
    FaRegBookmark,
    FaCommentDots,
} from "react-icons/fa";

function PostDetail({ user, AuthState }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find((p) => p.id === parseInt(id));

    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    if (!post)
        return (
            <div className="text-center mt-20 text-gray-500 dark:text-gray-300">
                Post not found
            </div>
        );

    const isOwner = true; {/*user && user.id? === post.id?;*/ }

    const handleCommentSubmit = () => {
        if (!AuthState) {
            alert("You must be logged in to comment.");
            return;
        }
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            text: commentText.trim(),
            user: {
                name: user.username,
                avatar: user.avatar,
            },
        };
        setComments([newComment, ...comments]);
        setCommentText("");
    };

    const handleEdit = () => {
        navigate(`/edit/${post.id}`);
    };

    const handleDelete = () => {
        // Simple delete logic: remove from posts array
        const index = posts.findIndex((p) => p.id === post.id);
        if (index > -1) posts.splice(index, 1);
        navigate("/");
    };
    const handleToggleSave = () => {
        setSaved(!saved);

        if (!user) return;

        const savedPosts = user.savedPosts || [];
        if (!saved) {
            user.savedPosts = [...savedPosts, post.id];
        } else {
            user.savedPosts = savedPosts.filter((pid) => pid !== post.id);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-base-100 dark:bg-gray-900 shadow-md rounded-xl transition duration-300 relative">


            {/* Banner */}
            <img
                src={post.banner}
                alt={post.title}
                className="w-full rounded-lg shadow-md mb-6"
            />

            {/* Author */}
            <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={post.avatar} alt={post.author} />
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {post.author}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Science & Healthcare Research
                    </p>
                </div>
            </div>

            {/* Post Content */}
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                {post.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {post.excerpt}
            </p>
            {/* Buttons and 3-dot menu */}
            <div className="flex items-center gap-5 mb-6">
                {/* Like button */}
                <button
                    onClick={() => setLiked(!liked)}
                    className="btn btn-ghost hover:bg-transparent"
                >
                    {liked ? (
                        <FaHeart className="text-red-500 text-xl" />
                    ) : (
                        <FaRegHeart className="text-gray-500 text-xl" />
                    )}
                </button>

                {/* Save button */}
                <button
                    onClick={handleToggleSave}
                    className="btn btn-ghost hover:bg-transparent"
                >
                    {saved ? (
                        <FaBookmark className="text-yellow-500 text-xl" />
                    ) : (
                        <FaRegBookmark className="text-gray-500 text-xl" />
                    )}
                </button>
                {/* Spacer */}
                <div className="flex-1"></div>

                {/* 3-dot menu */}
                {isOwner && (
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-600 dark:text-gray-300 text-2xl font-bold"
                        >
                            ⋮
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-base-100 dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50">
                                <button
                                    onClick={handleEdit}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>


            {/* Comments Section */}
            <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Comments
                </h3>

                <div className="block gap-3 mb-6 items-start">
                    {AuthState ? (
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src={user.avatar} alt={user.username} />
                            </div>
                        </div>
                    ) : (
                        <div className="avatar placeholder">
                            <div className="w-12 bg-neutral-focus text-neutral-content rounded-full">
                                <span>?</span>
                            </div>
                        </div>
                    )}
                    <textarea
                        placeholder={
                            AuthState ? "Write your comment..." : "Login to write a comment..."
                        }
                        className="textarea textarea-bordered w-full dark:bg-gray-800 dark:text-gray-200 resize-none my-4"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        disabled={!AuthState}
                    ></textarea>
                    <button
                        onClick={handleCommentSubmit}
                        disabled={!AuthState}
                        className="btn btn-primary w-24 bg-[#d44bb7] text-white hover:bg-[#b83d9c] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Comment
                    </button>
                </div>

                {comments.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                ) : (
                    <div className="space-y-4">
                        {comments.map((c) => (
                            <div
                                key={c.id}
                                className="flex items-start gap-4 bg-base-200 dark:bg-gray-800 p-4 rounded-lg"
                            >
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={c.user.avatar} alt={c.user.name} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                        {c.user.name}
                                    </h4>
                                    <p className="text-gray-700 dark:text-gray-300">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostDetail;
