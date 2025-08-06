import React from "react";
import ChatBarNavbar from "./ChatBarNavbar.jsx";
import { Box, Flex, VStack } from "@chakra-ui/react";
import ChatBarWindow from "./ChatBarWindow.jsx";
import ChatBarFooter from "./ChatBarFooter.jsx";

function ChatBar() {
  return (
    <Box bg={"blue.200"} w={"69vw"}>
      <VStack>
        <ChatBarNavbar></ChatBarNavbar>
        <ChatBarWindow></ChatBarWindow>
        <ChatBarFooter></ChatBarFooter>
      </VStack>
    </Box>
  );
}

export default ChatBar;
