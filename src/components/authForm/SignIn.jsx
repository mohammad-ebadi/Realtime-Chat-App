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
import { VisibilityOff, VisibilityOn } from "../../assets/Constants.jsx";

function SignIn() {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <form action="">
      <VStack gap={5}>
        <Input
          variant={"flushed"}
          placeholder="Email..."
          type="email"
          cursor={"pointer"}
        ></Input>

        <Flex gap={50}>
          <Input
            variant={"flushed"}
            placeholder="Password..."
            type={hidePassword ? "password" : "text"}
            cursor={"pointer"}
            w={"100%"}
          ></Input>
          <Button
            onClick={() => {
              setHidePassword(!hidePassword);
            }}
          >
            {hidePassword ? (
              <VisibilityOn></VisibilityOn>
            ) : (
              <VisibilityOff></VisibilityOff>
            )}
          </Button>
        </Flex>

        <Button>Sign In</Button>
      </VStack>
    </form>
  );
}

export default SignIn;
