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
import GoogleAuth from "./GoogleAuth.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import { Logo } from "../../assets/Constants.jsx";

function AuthForm() {
  const [signIn, setSignIn] = useState(true);

  return (
    <Container
      boxShadow={"0px 0px 20px gray"}
      borderRadius={10}
      maxW={"360px"}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      p={10}
      mb={10}
      bg={"rgba(237,242,247 , 0.8)"}
    >
      <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
        <Logo></Logo>
        <Text fontSize={20} fontWeight={"bold"} textShadow={"0px 1px 1px black"}>
          Chat App
        </Text>
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
          color={"blue.400"}
          onClick={() => {
            setSignIn(!signIn);
          }}
          _hover={{ color: "blue.700" ,transform: "scale(1.1)"}}
          transition={"0.3s ease"}
        >
          {signIn ? "Sign Up" : "Sign In"}
        </Text>
      </Flex>
    </Container>
  );
}

export default AuthForm;
