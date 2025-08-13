import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

function SearchResults({ username, profilePicURL }) {
  const handleSearchResult = () => {};
  return (
    <>
      <Box
        border={"none"}
        cursor={"pointer"}
        bg={"#DBE2EF"}
        onClick={handleSearchResult}
        w={"30vw"}
      >
        <Flex alignItems={"center"} gap={1}>
          <Flex alignItems={"center"} p={1}>
            <Avatar name={username} src={profilePicURL} />
          </Flex>

          <VStack align={"start"}>
            <Text fontSize={"15px"}>{username}</Text>
            {/* <Text fontSize={"12px"}>Hey whats up dud ? How are you doing?</Text> */}
          </VStack>
        </Flex>
      </Box>
    </>
  );
}

export default SearchResults;
