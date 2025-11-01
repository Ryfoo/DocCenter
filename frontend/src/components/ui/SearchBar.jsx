import { useState } from "react";

export default function SearchBar({ posts, onSearch }) {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (onSearch) {
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(value.toLowerCase())
            );
            onSearch(filtered);
        }
    };

    return (
        <div className="w-full max-w-xs">
            <div className="relative">
                <input
                    type="search"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search posts..."
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                    className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.7" y2="16.7"></line>
                </svg>
            </div>
        </div>
    );
}
