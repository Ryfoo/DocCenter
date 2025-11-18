import { useState } from "react";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }

        console.log("Password changed successfully!");
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Change Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                    />
                </div>

                <button
                    type="submit"
                    className="btn border-none text-white shadow-none border-none"
                    style={{ backgroundColor: "#d44bb7" }}
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};


