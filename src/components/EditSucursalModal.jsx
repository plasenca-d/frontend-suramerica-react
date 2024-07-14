import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import instanceWithToken from '../utils/instanceWithToken'

export const EditSucursalModal = ({ isOpen, onClose, sucursal }) => {
  const toast = useToast()
  let [id, setId] = useState("")
  let [codigo, setCodigo] = useState("")
  let [nombre, setNombre] = useState("")
  let [direccion, setDireccion] = useState("")
  let [telefono, setTelefono] = useState("")

  const handleSubmit = () => {

    let payload = { codigo, nombre, direccion, telefono }

    instanceWithToken.patch('sucursales/' + id, payload).then((result) => {
      toast({
        title: 'Exito.',
        description: 'Sucursal actualizada con exito',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      onClose()
    })

  }

  useEffect(() => {
    if (sucursal) {
      setId(sucursal.id)
      setCodigo(sucursal.codigo);
      setNombre(sucursal.nombre);
      setDireccion(sucursal.direccion);
      setTelefono(sucursal.telefono);
    }
  }, [sucursal]);
  return (

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Actualizar Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize='sm'>Codigo</Text>
          <Input
            mb={3}
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            placeholder='Codigo'
          />
          <Text fontSize='sm'>Nombre</Text>
          <Input
            mb={3}
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            placeholder='Nombre'
          />
          <Text fontSize='sm'>Direccion</Text>
          <Input
            mb={3}
            value={direccion}
            onChange={(event) => setDireccion(event.target.value)}
            placeholder='Direccion'
          />
          <Text fontSize='sm'>Telefono</Text>
          <Input
            mb={3}
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
            placeholder='Nombre'
          />

        </ModalBody>

        <ModalFooter>
          <Button colorScheme='red' mr={3} onClick={handleSubmit}>
            Actualizar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
