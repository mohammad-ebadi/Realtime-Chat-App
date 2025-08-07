import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/auth"}></Navigate>}></Route>
      <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
      {/* <Route path="/:username" element={<Home></Home>}></Route> */}
    </Routes>
  );
}

export default App;
