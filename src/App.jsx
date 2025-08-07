import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "./configs/Firebase.js";
import { useAuthStore } from "./stores/useAuthStore.js";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(firestore, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser({
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL,
              username: userData.username || null,
              profilePicURL: userData.profilePicURL || null,
            });
          
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
      }
    });
    return () => unsubscribe();
  }, [setUser, clearUser]);

  return (
    <Routes>
      {/* <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home></Home>
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
 */}



      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
    </Routes>
  );
}

export default App;
