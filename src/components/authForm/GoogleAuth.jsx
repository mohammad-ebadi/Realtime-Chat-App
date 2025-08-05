import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

function GoogleAuth({ signIn }) {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      m={5}
      cursor={"pointer"}
      borderRadius={5}
      p={2}
      bg={"gray.300"}
      _hover={{ bg: "rgba(113,128,150 , 0.8)", color: "white" }}
      transition={"0.5s ease"}
    >
      <Image src="/google.png" w={30} mr={2}></Image>
      {signIn ? "Sign In With Google" : "Sign Up With Google"}
    </Flex>
  );
}

export default GoogleAuth;
