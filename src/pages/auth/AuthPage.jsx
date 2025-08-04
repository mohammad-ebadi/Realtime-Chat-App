import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import AuthForm from "../../components/authForm/AuthForm";

function AuthPage() {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
      <AuthForm></AuthForm>
    </Flex>
  );
}

export default AuthPage;
