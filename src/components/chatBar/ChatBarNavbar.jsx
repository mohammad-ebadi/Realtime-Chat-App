import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

function ChatBarNavbar() {
  return (
    <Box bg={"#F9F7F7"} w={"full"} maxH={"73vh"} overflow={"auto"}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={1} p={2}>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" border={"2px solid #112D4E"}/>
          <Text color={"#112D4E"}>Username</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default ChatBarNavbar;
