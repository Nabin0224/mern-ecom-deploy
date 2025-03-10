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
      return <Navigate to="/" />;
    }
  }

  if (isAuthenticated && location.pathname.includes("admin")) {
    if (user?.role !== "admin") {
      return <Navigate to="/unauth" />;
    }
  }

  if (
    isAuthenticated &&
    (user?.role === "admin" &&
    location.pathname.includes("/login"))
  ) {
    return <Navigate to="/admin/dashboard"  replace={true}/>;
  }
 
  return children;
};

export default CheckAuth;
