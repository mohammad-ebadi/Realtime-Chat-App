// import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { firestore } from "../../../configs/Firebase";
// import { useHandleSelectedUser } from "../../../stores/useHandleSelectedUser.js";

// function RecentUsersChat({ uid }) {
//   const [userData, setUserData] = useState(null);
//   const { setSelectedUser } = useHandleSelectedUser();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userRef = doc(firestore, "users", uid);
//         const userSnap = await getDoc(userRef);
//         if (userSnap.exists()) {
//           setUserData(userSnap.data());
//         }
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//       }
//     };

//     if (uid) fetchUserData();
//   }, [uid]);

//   const handleSelect = () => {
//     if (userData) {
//       setSelectedUser({
//         uid,
//         username: userData.username,
//         profilePicURL: userData.profilePicURL,
//       });
//     }
//   };

//   return (
//     <Box
//       borderBottom={"1px solid gray"}
//       cursor={"pointer"}
//       bg={"#3F72AF"}
//       _hover={{ bg: "#112D4E", transition: "0.3s" }}
//       onClick={handleSelect}
//     >
//       <Flex alignItems={"center"} gap={1}>
//         <Flex alignItems={"center"} p={1}>
//           <Avatar
//             name={userData?.username || "Unknown"}
//             src={userData?.profilePicURL || ""}
//           />
//         </Flex>
//         <VStack align={"start"}>
//           <Text fontSize={"14px"} color={"white"}>
//             {userData?.username || "Unknown User"}
//           </Text>
//           <Text fontSize={"10px"} color={"white"}>
//             {uid}
//           </Text>
//         </VStack>
//       </Flex>
//     </Box>
//   );
// }

// export default RecentUsersChat;





import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../../configs/Firebase";
import { useHandleSelectedUser } from "../../../stores/useHandleSelectedUser.js";
import { useAuthStore } from "../../../stores/useAuthStore.js";

function RecentUsersChat({ uid }) {
  const [userData, setUserData] = useState(null);
  const { setSelectedUser } = useHandleSelectedUser();
  const user = useAuthStore((state) => state.user); // user لاگین شده

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(firestore, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    if (uid) fetchUserData();
  }, [uid]);

  const handleSelect = async () => {
    if (!userData || !user) return;

    // ذخیره کاربر انتخاب شده در Zustand
    setSelectedUser({
      uid,
      username: userData.username,
      profilePicURL: userData.profilePicURL,
    });

    // ایجاد chatId یکتا بین دو کاربر
    const chatId = [user.uid, uid].sort().join("_");
    const chatRef = doc(firestore, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    // اگر سند چت وجود ندارد، ایجاد کن
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        users: [user.uid, uid],
        lastUpdated: serverTimestamp(),
      });
    }
  };

  return (
    <Box
      borderBottom={"1px solid gray"}
      cursor={"pointer"}
      bg={"#3F72AF"}
      _hover={{ bg: "#112D4E", transition: "0.3s" }}
      onClick={handleSelect} // ← تغییر اصلی اضافه شد
    >
      <Flex alignItems={"center"} gap={1}>
        <Flex alignItems={"center"} p={1}>
          <Avatar
            name={userData?.username || "Unknown"}
            src={userData?.profilePicURL || ""}
          />
        </Flex>
        <VStack align={"start"}>
          <Text fontSize={"14px"} color={"white"}>
            {userData?.username || "Unknown User"}
          </Text>
          <Text fontSize={"10px"} color={"white"}>
            {uid}
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}

export default RecentUsersChat;