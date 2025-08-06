import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@chakra-ui/react";
import EditProfile from "./EditProfile.jsx";
import { Logout } from "../../assets/Constants.jsx";
import { Link, useNavigate } from "react-router-dom";
function SideBarNavbar() {
  const navigate = useNavigate();
  return (
    <Box bg={"pink.200"} w={"full"} maxH={"73vh"} overflow={"auto"}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={1}>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <p>Username</p>
        </Flex>
        <Flex gap={2}>
          <EditProfile></EditProfile>
          <Box
            onClick={() => {
              navigate("/auth");
            }}
            cursor={"pointer"}
          >
            <Logout></Logout>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default SideBarNavbar;
