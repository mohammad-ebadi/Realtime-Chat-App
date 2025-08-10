import React, { useState, useRef } from "react";
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
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { Edit } from "../../../assets/Constants.jsx";
import { useAuthStore } from "../../../stores/useAuthStore.js";
import { supabase } from "../../../configs/Supabase.js";
import { firestore } from "../../../configs/Firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const { user, setUser } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();

  // Set initial username when modal opens
  const handleModalOpen = () => {
    setNewUsername(user?.username || "");
    onOpen();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 2MB",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const updateUsername = async () => {
    if (!newUsername.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (newUsername.trim() === user?.username) return;

    setIsUpdating(true);

    try {
      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, {
        username: newUsername.trim(),
      });

      const updatedUser = { ...user, username: newUsername.trim() };
      setUser(updatedUser);

      toast({
        title: "Username updated",
        description: "Your username has been successfully updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to new username URL
      navigate(`/${newUsername.trim()}`);
    } catch (error) {
      console.log(error);
      toast({
        title: "Update failed",
        description: "Failed to update username",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadProfilePicture = async () => {
    if (!selectedFile) return;

    if (!user?.uid) {
      toast({
        title: "User not found",
        description: "Please make sure you are logged in",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${user.uid}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("user-profile")
        .upload(fileName, selectedFile);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("user-profile").getPublicUrl(fileName);

      if (user.profilePicURL) {
        try {
          const existingFileName = user.profilePicURL
            .split("/")
            .pop()
            .split("?")[0];
          await supabase.storage
            .from("user-profile")
            .remove([existingFileName]);
        } catch (deleteError) {
          console.log(deleteError);
          // Continue even if deletion fails
        }
      }

      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, {
        profilePicURL: publicUrl,
      });

      const updatedUser = { ...user, profilePicURL: publicUrl };
      setUser(updatedUser);

      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been successfully updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Upload failed",
        description: "Failed to upload profile picture",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (newUsername.trim() !== user?.username) {
        await updateUsername();
      }

      if (selectedFile) {
        await uploadProfilePicture();
      }

      onClose();
    } catch (error) {
      console.log(error);
      // Error handling is done in individual functions
    }
  };

  return (
    <>
      <Button
        onClick={handleModalOpen}
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
                name={user?.username}
                src={user?.profilePicURL}
                size={"xl"}
              />
              <Input
                ref={fileInputRef}
                type="file"
                border={"none"}
                cursor={"pointer"}
                accept="image/*"
                onChange={handleFileSelect}
              />
            </Flex>
            {selectedFile && (
              <Text fontSize={14} color="blue.500" mb={3}>
                Selected: {selectedFile.name}
              </Text>
            )}
            <VStack align={"start"}>
              <Text fontSize={14}>Current Username : {user?.username}</Text>
              <Input
                placeholder="Username..."
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                borderColor={
                  newUsername.trim() !== user?.username
                    ? "blue.300"
                    : "gray.300"
                }
                _focus={{ borderColor: "blue.500" }}
              />
              {newUsername.trim() !== user?.username && newUsername.trim() && (
                <Text fontSize={12} color="blue.500">
                  New username: {newUsername.trim()}
                </Text>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSave}
              isLoading={isUploading || isUpdating}
              loadingText={isUploading ? "Uploading..." : "Updating..."}
              disabled={!selectedFile && newUsername.trim() === user?.username}
            >
              {isUploading || isUpdating ? <Spinner size="sm" /> : "Save"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfile;
