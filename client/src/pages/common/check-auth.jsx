import React from "react";
import { Navigate, useLocation } from "react-router-dom";

 

const CheckAuth = ({isAuthenticated, user, children}) => {
  const location = useLocation();

  if (!isAuthenticated && !location.pathname.includes("/auth")
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated && 
    (location.pathname.includes("/login") ||
    location.pathname.includes("/register"))
  ) { 
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  if (isAuthenticated && location.pathname.includes("admin")) {
    if (user?.role !== "admin") {
      return <Navigate to="/unauth" />;
    }
  }

  if (
    isAuthenticated &&
    (user?.role == "admin" &&
    location.pathname.includes("/"))
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
 
  return children;
};

export default CheckAuth;
