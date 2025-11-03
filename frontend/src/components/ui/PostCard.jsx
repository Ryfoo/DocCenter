import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaHeart,
    FaRegHeart,
    FaBookmark,
    FaRegBookmark,
    FaCommentAlt,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

function PostCard({
    title,
    author,
    banner,
    excerpt,
    avatar,
    user,
    isOwner,
    onReadMore,
}) {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    const requireLogin = (action) => {
        if (!user) {
            setPendingAction(action);
            setShowLoginModal(true);
            return false;
        }
        return true;
    };

    const goToLogin = () => {
        setShowLoginModal(false);
        navigate("/login");
    };

    return (
        <>
            <div className="card group bg-base-100 shadow-md hover:shadow-xl dark:bg-gray-900 transition-all duration-300 overflow-hidden">
                {/* Banner */}
                <figure className="relative">
                    <img src={banner} alt={title} className="w-full h-56 object-cover" />
                </figure>

                {/* Body */}
                <div className="card-body space-y-2">
                    <h2 className="card-title text-gray-900 dark:text-white text-lg font-bold">
                        {title}
                    </h2>
                    <p className="dark:text-gray-300 text-gray-600 text-sm line-clamp-3">
                        {excerpt}
                    </p>

                    {/* Author + Read more */}
                    <div className="card-actions justify-between items-center mt-3">
                        <div className="flex items-center gap-2">
                            <div className="avatar">
                                <div className="mask mask-squircle w-10 h-10">
                                    <img src={avatar} alt={author} />
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">{author}</span>
                        </div>

                        <button
                            onClick={onReadMore}
                            className="btn btn-primary bg-[#d44bb7] hover:bg-[#b63b9b] text-white px-6 py-2 rounded-xl text-sm font-semibold"
                        >
                            Read More
                        </button>
                    </div>

                    {/* Action buttons (visible on hover) */}
                    <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3">
                        {/* Left: Like / Comment / Save */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => requireLogin("like this post") && setLiked(!liked)}
                                className="btn btn-ghost btn-sm text-gray-400 hover:text-pink-500"
                            >
                                {liked ? (
                                    <FaHeart className="w-5 h-5 text-pink-500" />
                                ) : (
                                    <FaRegHeart className="w-5 h-5" />
                                )}
                            </button>

                            <button
                                onClick={() => requireLogin("comment")}
                                className="btn btn-ghost btn-sm text-gray-400 hover:text-blue-500"
                            >
                                <FaCommentAlt className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => requireLogin("save this post") && setSaved(!saved)}
                                className="btn btn-ghost btn-sm text-gray-400 hover:text-yellow-500"
                            >
                                {saved ? (
                                    <FaBookmark className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <FaRegBookmark className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Right: Edit / Delete (for owners only) */}
                        {isOwner && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => requireLogin("edit this post")}
                                    className="btn btn-ghost btn-sm text-gray-400 hover:text-green-500"
                                >
                                    <FaEdit className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => requireLogin("delete this post")}
                                    className="btn btn-ghost btn-sm text-gray-400 hover:text-red-500"
                                >
                                    <FaTrash className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Login required modal */}
            {showLoginModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 dark:bg-white/20"
                        onClick={() => setShowLoginModal(false)}
                        aria-hidden="true"
                    />

                    {/* Modal panel */}
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 ring-1 ring-black/5">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d44bb7] to-[#b63b9b] flex items-center justify-center text-white font-bold">
                                    !
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    Login required
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    You need to be signed in to {pendingAction || "perform this action"}.
                                    <br />
                                    Please log in or create an account to continue.
                                </p>

                                <div className="mt-4 flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowLoginModal(false)}
                                        className="btn btn-ghost"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={goToLogin}
                                        className="btn btn-primary bg-[#2f43c8] hover:bg-[#2f49da] text-white w-52"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PostCard;
