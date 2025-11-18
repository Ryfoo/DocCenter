import React from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/ui/PostCard";

function Home({ User, Posts, AuthState, setUser }) {
    const navigate = useNavigate();

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
            {Posts.map((Post) => (
                <PostCard
                    key={Post.id}
                    postId={Post.id}
                    title={Post.title}
                    author={Post.author.username}
                    banner={Post.banner}
                    excerpt={Post.excerpt}
                    avatar={Post.avatar}
                    user={User}
                    setUser={setUser}
                    AuthState={AuthState}
                    isOwner={User?.id === Post.author.id}
                    onReadMore={() => navigate(`/post/${Post.id}`)}
                />
            ))}
        </div>
    );
}

export default Home;
