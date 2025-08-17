import { Avatar, AvatarBadge, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useHandleSelectedUser } from "../../stores/useHandleSelectedUser";

function ChatBarNavbar() {
  const { selectedUser } = useHandleSelectedUser();

  return (
    <Box bg={"#F9F7F7"} w={"full"} maxH={"73vh"} overflow={"auto"}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={1} p={2}>
          <Avatar
            name="Dan Abrahmov"
            src={selectedUser?.profilePicURL}
            border={"2px solid #112D4E"}
          >
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Text color={"#112D4E"}>{selectedUser?.username}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default ChatBarNavbar;
