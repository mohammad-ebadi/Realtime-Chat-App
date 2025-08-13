import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

function ChatHistory() {
  return (
    <>
    <VStack  align={"start"} m={"10px"}>
      <Flex bg={"#112D4E"}  w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"}  align={"start"} borderRadius={"20px 20px 20px 0px"} p={"5px 5px"}>
        <Text color={"#DBE2EF"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis corporis voluptatum enim? Facilis explicabo, aut minus sequi veniam corrupti pariatur assumenda deserunt ea similique adipisci ut excepturi expedita, laborum ipsum temporibus. Earum autem suscipit vel doloremque vero odio quo velit eum voluptatum. Fuga expedita earum, quaerat nemo aliquid natus.</Text>
      </Flex>
      <Text color={"gray"} fontSize={"8px"}>06:45 PM</Text>
    </VStack>

    <VStack  align={"end"} m={"10px"}>
        <Flex bg={"#3F72AF"} w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"} align={"start"} borderRadius={"20px 20px 0px 20px"} p={"5px 5px"}>
            <Text color={"#F9F7F7"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis corporis voluptatum enim? Facilis explicabo, aut minus sequi veniam corrupti pariatur assumenda deserunt ea similique adipisci ut excepturi expedita, laborum ipsum temporibus. Earum autem suscipit vel doloremque vero odio quo velit eum voluptatum. Fuga expedita earum, quaerat nemo aliquid natus.</Text>
        </Flex>
        <Text color={"gray"} fontSize={"8px"}>06:45 PM</Text>
    </VStack>

    <VStack  align={"start"} m={"10px"}>
      <Flex bg={"#112D4E"}  w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"}  align={"start"} borderRadius={"20px 20px 20px 0px"} p={"5px 5px"}>
        <Text color={"#DBE2EF"}>Lorem ipsum dolor sit amet.</Text>
      </Flex>
      <Text color={"gray"} fontSize={"8px"}>06:45 PM</Text>
    </VStack>

    <VStack  align={"start"} m={"10px"}>
      <Flex bg={"#112D4E"} w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"}  align={"start"} borderRadius={"20px 20px 20px 0px"} p={"5px 5px"}>
        <Text color={"#DBE2EF"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, eveniet?</Text>
      </Flex>
      <Text color={"gray"} fontSize={"8px"}>06:45 PM</Text>
    </VStack>


    <VStack  align={"end"} m={"10px"}>
        <Flex bg={"#3F72AF"} w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"} align={"start"} borderRadius={"20px 20px 0px 20px"} p={"5px 5px"}>
            <Text color={"#F9F7F7"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis corporis voluptatum enim? Facilis explicabo, aut minus sequi veniam corrupti pariatur assumenda deserunt ea similique adipisci ut excepturi expedita, laborum ipsum temporibus. Earum autem suscipit vel doloremque vero odio quo velit eum voluptatum. Fuga expedita earum, quaerat nemo aliquid natus.</Text>
        </Flex>
        <Text color={"gray"} fontSize={"8px"}>06:45 PM</Text>
    </VStack>

    </>
    
  );
}

export default ChatHistory;
