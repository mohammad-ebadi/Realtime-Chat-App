import React from "react";
import ChatBarNavbar from "./ChatBarNavbar.jsx";
import { Box, Flex, VStack } from "@chakra-ui/react";
import ChatBarWindow from "./ChatBarWindow.jsx";
import ChatBarFooter from "./ChatBarFooter.jsx";

function ChatBar() {
  return (
    <Box bg={"#112D4E"} w={"67vw"}>
      <VStack gap={0}>
        <ChatBarNavbar></ChatBarNavbar>
        <ChatBarWindow></ChatBarWindow>
        <ChatBarFooter></ChatBarFooter>
      </VStack>
    </Box>
  );
}

export default ChatBar;
