import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode"; // Import jwtDecode

const ProtectedRoutes = () => {
  // Check if the user is authenticated
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("access_token"); // Use "access_token" instead of "access"
    if (!accessToken) return false;

    // Decode the token to check its expiry
    try {
      const decoded = jwtDecode(accessToken);
      const expiryDate = decoded.exp;
      const currentTime = Date.now() / 1000;
      return expiryDate > currentTime; // Return true if the token is not expired
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  // If the user is authenticated, render the child routes
  // Otherwise, redirect to the login page
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
