import { Card, CardHeader, Heading, SimpleGrid, Box, Text, CardBody, Input, useDisclosure, Button, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import instanceWithToken from '../../utils/instanceWithToken'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { CListadoDeGuias } from './components/CListadoDeGuias'

export const PEditCarga = () => {

  const toast = useToast()
  const navigate = useNavigate()
  let { cargaId } = useParams()
  let [search, setSearch] = useState("")
  let [search2, setSearch2] = useState("")
  let [carga, setCarga] = useState(null)
  let [guia, setGuia] = useState(null)
  let [guias, setGuias] = useState([])
  let [pesoTotal, setPesoTotal] = useState(0)

  const { isOpen: isOpenEnCarga, onOpen: onOpenEnCarga, onClose: onCloseEnCarga } = useDisclosure()
  const { isOpen: isOpenNew, onOpen: onOpenNew, onClose: onCloseNew } = useDisclosure()

  const getCarga = () => {
    instanceWithToken.get('cargas/' + cargaId).then((result) => {
      setCarga(result.data.data)
      setGuias(result.data.data.guias)
    })
  }

  const getGuia = () => {
    instanceWithToken.get('guias/' + search).then((result) => {
      let guia = result.data.data
      setGuia(guia)
      if (guia.carga) {
        onOpenEnCarga()
      } else {
        onOpenNew()
      }
      setSearch("")
    })
  }

  const setCargaC = () => {
    let payload = { carga: cargaId }

    instanceWithToken.patch('guias/' + guia.id, payload).then((result) => {
      toast({
        title: 'Exito',
        description: 'Guia Adicionada a la Carga correctamente!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      onCloseEnCarga()
      onCloseNew()
      getCarga() // Refresh carga and guias after assigning guia to carga
    })
  }

  const cierre = () => {
    instanceWithToken.patch('cargas/' + cargaId, { estado: 'Aduana origen' }).then((result) => {
      toast({
        title: 'Exito',
        description: 'Carga cerrada con exito!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })

    navigate("")
  }

  useEffect(() => {
    if (search.length >= 5) {
      getGuia()
    }
  }, [search])

  useEffect(() => {
    getCarga()
  }, [])

  useEffect(() => {
    const totalWeight = guias.reduce((total, guia) => total + guia.peso, 0)
    setPesoTotal(totalWeight)
  }, [guias])

  return (
    <>
      <Card mt={5}>
        <CardHeader>
          <Heading size='md'>Informacion de la Carga</Heading>
          <SimpleGrid columns={3} spacing={10} mt={3}>
            <Box textAlign={'center'}>
              <Text textAlign={'center'}>Id Carga</Text>
              <Text textAlign={'center'} as='b' fontSize='4xl'>{cargaId}</Text>
            </Box>
            <Box textAlign={'center'}>
              <Text textAlign={'center'}>Cantidad Guias</Text>
              {carga && <Text textAlign={'center'} as='b' fontSize='4xl'>{carga.guias.length}</Text>}
            </Box>
            <Box textAlign={'center'}>
              <Text textAlign={'center'}>Cantidad de KG</Text>
              <Text textAlign={'center'} as='b' fontSize='4xl'>{pesoTotal} KG</Text>
            </Box>
          </SimpleGrid>
        </CardHeader>
      </Card>

      <Card mt={3}>
        <CardBody>
          <SimpleGrid columns={2} spacing={10}>
            <Input
              placeholder='Numero de Guia'
              value={search}
              onChange={(event) => {
                const value = event.target.value;
                if (value.length <= 5) {
                  setSearch(value);
                }
              }}
              onPaste={(event) => {
                const pastedValue = event.clipboardData.getData('text');
                if (pastedValue.length >= 5) {
                  setSearch(pastedValue);
                }
              }}
            />
            <Input placeholder='Numero de Manifiesto' value={search2} onChange={(event) => setSearch2(event.target.value)} />
          </SimpleGrid>

          <SimpleGrid mt={3} columns={1} >
            <Button colorScheme='blue' onClick={cierre}>Cerrar Carga</Button>
          </SimpleGrid>
        </CardBody>
      </Card>

      <CListadoDeGuias guias={guias} onUpdate={getCarga} />

      {guia?.carga && (
        <Modal isOpen={isOpenEnCarga} onClose={onCloseEnCarga}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Guia en Carga:</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Esta guia ya se encuentra en la carga {guia.carga.id}, decide si lo mueves a esta!
              <SimpleGrid columns={3} spacing={10}>
                <Box textAlign={'center'}>
                  <Text textAlign={'center'}>Alto</Text>
                  <Text textAlign={'center'} as='b' fontSize='4xl'>{guia.alto}</Text>
                </Box>
                <Box textAlign={'center'}>
                  <Text textAlign={'center'}>Ancho</Text>
                  <Text textAlign={'center'} as='b' fontSize='4xl'>{guia.ancho}</Text>
                </Box>
                <Box textAlign={'center'}>
                  <Text textAlign={'center'}>Largo</Text>
                  <Text textAlign={'center'} as='b' fontSize='4xl'>{guia.largo}</Text>
                </Box>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={10}>
                <Box textAlign={'center'}>
                  <Text textAlign={'center'}>Peso</Text>
                  <Text textAlign={'center'} as='b' fontSize='4xl'>{guia.peso} KG</Text>
                </Box>
                <Box textAlign={'center'}>
                  <Text textAlign={'center'}>Volumen</Text>
                  <Text textAlign={'center'} as='b' fontSize='4xl'>{guia.pesoVolumetrico}</Text>
                </Box>
              </SimpleGrid>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='red' onClick={setCargaC} mr={3} >
                Mover a esta Carga
              </Button>
              <Button variant='ghost' onClick={onCloseEnCarga}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={isOpenNew} onClose={onCloseNew}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Guia a la Carga!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={3} spacing={10}>
              <Box textAlign={'center'}>
                <Text textAlign={'center'}>Alto</Text>
                <Text textAlign={'center'} as='b' fontSize='4xl'>{guia ? guia.alto : null}</Text>
              </Box>
              <Box textAlign={'center'}>
                <Text textAlign={'center'}>Ancho</Text>
                <Text textAlign={'center'} as='b' fontSize='4xl'>{guia ? guia.ancho : null}</Text>
              </Box>
              <Box textAlign={'center'}>
                <Text textAlign={'center'}>Largo</Text>
                <Text textAlign={'center'} as='b' fontSize='4xl'>{guia ? guia.largo : null}</Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={10}>
              <Box textAlign={'center'}>
                <Text textAlign={'center'}>Peso</Text>
                <Text textAlign={'center'} as='b' fontSize='4xl'>{guia ? guia.peso : null} KG</Text>
              </Box>
              <Box textAlign={'center'}>
                <Text textAlign={'center'}>Volumen</Text>
                <Text textAlign={'center'} as='b' fontSize='4xl'>{guia ? guia.pesoVolumetrico : null}</Text>
              </Box>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' onClick={setCargaC} mr={3} >
              Asignar Guia a la Carga
            </Button>
            <Button variant='ghost' onClick={onCloseNew}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
