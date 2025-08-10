// import { Flex, Image } from "@chakra-ui/react";
// import React from "react";
// import { useAuthStore } from "../../stores/useAuthStore";
// import { useNavigate } from "react-router-dom";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth, firestore } from "../../configs/Firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import useAppToast from "../../hooks/useAppToast";

// function GoogleAuth({ signIn }) {
//   const toast = useAppToast();
//   const setUser = useAuthStore((state) => state.setUser);
//   const navigate = useNavigate();

//   const handleGoogleAuth = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const { user } = result;
//       const userDocRef = doc(firestore, "users", user.uid);
//       const userDocSnap = await getDoc(userDocRef);

//       if (!userDocSnap.exists()) {
//         await setDoc(userDocRef, {
//           email: user.email,
//           username: user.displayName || "",
//           profilePicURL: user.photoURL || "",
//         });

//         setUser({
//           uid: user.uid,
//           email: user.email,
//           photoURL: user.photoURL,
//           username: user.displayName || "",
//           profilePicURL: user.photoURL || "",
//         });
        
//         toast.success("Successful");
//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("An error has occurred. Please try again.");
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
//       <Image src="/google.png" w={30} mr={2}></Image>
//       {signIn ? "Sign In With Google" : "Sign Up With Google"}
//     </Flex>
//   );
// }

// export default GoogleAuth;


import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthStore } from "../../stores/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, firestore } from "../../configs/Firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
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

      const userDocRef = doc(firestore, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // ساخت یوزرنیم از قبل @ ایمیل
        const usernameFromEmail = user.email.split("@")[0];

        // ایجاد کاربر جدید
        await setDoc(userDocRef, {
          email: user.email,
          username: usernameFromEmail,
          profilePicURL: user.photoURL ?? "",
        });

        setUser({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          username: usernameFromEmail,
          profilePicURL: user.photoURL ?? "",
        });

        toast.success("Account created successfully");
      } else {
        // کاربر قدیمی → گرفتن اطلاعات از Firestore
        const existingUserData = userDocSnap.data();

        setUser({
          uid: user.uid,
          email: existingUserData.email,
          photoURL: existingUserData.profilePicURL,
          username: existingUserData.username ?? "",
          profilePicURL: existingUserData.profilePicURL ?? "",
        });

        toast.success("Welcome back!");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred. Please try again.");
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
