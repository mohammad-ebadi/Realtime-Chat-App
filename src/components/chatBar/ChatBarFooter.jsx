import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { firestore } from "../../configs/Firebase";
import { useAuthStore } from "../../stores/useAuthStore";
import { useHandleSelectedUser } from "../../stores/useHandleSelectedUser";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Send } from "../../assets/Constants";

function ChatBarFooter() {
  const [message, setMessage] = useState("");
  const user = useAuthStore((state) => state.user);
  const { selectedUser } = useHandleSelectedUser();

  const handleSendMessage = async () => {
    if (!message.trim() || !user || !selectedUser) return;

    const chatId = [user.uid, selectedUser.uid].sort().join("_");
    const messagesRef = collection(firestore, "chats", chatId, "messages");

    // ایجاد سند پیام جدید با serverTimestamp
    await setDoc(doc(messagesRef), {
      senderId: user.uid,
      text: message.trim(),
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <Flex w={"67vw"} bg={"white"} alignItems={"center"}>
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