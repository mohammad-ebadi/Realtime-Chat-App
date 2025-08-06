import { Box, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import RecentUsersChat from '../sideBar/RecentUsersChat'
import ChatHistory from './ChatHistory'

function ChatBarWindow() {
  return (
    <Box bg={"yellow.300"} w={"full"} h={"82vh"} overflow={"auto"}>
   
      <ChatHistory></ChatHistory>
    </Box>
  )
}

export default ChatBarWindow
