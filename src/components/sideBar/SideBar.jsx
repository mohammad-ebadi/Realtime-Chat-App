import { Box, Flex, VStack } from "@chakra-ui/react";
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

      <p>Built by Mohammad</p>
    </Box>
  );
}

export default SideBar;
