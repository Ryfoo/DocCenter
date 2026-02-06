import { useState, useEffect } from "react";
import { getNotifications, markNotificationRead, deleteNotification } from "../../services/api";

interface Notification {
    id: number;
    message: string;
    time: string;
    read: boolean;
}
interface AuthState {
    isLoggedIn: boolean
}
interface User {
    username: string;
    email?: string;
}

interface NotificationsPageProps {
    User?: User | null;
    AuthState: AuthState | false;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ User, AuthState }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetch = async () => {
            if (!User) return setNotifications([]);
            try {
                const res = await getNotifications();
                const data = res.data;
                const mapped = data.map((n: any) => ({ id: n.id, message: `${n.actor?.username || ''} ${n.verb} ${n.target_type || ''}`, time: new Date(n.timestamp).toLocaleString(), read: !n.unread }));
                setNotifications(mapped);
            } catch (err) {
                setNotifications([]);
            }
        };
        fetch();
    }, [User]);

    const markAsRead = async (id: number) => {
        try {
            await markNotificationRead(id);
            setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
        } catch (err) {
            // ignore
        }
    };

    const removeNotification = async (id: number) => {
        try {
            await deleteNotification(id);
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        } catch (err) {
            // ignore
        }
    };

    if (!AuthState) {
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
                                        onClick={() => removeNotification(notif.id)}
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
