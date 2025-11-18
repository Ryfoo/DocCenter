import { Link, Outlet } from "react-router-dom";

interface User {
    username: string;
    avatar: string;
};
interface AuthState {
    isLoggedIn: boolean;
}
type SettingOption = {
    label: string;
    to: string;
};

type SettingsProps = {
    User: User | null;
    AuthState: AuthState | false;
};

const Settings: React.FC<SettingsProps> = ({ User, AuthState }) => {
    const settingsOptions: SettingOption[] = [
        { label: "Privacy", to: "privacy" },
        { label: "Account Information", to: "account" },
        { label: "Change Email", to: "email" },
        { label: "Change Password", to: "password" },
    ];

    return (
        <div className="min-h-screen py-10 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full md:w-1/3 bg-white dark:bg-[#0f1017] rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                        Settings
                    </h1>
                    <div className="space-y-3">
                        {settingsOptions.map((option) => (
                            <Link
                                key={option.label}
                                to={option.to}
                                className="block px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium transition-colors"
                            >
                                {option.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Nested content */}
                <div className="flex-1 bg-white dark:bg-[#0f1017] shadow-lg rounded-lg p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Settings;
