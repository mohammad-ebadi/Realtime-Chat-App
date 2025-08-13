import { Box, Text } from "@chakra-ui/react";
import React from "react";
import RecentUsersChat from "./RecentUsersChat.jsx";

function RecentUsers() {
  return (
    <>
      <Text color={"gray.500"} textAlign={"center"}>
        Recent Chats
      </Text>
      <Box  w={"full"} maxH={"50vh"} overflow={"auto"}>
        <RecentUsersChat></RecentUsersChat>
        <RecentUsersChat></RecentUsersChat>
        <RecentUsersChat></RecentUsersChat>
        <RecentUsersChat></RecentUsersChat>
        <RecentUsersChat></RecentUsersChat>
        <RecentUsersChat></RecentUsersChat>
        <RecentUsersChat></RecentUsersChat>
        <RecentUsersChat></RecentUsersChat>
        <RecentUsersChat></RecentUsersChat>
        <RecentUsersChat></RecentUsersChat>
      </Box>
    </>
  );
}

export default RecentUsers;
