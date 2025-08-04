import {
  Button,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { VisibilityOff, VisibilityOn } from "../../assets/Constants.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { firestore, auth } from "../../configs/Firebase.js";

function SignUp() {
  const [hidePassword, setHidePassword] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSignUp = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      if(newUser){
        const userDoc = {
          uid : newUser.user.uid,
          email : inputs.email,
          username : inputs.username,
          profilePicURL : "",
          createdAt: serverTimestamp(),

        }
        await setDoc(doc(firestore , "users" , newUser.user.uid),userDoc)
        alert("Good")
      }
    } catch (error) {
      console.log(error)
      alert("Bad")
    }
  };
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

        <Button
          bg={"blue.500"}
          color={"white"}
          onClick={() => {
            handleSignUp;
          }}
        >
          Sign Up
        </Button>
      </VStack>
    </form>
  );
}

export default SignUp;
