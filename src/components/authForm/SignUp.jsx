import { Button, Input, VStack } from "@chakra-ui/react";
import React from "react";

function SignUp() {
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
        <Button>Sign Up</Button>
      </VStack>
    </form>
  );
}

export default SignUp;
