import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

function ProtectedRoute({ children }) {
  const { user } = useAuthStore();
  if (!user) {
   return <Navigate to={"/auth"} replace />;
  }
  return children;
}

export default ProtectedRoute;
