import { Box, Text } from "@chakra-ui/react";
import React from "react";
import RecentUsersChat from "./RecentUsersChat";

function RecentUsers() {
  return (
    <Box bg={"purple.200"} w={"full"} maxH={"68vh"} overflow={"auto"}>
      <Text color={"gray.200"}>Recent Chats</Text>
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
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
    </Box>
  );
}

export default RecentUsers;
