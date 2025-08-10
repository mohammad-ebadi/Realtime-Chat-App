// import { Box, Button, Flex, Input, VStack } from "@chakra-ui/react";
// import React from "react";
// import { Search } from "../../assets/Constants";
// import SearchResults from "./SearchResults";

// function SearchBar() {
//   return (
//     <Box bg={"orange.300"} w={"full"} h={"auto"} >
      
//       <Flex alignItems={"center"} justifyContent={"space-between"}>
//         <Flex>
//           <Input placeholder="Search User..." border={"none"} borderRadius={0} focusBorderColor='transparent'></Input>
          
//         </Flex>
//         <Flex>
//             <Box bg={"transparent"}  _hover={{bg:"none", transform: "scale(1.2)"}} cursor={"pointer"} pr={3}><Search></Search></Box>
//         </Flex>
//       </Flex>
        
        
        
//         <SearchResults></SearchResults>
      
//     </Box>
//   );
// }

// export default SearchBar;


import React, { useState } from "react";
import { Flex, Input } from "@chakra-ui/react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { firestore } from "../../configs/Firebase";
import SearchResult from "./SearchResult";

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
    <Flex direction="column" gap={3}>
      <Input
        placeholder="Search username..."
        value={searchTerm}
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
