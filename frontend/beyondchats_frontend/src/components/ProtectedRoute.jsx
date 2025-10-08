import React from "react";
import { Navigate } from "react-router-dom";

// Protect private routes
export const PrivateRoute = ({ user, children }) => {
  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Protect public routes (login/register)
export const PublicRoute = ({ user, children }) => {
  if (user) {
    // Already logged in → redirect to home
    return <Navigate to="/" replace />;
  }
  return children;
};
