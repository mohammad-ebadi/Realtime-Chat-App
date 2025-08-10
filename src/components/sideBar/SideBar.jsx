import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import SearchBar from "./SearchBar.jsx";
import RecentUsers from "./RecentUsers.jsx";
import SideBarNavbar from "./SideBarNavbar.jsx";

function SideBar() {
  return (
    <Box bg={"green.100"} w={"30vw"}>
      <VStack gap={0}>
        <SideBarNavbar></SideBarNavbar>
        <SearchBar></SearchBar>
        <RecentUsers></RecentUsers>
      </VStack>

      <Text textAlign={"center"} color={"gray.700"}>Built by Mohammad</Text>
    </Box>
  );
}

export default SideBar;
