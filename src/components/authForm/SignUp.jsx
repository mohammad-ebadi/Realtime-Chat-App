import { Button, Flex, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { VisibilityOff, VisibilityOn } from "../../assets/Constants.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../../configs/Firebase.js";
import useAppToast from "../../hooks/useAppToast.js";
function SignUp() {
  const [hidePassword, setHidePassword] = useState(true);

  // custom hook for toast
  const toast = useAppToast();

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  if (!inputs.email || !inputs.username || !inputs.password) {
    return;
  }
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create a new user
      const newUser = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          profilePicURL: "",
          createdAt: serverTimestamp(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        // custom hook for toast
        toast.success("Your Account Created Successfully");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.warning("This email is taken by someone else.");
          break;
        case "auth/invalid-email":
          toast.warning("Your email is not valid.");
          break;
        case "auth/weak-password":
          toast.warning("Your password must be at least 6 characters long.");
          break;
        default:
          toast.error("An error has occurred. Please try again.");
      }
    }
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

        <Button
          bg={"blue.300"}
          color={"white"}
          _hover={{ bg: "blue.600" }}
          type="submit"
        >
          Sign Up
        </Button>
      </VStack>
    </form>
  );
}

export default SignUp;
