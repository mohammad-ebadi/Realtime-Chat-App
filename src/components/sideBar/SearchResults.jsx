import { Avatar, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

function SearchResults() {
  return (
    <Box borderBottom={"1px solid black"} cursor={"pointer"} bg={"orange.600"}>
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

export default SearchResults;
