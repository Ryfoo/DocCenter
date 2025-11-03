import React from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/ui/PostCard";

function Home({ user, posts }) {
    const navigate = useNavigate();

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    title={post.title}
                    author={post.author.username}
                    banner={post.banner}
                    excerpt={post.excerpt}
                    avatar={post.avatar}
                    user={user}
                    isOwner={user?.username === post.author}
                    onReadMore={() => navigate(`/post/${post.id}`)}
                />
            ))}
        </div>
    );
}

export default Home;
