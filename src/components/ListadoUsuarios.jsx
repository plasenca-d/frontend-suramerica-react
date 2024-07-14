import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiEdit, FiKey, FiPlusCircle } from 'react-icons/fi';
import instanceWithToken from '../utils/instanceWithToken';
import PasswordModal from './PasswordModal';

export const ListadoUsuarios = ({ users, empresaId }) => {
    const toast = useToast()
    // passwordEdit
    let [password, setPassword] = useState("")
    let [editId, setEditId] = useState("")

    const { isOpen, onOpen, onClose } = useDisclosure()

    const editPassword = (id) => {
        setEditId(id)
        onOpen()
    }

    const updatePassword = () => {
        const payload = { password }

        if (!password) {
            toast({
                title: 'Error.',
                description: 'La contraseña no puede estar vacia',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }

        instanceWithToken.patch('users/' + editId, payload).then((result) => {
            toast({
                title: 'Correcto.',
                description: 'Ya puedes iniciar sesion con tu nueva contraseña',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        })
    }

    return (
        <>
            <Card mt={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Usuarios</Heading>
                            </Box>
                        </Flex>
                        <Button leftIcon={<FiPlusCircle />} colorScheme='red'>Agregar Usuario</Button>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Nombre</Th>
                                    <Th>Tipo</Th>
                                    <Th>Usuario</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users.map((user, index) => (
                                    <Tr key={index}>
                                        <Td>{user.name}</Td>
                                        <Td>{user.typeUser}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>
                                            <IconButton mr={3} icon={<FiEdit />} />
                                            <IconButton onClick={() => editPassword(user.id)} colorScheme='red' mr={3} icon={<FiKey />} />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>

            <PasswordModal editId={editId} isOpen={isOpen} onClose={onClose} onSubmit={updatePassword} />
        </>
    )
}
