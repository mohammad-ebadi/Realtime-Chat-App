import React from "react";
import { useAuthStore } from "../../stores/useAuthStore.js";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to={"/auth"} replace></Navigate>;
  }
  return children;
}

export default ProtectedRoute;
