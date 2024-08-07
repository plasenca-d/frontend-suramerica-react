import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
export const ListadoManifiestos = ({ manifiestos = [] }) => {
    let [search, setSearch] = useState("")
    let [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 20
    const navigate = useNavigate()

    const filteredGuias = manifiestos.filter(guia =>
        guia.id.toString().includes(search)
    )

    const totalPages = Math.ceil(filteredGuias.length / itemsPerPage)
    const paginatedGuias = filteredGuias.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
                            {Cookies.get("role") == 3 || Cookies.get("role") == 2 && <Button leftIcon={<FiPlusCircle />} colorScheme='red'>Agregar Manifiesto</Button>}
                        </Flex>

                    </Flex>
                </CardHeader>
            </Card>
        </>
    )
}
