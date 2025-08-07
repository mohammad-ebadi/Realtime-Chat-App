import { Box, Button, Flex, Input, VStack } from "@chakra-ui/react";
import React from "react";
import { Search } from "../../assets/Constants";
import SearchResults from "./SearchResults";

function SearchBar() {
  return (
    <Box bg={"orange.300"} w={"full"} h={"auto"} >
      
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex>
          <Input placeholder="Search User..." border={"none"} borderRadius={0} focusBorderColor='transparent'></Input>
          
        </Flex>
        <Flex>
            <Box bg={"transparent"}  _hover={{bg:"none", transform: "scale(1.2)"}} cursor={"pointer"} pr={3}><Search></Search></Box>
        </Flex>
      </Flex>
        
        
        
        <SearchResults></SearchResults>
      
    </Box>
  );
}

export default SearchBar;
