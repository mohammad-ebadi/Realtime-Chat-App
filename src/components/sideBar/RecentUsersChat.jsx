import { Avatar, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

function RecentUsersChat() {
  return (
    <Box mb={3} border={"1px dashed black"} cursor={"pointer"}>
      <Flex alignItems={"center"} gap={1}>
        <Flex alignItems={"center"}>
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
        </Flex>

        <VStack>
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
