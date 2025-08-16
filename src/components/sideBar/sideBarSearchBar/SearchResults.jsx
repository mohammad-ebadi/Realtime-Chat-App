import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { firestore } from "../../../configs/Firebase";
import { useAuthStore } from "../../../stores/useAuthStore";
import useAppToast from "../../../hooks/useAppToast";

function SearchResults({ username, profilePicURL, searchedUserUid }) {
  const toast = useAppToast()
  const user = useAuthStore((state) => state.user);
  const handleSearchResult = async () => {
    await setDoc(doc(firestore, "userChats", user.uid), [searchedUserUid]);
    toast.success("Ok")
  };
  return (
    <>
      <Box
        border={"none"}
        cursor={"pointer"}
        bg={"#DBE2EF"}
        onClick={handleSearchResult}
        w={"30vw"}
      >
        <Flex alignItems={"center"} gap={1}>
          <Flex alignItems={"center"} p={1}>
            <Avatar name={username} src={profilePicURL} />
          </Flex>

          <VStack align={"start"}>
            <Text fontSize={"15px"} color={"#112D4E"}>
              {username}
            </Text>
            <Text>{searchedUserUid}</Text>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}

export default SearchResults;
