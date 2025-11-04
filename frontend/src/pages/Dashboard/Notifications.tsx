import { useState, useEffect } from "react";

interface Notification {
    id: number;
    message: string;
    time: string;
    read: boolean;
}

interface User {
    username: string;
    email?: string;
}

interface NotificationsPageProps {
    user?: User | null;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ user }) => {
    const defaultNotifications: Notification[] = [
        { id: 1, message: "New comment on your post", time: "5 minutes ago", read: false },
        { id: 2, message: "Your password was changed successfully", time: "1 hour ago", read: false },
        { id: 3, message: "New follower: John Doe", time: "3 hours ago", read: false },
        { id: 4, message: "Your post has been liked by Jane", time: "6 hours ago", read: false },
    ];

    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (user) {
            setNotifications(defaultNotifications);
        } else {
            setNotifications([]);
        }
    }, [user]);

    const markAsRead = (id: number) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const deleteNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-300">
                Please log in to view your notifications.
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    Notifications
                </h1>

                {notifications.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-300">You have no notifications.</p>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg transition-colors ${notif.read
                                    ? "bg-gray-100 dark:bg-gray-700"
                                    : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                            >
                                <div className="mb-2 sm:mb-0">
                                    <p className="text-gray-800 dark:text-gray-100 font-medium">
                                        {notif.message}
                                    </p>
                                    <span className="text-gray-500 dark:text-gray-300 text-sm">
                                        {notif.time}
                                    </span>
                                </div>

                                <div className="flex space-x-2">
                                    {!notif.read && (
                                        <button
                                            className="btn btn-xs text-white shadow-none border-none"
                                            style={{ backgroundColor: "#2f43c8" }}
                                            onClick={() => markAsRead(notif.id)}
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-xs text-white shadow-none border-none"
                                        style={{ backgroundColor: "#d44bb7" }}
                                        onClick={() => deleteNotification(notif.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
