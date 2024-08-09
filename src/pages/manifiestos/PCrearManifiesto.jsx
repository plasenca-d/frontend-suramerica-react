import {
    Badge, Box, Button, Card, CardBody, CardHeader, Flex, FormControl, FormLabel, Heading,
    Input, Select, SimpleGrid, Switch, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
    useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import instanceWithToken from '../../utils/instanceWithToken'
import { useNavigate } from 'react-router-dom'

export const PCrearManifiesto = () => {
    const navigate = useNavigate()
    const toast = useToast()
    let [tipoGuia, setTipoGuia] = useState("AEREO")
    let [guias, setGuias] = useState([])

    const getPendientes = () => {
        instanceWithToken.get('guias?pendientes=true&tipo=' + tipoGuia).then((result) => {
            // Agrega la propiedad `status` a cada elemento
            const updatedGuias = result.data.data.map(guia => ({ ...guia, status: false }))
            setGuias(updatedGuias)
        })
    }

    useEffect(() => {
        getPendientes()
    }, [tipoGuia])

    // Función para manejar el cambio en el Switch
    const handleStatusChange = (index) => {
        const updatedGuias = [...guias]
        updatedGuias[index].status = !updatedGuias[index].status
        setGuias(updatedGuias)
    }

    const generar = () => {
        instanceWithToken.post('manifiestos', { tipoGuia, guias }).then((result) => {
            navigate("/manifiestos")
            toast({
                title: 'Exito.',
                description: 'Manifiesto creado con exito!',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }

    return (
        <>
            <Card mt={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='md'>Crear Manifiesto</Heading>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <SimpleGrid columns={1}>
                        <Select
                            value={tipoGuia}
                            onChange={(event) => setTipoGuia(event.target.value)}
                            placeholder='Tipo de Guia'
                        >
                            <option value='AEREO'>AEREO</option>
                            <option value='MARITIMO'>MARITIMO</option>
                            <option value='TERRESTRE'>TERRESTRE</option>
                        </Select>
                    </SimpleGrid>

                    <SimpleGrid columns={5} spacing={4} mt={5} paddingX={5}>
                        {guias.map((guia, index) => (
                            <FormControl key={index} display='flex' alignItems='center'>
                                <FormLabel htmlFor={`status-${index}`} mb='0'>
                                    {guia.id}
                                </FormLabel>
                                <Switch
                                    size='lg'
                                    id={`status-${index}`}
                                    isChecked={guia.status}
                                    onChange={() => handleStatusChange(index)}
                                />
                            </FormControl>
                        ))}
                    </SimpleGrid>

                    <SimpleGrid columns={1} mt={6}>
                        <Button width={'100%'} colorScheme='blue' onClick={() => generar()}>Guardar</Button>
                    </SimpleGrid>
                </CardBody>
            </Card>
        </>
    )
}
