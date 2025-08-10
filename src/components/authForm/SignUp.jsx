import { Button, Flex, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { VisibilityOff, VisibilityOn } from "../../assets/Constants.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  serverTimestamp,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, firestore } from "../../configs/Firebase.js";
import useAppToast from "../../hooks/useAppToast.js";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore.js";

function SignUp() {
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();
  const toast = useAppToast();
  const { setUser } = useAuthStore();

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      !inputs.email.trim() ||
      !inputs.username.trim() ||
      !inputs.password.trim()
    ) {
      return toast.error("An error has occurred. Please try again.");
    }

    // Checking for same username
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      toast.warning("This username already taken !!!");
      return;
    }
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
        
        // Set user in store and navigate
        setUser({
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          profilePicURL: "",
        });
        
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate(`/${inputs.username}`);
        }, 2000);
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.warning("This email is already registered.");
          break;
        case "auth/weak-password":
          toast.warning("Password should be at least 6 characters.");
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
    <form onSubmit={handleSignUp}>
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
        />
        <Input
          variant={"flushed"}
          placeholder="Username..."
          cursor={"pointer"}
          value={inputs.username}
          onChange={(e) => {
            setInputs({ ...inputs, username: e.target.value });
          }}
          borderColor={"gray.400"}
        />
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
          />
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
          Sign Up
        </Button>
      </VStack>
    </form>
  );
}

export default SignUp;
