import {
  Button,
  Flex,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { VisibilityOff, VisibilityOn } from "../../assets/Constants.jsx";

function SignIn() {
  const [hidePassword, setHidePassword] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  return (
    <form action="">
      <VStack gap={5}>
        <Input
          variant={"flushed"}
          placeholder="Email..."
          type="email"
          cursor={"pointer"}
          value={inputs.email}
          onChange={(e) => {
            setInputs({ ...inputs, email: e.target.value });
          }}
        ></Input>

        <Flex gap={50}>
          <Input
            variant={"flushed"}
            placeholder="Password..."
            type={hidePassword ? "password" : "text"}
            cursor={"pointer"}
            w={"100%"}
            value={inputs.password}
            onChange={(e) => {
              setInputs({ ...inputs, password: e.target.value });
            }}
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

        <Button bg={"blue.500"} color={"white"}>
          Sign In
        </Button>
      </VStack>
    </form>
  );
}

export default SignIn;
