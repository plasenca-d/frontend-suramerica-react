import { Box, Card, CardHeader, Flex, Heading, CardBody, Input, Button, SimpleGrid, Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'

export const CArticulos = ({ articulos, setArticulos }) => {

    const [articulo, setArticulo] = useState("")
    const [precio, setPrecio] = useState("")
    const [cantidad, setCantidad] = useState("")

    const add = () => {
        let payload = { articulo, monto: precio, cantidad }
        let newArticulos = [...articulos, payload] // Crear una nueva copia del array con el nuevo artículo
        setArticulos(newArticulos) // Actualizar el estado con la nueva copia
        setArticulo("") // Limpiar el campo de entrada después de agregar
        setPrecio("") // Limpiar el campo de entrada después de agregar
        setCantidad("") // Limpiar el campo de entrada después de agregar
    }

    const eliminar = (index) => {
        let newArticulos = articulos.filter((_, i) => i !== index) // Filtrar el array para excluir el elemento en el índice proporcionado
        setArticulos(newArticulos) // Actualizar el estado con la nueva lista
    }

    return (
        <Card mt={5} mb={5}>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Box>
                            <Heading size='lg'>Articulos</Heading>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <SimpleGrid columns={4} spacing={5}>
                    <Input placeholder="Articulo" value={articulo} onChange={(event) => setArticulo(event.target.value)} />
                    <Input placeholder="Precio" value={precio} onChange={(event) => setPrecio(event.target.value)} />
                    <Input placeholder="Cantidad" value={cantidad} onChange={(event) => setCantidad(event.target.value)} />
                    <Button onClick={add} colorScheme='blue'>Agregar</Button>
                </SimpleGrid>

                <SimpleGrid columns={1} spacing={5} mt={5}>
                    <TableContainer>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Articulo</Th>
                                    <Th isNumeric>Cantidad</Th>
                                    <Th isNumeric>Precio</Th>
                                    <Th isNumeric>Fob</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {articulos.map((articulo, index) => (
                                    <Tr key={index}>
                                        <Td>{articulo.articulo}</Td>
                                        <Td isNumeric>{articulo.cantidad}</Td>
                                        <Td isNumeric>{articulo.monto}</Td>
                                        <Td isNumeric>{articulo.cantidad * articulo.monto}</Td>
                                        <Td>
                                            <IconButton colorScheme='red' onClick={() => eliminar(index)} icon={<FaTrash />} />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </SimpleGrid>
            </CardBody>
        </Card>
    )
}
