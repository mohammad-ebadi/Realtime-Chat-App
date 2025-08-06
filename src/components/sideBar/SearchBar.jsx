import { Box, Button, Flex, Input, VStack } from "@chakra-ui/react";
import React from "react";
import { Search } from "../../assets/Constants";

function SearchBar() {
  return (
    <Box bg={"orange.300"} w={"full"} h={"auto"} >
      
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex>
          <Input placeholder="Search User..." border={"none"} borderRadius={0} focusBorderColor='transparent' _focus={{_placeholder:{color:"blue.500" }}} ></Input>
          
        </Flex>
        <Flex>
            <Button bg={"transparent"}  _hover={{bg:"none", transform: "scale(1.2)"}}><Search></Search></Button>
        </Flex>
      </Flex>
        
        
        
        <p>Search Result . . .</p>
      
    </Box>
  );
}

export default SearchBar;
