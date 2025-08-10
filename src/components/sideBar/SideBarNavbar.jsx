import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Avatar , AvatarBadge } from "@chakra-ui/react";
import EditProfile from "./EditProfile.jsx";
import {  Logout } from "../../assets/Constants.jsx";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore.js";
function SideBarNavbar() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  return (
    <Box bg={"pink.200"} w={"full"} maxH={"73vh"} overflow={"auto"}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={1} p={1}>
          <Avatar name={user.username} src={user?.profilePicURL}>
            <AvatarBadge boxSize="1em" bg={"white"} cursor={"pointer"}><EditProfile></EditProfile></AvatarBadge>
          </Avatar>
          <p>{user?.username}</p>
        </Flex>
        <Flex gap={2} alignItems={"center"} mr={2}>
          <Box
            onClick={() => {
              navigate("/auth");
            }}
            cursor={"pointer"}
            _hover={{ bg: "transparent", transform: "scale(1.2)" }}
          >
            <Logout></Logout>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default SideBarNavbar;
