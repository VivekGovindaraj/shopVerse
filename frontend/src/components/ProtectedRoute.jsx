import React from "react";
import useAuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children},requiredAdmin = false,) => {

    const { user, loading } = useAuthContext();

    if (loading) { 
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredAdmin && !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;