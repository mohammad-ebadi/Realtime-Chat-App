import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Input,
  Avatar,
  Button,
  Flex,
} from "@chakra-ui/react";


function EditProfile() {
      const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
         <Button onClick={onOpen} size={"xs"}>
          Edit
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex alignItems={"center"} gap={5}  mb={5}>
                <Avatar
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                  size={"xl"}
                />
                <Input type="file" border={"none"} cursor={"pointer"}></Input>
              </Flex>
              <VStack >
                <Input placeholder="Usrename..."></Input>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  )
}

export default EditProfile
