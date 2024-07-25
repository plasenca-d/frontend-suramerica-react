import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import Cookies from 'js-cookie'
import { FaFileContract, FaReceipt, FaTag } from 'react-icons/fa'

export const ListadoGuias = ({ guias }) => {
    let [search, setSearch] = useState("")
    let [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 20

    const filteredGuias = guias.filter(guia => 
        guia.id.toString().includes(search) ||
        guia.cliente.nombre.toLowerCase().includes(search.toLowerCase()) ||
        guia.cliente.apellido.toLowerCase().includes(search.toLowerCase()) ||
        guia.destinatario.nombre.toLowerCase().includes(search.toLowerCase()) ||
        guia.destinatario.apellido.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filteredGuias.length / itemsPerPage)
    const paginatedGuias = filteredGuias.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const openGuia = () => {

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
                                            <IconButton colorScheme='blue' mr={3} icon={<FaReceipt />} />
                                            <IconButton colorScheme='teal' mr={3} icon={<FaFileContract />} />
                                            <IconButton onClick={() => openGuia} colorScheme='green' mr={3} icon={<FaTag />} />
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
        </>
    )
}
