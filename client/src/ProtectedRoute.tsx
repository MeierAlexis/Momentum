import React from "react";
import { useAuth } from "./context/AuthContext.tsx";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute(): React.ReactElement {
  const { isAuthenticated } = useAuth();
  //check if user is authenticated
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // if user is authenticated, render the child component
  return <Outlet />;
}
