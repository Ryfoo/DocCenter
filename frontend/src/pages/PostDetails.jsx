import React, { useState } from "react";
import { useParams } from "react-router-dom";
import posts from "../data/posts";
import {
    FaHeart,
    FaRegHeart,
    FaBookmark,
    FaRegBookmark,
    FaCommentDots,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

function PostDetail({ user }) {
    const { id } = useParams();
    const post = posts.find((p) => p.id === parseInt(id));

    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    if (!post)
        return (
            <div className="text-center mt-20 text-gray-500 dark:text-gray-300">
                Post not found
            </div>
        );

    const isOwner =
        user && user.username?.toLowerCase() === post.author?.toLowerCase();

    const handleCommentSubmit = () => {
        if (!user) {
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

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-base-100 dark:bg-gray-900 shadow-md rounded-xl transition duration-300">
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

            {/* Buttons (hover reveal) */}
            <div className="flex gap-5 mb-6 opacity-0 hover:opacity-100 transition duration-300">
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
                <button
                    onClick={() => setSaved(!saved)}
                    className="btn btn-ghost hover:bg-transparent"
                >
                    {saved ? (
                        <FaBookmark className="text-yellow-500 text-xl" />
                    ) : (
                        <FaRegBookmark className="text-gray-500 text-xl" />
                    )}
                </button>
                <button className="btn btn-ghost hover:bg-transparent">
                    <FaCommentDots className="text-blue-500 text-xl" />
                </button>
                {isOwner && (
                    <>
                        <button className="btn btn-ghost hover:bg-transparent">
                            <FaEdit className="text-green-500 text-xl" />
                        </button>
                        <button className="btn btn-ghost hover:bg-transparent">
                            <FaTrash className="text-red-500 text-xl" />
                        </button>
                    </>
                )}
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Comments
                </h3>

                {/* Comment Input */}
                <div className="flex gap-3 mb-6 items-start">
                    {user ? (
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
                            user ? "Write your comment..." : "Login to write a comment..."
                        }
                        className="textarea textarea-bordered w-full dark:bg-gray-800 dark:text-gray-200 resize-none"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        disabled={!user}
                    ></textarea>
                    <button
                        onClick={handleCommentSubmit}
                        disabled={!user}
                        className="btn btn-primary px-6 bg-[#d44bb7] text-white hover:bg-[#b83d9c] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Comment
                    </button>
                </div>

                {/* Comment List */}
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
