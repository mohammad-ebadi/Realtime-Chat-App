import React, { useState } from "react";
import { Flex, Input } from "@chakra-ui/react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { firestore } from "../../../configs/Firebase.js";
import SearchResult from "./SearchResults.jsx";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  const handleSearch = async (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);

    if (!value) {
      setFoundUser(null);
      return;
    }

    try {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("username", "==", value), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setFoundUser({
          username: userData.username,
          profilePicURL: userData.profilePicURL || "",
        });
      } else {
        setFoundUser(null);
      }
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };

  return (
    <Flex direction="column" gap={3} bg={"orange.300"}>
      <Input
        placeholder="Search username..."
        value={searchTerm}
        border={"none"}
        borderRadius={0}
        focusBorderColor="transparent"
        _focus={{ _placeholder: { color: "blue.500" } }}
        onChange={handleSearch}
      />
      {foundUser && (
        <SearchResult
          username={foundUser.username}
          profilePicURL={foundUser.profilePicURL}
        />
      )}
    </Flex>
  );
}

export default SearchBar;
