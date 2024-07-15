import React, { useEffect, useState } from 'react';
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
    useToast,
    Text,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react';
import instanceWithToken from '../utils/instanceWithToken';
import Cookies from 'js-cookie';


export const EditTasaModal = ({ isOpen, onClose, tasaData }) => {
    const toast = useToast()
    const [tasa, setTasa] = useState("")
    const [id, setId] = useState("USD")
    const [tipoEnvio, setTipoEnvio] = useState("")
    const [tipoPrecio, setTipoPrecio] = useState("")
    const [monto, setMonto] = useState("")

    const handleSubmit = () => {
        let payload = { tasa, tipoEnvio, tipoPrecio, monto }

        instanceWithToken.patch('tasas/'+id, payload).then((result) => {
            toast({
                title: 'Exito.',
                description: 'Tasa actualizada con exito',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            onClose()
        })
    }

    useEffect(() => {
        setId(tasaData.id)
        setTasa(tasaData.tasa)
        setTipoEnvio(tasaData.tipoEnvio)
        setTipoPrecio(tasaData.tipoPrecio)
        setMonto(tasaData.monto)
    }, [tasaData])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Actualizar Tasa</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize='sm'>Tasa</Text>
                    <Input
                        mb={3}
                        value={tasa}
                        onChange={(event) => setTasa(event.target.value)}
                        placeholder='Codigo'
                    />
                    <Text fontSize='sm'>Tipo de Envio</Text>
                    <Select value={tipoEnvio} onChange={(event) => setTipoEnvio(event.target.value)} placeholder='Seleccione'>
                        <option value='AEREO'>AEREO</option>
                        <option value='MARITIMO'>MARITIMO</option>
                        <option value='TERRESTRE'>TERRESTRE</option>
                    </Select>

                    <Text fontSize='sm'>Tipo de Precio</Text>
                    <Select value={tipoPrecio} onChange={(event) => setTipoPrecio(event.target.value)} placeholder='Seleccione'>
                        <option value='FIJO'>FIJO</option>
                        <option value='CALCULADO'>CALCULADO</option>
                    </Select>

                    <Text fontSize='sm'>Monto</Text>
                    <NumberInput value={monto} onChange={(valueString) => setMonto(valueString)} precision={2} step={0.01}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

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
