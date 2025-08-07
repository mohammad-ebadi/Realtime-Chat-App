import { Box, Flex, VStack } from "@chakra-ui/react";
import React from "react";

function ChatHistory() {
  return (
    <>
    <VStack  align={"start"} m={"10px"}>
      <Flex bg={"purple.600"}  w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"}  align={"start"} borderRadius={"20px 20px 20px 0px"} p={"5px 5px"}>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis corporis voluptatum enim? Facilis explicabo, aut minus sequi veniam corrupti pariatur assumenda deserunt ea similique adipisci ut excepturi expedita, laborum ipsum temporibus. Earum autem suscipit vel doloremque vero odio quo velit eum voluptatum. Fuga expedita earum, quaerat nemo aliquid natus.</h2>
      </Flex>
    </VStack>

    <VStack  align={"end"} m={"10px"}>
        <Flex bg={"purple.300"} w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"} align={"start"} borderRadius={"20px 20px 0px 20px"} p={"5px 5px"}>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis corporis voluptatum enim? Facilis explicabo, aut minus sequi veniam corrupti pariatur assumenda deserunt ea similique adipisci ut excepturi expedita, laborum ipsum temporibus. Earum autem suscipit vel doloremque vero odio quo velit eum voluptatum. Fuga expedita earum, quaerat nemo aliquid natus.</h2>
        </Flex>
    </VStack>

    <VStack  align={"start"} m={"10px"}>
      <Flex bg={"purple.600"}  w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"}  align={"start"} borderRadius={"20px 20px 20px 0px"} p={"5px 5px"}>
        <h2>Lorem ipsum dolor sit amet.</h2>
      </Flex>
    </VStack>

    <VStack  align={"start"} m={"10px"}>
      <Flex bg={"purple.600"}  w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"}  align={"start"} borderRadius={"20px 20px 20px 0px"} p={"5px 5px"}>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, eveniet?</h2>
      </Flex>
    </VStack>


    <VStack  align={"end"} m={"10px"}>
        <Flex bg={"purple.300"} w={"40vw"} whiteSpace={"normal"} overflow={"hidden"} textOverflow={"clip"} wordBreak={"break-word"} justifyContent={"center"} align={"start"} borderRadius={"20px 20px 0px 20px"} p={"5px 5px"}>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis corporis voluptatum enim? Facilis explicabo, aut minus sequi veniam corrupti pariatur assumenda deserunt ea similique adipisci ut excepturi expedita, laborum ipsum temporibus. Earum autem suscipit vel doloremque vero odio quo velit eum voluptatum. Fuga expedita earum, quaerat nemo aliquid natus.</h2>
        </Flex>
    </VStack>

    </>
    
  );
}

export default ChatHistory;
