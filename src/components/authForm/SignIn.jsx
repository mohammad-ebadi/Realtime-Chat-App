import { Button, Flex, Input, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { VisibilityOff, VisibilityOn } from "../../assets/Constants.jsx";
import useAppToast from "../../hooks/useAppToast.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../configs/Firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore.js";

function SignIn() {
  const [hidePassword, setHidePassword] = useState(true);
  const toast = useAppToast();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
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
      
      // Get user data from Firestore to get username
      try {
        const userDocRef = doc(firestore, "users", result.user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUser({
            uid: result.user.uid,
            email: result.user.email,
            photoURL: result.user.photoURL,
            username: userData.username,
            profilePicURL: userData.profilePicURL || null,
          });
          
          toast.success("Signed in successfully!");
          setTimeout(() => {
            navigate(`/${userData.username}`);
          }, 2000);
        }
      } catch (firestoreError) {
        toast.error("Failed to get user data");
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
        <Input
          variant={"flushed"}
          placeholder="Password..."
          type={hidePassword ? "password" : "text"}
          cursor={"pointer"}
          value={inputs.password}
          onChange={(e) => {
            setInputs({ ...inputs, password: e.target.value });
          }}
          borderColor={"gray.400"}
        ></Input>
        <Button
          type="submit"
          w={"full"}
          colorScheme="blue"
          onClick={() => setHidePassword(!hidePassword)}
        >
          {hidePassword ? <VisibilityOff /> : <VisibilityOn />}
        </Button>
      </VStack>
    </form>
  );
}

export default SignIn;
