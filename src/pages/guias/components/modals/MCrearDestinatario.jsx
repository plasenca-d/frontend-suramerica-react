import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Text,
  useToast,
  Box,
  Select,
} from '@chakra-ui/react';
import instanceWithToken from '../../../../utils/instanceWithToken';

export const MCrearDestinatario = ({ isOpen, onClose, setDestinatario, setLabel, client, setDireccionDestinatario }) => {
  const toast = useToast()
  let [tipoDocumento, setTipoDocumento] = useState("")
  let [pais, setPais] = useState("")
  let [nombre, setNombre] = useState("")
  let [apellido, setApellido] = useState("")
  let [documento, setDocumento] = useState("")
  let [ciudad, setCiudad] = useState("")
  let [estado, setEstado] = useState("")
  let [direccion, setDireccion] = useState("")
  let [telefono, setTelefono] = useState("")
  let [paises, setPaises] = useState([])

  const getCountries = () => {
    instanceWithToken.get('paises?status=true').then((result) => {
      setPaises(result.data.data)
    })
  }

  const create = () => {

    if (!tipoDocumento, !pais, !nombre, !apellido, !documento, !ciudad, !estado, !direccion, !telefono) {
      toast({
        title: 'Error.',
        description: 'Todos los datos deben estar llenos',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }


    const payload = {
      tipoDocumento,
      pais,
      nombre,
      apellido,
      documento,
      ciudad,
      estado,
      direccion,
      telefono,
      cliente: client
    }

    instanceWithToken.post('destinatarios', payload).then((result) => {
      toast({
        title: 'Registrado.',
        description: 'Cliente registrado con exito!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setLabel(nombre + ' ' + apellido)
      setDestinatario(result.data.data.id)
      setDireccionDestinatario(estado + ' - ' + ciudad + ' - ' + direccion)
      onClose()
    }).catch((e) => {
      toast({
        title: 'Error.',
        description: e.request.response,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
  }

  useEffect(() => {
    getCountries()
  }, [])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Destinatario</ModalHeader>
        <ModalBody>
          <Box>
            <Text mb='8px'>Tipo de Documento</Text>
            <Select
              value={tipoDocumento}
              onChange={(event) => setTipoDocumento(event.target.value)}
              placeholder='Tipo de Documento'
            >
              <option value='PASAPORTE'>PASAPORTE</option>
              <option value='CEDULA'>CEDULA</option>
              <option value='CEDULA DE EXTRANJERIA'>CEDULA DE EXTRANJERIA</option>
              <option value='CARNET DE EXTRANJERIA'>CARNET DE EXTRANJERIA</option>
              <option value='DNI'>DNI</option>
              <option value='RUC'>RUC</option>
              <option value='PTP'>PTP</option>
              <option value='CARNET DE REFUGIADO'>CARNET DE REFUGIADO</option>
              <option value='RIF'>RIF</option>
            </Select>
          </Box>
          <Box>
            <Text mb='8px'>Documento</Text>
            <Input value={documento} onChange={(event) => setDocumento(event.target.value)} type='text' />
          </Box>
          <Box>
            <Text mb='8px'>Nombre</Text>
            <Input value={nombre} onChange={(event) => setNombre(event.target.value)} type='text' />
          </Box>
          <Box>
            <Text mb='8px'>Apellido</Text>
            <Input value={apellido} onChange={(event) => setApellido(event.target.value)} type='text' />
          </Box>
          <Box>
            <Text mb='8px'>Pais</Text>
            <Select
              value={pais}
              onChange={(event) => setPais(event.target.value)}
              placeholder='Pais Origen'>
              {paises.map((pais, index) => (
                <option key={index} value={pais.id}>{pais.nombre}</option>
              ))}
            </Select>
          </Box>
          <Box>
            <Text mb='8px'>Estado</Text>
            <Input value={estado} onChange={(event) => setEstado(event.target.value)} type='text' />
          </Box>
          <Box>
            <Text mb='8px'>Ciudad</Text>
            <Input value={ciudad} onChange={(event) => setCiudad(event.target.value)} type='text' />
          </Box>
          <Box>
            <Text mb='8px'>Telefono</Text>
            <Input value={telefono} onChange={(event) => setTelefono(event.target.value)} type='text' />
          </Box>
          <Box>
            <Text mb='8px'>Direccion Exacta</Text>
            <Input value={direccion} onChange={(event) => setDireccion(event.target.value)} type='text' />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' mr={3} onClick={create}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
