import { Avatar, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

function RecentUsersChat() {
  const handleOpenChat = ()=>{
    
  }
  return (
    <Box borderBottom={"1px solid white"} cursor={"pointer"} bg={"#3F72AF"} onClick={handleOpenChat} _hover={{bg:"#112D4E"}}>
      <Flex alignItems={"center"} gap={1}>
        <Flex alignItems={"center"} p={1}>
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
        </Flex>

        <VStack align={"start"}>
          <Text fontSize={"10px"}>Username</Text>
          <Text fontSize={"12px"}>
            Hey whats up dud ? How are you doing?
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}

export default RecentUsersChat;
