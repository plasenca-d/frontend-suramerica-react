import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiEdit, FiPlusCircle } from 'react-icons/fi'
import { EditSucursalModal } from './EditSucursalModal'

export const ListadoSucursales = ({ sucursales, empresaId }) => {
    const [sucursal, setSucursal] = useState("")
    const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onClose: onPasswordModalClose } = useDisclosure();

    const editSucursal = (data) => {
        setSucursal(data)
        onPasswordModalOpen()
    }
    return (
        <>
            <Card mt={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Sucursales</Heading>
                            </Box>
                        </Flex>
                        <Button leftIcon={<FiPlusCircle />} colorScheme='red'>Agregar Sucursal</Button>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Codigo</Th>
                                    <Th>Nombre</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {sucursales.map((sucursal, index) => (
                                    <Tr key={index}>
                                        <Td>{sucursal.codigo}</Td>
                                        <Td>{sucursal.nombre}</Td>
                                        <Td>
                                            <IconButton onClick={() => editSucursal(sucursal)} mr={3} icon={<FiEdit />} />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>

          <EditSucursalModal sucursal={sucursal} isOpen={isPasswordModalOpen} onClose={onPasswordModalClose}  />  
        </>
    )
}
