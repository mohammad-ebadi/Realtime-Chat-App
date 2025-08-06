import { Box } from '@chakra-ui/react'
import React from 'react'
import RecentUsersChat from '../sideBar/RecentUsersChat'

function ChatBarWindow() {
  return (
    <Box bg={"yellow.300"} w={"full"} h={"82vh"} overflow={"auto"}>
      
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
      <RecentUsersChat></RecentUsersChat>
    </Box>
  )
}

export default ChatBarWindow
