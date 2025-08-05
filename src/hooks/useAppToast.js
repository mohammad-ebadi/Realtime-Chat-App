import { useToast } from "@chakra-ui/react";

export default function useAppToast() {
  const toast = useToast();

  const showToast = {
    success: (title, description) =>
      toast({
        title,
        description,
        status: "success",
        isClosable: true,
      }),
    error: (title, description) =>
      toast({
        title,
        description,
        status: "error",
        isClosable: true,
      }),
    warning: (title, description) =>
      toast({
        title,
        description,
        status: "warning",
        isClosable: true,
      }),
    info: (title, description) =>
      toast({
        title,
        description,
        status: "info",
        isClosable: true,
      }),
  };

  return showToast;
}