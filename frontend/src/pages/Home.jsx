import PostCard from "../components/ui/PostCard";

function Home() {
    const posts = [
        { id: 1, title: "AI in Dentistry", author: "Dr. John Doe", summary: "Artificial Intelligence is transforming healthcare...Artificial Intelligence is transforming healthcare...", img: "../../public/assets/post1.jpg", avatar: "../../public/assets/profile1.jpg" },
        { id: 2, title: "Eco-Friendly Implants", author: "Dr. Sarah Lee", summary: "Exploring sustainable materials for implants...", img: "../../public/assets/post2.jpg", avatar: "../../public/assets/profile2.jpg" },
        { id: 3, title: "AI in Dentistry", author: "Dr. John Doe", summary: "Artificial Intelligence is transforming healthcare...", img: "../../public/assets/post3.jpg", avatar: "../../public/assets/profile3.jpg" },
        { id: 4, title: "Eco-Friendly Implants", author: "Dr. Sarah Lee", summary: "Exploring sustainable materials for implants...", img: "../../public/assets/post2.jpg", avatar: "../../public/assets/profile4.jpg" },
        { id: 5, title: "AI in Dentistry", author: "Dr. John Doe", summary: "Artificial Intelligence is transforming healthcare...", img: "../../public/assets/post1.jpg", avatar: "../../public/assets/profile5.jpg" },
        { id: 6, title: "Eco-Friendly Implants", author: "Dr. Sarah Lee", summary: "Exploring sustainable materials for implants...", img: "../../public/assets/post2.jpg", avatar: "../../public/assets/profile6.jpg" },
        { id: 7, title: "AI in Dentistry", author: "Dr. John Doe", summary: "Artificial Intelligence is transforming healthcare...", img: "../../public/assets/post3.jpg", avatar: "../../public/assets/profile7.jpg" },
        { id: 8, title: "Eco-Friendly Implants", author: "Dr. Sarah Lee", summary: "Exploring sustainable materials for implants...", img: "../../public/assets/post1.jpg", avatar: "../../public/assets/profile4.jpg" },
        { id: 9, title: "AI in Dentistry", author: "Dr. John Doe", summary: "Artificial Intelligence is transforming healthcare...", img: "../../public/assets/post2.jpg", avatar: "../../public/assets/profile4.jpg" },
        { id: 10, title: "AI in Dentistry", author: "Dr. John Doe", summary: "Artificial Intelligence is transforming healthcare...", img: "../../public/assets/post2.jpg", avatar: "../../public/assets/profile1.jpg" },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
                <PostCard key={post.id} {...post} banner={post.img} excerpt={post.summary} avatar={post.avatar} />
            ))}
        </div>
    );
}

export default Home;
