// import { Button, Flex, Input } from '@chakra-ui/react'
// import React from 'react'
// import { Send } from '../../assets/Constants'

// function ChatBarFooter() {
//   return (
//     <Flex w={"67vw"} bg={"white"} alignItems={"center"}>
//       <Input placeholder='Enter your message . . .' size={"lg"}  border={"none"}  borderRadius={0} focusBorderColor='transparent' _focus={{_placeholder:{color:"#112D4E"}}} color={"#112D4E"}></Input>
//       <Button bg={"transparent"} color={"blue.500"} _hover={{bg:"none", transform: "scale(1.2)"}}><Send></Send></Button>
//     </Flex>
//   )
// }

// export default ChatBarFooter

import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  arrayUnion,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../configs/Firebase";
import { useAuthStore } from "../../stores/useAuthStore";
import { useHandleSelectedUser } from "../../stores/useHandleSelectedUser.js";
import { Send } from "../../assets/Constants";

function ChatBarFooter() {
  const [message, setMessage] = useState("");
  const user = useAuthStore((state) => state.user);
  const { selectedUser } = useHandleSelectedUser();

  const handleSendMessage = async () => {
    if (!message.trim() || !user || !selectedUser) return;

    const chatId = [user.uid, selectedUser.uid].sort().join("_");
    const chatRef = doc(firestore, "chats", chatId);

    // بررسی وجود سند
    const chatSnap = await getDoc(chatRef);
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        users: [user.uid, selectedUser.uid],
        messages: [],
        lastUpdated: serverTimestamp(),
      });
    }

    // افزودن پیام به آرایه messages
    await updateDoc(chatRef, {
      messages: arrayUnion({
        senderId: user.uid,
        text: message.trim(),
        timestamp: serverTimestamp(),
      }),
      lastUpdated: serverTimestamp(),
    });

    setMessage(""); // خالی کردن Input بعد از ارسال
  };

  return (
    <Flex w={"67vw"} bg={"white"} alignItems={"center"} gap={2}>
      <Input
        placeholder="Enter your message . . ."
        size={"lg"}
        border={"none"}
        borderRadius={0}
        focusBorderColor="transparent"
        _focus={{ _placeholder: { color: "#112D4E" } }}
        color={"#112D4E"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <Button
        bg={"transparent"}
        color={"blue.500"}
        _hover={{ bg: "none", transform: "scale(1.2)" }}
        onClick={handleSendMessage}
      >
        <Send />
      </Button>
    </Flex>
  );
}

export default ChatBarFooter;
