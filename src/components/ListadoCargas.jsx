import { Badge, Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { FaDollarSign, FaEye, FaFileExcel, FaFilePdf, FaRegEdit, FaTrash } from 'react-icons/fa'
import { FiPlusCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { FaCircleDown, FaCircleUp } from 'react-icons/fa6'
import instanceWithToken from '../utils/instanceWithToken'
import { saveAs } from 'file-saver';

export const ListadoCargas = ({ cargas, onUpdate }) => {

    let [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const navigate = useNavigate()
    let [search, setSearch] = useState("")

    // Filtrar los manifiestos
    const filteredGuias = cargas.filter(guia =>
        guia.id.toString().includes(search)
    )

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredGuias.length / itemsPerPage)

    // Obtener los datos paginados
    const paginatedGuias = filteredGuias.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const excel = (id, tipo) => {
        instanceWithToken.get(`cargas/excel/${id}?tipo=${tipo}`, {
            responseType: 'blob' // Important to get the response as a blob
        }).then(response => {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `Carga-${id}.xlsx`); // Download the file
        }).catch(error => {
            console.error('Error downloading the file:', error);
        });
    }

    const excelZoom = (id, tipo) => {
        instanceWithToken.get(`cargas/excel-zoom/${id}?tipo=${tipo}`, {
            responseType: 'blob' // Important to get the response as a blob
        }).then(response => {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `Carga-${tipo}-${id}.xlsx`); // Download the file
        }).catch(error => {
            console.error('Error downloading the file:', error);
        });
    }

    const edit = (id) => {
        navigate("/cargas/editar/" + id)
    }

    return (
        <>
            <Card mt={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Cargas</Heading>
                            </Box>
                        </Flex>

                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Input value={search} w={'50%'} placeholder='Buscar Por Id de Carga' onChange={(event) => setSearch(event.target.value)} />
                            <Button leftIcon={<FiPlusCircle />} onClick={() => neww()} colorScheme='red'>Agregar Carga</Button>
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
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {paginatedGuias.map((manifiesto, index) => (
                                    <Tr key={index}>
                                        <Td textAlign={'center'}>{manifiesto.id}</Td>
                                        <Td textAlign={'center'}>
                                            {manifiesto.tipoCarga === 'AEREO' && <Badge colorScheme='green'>AEREO</Badge>}
                                            {manifiesto.tipoCarga === 'MARITIMO' && <Badge colorScheme='red'>MARITIMO</Badge>}
                                            {manifiesto.tipoCarga === 'TERRESTRE' && <Badge colorScheme='blue'>TERRESTRE</Badge>}
                                        </Td>
                                        <Td textAlign={'center'}>{manifiesto.guias.length}</Td>
                                        <Td textAlign={'center'}>{format(new Date(manifiesto.createdAt), 'dd-MM-yyyy')}</Td>
                                        <Td>
                                            
                                            <IconButton onClick={() => excel(manifiesto.id, 'full')} colorScheme='green' mr={3} icon={<FaFileExcel />} />
                                            <IconButton onClick={() => excelZoom(manifiesto.id, 'my3')} colorScheme='teal' mr={3} icon={<FaCircleUp />} />
                                            <IconButton onClick={() => excelZoom(manifiesto.id, 'mn3')} colorScheme='orange' mr={3} icon={<FaCircleDown />} />
                                            <IconButton onClick={() => pdf(manifiesto.id)} colorScheme='yellow' mr={3} icon={<FaDollarSign />} />
                                            {manifiesto.estado === 'CREACION' && <IconButton onClick={() => edit(manifiesto.id)} colorScheme='blue' mr={3} icon={<FaRegEdit />} />}
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
