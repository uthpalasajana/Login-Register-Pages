// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserFromToken } from "../services/authService";

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const user = getUserFromToken();

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role not allowed → redirect to correct dashboard
  if (!allowedRoles.includes(user.role)) {
    if (user.role === "ADMIN") {
      return <Navigate to="/admindashboard" replace />;
    } else if (user.role === "USER") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Allowed → render the page
  return children;
}
