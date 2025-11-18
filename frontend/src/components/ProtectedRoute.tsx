import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    AuthState: boolean | false;
    children: ReactNode;
}

const ProtectedRoute = ({ AuthState, children }: ProtectedRouteProps) => {
    if (!AuthState) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
