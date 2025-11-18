import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import posts from "../../data/posts";

function EditPost({ user, AuthState }) {
    const { id } = useParams(); // get post id from URL
    const navigate = useNavigate();

    const post = posts.find((p) => p.id === parseInt(id));

    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [banner, setBanner] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [privacy, setPrivacy] = useState("public");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [coAuthors, setCoAuthors] = useState([]);
    const [coAuthorInput, setCoAuthorInput] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setExcerpt(post.excerpt);
            setBannerPreview(post.banner);
            setPrivacy(post.privacy || "public");
            setTags(post.tags || []);
            setCoAuthors(post.coAuthors || []);
        }
    }, [post]);

    if (!AuthState) {
        return (
            <div className="text-center mt-20 text-gray-500 dark:text-gray-300">
                You must be logged in to edit a post.
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center mt-20 text-gray-500 dark:text-gray-300">
                Post not found.
            </div>
        );
    }

    // Banner upload + preview
    const handleBannerUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (event) => {
            img.onload = () => {
                if (img.width < 600 || img.height < 300) {
                    alert("Banner image is too small. Minimum size is 600x300px.");
                    return;
                }
                setBanner(file);
                setBannerPreview(event.target.result);
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    };

    // Add a tag
    const handleAddTag = () => {
        const trimmed = tagInput.trim();
        if (!trimmed || tags.includes(trimmed.toLowerCase())) return;
        setTags([...tags, trimmed.toLowerCase()]);
        setTagInput("");
    };

    // Add co-author
    const handleAddCoAuthor = () => {
        const trimmed = coAuthorInput.trim();
        if (!trimmed || coAuthors.includes(trimmed)) return;
        setCoAuthors([...coAuthors, trimmed]);
        setCoAuthorInput("");
    };

    // Submit edits
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !excerpt.trim()) {
            alert("Please fill in all required fields.");
            return;
        }

        // Update the post in the posts array
        post.title = title;
        post.excerpt = excerpt;
        post.banner = bannerPreview;
        post.privacy = privacy;
        post.tags = tags;
        post.coAuthors = coAuthors;

        navigate(`/post/${post.id}`);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-base-100 dark:bg-gray-900 shadow-md rounded-xl">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
                Edit Post
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <input
                    type="text"
                    placeholder="Post Title"
                    className="input input-bordered w-full dark:bg-gray-800 dark:text-gray-200"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Content */}
                <textarea
                    placeholder="Post Content / Excerpt"
                    className="textarea textarea-bordered w-full h-40 dark:bg-gray-800 dark:text-gray-200"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                />

                {/* Privacy */}
                <select
                    className="select select-bordered w-full dark:bg-gray-800 dark:text-gray-200"
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value)}
                >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                </select>

                {/* Banner Upload */}
                <div>
                    <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Banner Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full dark:bg-gray-800 dark:text-gray-200 shadow-none"
                        onChange={handleBannerUpload}
                    />
                    {bannerPreview && (
                        <img
                            src={bannerPreview}
                            alt="Preview"
                            className="mt-4 rounded-lg border dark:border-gray-700"
                        />
                    )}
                </div>

                {/* Tags */}
                <div>
                    <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Tags
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Add tag..."
                            className="input input-bordered flex-1 dark:bg-gray-800 dark:text-gray-200"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="btn bg-[#d44bb7] text-white hover:bg-[#b83d9c] shadow-none w-24"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-3">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="badge badge-secondary py-3 cursor-pointer"
                                onClick={() => setTags(tags.filter((t) => t !== tag))}
                            >
                                {tag} ✕
                            </span>
                        ))}
                    </div>
                </div>

                {/* Co-authors */}
                <div>
                    <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Co-authors
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Add co-author username..."
                            className="input input-bordered flex-1 dark:bg-gray-800 dark:text-gray-200"
                            value={coAuthorInput}
                            onChange={(e) => setCoAuthorInput(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleAddCoAuthor}
                            className="btn bg-[#d44bb7] text-white hover:bg-[#b83d9c] shadow-none w-24"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-3">
                        {coAuthors.map((name) => (
                            <span
                                key={name}
                                className="badge badge-info py-3 cursor-pointer"
                                onClick={() =>
                                    setCoAuthors(coAuthors.filter((n) => n !== name))
                                }
                            >
                                {name} ✕
                            </span>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button className="btn bg-[#d44bb7] text-white hover:bg-[#b83d9c] w-full shadow-none">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditPost;
