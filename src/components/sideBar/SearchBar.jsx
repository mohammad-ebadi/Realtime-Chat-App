import { Box, Input, VStack } from "@chakra-ui/react";
import React from "react";

function SearchBar() {
  return (
    <Box bg={"orange.300"} w={"full"} h={"auto"} >
      <VStack>
        <Input placeholder="Search User..." variant={"flushed"}></Input>
        <p>Seach Results</p>
      </VStack>
    </Box>
  );
}

export default SearchBar;
