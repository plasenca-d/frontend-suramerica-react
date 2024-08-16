import { Badge, Card, CardBody, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr, useToast } from '@chakra-ui/react'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import instanceWithToken from '../../../utils/instanceWithToken'

export const CListadoDeGuias = ({ guias, onUpdate }) => {
    const toast = useToast()

    const retirar = (id) => {
        instanceWithToken.patch('guias/' + id, { carga: null }).then((result) => {
            toast({
                title: 'Exito',
                description: 'Guia Eliminada a la Carga correctamente!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            onUpdate()
        })
    }

    return (
        <Card mt={3}>
            <CardBody>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Guia</Th>
                                <Th>Destinatario</Th>
                                <Th>Manifiesto</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {guias.map((guia, index) => (
                                <Tr key={index}>
                                    <Td>{guia.sucursal.codigo}-{guia.id}</Td>
                                    <Td>{guia.destinatario.nombre} {guia.destinatario.apellido}</Td>
                                    <Td>
                                        {!guia.manifiesto && <Badge colorScheme='red'>No</Badge>}
                                        {guia.manifiesto &&
                                            <Tooltip label={guia.manifiesto.id}>
                                                <Badge colorScheme='green'>Si</Badge>
                                            </Tooltip>
                                        }
                                    </Td>
                                    <Td>
                                        <IconButton onClick={() => retirar(guia.id)} colorScheme='red' mr={3} icon={<FaTrash />} />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    )
}
