import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiEdit, FiPlusCircle } from 'react-icons/fi'

export const ListadoPaquetes = ({ paquetes }) => {

    const editarpaquete = () => {

    }
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
                        <Button leftIcon={<FiPlusCircle />} colorScheme='red'>Agregar Paquetes</Button>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Nombre</Th>
                                    <Th>Precio</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {paquetes.map((paquete, index) => (
                                    <Tr key={index}>
                                        <Td>{paquete.paquete}</Td>
                                        <Td>{paquete.precio}</Td>
                                        <Td>
                                            <IconButton onClick={() => editarpaquete(paquete)} mr={3} icon={<FiEdit />} />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>
        </>
    )
}
