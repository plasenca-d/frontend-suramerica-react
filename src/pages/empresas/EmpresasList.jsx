import React, { useEffect, useState } from 'react';
import instanceWithToken from '../../utils/instanceWithToken';
import {
    Box, Button, Card, CardBody, CardHeader, Flex, Heading, SimpleGrid, Text, useDisclosure, useToast
} from '@chakra-ui/react';
import {
    Table, Thead, Tbody, Tr, Th, Td, TableContainer
} from '@chakra-ui/react';
import { PiPlusCircleDuotone } from 'react-icons/pi';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react';
import {
    NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { FiEdit, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const EmpresasList = () => {
    const toast = useToast();
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const [empresas, setEmpresas] = useState([]);

    // registro
    let [nombre, setNombre] = useState("");
    let [representante, setRepresentante] = useState("");
    let [correo, setCorreo] = useState("");
    let [telefono, setTelefono] = useState("");
    let [moneda, setMoneda] = useState("");
    let [aereo, setAereo] = useState(0);
    let [maritimo, setMaritimo] = useState(0);
    let [terrestre, setTerrestre] = useState(0);
    let [monto, setMonto] = useState(0);
    let [editId, setEditId] = useState("")

    const getEmpresas = () => {
        instanceWithToken.get('empresa').then((result) => {
            setEmpresas(result.data.data);
        });
    };

    const store = () => {
        if (!nombre || !representante || !moneda || !monto) {
            toast({
                title: 'Error.',
                description: "Revisa los datos obligatorios por favor.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });

            return;
        }

        let payload = { nombre, representante, correo, telefono, moneda, aereo, terrestre, maritimo, tasa: monto };

        instanceWithToken.post('empresa', payload).then((result) => {
            toast({
                title: 'Registro Exitoso.',
                description: "Empresa registrada con exito.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onClose();
            getEmpresas();
            setEditId("")
            setNombre("");
            setRepresentante("");
            setCorreo("");
            setTelefono("");
            setMoneda("");
            setAereo(0);
            setTerrestre(0);
            setMaritimo(0);
            setMonto(0);
        });
    };

    const update = () => {
        if (!nombre || !representante || !moneda || !monto) {
            toast({
                title: 'Error.',
                description: "Revisa los datos obligatorios por favor.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });

            return;
        }

        let payload = { nombre, representante, correo, telefono, moneda, aereo, terrestre, maritimo, tasa: monto };

        instanceWithToken.patch('empresa/' + editId, payload).then((result) => {
            toast({
                title: 'Registro Exitoso.',
                description: "Empresa registrada con exito.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onClose2();
            getEmpresas();
            setNombre("");
            setRepresentante("");
            setCorreo("");
            setTelefono("");
            setMoneda("");
            setAereo(0);
            setTerrestre(0);
            setMaritimo(0);
            setMonto(0);
        });
    };

    const edit = (data) => {
        setEditId(data.id)
        setNombre(data.nombre);
        setRepresentante(data.representante);
        setCorreo(data.correo);
        setTelefono(data.telefono);
        setMoneda(data.moneda);
        setAereo(parseFloat(data.aereo));
        setTerrestre(parseFloat(data.terrestre));
        setMaritimo(parseFloat(data.maritimo));
        setMonto(parseFloat(data.tasa));

        onOpen2(); // Correctly open the edit modal
    };

    useEffect(() => {
        getEmpresas();
    }, []);

    return (
        <>
            <Card>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Box>
                                <Heading size='lg'>Empresas</Heading>
                            </Box>
                        </Flex>
                        <Button onClick={onOpen} leftIcon={<PiPlusCircleDuotone />} colorScheme='red'>Agregar Empresa</Button>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Empresa</Th>
                                    <Th>Moneda</Th>
                                    <Th>Representante</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {empresas.map((empresa, index) => (
                                    <Tr key={index}>
                                        <Td>{empresa.nombre}</Td>
                                        <Td>{empresa.moneda}</Td>
                                        <Td>{empresa.representante}</Td>
                                        <Td>
                                            <IconButton onClick={() => edit(empresa)} mr={3} icon={<FiEdit />} />
                                            <IconButton onClick={() => navigate("/empresas/detalle/" + empresa.id)} colorScheme='blue' icon={<FiEye />} />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>

            <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear Empresa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input mb={3} value={nombre} onChange={(event) => setNombre(event.target.value)} placeholder='Nombre Empresa' />
                        <Input mb={3} value={representante} onChange={(event) => setRepresentante(event.target.value)} placeholder='Representante Empresa' />
                        <Input mb={3} value={correo} onChange={(event) => setCorreo(event.target.value)} placeholder='Correo Empresa' />
                        <Input mb={3} value={telefono} onChange={(event) => setTelefono(event.target.value)} placeholder='Telefono Empresa' />

                        <SimpleGrid columns={2} spacing={3}>
                            <div>
                                <Text fontSize='sm'>Tasa de cambio $</Text>
                                <NumberInput value={monto} onChange={(valueString) => setMonto(valueString)} precision={2} step={0.01}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </div>
                            <div>
                                <Text fontSize='sm'>Moneda</Text>
                                <Select value={moneda} onChange={(event) => setMoneda(event.target.value)} placeholder='Seleccione'>
                                    <option value='USD'>Dolar</option>
                                    <option value='PEN'>Soles</option>
                                    <option value='COP'>Pesos Colombianos</option>
                                </Select>
                            </div>
                        </SimpleGrid>

                        <SimpleGrid columns={3} spacing={1} mt={3}>
                            <div>
                                <Text fontSize='sm'>Maritimo</Text>
                                <NumberInput value={maritimo} onChange={(valueString) => setMaritimo(valueString)} precision={2} step={0.01}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </div>
                            <div>
                                <Text fontSize='sm'>Aereo</Text>
                                <NumberInput value={aereo} onChange={(valueString) => setAereo(valueString)} precision={2} step={0.01}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </div>
                            <div>
                                <Text fontSize='sm'>Terrestre</Text>
                                <NumberInput value={terrestre} onChange={(valueString) => setTerrestre(valueString)} precision={2} step={0.01}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </div>
                        </SimpleGrid>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={store} colorScheme='red' mr={3}>
                            Crear
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >

            <Modal isOpen={isOpen2} closeOnOverlayClick={false} onClose={onClose2}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Empresa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input mb={3} value={nombre} onChange={(event) => setNombre(event.target.value)} placeholder='Nombre Empresa' />
                        <Input mb={3} value={representante} onChange={(event) => setRepresentante(event.target.value)} placeholder='Representante Empresa' />
                        <Input mb={3} value={correo} onChange={(event) => setCorreo(event.target.value)} placeholder='Correo Empresa' />
                        <Input mb={3} value={telefono} onChange={(event) => setTelefono(event.target.value)} placeholder='Telefono Empresa' />

                        <SimpleGrid columns={2} spacing={3}>
                            <div>
                                <Text fontSize='sm'>Tasa de cambio $</Text>
                                <NumberInput value={monto} onChange={(valueString) => setMonto(valueString)} precision={2} step={0.01}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </div>
                            <div>
                                <Text fontSize='sm'>Moneda</Text>
                                <Select value={moneda} onChange={(event) => setMoneda(event.target.value)} placeholder='Seleccione'>
                                    <option value='USD'>Dolar</option>
                                    <option value='PEN'>Soles</option>
                                    <option value='COP'>Pesos Colombianos</option>
                                </Select>
                            </div>
                        </SimpleGrid>

                        <SimpleGrid columns={3} spacing={1} mt={3}>
                            <div>
                                <Text fontSize='sm'>Maritimo</Text>
                                <NumberInput value={maritimo} onChange={(valueString) => setMaritimo(valueString)} precision={2} step={0.01}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </div>
                            <div>
                                <Text fontSize='sm'>Aereo</Text>
                                <NumberInput value={aereo} onChange={(valueString) => setAereo(valueString)} precision={2} step={0.01}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </div>
                            <div>
                                <Text fontSize='sm'>Terrestre</Text>
                                <NumberInput value={terrestre} onChange={(valueString) => setTerrestre(valueString)} precision={2} step={0.01}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </div>
                        </SimpleGrid>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={update} colorScheme='green' mr={3}>
                            Actualizar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    );
};
