import {
  Button,
  Container,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

function SignIn() {
  return (
    <form action="">
      <VStack gap={5}>
        <Input
          variant={"flushed"}
          placeholder="Email..."
          type="email"
          cursor={"pointer"}
        ></Input>
        <Input
          variant={"flushed"}
          placeholder="Password..."
          type="password"
          cursor={"pointer"}
        ></Input>
        <Button>Sign In</Button>
      </VStack>
    </form>
  );
}

export default SignIn;
