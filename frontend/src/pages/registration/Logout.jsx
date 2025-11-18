import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setUser, setAuthState }) {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear authentication
        setUser(null);
        setAuthState(false);

        // Optionally clear localStorage/sessionStorage if you store tokens
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");

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
