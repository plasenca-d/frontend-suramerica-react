import { Box, Card, CardHeader, Flex, Heading, CardBody, InputGroup, Input, InputRightElement, Button, SimpleGrid, IconButton, useToast, useDisclosure, Checkbox, Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import instanceWithToken from '../../../utils/instanceWithToken'

export const CAdicionales = ({ moneda, seguro, montoSeguro, delivery, montoDelivery, paquete, paqueteNombre, paquetePrecio, setSeguro, setMontoSeguro, setDelivery, setMontoDelivery, setPaquete, setPaqueteNombre, setPaquetePrecio }) => {

    let [empaques, setEmpaques] = useState([])
    let [paquetee, setPaquetee] = useState("")
    const getPaquetes = () => {
        instanceWithToken.get('empaques').then((result) => {
            setEmpaques(result.data.data)
        })
    }

    const loadData = (id) => {
        const selectedTasa = empaques.filter(t => t.id == id);

        let data = selectedTasa[0]

        setPaqueteNombre(data.paquete)
        setPaquetePrecio(data.precio)
    }

    useEffect(() => {
        getPaquetes()
    }, [])
    return (
        <Card mt={5} mb={5}>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Box>
                            <Heading size='lg'>Adicionales</Heading>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <SimpleGrid columns={2} mb={3}>
                    <Box>
                        <Checkbox mt={2} onChange={(event) => setSeguro(event.target.checked)}>Seguro</Checkbox>
                    </Box>
                    <Box>
                        <Input placeholder='Monto Seguro' value={montoSeguro} onChange={(event) => setMontoSeguro(event.target.value)} disabled={!seguro} />
                    </Box>
                </SimpleGrid>

                <SimpleGrid columns={2} mb={3}>
                    <Box>
                        <Checkbox mt={2} onChange={(event) => setDelivery(event.target.checked)}>Delivery</Checkbox>
                    </Box>
                    <Box>
                        <Input placeholder='Monto Seguro' value={montoDelivery} onChange={(event) => setMontoDelivery(event.target.value)} disabled={!delivery} />
                    </Box>
                </SimpleGrid>

                <SimpleGrid columns={2} mb={3}>
                    <Box>
                        <Checkbox mt={2} onChange={(event) => setPaquete(event.target.checked)}>Empaquetado</Checkbox>
                    </Box>
                    <Box>
                        <Select placeholder='Seleccione Paquete' disabled={!paquete} value={paquetee} onChange={(event) => loadData(event.target.value)}>
                            {empaques.map((empaque, index) => (
                                <option value={empaque.id} key={index}>{empaque.paquete} ({empaque.precio} {moneda})</option>
                            ))}
                        </Select>
                    </Box>
                </SimpleGrid>
            </CardBody>
        </Card>
    )
}
