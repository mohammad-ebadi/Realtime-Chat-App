import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "./configs/Firebase.js";
import { useAuthStore } from "./stores/useAuthStore.js";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";

function AppContent() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(firestore, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const userWithData = {
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL,
              username: userData.username || null,
              profilePicURL: userData.profilePicURL || null,
            };
            setUser(userWithData);
            
            // Redirect to username-based route if not already there
            if (userData.username && location.pathname === "/") {
              navigate(`/${userData.username}`);
            }
          } else {
            setUser({
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL,
              username: null,
              profilePicURL: null,
            });
          }
        } catch (error) {
          console.log(error);
          clearUser();
        }
      } else {
        clearUser();
        // Redirect to auth if user is not authenticated and trying to access protected routes
        if (location.pathname !== "/auth") {
          navigate("/auth");
        }
      }
    });
    return () => unsubscribe();
  }, [setUser, clearUser, navigate, location.pathname]);

  return (
    <Routes>
      <Route
        path="/:username"
        element={
          <ProtectedRoute>
            <Home></Home>
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
      <Route path="/" element={<Navigate to="/auth" replace />}></Route>
    </Routes>
  );
}

function App() {
  return <AppContent />;
}

export default App;
