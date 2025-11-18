import { useState } from "react";

export default function Account() {
    const [username, setUsername] = useState("test user");
    const [bio, setBio] = useState("test bio");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Account updated:", { username, bio });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Account Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="textarea textarea-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                        rows={3}
                    />
                </div>

                <button
                    type="submit"
                    className="btn border-none text-white shadow-none border-none"
                    style={{ backgroundColor: "#d44bb7" }}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};


