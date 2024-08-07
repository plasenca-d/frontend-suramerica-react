import { Box, Card, CardBody, CardHeader, Flex, Heading, Select, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import instanceWithToken from '../../../utils/instanceWithToken'

export const CDestino = ({ tipoGuia, setTipoGuia, origen, setOrigen, destino, setDestino, direccionDestinatario }) => {

    let [paises, setPaises] = useState([])

    const getCountries = () => {
        instanceWithToken.get('paises?status=true').then((result) => {
            setPaises(result.data.data)
        })
    }

    useEffect(() => {
        getCountries()
    }, [])
    
    return (
        <Card mt={5} mb={5}>
            <CardBody>
                <SimpleGrid columns={3} spacingX={10}>
                    <Box>
                        <Select
                            value={tipoGuia}
                            onChange={(event) => setTipoGuia(event.target.value)}
                            placeholder='Tipo de Guia'
                        >
                            <option value='AEREO'>AEREO</option>
                            <option value='MARITIMO'>MARITIMO</option>
                            <option value='TERRESTRE'>TERRESTRE</option>
                        </Select>
                    </Box>
                    <Box>
                        <Select
                            value={origen}
                            onChange={(event) => setOrigen(event.target.value)}
                            placeholder='Pais Origen'>
                            {paises.map((pais, index) => (
                                <option key={index} value={pais.nombre}>{pais.nombre}</option>
                            ))}
                        </Select>

                    </Box>
                    <Box>
                        <Select
                         value={destino}
                         onChange={(event) => setDestino(event.target.value)}
                         placeholder='Pais Destino'>
                            {paises.map((pais, index) => (
                                <option key={index} value={pais.nombre}>{pais.nombre}</option>
                            ))}
                        </Select>
                    </Box>
                </SimpleGrid>
            </CardBody>
        </Card>
    )
}
