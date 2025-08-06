import { Avatar, Box, Flex } from "@chakra-ui/react";
import React from "react";

function ChatBarNavbar() {
  return (
    <Box bg={"green.300"} w={"full"} maxH={"73vh"} overflow={"auto"}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={1} p={1}>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <p>Username</p>
        </Flex>
      </Flex>
    </Box>
  );
}

export default ChatBarNavbar;
