import React from "react";
import SideBar from "../../components/sideBar/SideBar.jsx";
import ChatBar from "../../components/chatBar/ChatBar.jsx";
import { Flex } from "@chakra-ui/react";
import { useUsernameRoute } from "../../hooks/useUsernameRoute";

function Home() {
  // This will automatically handle username-based routing validation
  useUsernameRoute();

  return (
    <>
      <Flex h={"100vh"} >
        <Flex  borderRight={"1px solid black"}>
          <SideBar></SideBar>
        </Flex>
        <Flex >
          <ChatBar></ChatBar>
        </Flex>
      </Flex>
    </>
  );
}

export default Home;
