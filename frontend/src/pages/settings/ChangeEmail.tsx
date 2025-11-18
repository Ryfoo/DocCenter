import { useState } from "react";


export default function ChangeEmail() {
    const [currentEmail, setCurrentEmail] = useState("alaeddine@example.com");
    const [newEmail, setNewEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email updated:", newEmail);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Change Email
            </h2>
            <p className="mb-6 text-gray-800 dark:text-gray-100">
                An email with a verification link will be sent to your new address. You must confirm it to finalize the change.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">New Email</label>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Enter new email"
                        required
                        className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                    />
                </div>

                <button
                    type="submit"
                    className="btn border-none text-white shadow-none border-none"
                    style={{ backgroundColor: "#d44bb7" }}
                >
                    Update Email
                </button>
            </form>
        </div>
    );
};


