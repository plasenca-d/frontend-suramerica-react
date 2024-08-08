import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import Cookies from 'js-cookie'
import { FaFileContract, FaReceipt, FaTag, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import instanceWithToken from '../utils/instanceWithToken'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'

export const ListadoGuias = ({ guias, updateGuias }) => {
    const toast = useToast()
    let [search, setSearch] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    let [currentPage, setCurrentPage] = useState(1)
    let [deleteId, setDeleteId] = useState("")
    let [referenceDelete, setReference] = useState("")
    const itemsPerPage = 20
    const navigate = useNavigate()

    const filteredGuias = guias.filter(guia =>
        guia.id.toString().includes(search) ||
        guia.cliente.nombre.toLowerCase().includes(search.toLowerCase()) ||
        guia.cliente.apellido.toLowerCase().includes(search.toLowerCase()) ||
        guia.destinatario.nombre.toLowerCase().includes(search.toLowerCase()) ||
        guia.destinatario.apellido.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filteredGuias.length / itemsPerPage)
    const paginatedGuias = filteredGuias.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const ticket = (id) => {
        navigate("/documents/ticket/" + id)
    }

    const etiqueta = (id) => {
        navigate("/documents/etiqueta/" + id)
    }

    const guia = (id) => {
        navigate("/documents/guia/" + id)
    }

    const eliminar = (referencia, id) => {
        setReference(referencia + '-' + id)
        setDeleteId(id)
        onOpen()
    }

    const eliminarP = () => {
        instanceWithToken.delete('guias/' + deleteId).then((result) => {
            toast({
                title: 'Eliminada.',
                description: "La guia ha sido eliminada con exito!",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            onClose()
            updateGuias()
        })
    }

    return (
        <>
            <Card mt={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Guias</Heading>
                            </Box>
                        </Flex>

                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Input value={search} w={'50%'} placeholder='Buscar Por Id de Guia, o Nombre del cliente' onChange={(event) => setSearch(event.target.value)} />
                            {Cookies.get("role") == 3 && <Button leftIcon={<FiPlusCircle />} colorScheme='red'>Agregar Guia</Button>}
                        </Flex>

                    </Flex>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Guia</Th>
                                    <Th>Cliente</Th>
                                    <Th>Destinatario</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {paginatedGuias.map((paquete, index) => (
                                    <Tr key={index}>
                                        <Td>{paquete.id}</Td>
                                        <Td>{paquete.cliente.nombre} {paquete.cliente.apellido}</Td>
                                        <Td>{paquete.destinatario.nombre} {paquete.destinatario.apellido}</Td>
                                        <Td>
                                            <IconButton onClick={() => ticket(paquete.id)} colorScheme='blue' mr={3} icon={<FaReceipt />} />
                                            <IconButton onClick={() => guia(paquete.id)} colorScheme='teal' mr={3} icon={<FaFileContract />} />
                                            <IconButton onClick={() => etiqueta(paquete.id)} colorScheme='green' mr={3} icon={<FaTag />} />
                                            {(!paquete.manifiesto && Cookies.get("role") != 3) && <IconButton onClick={() => eliminar(paquete.sucursal.codigo, paquete.id)} colorScheme='red' mr={3} icon={<FaTrash />} />}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Flex justifyContent="center" mt={4}>
                        <Button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </Button>
                        <Box mx={2} alignSelf="center">
                            Página {currentPage} de {totalPages}
                        </Box>
                        <Button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Siguiente
                        </Button>
                    </Flex>
                </CardBody>
            </Card>


            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Eliminar Guia
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Desea usted realmente eliminar la guia {referenceDelete}?
                            <Text color={'red'}>**Recuerda esta accion no tiene reversion</Text>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={eliminarP} ml={3}>
                                Eliminar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
