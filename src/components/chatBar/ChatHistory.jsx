// import { Box, Flex, Text, VStack } from "@chakra-ui/react";
// import React from "react";

// function ChatHistory() {
//   return (
//     <>
//     {/* user whom sent us a message */}
//     <VStack  align={"start"} m={"10px"}>
//       <Flex bg={"#112D4E"}  w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"}  align={"start"} borderRadius={"20px 20px 20px 0px"} p={"5px 5px"}>
//         <Text color={"#DBE2EF"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis corporis voluptatum enim? Facilis explicabo, aut minus sequi veniam corrupti pariatur assumenda deserunt ea similique adipisci ut excepturi expedita, laborum ipsum temporibus. Earum autem suscipit vel doloremque vero odio quo velit eum voluptatum. Fuga expedita earum, quaerat nemo aliquid natus.</Text>
//       </Flex>
//       <Text color={"gray"} fontSize={"10px"}>06:45 PM</Text>
//     </VStack>


//     {/* user whom is currnt user*/}
//     <VStack  align={"end"} m={"10px"}>
//         <Flex bg={"#3F72AF"} w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"} align={"start"} borderRadius={"20px 20px 0px 20px"} p={"5px 5px"}>
//             <Text color={"#F9F7F7"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis corporis voluptatum enim? Facilis explicabo, aut minus sequi veniam corrupti pariatur assumenda deserunt ea similique adipisci ut excepturi expedita, laborum ipsum temporibus. Earum autem suscipit vel doloremque vero odio quo velit eum voluptatum. Fuga expedita earum, quaerat nemo aliquid natus.</Text>
//         </Flex>
//         <Text color={"gray"} fontSize={"10px"}>06:45 PM</Text>
//     </VStack>

    

//     </>
    
//   );
// }

// export default ChatHistory;





import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { firestore } from "../../configs/Firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useAuthStore } from "../../stores/useAuthStore";
import { useHandleSelectedUser } from "../../stores/useHandleSelectedUser";

function ChatHistory() {
  const user = useAuthStore((state) => state.user);
  const { selectedUser } = useHandleSelectedUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user || !selectedUser) return;

    const chatId = [user.uid, selectedUser.uid].sort().join("_");
    const messagesRef = collection(firestore, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user?.uid, selectedUser?.uid]);

  return (
    <>
      {messages.map((msg) => (
        <VStack
          key={msg.id}
          align={msg.senderId === user.uid ? "end" : "start"}
          m={"10px"}
        >
          <Flex
            bg={msg.senderId === user.uid ? "#3F72AF" : "#112D4E"}
            w={"40vw"}
            whiteSpace={"normal"}
            overflow={"hidden"}
            textOverflow={"clip"}
            wordBreak={"break-word"}
            justifyContent={"center"}
            align={"start"}
            borderRadius={msg.senderId === user.uid ? "20px 20px 0px 20px" : "20px 20px 20px 0px"}
            p={"5px 5px"}
          >
            <Text color={msg.senderId === user.uid ? "#F9F7F7" : "#DBE2EF"}>
              {msg.text}
            </Text>
          </Flex>
          <Text color={"gray"} fontSize={"10px"}>
            {msg.timestamp?.toDate().toLocaleTimeString()}
          </Text>
        </VStack>
      ))}
    </>
  );
}

export default ChatHistory;
