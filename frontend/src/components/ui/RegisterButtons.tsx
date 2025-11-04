import { Link } from "react-router-dom";

function RegisterButtons() {
    return (
        <div className="flex space-x-4">
            <Link
                to="/login"
                className="px-4 py-2 rounded-md text-white hover:opacity-90 transition flex items-center justify-center"
                style={{ backgroundColor: "#2f43c8" }}
            >
                Login
            </Link>
            <Link
                to="/signup"
                className="px-4 py-2 rounded-md text-white hover:opacity-90 transition flex items-center justify-center"
                style={{ backgroundColor: "#d44bb7" }}
            >
                Signup
            </Link>
        </div>
    );
}

export default RegisterButtons;
