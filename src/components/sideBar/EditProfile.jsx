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
import { Edit } from "../../assets/Constants";
import { useAuthStore } from "../../stores/useAuthStore";
import { supabase } from "../../configs/Supabase";
import { firestore } from "../../configs/Firebase";
import { doc, updateDoc } from "firebase/firestore";

function EditProfile() {
  const { user, setUser } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef(null);
  const toast = useToast();

  // Set initial username when modal opens
  const handleModalOpen = () => {
    setNewUsername(user?.username || "");
    onOpen();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
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

    if (newUsername.trim() === user?.username) {
      toast({
        title: "No changes",
        description: "Username is the same as current",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsUpdating(true);

    try {
      console.log('Updating username to:', newUsername.trim());
      
      // Update username in Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, {
        username: newUsername.trim()
      });
      
      console.log('Username updated in Firestore successfully');

      // Update local state
      const updatedUser = {
        ...user,
        username: newUsername.trim()
      };
      
      setUser(updatedUser);

      toast({
        title: "Username updated",
        description: "Your username has been successfully updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      console.error('Error updating username:', error);
      toast({
        title: "Update failed",
        description: error.message || "Failed to update username",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadProfilePicture = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a profile picture first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if user and user.uid exist
    if (!user || !user.uid) {
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
      console.log('Starting upload for user:', user.uid);
      console.log('Selected file:', selectedFile.name, 'Size:', selectedFile.size);
      
      // Generate unique filename with timestamp
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.uid}-${Date.now()}.${fileExt}`;
      
      console.log('Generated filename:', fileName);
      
      // Upload new image to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-profile')
        .upload(fileName, selectedFile);

      if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        if (uploadError.message.includes('bucket') || uploadError.message.includes('not found')) {
          throw new Error('Storage bucket "user-profile" not found. Please contact support.');
        }
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('Upload successful:', uploadData);

      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('user-profile')
        .getPublicUrl(fileName);

      console.log('Public URL generated:', publicUrl);

      // If user has an existing profile picture, delete it
      if (user.profilePicURL) {
        try {
          // Extract filename from existing URL
          const existingFileName = user.profilePicURL.split('/').pop().split('?')[0];
          console.log('Attempting to delete old file:', existingFileName);
          await supabase.storage
            .from('user-profile')
            .remove([existingFileName]);
          console.log('Old file deleted successfully');
        } catch (deleteError) {
          console.warn('Failed to delete old profile picture:', deleteError);
          // Continue even if deletion fails
        }
      }

      // Update user profile in Firestore with new picture URL
      try {
        console.log('Updating Firestore with new profilePicURL');
        const userDocRef = doc(firestore, "users", user.uid);
        await updateDoc(userDocRef, {
          profilePicURL: publicUrl
        });
        console.log('Firestore updated successfully');
      } catch (firestoreError) {
        console.error('Error updating Firestore:', firestoreError);
        throw new Error('Failed to update profile in database');
      }

      // Update user profile in local state with new picture URL
      const updatedUser = {
        ...user,
        profilePicURL: publicUrl
      };
      
      setUser(updatedUser);
      
      // Reset form
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been successfully updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      console.error('Error uploading profile picture:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        user: user ? { uid: user.uid, username: user.username } : 'No user'
      });
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload profile picture",
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
      // Update username if changed
      if (newUsername.trim() !== user?.username) {
        await updateUsername();
      }
      
      // Upload profile picture if selected
      if (selectedFile) {
        await uploadProfilePicture();
      }
      
      onClose();
    } catch (error) {
      console.error('Error in handleSave:', error);
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
                borderColor={newUsername.trim() !== user?.username ? "blue.300" : "gray.300"}
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
              disabled={(!selectedFile && newUsername.trim() === user?.username)}
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



