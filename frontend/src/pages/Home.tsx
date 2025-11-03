import { useNavigate } from "react-router-dom";
import PostCard from "../components/ui/PostCard";

// Define the shape of a post
interface Author {
    username: string;
}

interface Post {
    id: number;
    title: string;
    author: Author;
    banner: string;
    excerpt: string;
    avatar: string;
}

// Define user type
interface User {
    username: string;
    avatar: string;
}

// Props for the Home component
interface HomeProps {
    User: User | null;
    posts: Post[];
}

const Home: React.FC<HomeProps> = ({ User, posts }) => {
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
                    user={User}
                    isOwner={User?.username === post.author.username}
                    onReadMore={() => navigate(`/post/${post.id}`)}
                />
            ))}
        </div>
    );
};

export default Home;
