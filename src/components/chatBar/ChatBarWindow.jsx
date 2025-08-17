import { Box, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import ChatHistory from "./ChatHistory";
import { useHandleSelectedUser } from "../../stores/useHandleSelectedUser";

function ChatBarWindow() {
  const { selectedUser } = useHandleSelectedUser();
  return (
    <Box bg={"#DBE2EF"} w={"full"} h={"82vh"} overflow={"auto"}>
      {selectedUser ? <ChatHistory></ChatHistory> : null}
    </Box>
  );
}

export default ChatBarWindow;
