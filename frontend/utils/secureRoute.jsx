import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthenticatedRoute = ({ element, isProtectedRoute }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) return null;

  if (isProtectedRoute) {
    // a protected route ?, redirect unauthenticated users to login
    return isAuthenticated ? element : <Navigate to="/" replace />;
  }

  // not a protected route ?, redirect authenticated users to go home
  return !isAuthenticated ? element : <Navigate to="/home" replace />;
};

export default AuthenticatedRoute;
