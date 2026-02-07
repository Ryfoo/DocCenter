import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FaHeart,
    FaRegHeart,
    FaBookmark,
    FaRegBookmark,
    FaCommentDots,
} from "react-icons/fa";
import {
    getPost,
    likePost,
    savePost,
    getComments,
    createComment,
    deletePost,
} from "../services/api";

type User = {
    id?: number;
    username?: string;
    avatar?: string | null;
};

type Post = {
    id: number;
    title: string;
    body?: string;
    excerpt?: string;
    banner?: string | null;
    media?: string | null;
    author: { id?: number; username?: string };
    avatar?: string | null;
};

type Comment = {
    id: number;
    body?: string;
    author?: { id?: number; username?: string; avatar?: string | null } | null;
};

interface Props {
    user: User | null;
    AuthState: boolean;
}

const PostDetail: React.FC<Props> = ({ user, AuthState }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [post, setPost] = useState<Post | null>(null);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            try {
                const res = await getPost(id);
                setPost(res.data);
                const cRes = await getComments({ post: id });
                setComments(cRes.data || []);
            } catch (err) {
                setPost(null);
            }
        };
        fetch();
    }, [id]);

    if (!post)
        return (
            <div className="text-center mt-20 text-gray-500 dark:text-gray-300">Post not found</div>
        );

    const isOwner = user && post.author && user.id === post.author.id;

    const handleCommentSubmit = async () => {
        if (!AuthState) return alert("You must be logged in to comment.");
        if (!commentText.trim()) return;
        try {
            const payload = { post: post.id, body: commentText.trim() };
            const res = await createComment(payload);
            setComments((prev) => [res.data, ...prev]);
            setCommentText("");
        } catch (err) {
            // ignore
        }
    };

    const handleEdit = () => navigate(`/edit/${post.id}`);

    const handleDelete = async () => {
        if (!confirm("Delete this post?")) return;
        try {
            await deletePost(post.id);
            navigate("/");
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-base-100 dark:bg-gray-900 shadow-md rounded-xl transition duration-300 relative">
            {/* Banner */}
            {(post.media || post.banner) && (
                <img src={post.media || post.banner || undefined} alt={post.title} className="w-full rounded-lg shadow-md mb-6" />
            )}

            {/* Author */}
            <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={post.avatar || undefined} alt={post.author?.username} />
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{post.author?.username}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Science & Healthcare Research</p>
                </div>
            </div>

            {/* Post Content */}
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">{post.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{post.body || post.excerpt}</p>

            {/* Buttons */}
            <div className="flex items-center gap-5 mb-6">
                <button
                    onClick={async () => {
                        if (!AuthState) return alert("Login to like");
                        try {
                            await likePost(post.id);
                            setLiked((v) => !v);
                        } catch (err) {
                            // ignore
                        }
                    }}
                    className="btn btn-ghost hover:bg-transparent"
                >
                    {liked ? <FaHeart className="text-red-500 text-xl" /> : <FaRegHeart className="text-gray-500 text-xl" />}
                </button>

                <button
                    onClick={async () => {
                        if (!AuthState) return alert("Login to save");
                        try {
                            await savePost(post.id);
                            setSaved((v) => !v);
                        } catch (err) {
                            // ignore
                        }
                    }}
                    className="btn btn-ghost hover:bg-transparent"
                >
                    {saved ? <FaBookmark className="text-yellow-500 text-xl" /> : <FaRegBookmark className="text-gray-500 text-xl" />}
                </button>

                <div className="flex-1"></div>

                {isOwner && (
                    <div className="relative">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 dark:text-gray-300 text-2xl font-bold">⋮</button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-base-100 dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50">
                                <button onClick={handleEdit} className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">Edit</button>
                                <button onClick={handleDelete} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700">Delete</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Comments</h3>

                <div className="block gap-3 mb-6 items-start">
                    {AuthState ? (
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src={user?.avatar || undefined} alt={user?.username || ""} />
                            </div>
                        </div>
                    ) : (
                        <div className="avatar placeholder">
                            <div className="w-12 bg-neutral-focus text-neutral-content rounded-full"><span>?</span></div>
                        </div>
                    )}
                    <textarea
                        placeholder={AuthState ? "Write your comment..." : "Login to write a comment..."}
                        className="textarea textarea-bordered w-full dark:bg-gray-800 dark:text-gray-200 resize-none my-4"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        disabled={!AuthState}
                    ></textarea>
                    <button onClick={handleCommentSubmit} disabled={!AuthState} className="btn btn-primary w-24 bg-[#d44bb7] text-white hover:bg-[#b83d9c] disabled:opacity-50 disabled:cursor-not-allowed">Comment</button>
                </div>

                {comments.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                    <div className="space-y-4">
                        {comments.map((c) => (
                            <div key={c.id} className="flex items-start gap-4 bg-base-200 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={c.author?.avatar || undefined} alt={c.author?.username || "Anonymous"} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{c.author?.username || 'Anonymous'}</h4>
                                    <p className="text-gray-700 dark:text-gray-300">{c.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDetail;
