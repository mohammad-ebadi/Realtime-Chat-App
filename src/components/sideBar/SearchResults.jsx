import { Avatar, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

function SearchResults({ username, profilePicURL }) {
  return (
    <>
    <Text color={"gray.500"} textAlign={"center"} h={5}>Search Result</Text>
    <Box borderBottom={"1px solid black"} cursor={"pointer"} bg={"orange.400"}>
      <Flex alignItems={"center"} gap={1}>
        <Flex alignItems={"center"} p={1}>
          <Avatar name={username} src={profilePicURL} />
        </Flex>

        <VStack align={"start"}>
          <Text fontSize={"15px"}>{username}</Text>
          <Text fontSize={"12px"}>Hey whats up dud ? How are you doing?</Text>
        </VStack>
      </Flex>
    </Box>
    </>
    
  );
}

export default SearchResults;
