import React from "react";
import SideBar from "../../components/sideBar/SideBar.jsx";
import ChatBar from "../../components/chatBar/ChatBar.jsx";
import { Flex } from "@chakra-ui/react";

function Home() {
  return (
    <Flex>
      <SideBar></SideBar>
      <ChatBar></ChatBar>
    
    </Flex>

  );
}

export default Home;
