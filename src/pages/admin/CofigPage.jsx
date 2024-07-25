import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Input, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import instanceWithToken from '../../utils/instanceWithToken'
import Cookies from 'js-cookie'
export const CofigPage = () => {
    const toast = useToast()

    let [tasaDolar, setTasaDolar] = useState("")

    const getDataEmpresa = () => {
        instanceWithToken.get('empresa/'+Cookies.get("empresaId")).then((result) => {
            setTasaDolar(result.data.data.tasa)
        })
    }

    const update = () => {
        instanceWithToken.patch('empresa/'+Cookies.get("empresaId"), {tasa: tasaDolar}).then((result) => {
            toast({
                title: 'Exito.',
                description: 'Actualizacion de configuraciones exitosa',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        })
    }

    useEffect(() => {
        getDataEmpresa()
    }, [])
    return (
        <div>
            <Card mt={5}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Configuraciones</Heading>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text fontSize='sm'>Tasa del Dolar</Text>
                    <Input
                        mb={3}
                        value={tasaDolar}
                        onChange={(event) => setTasaDolar(event.target.value)}
                        placeholder='Tasa Dolar'
                    />

                    <Button onClick={() => update()} colorScheme='red'>Guardar</Button>
                </CardBody>
            </Card>
        </div>
    )
}
