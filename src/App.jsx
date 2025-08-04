import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthPage from "./pages/auth/AuthPage.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
    </Routes>
  );
}

export default App;
