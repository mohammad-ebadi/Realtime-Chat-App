// import React from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   VStack,
//   Input,
//   Avatar,
//   Button,
//   Flex,
//   Text,
// } from "@chakra-ui/react";
// import { Edit } from "../../assets/Constants";
// import { useAuthStore } from "../../stores/useAuthStore";

// function EditProfile() {
//   const { user } = useAuthStore();
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <>
//       <Button
//         onClick={onOpen}
//         size={"xl"}
//         _hover={{ bg: "transparent", transform: "scale(1.2)" }}
//         bg={"none"}
//       >
//         <Edit></Edit>
//       </Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Edit Profile</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Flex alignItems={"center"} gap={5} mb={5}>
//               <Avatar
//                 name={user.username} src={user?.profilePicURL} 
//                 size={"xl"}
//               />
//               <Input type="file" border={"none"} cursor={"pointer"}></Input>
//             </Flex>
//             <VStack align={"start"}>
//               <Text fontSize={14}>Current Username : {user?.username}</Text>
//               <Input placeholder="Usrename..."></Input>
//             </VStack>
//           </ModalBody>
//           <ModalFooter>
//             <Button  mr={3} onClick={onClose}>
//               Close
//             </Button>
//             <Button colorScheme="blue">Save</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default EditProfile;



import React, { useState } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure, VStack, Input,
  Avatar, Button, Flex, Text,
} from "@chakra-ui/react";
import { Edit } from "../../assets/Constants.jsx";
import { useAuthStore } from "../../stores/useAuthStore.js";
import { supabase } from "../../configs/Supabase.js";
import { firestore } from "../../configs/Firebase.js";
import { doc, updateDoc } from "firebase/firestore";

function EditProfile() {
  const { user, setUser } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      if (!selectedFile) {
        onClose();
        return;
      }

      // مسیر فایل در باکت (ثابت = جایگزینی آسان)
      const filePath =` ${user.uid}.jpg`;

      // اگر تصویر قبلی وجود دارد، حذفش کن
      if (user.profilePicURL) {
        await supabase.storage.from("user-profile").remove([filePath]);
      }

      // آپلود تصویر جدید
      const { error: uploadError } = await supabase.storage
        .from("user-profile")
        .upload(filePath, selectedFile, { upsert: true });

      if (uploadError) throw uploadError;

      // گرفتن URL عمومی
      const { data: publicUrlData } = supabase.storage
        .from("user-profile")
        .getPublicUrl(filePath);

      const newProfilePicURL = publicUrlData.publicUrl;

      // آپدیت در Firestore
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, { profilePicURL: newProfilePicURL });

      // آپدیت در Zustand
      setUser({ ...user, profilePicURL: newProfilePicURL });

      onClose();
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        size={"xl"}
        _hover={{ bg: "transparent", transform: "scale(1.2)" }}
        bg={"none"}
      >
        <Edit></Edit>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems={"center"} gap={5} mb={5}>
              <Avatar
                name={user.username}
                src={user?.profilePicURL}
                size={"xl"}
              />
              <Input
                type="file"
                border={"none"}
                cursor={"pointer"}
                onChange={handleFileChange}
              ></Input>
            </Flex>
            <VStack align={"start"}>
              <Text fontSize={14}>Current Username : {user?.username}</Text>
              <Input placeholder="Usrename..."></Input>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfile;
