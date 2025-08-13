import { Box, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import ChatHistory from './ChatHistory'

function ChatBarWindow() {
  return (
    <Box bg={"#DBE2EF"} w={"full"} h={"82vh"} overflow={"auto"}>
   
      <ChatHistory></ChatHistory>
    </Box>
  )
}

export default ChatBarWindow
