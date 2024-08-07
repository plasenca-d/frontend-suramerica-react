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
    Card,
    CardHeader,
    Heading,
    CardFooter,
} from '@chakra-ui/react';

export const MSeleccionarDestinatario = ({ destinatarios, isOpen, onClose, setDestinatario, setLabel, setDireccionDestinatario }) => {

    const seleccionar = (data) => {
        setDestinatario(data.id)
        setLabel(data.documento + " - " + data.nombre + ' ' + data.apellido)
        setDireccionDestinatario(data.estado + ' - ' + data.ciudad + ' - ' + data.direccion)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Seleccione un Destinatario</ModalHeader>
                <ModalBody>
                    {destinatarios.map((destinatario, index) => (
                        <Card mb={3} key={index}>
                            <CardHeader>
                                <Heading size='xs' textTransform='uppercase'>
                                    {destinatario.nombre} {destinatario.apellido}
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    <b>Documento: </b>{destinatario.tipoDocumento} - {destinatario.documento}
                                </Text>
                                <Text pt='2' fontSize='sm'>
                                    <b>Direccion: </b>{destinatario.estado} - {destinatario.ciudad} - {destinatario.direccion}
                                </Text>
                                <Button mt={3} colorScheme='red' onClick={() => seleccionar(destinatario)} width='100%'>Seleccionar</Button>
                            </CardHeader>
                        </Card>
                    ))}

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
