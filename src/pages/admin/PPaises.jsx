import React, { useEffect, useState } from 'react'
import instanceWithToken from '../../utils/instanceWithToken'
import { Badge, Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Input, ModalFooter, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { FaCheck, FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Text
} from '@chakra-ui/react';

export const PPaises = () => {
    const toast = useToast();
    let [paises, setPaises] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    let [nombre, setNombre] = useState("")
    let [paisEdit, setPaisEdit] = useState("")
    let [nacionalidad, setNacionalidad] = useState("")
    const getPaises = () => {
        instanceWithToken.get('paises').then((result) => {
            setPaises(result.data.data)
        })
    }

    const status = (id, status) => {
        instanceWithToken.patch('paises/' + id, { status: status }).then((result) => {
            toast({
                title: 'Exito',
                description: 'Estado del pais actualizado con exito',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            getPaises()
        })
    }

    const update = () => {
        if (!nombre, !nacionalidad) {
            toast({
                title: 'Error',
                description: 'Nombre y Nacionalidad deben estar llenos',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return
        }

        let payload = { nombre, nacionalidad }

        instanceWithToken.patch('paises/' + paisEdit.id, payload).then((result) => {
            console.log(result.data.data)
            onClose()
            toast({
                title: 'Exito',
                description: 'Actualizacion aplicada correctamente',
                status: 'success',
                duration: 6000,
                isClosable: true,
            });
        })
    }

    const editCountrie = (pais) => {
        setPaisEdit(pais)
        setNombre(paisEdit.nombre)
        setNacionalidad(paisEdit.nacionalidad)
        onOpen()
    }

    useEffect(() => {
        getPaises()
    }, [])

    return (
        <>
            <Card mt={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Paquetes</Heading>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Pais</Th>
                                    <Th>Status</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {paises.map((pais, index) => (
                                    <Tr key={index}>
                                        <Td>{pais.nombre}</Td>
                                        <Td>
                                            {pais.status && <Badge colorScheme='green'>Activo</Badge>}
                                            {!pais.status && <Badge colorScheme='red'>Inactivo</Badge>}
                                        </Td>
                                        <Td>
                                            <IconButton colorScheme='blue' onClick={() => editCountrie(pais)} mr={3} icon={<FaEdit />} />
                                            {!pais.status && <IconButton colorScheme='green' onClick={() => status(pais.id, true)} mr={3} icon={<FaCheckCircle />} />}
                                            {pais.status && <IconButton colorScheme='red' onClick={() => status(pais.id, false)} mr={3} icon={<FaTrash />} />}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Pais</ModalHeader>
                    <ModalBody>
                        <Box>
                            <Text mb='8px'>Pais</Text>
                            <Input value={nombre} onChange={(event) => setNombre(event.target.value)} type='text' />
                        </Box>
                        <Box>
                            <Text mb='8px'>Nacionalidad</Text>
                            <Input value={nacionalidad} onChange={(event) => setNacionalidad(event.target.value)} type='text' />
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={update}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
