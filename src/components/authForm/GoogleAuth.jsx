import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

function GoogleAuth() {
  return (
    <Flex justifyContent={"center"} alignItems={"center"}m={5}  cursor={"pointer"}>
      <Image src='/google.png' w={30} mr={2}></Image>
      <Text>Sign In with Google</Text>
    </Flex>
  )
}

export default GoogleAuth
