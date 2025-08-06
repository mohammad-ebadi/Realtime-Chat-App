import React from "react";
import ChatBarNavbar from "./ChatBarNavbar.jsx";
import { Box, Flex } from "@chakra-ui/react";

function ChatBar() {
  return (
    <Box bg={"blue.200"}>
      <ChatBarNavbar></ChatBarNavbar>
    </Box>
  );
}

export default ChatBar;
