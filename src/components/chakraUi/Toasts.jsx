// import { useToast } from "@chakra-ui/react"

// function Toasts({title,status}) {
//   const toast = useToast()
// //   const statuses = ['success', 'error', 'warning', 'info']
//     toast({
//                 title: {title},
//                 status: {status},
//                 isClosable: true,
//               })
//   return (
//     <>
//     </>
//   )
// }
// export default Toasts


import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

function Toasts({ title, status }) {
  const toast = useToast();

  useEffect(() => {
    if (title && status) {
      toast({
        title,
        status,
        isClosable: true,
      });
    }
  }, [title, status, toast]);

  return null;
}

export default Toasts;