import { Avatar, Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "../sidebar/EditProfile";
import { Logout } from "../../assets/Constants";

function ChatBarNavbar() {
  const navigate = useNavigate();

  return (
    <Box bg={"green.300"} w={"full"} maxH={"73vh"} overflow={"auto"}>
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

export default ChatBarNavbar;
