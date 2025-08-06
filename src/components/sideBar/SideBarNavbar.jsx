import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@chakra-ui/react";
import EditProfile from "./EditProfile.jsx";
import {Logout} from "../../assets/Constants.jsx"
function SideBarNavbar() {
  return (
    <Box bg={"red.100"} w={"full"}>
      <Flex  alignItems={"center"}>
        <Flex alignItems={"center"} gap={1}>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <p>Username</p>
        </Flex>

        <Flex gap={2}>
          <EditProfile></EditProfile>
          <Logout></Logout>
          
        </Flex>
      </Flex>
    </Box>
  );
}

export default SideBarNavbar;
