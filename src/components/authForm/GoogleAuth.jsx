import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { useAuthStore } from "../../stores/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, firestore } from "../../configs/Firebase.js";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
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
        // Check if user document exists in Firestore
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // Create new user document
          const username = user.email.split("@")[0];
          
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            username: username,
            profilePicURL: user.photoURL || "",
            createdAt: serverTimestamp(),
          });

          // Set user in store
          setUser({
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            username: username,
            profilePicURL: user.photoURL || "",
          });

          toast.success("Account created successfully!");
        } else {
          // Existing user - get data from Firestore
          const existingUserData = userSnap.data();
          
          setUser({
            uid: user.uid,
            email: user.email,
            photoURL: existingUserData.profilePicURL || user.photoURL,
            username: existingUserData.username || user.email.split("@")[0],
            profilePicURL: existingUserData.profilePicURL || user.photoURL || "",
          });

          toast.success("Welcome back!");
        }

        // Navigate after successful authentication
        setTimeout(() => {
          navigate("/");
        }, 1500);
        
      } catch (firestoreError) {
        console.error("Firestore error:", firestoreError);
        // Fallback: set basic user data even if Firestore fails
        setUser({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          username: user.email.split("@")[0],
          profilePicURL: user.photoURL || "",
        });
        
        toast.warning("Signed in but profile data couldn't be saved. Please try again later.");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
      
    } catch (error) {
      console.error("Authentication error:", error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        toast.warning("Sign-in was cancelled");
      } else if (error.code === 'auth/popup-blocked') {
        toast.error("Pop-up was blocked. Please allow pop-ups for this site.");
      } else {
        toast.error(`Authentication failed: ${error.message || 'Unknown error'}`);
      }
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