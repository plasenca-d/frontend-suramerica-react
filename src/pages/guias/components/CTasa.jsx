import { Box, Card, CardHeader, Flex, Heading, CardBody, SimpleGrid, IconButton, Checkbox, Textarea, useDisclosure, Input, Text, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import instanceWithToken from '../../../utils/instanceWithToken';

export const CTasa = ({ moneda, tasa, setTasa, alto, setAlto, ancho, setAncho, largo, setLargo, peso, setPeso, volumen = 0, setVolumen, tipoGuia, setTasaData }) => {

    let [tasas, setTasas] = useState([])

    const getCalculo = () => {
        if (alto, ancho, largo) {
            let value = (alto * ancho * largo) / 5000
            setVolumen(value)
        }

    }

    const getTasas = () => {
        instanceWithToken.get('tasas?tipoTasa=' + tipoGuia).then((result) => {
            setTasas(result.data.data)
        })
    }

    const getTasa = () => {
        const selectedTasa = tasas.filter(t => t.id == tasa);

        if (selectedTasa) {
            setTasaData(selectedTasa[0]);
        }
    }

    useEffect(() => {
        getCalculo()
    }, [alto, ancho, largo])

    useEffect(() => { getTasas() }, [tipoGuia])

    useEffect(() => {
        getTasa()
    }, [tasa])
    return (
        <Card mt={5} mb={5}>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Box>
                            <Heading size='lg'>Calculo de Peso / Volumen</Heading>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <SimpleGrid columns={1} mb={3}>
                    <Select
                        value={tasa}
                        onChange={(event) => setTasa(event.target.value)}
                        placeholder='Seleccione la Tasa de Calculo'>
                        {tasas.map((tasa, index) => (
                            <option key={index} value={tasa.id}>{tasa.tasa} ({tasa.monto} {moneda})  ({tasa.tipoPrecio})</option>
                        ))}
                    </Select>
                </SimpleGrid>
                <SimpleGrid columns={3} spacing={15}>
                    <Input value={alto} onChange={(event) => setAlto(event.target.value)} placeholder="Alto" />
                    <Input value={ancho} onChange={(event) => setAncho(event.target.value)} placeholder="Ancho" />
                    <Input value={largo} onChange={(event) => setLargo(event.target.value)} placeholder="Largo" />
                    <Box>
                        <Text>Volumen</Text>

                        <Text fontSize='3xl'><b>{volumen} KG</b></Text>
                    </Box>
                    <Box>
                        <Text>Tipo de Calculo</Text>
                        <Text fontSize='3xl'><b>KG</b></Text>
                    </Box>
                    <Box>
                        <Text>Peso Encomienda</Text>
                        <Input value={peso} onChange={(event) => setPeso(event.target.value)} placeholder="KG" />
                    </Box>
                </SimpleGrid>
            </CardBody>
        </Card>
    )
}
