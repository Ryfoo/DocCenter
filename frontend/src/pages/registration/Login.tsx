import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ui/ThemeToggle";
import { login } from "../../services/api";
import { ACCESS_TOKEN } from "../../services/constants";

type Props = {
    setUser?: (u: any) => void,
    setAuthState?: (b: boolean) => void,
}

export default function Login({ setUser, setAuthState }: Props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    return (
        <div className="relative min-h-screen overflow-hidden">

            <div className="flex h-screen overflow-hidden dark:bg-gray-900 transition-colors duration-300">
                {/* Left side */}
                <div className="hidden md:flex w-1/2 items-center rounded-l-lg justify-center bg-gradient-to-br from-[#2f43c8] to-[#d44bb7] text-white">
                    <div className="text-center p-10">
                        <h1 className="text-4xl font-bold mb-4">Welcome to DocCenter</h1>
                        <p className="text-lg opacity-90">
                            Where doctors publish, connect, and inspire.
                        </p>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
                    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                            Welcome back Doctor!
                        </h2>

                        <form className="space-y-4" onSubmit={async (e) => {
                            e.preventDefault();
                            setError("");
                            try {
                                const res = await login(email, password);
                                const token = res.data.token;
                                const user = res.data.user;
                                localStorage.setItem(ACCESS_TOKEN, token);
                                if (setUser) setUser(user);
                                if (setAuthState) setAuthState(true);
                                navigate('/dashboard', { replace: true });
                            } catch (err: any) {
                                const msg = err?.response?.data?.non_field_errors?.[0] || err?.response?.data?.detail || 'Login failed';
                                setError(msg);
                            }
                        }}>
                            <div>
                                <label className="block text-gray-600 dark:text-gray-300">Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2f43c8]"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 dark:text-gray-300">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d44bb7]"
                                />
                            </div>
                            {error && <div className="text-red-600 text-sm">{error}</div>}

                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                                Forget your password?{" "}
                                <Link to="/PasswordReset" className="text-[#d44bb7] hover:underline">
                                    Recover it
                                </Link>
                            </p>

                            <button
                                type="submit"
                                className="w-full py-2 mt-4 bg-[#2f43c8] hover:bg-[#2437a8] text-white rounded-md font-semibold transition-colors"
                            >
                                Login
                            </button>
                        </form>

                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                            Not registred yet?{" "}
                            <Link to="/signup" className="text-[#d44bb7] hover:underline">
                                Sign up
                            </Link>
                        </p>
                        <div className="mt-6 text-center">
                            <ThemeToggle />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
