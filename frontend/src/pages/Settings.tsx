import { Link } from "react-router-dom";

// 🧩 Define your types
type User = {
    username: string;
    avatar: string;
};

type SettingOption = {
    label: string;
    to: string;
};

type SettingsProps = {
    User: User | null;
};

// ⚙️ Functional component with typed props
const Settings: React.FC<SettingsProps> = ({ User }) => {
    // 🔒 If no user, show login prompt
    if (!User) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-300">
                Please log in to access your settings.
            </div>
        );
    }

    // ⚙️ Strongly typed array of settings
    const settingsOptions: SettingOption[] = [
        { label: "Privacy", to: "/settings/privacy" },
        { label: "Account Information", to: "/settings/account" },
        { label: "Activity", to: "/settings/activity" },
        { label: "Analytics", to: "/settings/analytics" },
        { label: "Change Email", to: "/settings/email" },
        { label: "Change Password", to: "/settings/password" },
    ];

    // 🧱 Render settings list
    return (
        <div className="min-h-screen py-10 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition-colors duration-300">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    Settings
                </h1>

                <div className="space-y-4">
                    {settingsOptions.map((option: SettingOption) => (
                        <div
                            key={option.label}
                            className="flex justify-between items-center p-4 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
                        >
                            <span className="text-gray-800 dark:text-gray-100">
                                {option.label}:
                            </span>
                            <Link
                                to={option.to}
                                className="btn btn-xs text-white"
                                style={{ backgroundColor: "#d44bb7" }}
                            >
                                Manage
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Settings;
