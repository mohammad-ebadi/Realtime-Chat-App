import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

function ProtectedRoute({ children }) {
  const { user } = useAuthStore();
  if (!user) {
    <Navigate to={"/auth"} replace></Navigate>;
  }
  return children;
}

export default ProtectedRoute;
