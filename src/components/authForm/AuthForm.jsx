import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Logo } from "../../assets/Constants";

function AuthForm() {
  const [signIn, setSignIn] = useState(true);

  return (
    <Container
      boxShadow={"0px 0px 10px black"}
      borderRadius={10}
      maxW={"350px"}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      p={10}
      mb={10}
    >
      <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
        {/* <Image src="/Logo.svg" w={30}></Image> */}
        <Logo></Logo>
        <Text fontSize={20}>Chat App</Text>
      </Flex>
      {signIn ? <SignIn></SignIn> : <SignUp></SignUp>}

      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        my={4}
        gap={1}
        w={"full"}
      >
        <Box flex={2} h={"1px"} bg={"gray.400"}></Box>
        <Text>Or</Text>
        <Box flex={2} h={"1px"} bg={"gray.400"}></Box>
      </Flex>

      <GoogleAuth signIn={signIn}></GoogleAuth>

      <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
        {signIn ? "Create An Account ?" : "Already Have An Account ?"}
        <Text
          cursor={"pointer"}
          textDecoration={"underline"}
          color={"blue.500"}
          onClick={() => {
            setSignIn(!signIn);
          }}
        >
          {signIn ? "Sign Up" : "Sign In"}
        </Text>
      </Flex>
    </Container>
  );
}

export default AuthForm;
