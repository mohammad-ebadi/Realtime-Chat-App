// import { Box, Text } from "@chakra-ui/react";
// import React from "react";
// import RecentUsersChat from "./RecentUsersChat.jsx";

// function RecentUsers() {
//   return (
//     <>
//       <Text color={"gray.500"} textAlign={"center"}>
//         Recent Chats
//       </Text>
//       <Box w={"full"} maxH={"55vh"} overflow={"auto"}>
//         <RecentUsersChat></RecentUsersChat>
//       </Box>
//     </>
//   );
// }

// export default RecentUsers;




import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../configs/Firebase.js";
import { useAuthStore } from "../../../stores/useAuthStore.js";
import RecentUsersChat from "./RecentUsersChat.jsx";

function RecentUsers() {
  const user = useAuthStore((state) => state.user);
  const [searchedUserUids, setSearchedUserUids] = useState([]);

  useEffect(() => {
    const fetchUserChats = async () => {
      if (!user?.uid) return;
      try {
        const userChatsRef = doc(firestore, "userChats", user.uid);
        const userChatsSnap = await getDoc(userChatsRef);

        if (userChatsSnap.exists()) {
          const data = userChatsSnap.data();
          if (data?.searchedUserUids) {
            setSearchedUserUids(data.searchedUserUids);
          }
        }
      } catch (err) {
        console.error("Error fetching userChats:", err);
      }
    };

    fetchUserChats();
  }, [user?.uid]);

  return (
    <>
      <Text color={"gray.500"} textAlign={"center"}>
        Recent Chats
      </Text>
      <Box w={"full"} maxH={"55vh"} overflow={"auto"}>
        {searchedUserUids.map((uid) => (
          <RecentUsersChat key={uid} uid={uid} />
        ))}
      </Box>
    </>
  );
}

export default RecentUsers;