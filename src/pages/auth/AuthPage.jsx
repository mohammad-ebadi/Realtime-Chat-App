import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import AuthForm from "../../components/authForm/AuthForm";

function AuthPage() {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"} bg={"#3F72AF"}>
      <AuthForm></AuthForm>
    </Flex>
  );
}

export default AuthPage;
