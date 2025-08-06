import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import AuthForm from "../../components/authForm/AuthForm";

function AuthPage() {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"} bg={"gray.300"}>
      <AuthForm></AuthForm>
    </Flex>
  );
}

export default AuthPage;
