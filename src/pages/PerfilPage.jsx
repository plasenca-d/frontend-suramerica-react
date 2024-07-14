import { Box, Button, Card, CardHeader, Flex, Heading, useDisclosure } from "@chakra-ui/react"
import { FiKey, FiPlusCircle } from "react-icons/fi"
import PasswordModal from "../components/PasswordModal"

export const PerfilPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()


    const editPassword = () => {
        onOpen()
    }

    const updatePassword = () => {}
    return (
        <>
            <Card mt={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Ajuste de Seguridad</Heading>
                            </Box>
                        </Flex>
                        <Button leftIcon={<FiKey />} onClick={() => editPassword()} colorScheme='red'>Cambiar Clave</Button>
                    </Flex>
                </CardHeader>
            </Card>

            <PasswordModal isOpen={isOpen} onClose={onClose} onSubmit={updatePassword} />
        </>
    )
}
