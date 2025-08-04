import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

function GoogleAuth({ signIn }) {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      m={5}
      cursor={"pointer"}
    >
      <Image src="/google.png" w={30} mr={2}></Image>
      {signIn ? "Sign In With Google" : "Sign Up With Google"}
    </Flex>
  );
}

export default GoogleAuth;
