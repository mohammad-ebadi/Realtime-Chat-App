// import { Flex, Image } from "@chakra-ui/react";
// import React from "react";
// import { useAuthStore } from "../../stores/useAuthStore.js";
// import { useNavigate } from "react-router-dom";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth, firestore } from "../../configs/Firebase.js";
// import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
// import useAppToast from "../../hooks/useAppToast.js";

// function GoogleAuth({ signIn }) {
//   const toast = useAppToast();
//   const setUser = useAuthStore((state) => state.setUser);
//   const navigate = useNavigate();

//   const handleGoogleAuth = async () => {
//     console.log("Starting Google Auth...");

//     try {
//       console.log("Creating Google provider...");
//       const provider = new GoogleAuthProvider();

//       console.log("Attempting sign in with popup...");
//       const result = await signInWithPopup(auth, provider);
//       console.log("Sign in successful:", result);

//       const { user } = result;
//       console.log("User object:", user);

//       // Set user in local state immediately for basic functionality
//       const basicUserData = {
//         uid: user.uid,
//         email: user.email,
//         photoURL: user.photoURL || "",
//         username: user.email ? user.email.split("@")[0] : "user",
//         profilePicURL: user.photoURL || "",
//       };

//       console.log("Setting basic user data:", basicUserData);
//       setUser(basicUserData);

//       // Try to handle Firestore operations, but don't fail if they don't work
//       try {
//         console.log("Attempting Firestore operations...");

//         if (!firestore) {
//           console.warn("Firestore not available, skipping database operations");
//           toast.success("Signed in successfully!");
//           setTimeout(() => navigate("/"), 1500);
//           return;
//         }

//         const userDocRef = doc(firestore, "users", user.uid);
//         const userDocSnap = await getDoc(userDocRef);

//         if (!userDocSnap.exists()) {
//           console.log("Creating new user document...");
//           const timestamp = Date.now().toString(36);
//           const finalUsername = `${user.email.split("@")[0]}_${timestamp}`;

//           await setDoc(userDocRef, {
//             email: user.email,
//             username: finalUsername,
//             profilePicURL: user.photoURL || "",
//             createdAt: serverTimestamp(),
//           });

//           // Update user with final username
//           setUser({
//             ...basicUserData,
//             username: finalUsername,
//           });

//           toast.success("Account created successfully!");
//         } else {
//           console.log("User document exists, updating with stored data...");
//           const existingUserData = userDocSnap.data();

//           setUser({
//             uid: user.uid,
//             email: user.email,
//             photoURL: existingUserData.profilePicURL || user.photoURL,
//             username: existingUserData.username || user.email.split("@")[0],
//             profilePicURL: existingUserData.profilePicURL || user.photoURL || "",
//           });

//           toast.success("Welcome back!");
//         }

//         setTimeout(() => navigate("/"), 1500);

//       } catch (firestoreError) {
//         console.error("Firestore error (non-critical):", firestoreError);
//         // Firestore failed but user is still signed in
//         toast.warning("Signed in but profile data couldn't be saved. Please try again later.");
//         setTimeout(() => navigate("/"), 1500);
//       }

//     } catch (error) {
//       console.error("Authentication error:", error);
//       console.error("Error details:", {
//         code: error.code,
//         message: error.message,
//         stack: error.stack
//       });

//       if (error.code === 'auth/popup-closed-by-user') {
//         toast.warning("Sign-in was cancelled");
//       } else if (error.code === 'auth/popup-blocked') {
//         toast.error("Pop-up was blocked. Please allow pop-ups for this site.");
//       } else if (error.code === 'auth/network-request-failed') {
//         toast.error("Network error. Please check your internet connection.");
//       } else {
//         toast.error(`Authentication failed: ${error.message || 'Unknown error'}`);
//       }
//     }
//   };

//   return (
//     <Flex
//       justifyContent={"center"}
//       alignItems={"center"}
//       m={5}
//       cursor={"pointer"}
//       borderRadius={5}
//       p={2}
//       bg={"gray.300"}
//       _hover={{ bg: "rgba(113,128,150 , 0.8)", color: "white" }}
//       transition={"0.5s ease"}
//       onClick={handleGoogleAuth}
//     >
//       <Image src="/google.png" w={30} mr={2} />
//       {signIn ? "Sign In With Google" : "Sign Up With Google"}
//     </Flex>
//   );
// }

// export default GoogleAuth;














// import React from "react";
// import { Flex, Image } from "@chakra-ui/react";
// import React from "react";
// import { useAuthStore } from "../../stores/useAuthStore.js";
// import { useNavigate } from "react-router-dom";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth, firestore } from "../../configs/Firebase.js";
// import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
// import useAppToast from "../../hooks/useAppToast.js";

// function GoogleAuth({ signIn }) {
//   const toast = useAppToast();
//   const setUser = useAuthStore((state) => state.setUser);
//   const navigate = useNavigate();

//   const handleGoogleAuth = async () => {

//   }


//   return (
//     <Flex
//       justifyContent={"center"}
//       alignItems={"center"}
//       m={5}
//       cursor={"pointer"}
//       borderRadius={5}
//       p={2}
//       bg={"gray.300"}
//       _hover={{ bg: "rgba(113,128,150 , 0.8)", color: "white" }}
//       transition={"0.5s ease"}
//       onClick={handleGoogleAuth}
//     >
//       <Image src="/google.png" w={30} mr={2} />
//       {signIn ? "Sign In With Google" : "Sign Up With Google"}
//     </Flex>
//   );
// }

// export default GoogleAuth;





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
      const user = result.user;

      // مسیر سند کاربر در Firestore
      const userRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // ساخت یوزرنیم از ایمیل
        const username = user.email.split("@")[0];

        // ایجاد کاربر جدید در Firestore
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          username: username,
          fullName: user.displayName || "",
          profilePicURL: user.photoURL || "",
          createdAt: serverTimestamp(),
        });
      }

      // ذخیره در Zustand
      setUser({
        uid: user.uid,
        email: user.email,
        username: user.email.split("@")[0],
        fullName: user.displayName || "",
        profilePicURL: user.photoURL || "",
      });

      toast("success", signIn ? "Signed in successfully" : "Account created successfully");

      navigate("/");
    } catch (error) {
      toast("error", error.message);
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