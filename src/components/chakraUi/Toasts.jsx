import { useToast } from "@chakra-ui/react"

function Toasts({title,status}) {
  const toast = useToast()
//   const statuses = ['success', 'error', 'warning', 'info']
    toast({
                title: {title},
                status: {status},
                isClosable: true,
              })
  return (
    <>
    </>
  )
}
export default Toasts