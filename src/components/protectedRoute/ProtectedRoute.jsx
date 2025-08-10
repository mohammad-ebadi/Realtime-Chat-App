import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

function ProtectedRoute({ children }) {
  const { user } = useAuthStore();
  const { username } = useParams();

  if (!user) {
    return <Navigate to={"/auth"} replace />;
  }

  // Check if the username in URL matches the logged-in user's username
  if (username && user.username !== username) {
    // Redirect to user's own profile if they try to access someone else's
    return <Navigate to={`/${user.username}`} replace />;
  }

  return children;
}

export default ProtectedRoute;
