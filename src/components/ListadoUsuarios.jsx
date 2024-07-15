import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiEdit, FiKey, FiPlusCircle } from 'react-icons/fi';
import PasswordModal from './PasswordModal';
import EditUserModal from './EditUserModal';

export const ListadoUsuarios = ({ users, empresaId, getUsuarios }) => {
    const toast = useToast();
    const [password, setPassword] = useState("");
    const [editId, setEditId] = useState("");
    const [userEdit, setUserEdit] = useState(null);

    const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onClose: onPasswordModalClose } = useDisclosure();
    const { isOpen: isEditUserModalOpen, onOpen: onEditUserModalOpen, onClose: onEditUserModalClose } = useDisclosure();

    const editPassword = (id) => {
        setEditId(id);
        onPasswordModalOpen();
    };

    const editUser = (user) => {
        setUserEdit(user);
        onEditUserModalOpen();
    };

    const updatePassword = () => { };

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
                                        <Td>
                                            {user.typeUser == 2 && (<Tag colorScheme='red'>Administrador</Tag>)}
                                            {user.typeUser == 3 && (<Tag colorScheme='blue'>Operario</Tag>)}
                                        </Td>
                                        <Td>{user.email}</Td>
                                        <Td>
                                            <IconButton onClick={() => editUser(user)} mr={3} icon={<FiEdit />} />
                                            <IconButton onClick={() => editPassword(user.id)} colorScheme='red' mr={3} icon={<FiKey />} />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>
            
            <PasswordModal editId={editId} isOpen={isPasswordModalOpen} onClose={onPasswordModalClose} onSubmit={updatePassword} />
            <EditUserModal user={userEdit} isOpen={isEditUserModalOpen} onClose={onEditUserModalClose} getUsuarios={getUsuarios} />
        </>
    );
}
