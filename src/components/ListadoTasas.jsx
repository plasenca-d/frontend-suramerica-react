import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiEdit, FiPlusCircle } from 'react-icons/fi'
import { EditTasaModal } from './EditTasaModal'

export const ListadoTasas = ({ tasas }) => {
    const [tasa, setTasa] = useState("")
    const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onClose: onPasswordModalClose } = useDisclosure();

    const editarTasa = (data) => {
        setTasa(data)
        onPasswordModalOpen()
    }

    return (
        <>
            <Card mt={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Tasas</Heading>
                            </Box>
                        </Flex>
                        <Button leftIcon={<FiPlusCircle />} colorScheme='red'>Agregar Tasa</Button>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Nombre</Th>
                                    <Th>Tipo</Th>
                                    <Th>Valor</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {tasas.map((tasa, index) => (
                                    <Tr key={index}>
                                        <Td>{tasa.tasa}</Td>
                                        <Td>{tasa.tipoPrecio}</Td>
                                        <Td>{tasa.monto} {tasa.divisa}</Td>
                                        <Td>
                                            <IconButton onClick={() => editarTasa(tasa)} mr={3} icon={<FiEdit />} />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>

            <EditTasaModal tasaData={tasa} isOpen={isPasswordModalOpen} onClose={onPasswordModalClose} />
        </>
    )
}
