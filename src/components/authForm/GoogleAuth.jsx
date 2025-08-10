import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthStore } from "../../stores/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, firestore } from "../../configs/Firebase.js";
import { doc, getDoc, setDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import useAppToast from "../../hooks/useAppToast.js";

function GoogleAuth({ signIn }) {
  const toast = useAppToast();
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      try {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          // Generate username from email and check for duplicates
          const usernameFromEmail = user.email.split("@")[0];
          const usersRef = collection(firestore, "users");
          const q = query(usersRef, where("username", "==", usernameFromEmail));
          const querySnapshot = await getDocs(q);
          
          let finalUsername = usernameFromEmail;
          if (!querySnapshot.empty) {
            // Add random suffix if username already exists
            finalUsername = `${usernameFromEmail}_${Math.random().toString(36).substr(2, 5)}`;
          }

          // Create new user document
          await setDoc(userDocRef, {
            email: user.email,
            username: finalUsername,
            profilePicURL: user.photoURL || "",
            createdAt: serverTimestamp(),
          });

          setUser({
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            username: finalUsername,
            profilePicURL: user.photoURL || "",
          });

          toast.success("Account created successfully");
        } else {
          // Existing user - get data from Firestore
          const existingUserData = userDocSnap.data();
          
          setUser({
            uid: user.uid,
            email: user.email, // Use Firebase Auth email (guaranteed to exist)
            photoURL: existingUserData.profilePicURL || user.photoURL,
            username: existingUserData.username || "",
            profilePicURL: existingUserData.profilePicURL || user.photoURL || "",
          });

          toast.success("Welcome back!");
        }

        // Delay navigation to show toast message
        setTimeout(() => {
          navigate("/");
        }, 1500);
        
      } catch (firestoreError) {
        console.error("Firestore error:", firestoreError);
        toast.error("Failed to save user data. Please try again.");
      }
      
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Authentication failed. Please try again.");
    }
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      m={5}
      cursor={"pointer"}
      borderRadius={5}
      p={2}
      bg={"gray.300"}
      _hover={{ bg: "rgba(113,128,150 , 0.8)", color: "white" }}
      transition={"0.5s ease"}
      onClick={handleGoogleAuth}
    >
      <Image src="/google.png" w={30} mr={2} />
      {signIn ? "Sign In With Google" : "Sign Up With Google"}
    </Flex>
  );
}

export default GoogleAuth;
