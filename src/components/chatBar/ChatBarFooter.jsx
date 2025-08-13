import { Button, Flex, Input } from '@chakra-ui/react'
import React from 'react'
import { Send } from '../../assets/Constants'

function ChatBarFooter() {
  return (
    <Flex w={"68vw"} bg={"white"} alignItems={"center"}>
      <Input placeholder='Enter your message . . .' size={"lg"}  border={"none"}  borderRadius={0} focusBorderColor='transparent' _focus={{_placeholder:{color:"blue.500"}}}></Input>
      <Button bg={"transparent"} color={"blue.500"} _hover={{bg:"none", transform: "scale(1.2)"}}><Send></Send></Button>
    </Flex>
  )
}

export default ChatBarFooter
