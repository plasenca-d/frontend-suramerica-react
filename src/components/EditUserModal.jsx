import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Button,
    useToast,
    Text,
    Select
} from '@chakra-ui/react';
import instanceWithToken from '../utils/instanceWithToken';
import Cookies from 'js-cookie';

const EditUserModal = ({ isOpen, onClose, user }) => {
    const [sucursales, setSucursales] = useState([])
    const [name, setName] = useState('');
    const [sucursalId, setSucursalId] = useState("")
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [roleCreator, setRoleCreator] = useState(Cookies.get("role"))
    const toast = useToast();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.typeUser);
        }
    }, [user]);

    const handleSubmit = () => {
        instanceWithToken.patch(`users/${user.id}`, { name, email, typeUser: role, sucursal: sucursalId }).then((result) => {
            toast({
                title: 'Éxito!',
                description: 'Usuario actualizado con éxito',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            onClose();
        }).catch((error) => {
            toast({
                title: 'Error',
                description: 'No se pudo actualizar el usuario',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        });
    };

    const getSucursals = () => {
        instanceWithToken.get('sucursales').then((result) => { setSucursales(result.data.data) })
    }

    useEffect(() => {
        if (Cookies.get("role") == 2) {
            getSucursals()
        }
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Actualizar Usuario</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <>
                        <Text fontSize='sm'>Nombre</Text>
                        <Input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder='Nombre'
                        />
                    </>
                    <>
                        <Text fontSize='sm'>Usuario de acceso</Text>
                        <Input
                            mt={3}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder='Usuario'
                        />
                    </>
                    {roleCreator == 2 &&
                        <>
                            <Text fontSize='sm'>Sucursal</Text>
                            <Select value={sucursalId} onChange={(event) => setSucursalId(event.target.value)} placeholder='Sucursal'>
                                {sucursales.map((sucursal) => (
                                    <option value={sucursal.id}>{sucursal.codigo} - {sucursal.nombre}</option>
                                ))}
                            </Select>
                        </>
                    }
                    <>
                        <Text fontSize='sm'>Tipo de Usuario</Text>
                        <Select
                            placeholder='Tipo de Usuario'
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                        >
                            <option value='1'>Super Admin</option>
                            <option value='2'>Admin</option>
                            <option value='3'>Operario</option>
                        </Select>
                    </>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={handleSubmit}>
                        Actualizar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditUserModal;
