import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import SearchBar from "./sideBarSearchBar/SearchBar.jsx";
import RecentUsers from "./sideBarRecentUsers/RecentUsers.jsx";
import SideBarNavbar from "./sideBarNavbar/SideBarNavbar.jsx";
import { Github } from "../../assets/Constants.jsx";

function SideBar() {
  return (
    <Box bg={"#112D4E"} w={"30vw"}>
      <VStack gap={0}>
        <SideBarNavbar></SideBarNavbar>
        <SearchBar></SearchBar>
        <RecentUsers></RecentUsers>
      </VStack>
      <Flex gap={3} mt={5} justifyContent={"center"} alignItems={"center"}>
        <Text textAlign={"center"} color={"white"} fontSize={"14px"}>
          Built by Mohammad Ebadi
        </Text>
        <Link href="https://github.com/mohammad-ebadi" cursor={"pointer"} target="_blank"><Github></Github></Link>
      </Flex>
    </Box>
  );
}

export default SideBar;
