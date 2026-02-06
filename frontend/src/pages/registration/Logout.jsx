import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setUser, setAuthState }) {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear authentication
        if (setUser) setUser(null);
        if (setAuthState) setAuthState(false);

        // Clear token
        localStorage.removeItem("access");

        // Redirect to login page
        navigate("/login", { replace: true });
    }, [navigate, setUser, setAuthState]);

    return (
        <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-200">
            Logging out...
        </div>
    );
}

export default Logout;
