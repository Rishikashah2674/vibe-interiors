import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if token is not set
    return <Navigate to="/admin/login" replace />;
  }

  // Render the protected component
  return children;
};

export default ProtectedRoute;
