import { Button, Flex, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { VisibilityOff, VisibilityOn } from "../../assets/Constants.jsx";
import useAppToast from "../../hooks/useAppToast.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../configs/Firebase.js";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

function SignIn() {
  const [hidePassword, setHidePassword] = useState(true);
  const toast = useAppToast();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!inputs.email.trim() || !inputs.password.trim()) {
      return toast.error("An error has occurred. Please try again.");
    }
    try {
      const result = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      toast.success("Signed in successfully!");
      
      // Get user data to redirect to username URL
      try {
        const userDocRef = doc(firestore, "users", result.user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.username) {
            setTimeout(() => {
              navigate(`/${userData.username}`);
            }, 2000);
          } else {
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        } else {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        console.error("Error getting user data:", error);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.warning("No user found with this email.");
          break;
        case "auth/wrong-password":
          toast.warning("The password is incorrect.");
          break;
        case "auth/invalid-email":
          toast.warning("Your email is not valid.");
          break;
        default:
          toast.error("An error has occurred. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSignIn(e);
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
          borderColor={"gray.400"}
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
            borderColor={"gray.400"}
          ></Input>
          <Button
            onClick={() => {
              setHidePassword(!hidePassword);
            }}
            bg={"none"}
            _hover={{ bg: "transparent", transform: "scale(1.2)" }}
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
          Sign In
        </Button>
      </VStack>
    </form>
  );
}

export default SignIn;
