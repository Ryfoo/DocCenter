import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                The page you are looking for might have been removed or does not exist.
            </p>
            <Link
                to="/"
                className="btn px-6 py-2 text-white"
                style={{ backgroundColor: "#2f43c8" }}
            >
                Go Home
            </Link>
        </div>
    );
}

export default NotFound;
