import { Badge, Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { FaFilePdf, FaTrash } from 'react-icons/fa'
import Cookies from 'js-cookie'
export const ListadoManifiestos = ({ manifiestos }) => {
    let [search, setSearch] = useState("")
    let [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const navigate = useNavigate()

    // Filtrar los manifiestos
    const filteredGuias = manifiestos.filter(guia =>
        guia.id.toString().includes(search)
    )

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredGuias.length / itemsPerPage)

    // Obtener los datos paginados
    const paginatedGuias = filteredGuias.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const neww = () => {
        navigate("/manifiestos/generar")
    }

    const pdf = (id) => {
        navigate("/documents/manifiestos/pdf/" + id)
    }

    const eliminar = () => { }
    return (
        <>
            <Card mt={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Manifiestos</Heading>
                            </Box>
                        </Flex>

                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Input value={search} w={'50%'} placeholder='Buscar Por Id de Manifiesto' onChange={(event) => setSearch(event.target.value)} />
                            <Button leftIcon={<FiPlusCircle />} onClick={() => neww()} colorScheme='red'>Agregar Manifiesto</Button>
                        </Flex>

                    </Flex>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th textAlign={'center'}>Numero</Th>
                                    <Th textAlign={'center'}>Tipo</Th>
                                    <Th textAlign={'center'}>Numero de Guias</Th>
                                    <Th textAlign={'center'}>Fecha</Th>
                                    <Th textAlign={'center'}>Carga</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {paginatedGuias.map((manifiesto, index) => (
                                    <Tr key={index}>
                                        <Td textAlign={'center'}>{manifiesto.id}</Td>
                                        <Td textAlign={'center'}>
                                            {manifiesto.tipoGuia === 'AEREO' && <Badge colorScheme='green'>AEREO</Badge>}
                                            {manifiesto.tipoGuia === 'MARITIMO' && <Badge colorScheme='red'>MARITIMO</Badge>}
                                            {manifiesto.tipoGuia === 'TERRESTRE' && <Badge colorScheme='blue'>TERRESTRE</Badge>}
                                        </Td>
                                        <Td textAlign={'center'}>{manifiesto.guias.length}</Td>
                                        <Td textAlign={'center'}>{format(new Date(manifiesto.createdAt), 'dd-MM-yyyy')}</Td>
                                        <Td textAlign={'center'}>
                                            {manifiesto.carga && <Badge colorScheme='green'>SI</Badge>}
                                            {!manifiesto.carga && <Badge colorScheme='red'>NO</Badge>}
                                        </Td>
                                        <Td>
                                            <IconButton onClick={() => pdf(manifiesto.id)} colorScheme='blue' mr={3} icon={<FaFilePdf />} />
                                            {(!manifiesto.carga && Cookies.get("role") != 3) && <IconButton onClick={() => eliminar(manifiesto.id)} colorScheme='red' mr={3} icon={<FaTrash />} />}
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
