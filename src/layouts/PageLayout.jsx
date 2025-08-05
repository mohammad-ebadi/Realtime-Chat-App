import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import Home from "../pages/home/Home";

function PageLayout({ children }) {
  const { pathname } = useLocation();
 const canRenderSidebar = pathname !== "/auth";
  return ( 
    <Flex>
      {canRenderSidebar  ? (
        
          {children}
      
      ) : null}
    </Flex>
  );
}

export default PageLayout;
