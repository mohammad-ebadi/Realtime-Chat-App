import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import SearchBar from "./sideBarSearchBar/SearchBar.jsx";
import RecentUsers from "./sideBarRecentUsers/RecentUsers.jsx";
import SideBarNavbar from "./sideBarNavbar/SideBarNavbar.jsx";

function SideBar() {
  return (
    <Box bg={"#112D4E"} w={"30vw"}>
      <VStack gap={0}>
        <SideBarNavbar></SideBarNavbar>
        <SearchBar></SearchBar>
        <RecentUsers></RecentUsers>
      </VStack>

      <Text textAlign={"center"} color={"white"}>
        Built by Mohammad
      </Text>
    </Box>
  );
}

export default SideBar;
