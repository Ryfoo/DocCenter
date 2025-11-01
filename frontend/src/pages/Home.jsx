import PostCard from "../components/PostCard";

function Home() {
    const posts = [
        { id: 1, title: "AI in Dentistry", author: "Dr. John Doe", summary: "Artificial Intelligence is transforming healthcare...", img: "../../public/assets/logo.png" },
        { id: 2, title: "Eco-Friendly Implants", author: "Dr. Sarah Lee", summary: "Exploring sustainable materials for implants..." },
        { id: 3, title: "AI in Dentistry", author: "Dr. John Doe", summary: "Artificial Intelligence is transforming healthcare..." },
        { id: 4, title: "Eco-Friendly Implants", author: "Dr. Sarah Lee", summary: "Exploring sustainable materials for implants..." },
        { id: 5, title: "AI in Dentistry", author: "Dr. John Doe", summary: "Artificial Intelligence is transforming healthcare..." },
        { id: 6, title: "Eco-Friendly Implants", author: "Dr. Sarah Lee", summary: "Exploring sustainable materials for implants..." },
        { id: 7, title: "AI in Dentistry", author: "Dr. John Doe", summary: "Artificial Intelligence is transforming healthcare..." },
        { id: 8, title: "Eco-Friendly Implants", author: "Dr. Sarah Lee", summary: "Exploring sustainable materials for implants..." },
        { id: 9, title: "AI in Dentistry", author: "Dr. John Doe", summary: "Artificial Intelligence is transforming healthcare..." },
        { id: 10, title: "Eco-Friendly Implants", author: "Dr. Sarah Lee", summary: "Exploring sustainable materials for implants..." },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
                <PostCard key={post.id} {...post} image={post.img} />
            ))}
        </div>
    );
}

export default Home;
