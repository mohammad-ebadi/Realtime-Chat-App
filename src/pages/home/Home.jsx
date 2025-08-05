import React from "react";
import SideBar from "../../components/sidebar/Sidebar";
import ChatBar from "../../components/chatBar/ChatBar";
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
