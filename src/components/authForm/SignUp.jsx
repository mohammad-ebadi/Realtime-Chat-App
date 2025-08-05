import { Button, Flex, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { VisibilityOff, VisibilityOn } from "../../assets/Constants.jsx";

function SignUp() {
  const [hidePassword, setHidePassword] = useState(true);

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={(e) => {
        handleSignUp(e);
      }}
    >
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

        <Input
          variant={"flushed"}
          placeholder="Username..."
          type="text"
          cursor={"pointer"}
          value={inputs.username}
          onChange={(e) => {
            setInputs({ ...inputs, username: e.target.value });
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

        <Button bg={"blue.500"} color={"white"} type="submit">
          Sign Up
        </Button>
      </VStack>
    </form>
  );
}

export default SignUp;



