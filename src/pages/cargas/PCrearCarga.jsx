import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Input, Select, SimpleGrid, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import instanceWithToken from '../../utils/instanceWithToken'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export const PCrearCarga = () => {

  const navigate = useNavigate()
  const toast = useToast()
  let [tipoGuia, setTipoGuia] = useState("")
  let [fecha, setFecha] = useState("")

  const crear = () => {
    let payload = {
      tipoCarga: tipoGuia,
      fechaSalida: fecha,
      user: Cookies.get("id")
    }
    if (!tipoGuia, !fecha) {
      toast({
        title: 'Error',
        description: 'Debes selecccionar un tipo y una fecha',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    instanceWithToken.post('cargas', payload).then((result) => {
      toast({
        title: 'Exito',
        description: 'Carga generada con exito, procede a agregar las guias correspondientes',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate("/cargas/editar/" + result.data.data.id)
    })
  }

  return (
    <Card mt={5}>
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Box>
              <Heading size='lg'>Crear Carga</Heading>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={2} spacing={10}>
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
            <Input type='date' value={fecha} onChange={(event) => setFecha(event.target.value)} />
          </Box>
        </SimpleGrid>
        <SimpleGrid columns={1}>
          <Button colorScheme='blue' onClick={crear} mt={3}>Crear y Agregar Guias</Button>
        </SimpleGrid>
      </CardBody>
    </Card>
  )
}
